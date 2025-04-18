# Deployment Guide for PositionKit

This guide explains how to deploy PositionKit to [Render](https://render.com), ensuring that API keys and sensitive information are handled securely.

## Prerequisites

Before deploying, make sure you have:

1. An [OpenAI API key](https://platform.openai.com/account/api-keys)
2. A [SendGrid API key](https://app.sendgrid.com/settings/api_keys) (if using email functionality)
3. A Render account

## Environment Variables

The application requires the following environment variables:

- `OPENAI_API_KEY`: Your OpenAI API key for generating positioning content
- `SENDGRID_API_KEY`: Your SendGrid API key for sending emails
- `NODE_ENV`: Set to "production" for production deployment

## Deploying to Render

1. **Create a new Web Service**

   - Log in to your Render account
   - Click "New" and select "Web Service"
   - Connect your GitHub repository

2. **Configure the Web Service**

   - **Name**: Choose a name for your service (e.g., "positionkit")
   - **Environment**: Select "Node"
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

3. **Add Environment Variables**

   In the "Environment" section of your web service settings, add the following variables:

   ```
   OPENAI_API_KEY=your_openai_api_key
   SENDGRID_API_KEY=your_sendgrid_api_key
   NODE_ENV=production
   ```

4. **Deploy the Service**

   Click "Create Web Service" and Render will start the deployment process.

## Important Security Notes

1. **Never commit API keys or secrets to your repository**
   - The .env file is included in .gitignore to prevent accidental commits
   - Always use environment variables for secrets in production

2. **API Keys are only used server-side**
   - OpenAI and SendGrid API keys are never exposed to the frontend
   - All API requests are proxied through the backend server

3. **Environment variable best practices**
   - Frontend variables must be prefixed with `VITE_` to be accessible
   - Only use `VITE_` prefix for non-sensitive information

## Troubleshooting

If you encounter issues with your deployment:

1. **API key issues**: Verify that your API keys are correctly set in the environment variables
2. **Build failures**: Check the build logs for any errors
3. **Runtime errors**: Inspect the application logs in the Render dashboard

For more support, refer to Render's documentation: https://render.com/docs