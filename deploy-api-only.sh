#!/bin/bash
set -e

# AutoVerse AWS API Deployment Script
# This script deploys only the Node.js API to Lambda + API Gateway

# Configuration
REGION="us-east-1"
PROJECT_NAME="autoverse"
API_FUNCTION_NAME="${PROJECT_NAME}-api"

echo "🚀 Starting AutoVerse API Deployment"
echo "=================================="
echo "Region: $REGION"
echo "API Function: $API_FUNCTION_NAME"
echo ""

# Step 1: Build and package the API
echo "🔧 Building API..."
cd apps/server
npm install
npm run build
cd ../..
echo "✅ API built successfully"

# Create Lambda deployment package
echo "📦 Creating Lambda deployment package..."
cd apps/server
mkdir -p lambda-package
cp -r dist/* lambda-package/
cp package.json lambda-package/
cp lambda.ts lambda-package/ 2>/dev/null || echo "lambda.ts will be compiled from dist"
cd lambda-package
npm install --production
zip -r ../lambda-function.zip . > /dev/null
cd ..
rm -rf lambda-package
cd ../..
echo "✅ Lambda package created"

# Step 2: Create IAM role for Lambda
echo "👤 Creating IAM role for Lambda..."
cat > /tmp/trust-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

ROLE_ARN=$(aws iam create-role \
  --role-name ${API_FUNCTION_NAME}-role \
  --assume-role-policy-document file:///tmp/trust-policy.json \
  --query 'Role.Arn' \
  --output text 2>/dev/null || \
  aws iam get-role \
    --role-name ${API_FUNCTION_NAME}-role \
    --query 'Role.Arn' \
    --output text)

aws iam attach-role-policy \
  --role-name ${API_FUNCTION_NAME}-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole 2>/dev/null || echo "Policy already attached"

echo "✅ IAM role created: $ROLE_ARN"
echo "⏳ Waiting 10 seconds for IAM role propagation..."
sleep 10

# Step 3: Create Lambda function
echo "🔨 Creating Lambda function..."
aws lambda create-function \
  --function-name $API_FUNCTION_NAME \
  --runtime nodejs20.x \
  --role $ROLE_ARN \
  --handler lambda.handler \
  --zip-file fileb://apps/server/lambda-function.zip \
  --timeout 30 \
  --memory-size 512 \
  --region $REGION 2>/dev/null || \
  aws lambda update-function-code \
    --function-name $API_FUNCTION_NAME \
    --zip-file fileb://apps/server/lambda-function.zip \
    --region $REGION

echo "✅ Lambda function deployed"

# Step 4: Create API Gateway
echo "🌐 Creating API Gateway..."
API_ID=$(aws apigatewayv2 create-api \
  --name $API_FUNCTION_NAME \
  --protocol-type HTTP \
  --target arn:aws:lambda:$REGION:$(aws sts get-caller-identity --query Account --output text):function:$API_FUNCTION_NAME \
  --region $REGION \
  --query 'ApiId' \
  --output text 2>/dev/null || echo "")

if [ -z "$API_ID" ]; then
  echo "⚠️  API already exists, getting API ID..."
  API_ID=$(aws apigatewayv2 get-apis \
    --region $REGION \
    --query "Items[?Name=='$API_FUNCTION_NAME'].ApiId" \
    --output text | head -1)
fi

# Grant API Gateway permission to invoke Lambda
aws lambda add-permission \
  --function-name $API_FUNCTION_NAME \
  --statement-id apigateway-invoke \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:$REGION:$(aws sts get-caller-identity --query Account --output text):$API_ID/*/*" \
  --region $REGION 2>/dev/null || echo "Permission already exists"

API_ENDPOINT=$(aws apigatewayv2 get-api \
  --api-id $API_ID \
  --region $REGION \
  --query 'ApiEndpoint' \
  --output text)

echo "✅ API Gateway created: $API_ENDPOINT"

# Cleanup temporary files
rm -f /tmp/trust-policy.json apps/server/lambda-function.zip

echo ""
echo "🎉 API Deployment Complete!"
echo "=================================="
echo ""
echo "🔌 API:"
echo "  Endpoint: $API_ENDPOINT"
echo "  Health Check: $API_ENDPOINT/health"
echo "  News API: $API_ENDPOINT/api/news"
echo "  Models API: $API_ENDPOINT/api/models"
echo ""
echo "📝 Test Commands:"
echo "  curl $API_ENDPOINT/health"
echo "  curl $API_ENDPOINT/api/news"
echo "  curl $API_ENDPOINT/api/models"
echo "  curl $API_ENDPOINT/api/brands"
echo "  curl $API_ENDPOINT/api/garage"
echo "  curl $API_ENDPOINT/api/dealerships"
echo ""
echo "🧹 To clean up resources, run: ./cleanup-aws.sh"
