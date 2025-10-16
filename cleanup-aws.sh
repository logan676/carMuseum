#!/bin/bash
set -e

# AutoVerse AWS Cleanup Script
# WARNING: This will delete all AWS resources created by the deployment script

# Configuration - MUST MATCH deploy-aws.sh values
REGION="us-east-1"
PROJECT_NAME="autoverse"
API_FUNCTION_NAME="${PROJECT_NAME}-api"

echo "🧹 Starting AutoVerse AWS Cleanup"
echo "=================================="
echo "⚠️  WARNING: This will delete ALL AutoVerse AWS resources!"
echo ""
read -p "Are you sure you want to continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
  echo "Cleanup cancelled."
  exit 0
fi

echo ""
echo "Starting cleanup process..."

# Step 1: Delete API Gateway
echo "🗑️  Deleting API Gateway..."
API_IDS=$(aws apigatewayv2 get-apis \
  --region $REGION \
  --query "Items[?Name=='$API_FUNCTION_NAME'].ApiId" \
  --output text)

if [ ! -z "$API_IDS" ]; then
  for API_ID in $API_IDS; do
    aws apigatewayv2 delete-api \
      --api-id $API_ID \
      --region $REGION || echo "Failed to delete API: $API_ID"
    echo "✅ Deleted API Gateway: $API_ID"
  done
else
  echo "ℹ️  No API Gateway found"
fi

# Step 2: Delete Lambda function
echo "🗑️  Deleting Lambda function..."
aws lambda delete-function \
  --function-name $API_FUNCTION_NAME \
  --region $REGION 2>/dev/null && echo "✅ Lambda function deleted" || echo "ℹ️  Lambda function not found"

# Step 3: Delete IAM role and policies
echo "🗑️  Deleting IAM role..."
aws iam detach-role-policy \
  --role-name ${API_FUNCTION_NAME}-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole 2>/dev/null || echo "Policy already detached"

aws iam delete-role \
  --role-name ${API_FUNCTION_NAME}-role 2>/dev/null && echo "✅ IAM role deleted" || echo "ℹ️  IAM role not found"

# Step 4: Delete CloudFront distributions
echo "🗑️  Finding CloudFront distributions..."
DISTRIBUTIONS=$(aws cloudfront list-distributions \
  --query "DistributionList.Items[?Comment=='AutoVerse Web App CDN'].{Id:Id,ETag:ETag}" \
  --output text 2>/dev/null)

if [ ! -z "$DISTRIBUTIONS" ]; then
  echo "$DISTRIBUTIONS" | while read -r DIST_ID ETAG; do
    echo "Disabling distribution: $DIST_ID..."

    # Get current config
    aws cloudfront get-distribution-config \
      --id $DIST_ID \
      --query 'DistributionConfig' \
      --output json > /tmp/dist-config-$DIST_ID.json

    ETAG=$(aws cloudfront get-distribution-config \
      --id $DIST_ID \
      --query 'ETag' \
      --output text)

    # Disable distribution
    jq '.Enabled = false' /tmp/dist-config-$DIST_ID.json > /tmp/dist-config-disabled-$DIST_ID.json

    aws cloudfront update-distribution \
      --id $DIST_ID \
      --distribution-config file:///tmp/dist-config-disabled-$DIST_ID.json \
      --if-match $ETAG > /dev/null

    echo "⏳ Waiting for distribution $DIST_ID to be disabled (this may take 5-10 minutes)..."
    aws cloudfront wait distribution-deployed --id $DIST_ID

    # Get new ETag after disabling
    NEW_ETAG=$(aws cloudfront get-distribution-config \
      --id $DIST_ID \
      --query 'ETag' \
      --output text)

    # Delete distribution
    aws cloudfront delete-distribution \
      --id $DIST_ID \
      --if-match $NEW_ETAG

    echo "✅ CloudFront distribution deleted: $DIST_ID"
    rm -f /tmp/dist-config-$DIST_ID.json /tmp/dist-config-disabled-$DIST_ID.json
  done
else
  echo "ℹ️  No CloudFront distributions found"
fi

# Step 5: Delete S3 buckets
echo "🗑️  Deleting S3 buckets..."
BUCKETS=$(aws s3api list-buckets \
  --query "Buckets[?starts_with(Name, '$PROJECT_NAME-web')].Name" \
  --output text)

if [ ! -z "$BUCKETS" ]; then
  for BUCKET in $BUCKETS; do
    echo "Emptying bucket: $BUCKET..."
    aws s3 rm s3://$BUCKET --recursive

    echo "Deleting bucket: $BUCKET..."
    aws s3 rb s3://$BUCKET --force

    echo "✅ S3 bucket deleted: $BUCKET"
  done
else
  echo "ℹ️  No S3 buckets found"
fi

echo ""
echo "🎉 Cleanup Complete!"
echo "=================================="
echo "All AutoVerse AWS resources have been removed."
