# AutoVerse AWS Deployment Guide

This guide explains how to deploy the AutoVerse (Car Museum) application to AWS using the AWS CLI.

## Architecture Overview

The deployment creates the following AWS infrastructure:

### Web Application (Angular)
- **S3**: Static website hosting for Angular build
- **CloudFront**: CDN for global distribution, HTTPS, and caching

### API Server (Node.js/Express)
- **Lambda**: Serverless function hosting the Express API
- **API Gateway**: HTTP API endpoint for Lambda invocation
- **IAM Role**: Execution role with CloudWatch logging permissions

## Prerequisites

1. **AWS CLI installed and configured**
   ```bash
   aws --version
   aws configure
   ```

   You'll need:
   - AWS Access Key ID
   - AWS Secret Access Key
   - Default region (e.g., `us-east-1`)

2. **Node.js and npm installed**
   ```bash
   node --version  # Should be v18 or higher
   npm --version
   ```

3. **Required permissions**
   Your AWS user/role needs permissions for:
   - S3 (create buckets, upload objects)
   - CloudFront (create distributions)
   - Lambda (create functions, update code)
   - API Gateway (create APIs)
   - IAM (create roles, attach policies)

## Deployment Steps

### Option 1: Automated Deployment (Recommended)

Run the automated deployment script:

```bash
cd carMuseum
./deploy-aws.sh
```

This script will:
1. Build the Angular web app
2. Create and configure an S3 bucket for static hosting
3. Upload the web app to S3
4. Create a CloudFront CDN distribution
5. Build and package the Node.js API
6. Create a Lambda function
7. Set up API Gateway

**Estimated time**: 5-10 minutes (CloudFront takes an additional 15-20 minutes to fully deploy)

### Option 2: Manual Step-by-Step Deployment

If you prefer to run commands manually or customize the deployment:

#### 1. Build the Angular Web App
```bash
cd apps/web
npm install
npm run build
cd ../..
```

#### 2. Create S3 Bucket
```bash
BUCKET_NAME="autoverse-web-$(date +%s)"
REGION="us-east-1"

aws s3 mb s3://$BUCKET_NAME --region $REGION

aws s3 website s3://$BUCKET_NAME \
  --index-document index.html \
  --error-document index.html
```

#### 3. Upload to S3
```bash
aws s3 sync apps/web/dist/autoverse-web/browser/ s3://$BUCKET_NAME --delete
```

#### 4. Build and Deploy API
```bash
cd apps/server
npm install
npm run build

# Create deployment package
mkdir lambda-package
cp -r dist/* lambda-package/
cp package.json lambda-package/
cd lambda-package
npm install --production
zip -r ../lambda-function.zip .
cd ..
rm -rf lambda-package
```

#### 5. Create Lambda Function
```bash
# Create IAM role
aws iam create-role \
  --role-name autoverse-api-role \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {"Service": "lambda.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }]
  }'

aws iam attach-role-policy \
  --role-name autoverse-api-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

# Wait for IAM propagation
sleep 10

# Create Lambda function
ROLE_ARN=$(aws iam get-role --role-name autoverse-api-role --query 'Role.Arn' --output text)

aws lambda create-function \
  --function-name autoverse-api \
  --runtime nodejs20.x \
  --role $ROLE_ARN \
  --handler lambda.handler \
  --zip-file fileb://lambda-function.zip \
  --timeout 30 \
  --memory-size 512 \
  --region $REGION
```

#### 6. Create API Gateway
```bash
aws apigatewayv2 create-api \
  --name autoverse-api \
  --protocol-type HTTP \
  --target arn:aws:lambda:$REGION:$(aws sts get-caller-identity --query Account --output text):function:autoverse-api
```

## Post-Deployment

### Get Your Endpoints

**Web App URL (S3)**:
```bash
echo "http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
```

**CloudFront URL**:
```bash
aws cloudfront list-distributions \
  --query "DistributionList.Items[?Comment=='AutoVerse Web App CDN'].DomainName" \
  --output text
```

**API Endpoint**:
```bash
API_ID=$(aws apigatewayv2 get-apis \
  --query "Items[?Name=='autoverse-api'].ApiId" \
  --output text)

aws apigatewayv2 get-api \
  --api-id $API_ID \
  --query 'ApiEndpoint' \
  --output text
```

