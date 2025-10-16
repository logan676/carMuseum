#!/bin/bash
set -e

# AutoVerse AWS Deployment Script
# This script deploys the Angular web app to S3/CloudFront and API to Lambda

# Configuration - CUSTOMIZE THESE VALUES
REGION="us-east-1"
PROJECT_NAME="autoverse"
S3_BUCKET="${PROJECT_NAME}-web-$(date +%s)"
API_FUNCTION_NAME="${PROJECT_NAME}-api"
STACK_NAME="${PROJECT_NAME}-stack"

echo "🚀 Starting AutoVerse AWS Deployment"
echo "=================================="
echo "Region: $REGION"
echo "S3 Bucket: $S3_BUCKET"
echo "API Function: $API_FUNCTION_NAME"
echo ""

# Step 1: Build the Angular web app
echo "📦 Building Angular web app..."
cd apps/web
npm install
npm run build
cd ../..
echo "✅ Web app built successfully"

# Step 2: Create S3 bucket for web hosting
echo "🪣 Creating S3 bucket..."
aws s3 mb s3://$S3_BUCKET --region $REGION

# Configure bucket for static website hosting
aws s3 website s3://$S3_BUCKET \
  --index-document index.html \
  --error-document index.html

# Set bucket policy for public read access
cat > /tmp/bucket-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$S3_BUCKET/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy \
  --bucket $S3_BUCKET \
  --policy file:///tmp/bucket-policy.json

echo "✅ S3 bucket created and configured"

# Step 3: Upload Angular build to S3
echo "⬆️  Uploading web app to S3..."
aws s3 sync apps/web/dist/autoverse-web/browser/ s3://$S3_BUCKET \
  --delete \
  --cache-control "max-age=31536000" \
  --exclude "*.html"

# Upload HTML files with no-cache
aws s3 sync apps/web/dist/autoverse-web/browser/ s3://$S3_BUCKET \
  --delete \
  --cache-control "no-cache" \
  --exclude "*" \
  --include "*.html"

echo "✅ Web app uploaded to S3"

# Step 4: Create CloudFront distribution
echo "☁️  Creating CloudFront distribution..."
cat > /tmp/cloudfront-config.json <<EOF
{
  "CallerReference": "$PROJECT_NAME-$(date +%s)",
  "Comment": "AutoVerse Web App CDN",
  "Enabled": true,
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-$S3_BUCKET",
        "DomainName": "$S3_BUCKET.s3-website-$REGION.amazonaws.com",
        "CustomOriginConfig": {
          "HTTPPort": 80,
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "http-only"
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-$S3_BUCKET",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"],
      "CachedMethods": {
        "Quantity": 2,
        "Items": ["GET", "HEAD"]
      }
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    },
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000,
    "Compress": true
  },
  "CustomErrorResponses": {
    "Quantity": 1,
    "Items": [
      {
        "ErrorCode": 404,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 300
      }
    ]
  }
}
EOF

DISTRIBUTION_ID=$(aws cloudfront create-distribution \
  --distribution-config file:///tmp/cloudfront-config.json \
  --region $REGION \
  --query 'Distribution.Id' \
  --output text)

echo "✅ CloudFront distribution created: $DISTRIBUTION_ID"

# Step 5: Build and package the API
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
cd lambda-package
npm install --production
zip -r ../lambda-function.zip . > /dev/null
cd ..
rm -rf lambda-package
cd ../..
echo "✅ Lambda package created"

# Step 6: Create IAM role for Lambda
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
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

echo "✅ IAM role created: $ROLE_ARN"
echo "⏳ Waiting 10 seconds for IAM role propagation..."
sleep 10

# Step 7: Create Lambda function
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

# Step 8: Create API Gateway
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
rm -f /tmp/bucket-policy.json /tmp/cloudfront-config.json /tmp/trust-policy.json apps/server/lambda-function.zip

echo ""
echo "🎉 Deployment Complete!"
echo "=================================="
echo ""
echo "📱 Web App:"
echo "  S3 URL: http://$S3_BUCKET.s3-website-$REGION.amazonaws.com"
echo "  CloudFront URL: (check AWS Console for distribution domain)"
echo "  Distribution ID: $DISTRIBUTION_ID"
echo ""
echo "🔌 API:"
echo "  Endpoint: $API_ENDPOINT"
echo "  Health Check: $API_ENDPOINT/health"
echo ""
echo "📝 Next Steps:"
echo "  1. Wait 15-20 minutes for CloudFront distribution to deploy"
echo "  2. Get CloudFront domain: aws cloudfront get-distribution --id $DISTRIBUTION_ID --query 'Distribution.DomainName'"
echo "  3. Test API: curl $API_ENDPOINT/health"
echo "  4. Update Angular environment.ts with API endpoint"
echo ""
echo "🧹 To clean up resources, run: ./cleanup-aws.sh"