### Test the API

```bash
curl https://YOUR_API_ENDPOINT/health
curl https://YOUR_API_ENDPOINT/api/news
curl https://YOUR_API_ENDPOINT/api/models
```

### Update Angular Environment

Update `apps/web/src/environments/environment.ts` with your API endpoint:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://YOUR_API_ENDPOINT'
};
```

Then rebuild and redeploy the web app:
```bash
cd apps/web
npm run build
cd ../..
aws s3 sync apps/web/dist/autoverse-web/browser/ s3://$BUCKET_NAME --delete
```

## Updating the Deployment

### Update Web App Only
```bash
cd apps/web
npm run build
cd ../..
aws s3 sync apps/web/dist/autoverse-web/browser/ s3://$BUCKET_NAME --delete

# Invalidate CloudFront cache
DIST_ID=$(aws cloudfront list-distributions \
  --query "DistributionList.Items[?Comment=='AutoVerse Web App CDN'].Id" \
  --output text)
aws cloudfront create-invalidation \
  --distribution-id $DIST_ID \
  --paths "/*"
```

### Update API Only
```bash
cd apps/server
npm run build

# Recreate package
mkdir lambda-package
cp -r dist/* lambda-package/
cp package.json lambda-package/
cd lambda-package
npm install --production
zip -r ../lambda-function.zip .
cd ..

# Update Lambda
aws lambda update-function-code \
  --function-name autoverse-api \
  --zip-file fileb://lambda-function.zip

rm -rf lambda-package lambda-function.zip
cd ../..
```

## Cleanup

To remove all AWS resources:

```bash
./cleanup-aws.sh
```

This will delete:
- API Gateway
- Lambda function
- IAM role
- CloudFront distribution (takes 5-10 minutes)
- S3 bucket and all contents

## Cost Estimation

**Free Tier Eligible**:
- S3: 5GB storage, 20,000 GET requests/month
- Lambda: 1M requests/month, 400,000 GB-seconds compute
- CloudFront: 1TB data transfer out/month (first 12 months)
- API Gateway: 1M API calls/month (first 12 months)

**Beyond Free Tier** (approximate):
- S3: ~$0.023/GB/month
- Lambda: $0.20 per 1M requests + $0.0000166667/GB-second
- CloudFront: $0.085/GB data transfer
- API Gateway: $1.00 per million requests

**Estimated monthly cost for low-traffic app**: $0-5/month

## Troubleshooting

### Lambda function not responding
```bash
# Check Lambda logs
aws logs tail /aws/lambda/autoverse-api --follow
```

### CloudFront not serving latest content
```bash
# Create cache invalidation
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

### API Gateway 403 errors
```bash
# Verify Lambda permissions
aws lambda get-policy --function-name autoverse-api
```

### Build failures
```bash
# Clear node_modules and reinstall
cd apps/web
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Advanced Configuration

### Custom Domain Name

1. **Register domain in Route 53** or use existing domain
2. **Request SSL certificate** in ACM (us-east-1 for CloudFront)
3. **Update CloudFront distribution** with alternate domain name
4. **Create Route 53 alias record** pointing to CloudFront

### Environment Variables for Lambda
```bash
aws lambda update-function-configuration \
  --function-name autoverse-api \
  --environment Variables="{NODE_ENV=production,LOG_LEVEL=info}"
```

### Enable CORS for API Gateway
The Express app already has CORS enabled via the `cors` middleware.

### CloudWatch Alarms
```bash
# Create alarm for Lambda errors
aws cloudwatch put-metric-alarm \
  --alarm-name autoverse-api-errors \
  --alarm-description "Alert on Lambda errors" \
  --metric-name Errors \
  --namespace AWS/Lambda \
  --statistic Sum \
  --period 300 \
  --threshold 5 \
  --comparison-operator GreaterThanThreshold \
  --dimensions Name=FunctionName,Value=autoverse-api
```

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/deploy-aws.yml`:

```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Deploy to AWS
        run: ./deploy-aws.sh
```

## Support

For issues related to:
- **AutoVerse application**: Check the main README.md
- **AWS services**: Visit AWS documentation
- **Deployment script**: Review script logs and error messages

## License

Same as the main AutoVerse project.
