#!/bin/bash

# Exit on error
set -e

echo "Starting deployment process..."

echo "\nBuilding frontend..."
cd client
npm install
npm run build
cd ..

echo "\nBuilding backend..."
cd server
npm install
npm run build
cd ..

echo "\nDeploying frontend to Vercel..."
vercel --prod

echo "\nDeploying backend to Heroku..."
heroku create neonprompt-backend
git subtree push --prefix server heroku master

# Set up environment variables in Heroku
heroku config:set PORT=5000
heroku config:set NODE_ENV=production
heroku config:set CLIENT_URL=$(vercel url)
heroku config:set MONGODB_URI=$MONGODB_URI
heroku config:set JWT_SECRET=$JWT_SECRET
heroku config:set JWT_EXPIRES_IN=24h

# Set up environment variables in Vercel
vercel env add REACT_APP_GOOGLE_CLIENT_ID production
vercel env add REACT_APP_GOOGLE_REDIRECT_URI production
vercel env add REACT_APP_GITHUB_CLIENT_ID production
vercel env add REACT_APP_GITHUB_REDIRECT_URI production
vercel env add REACT_APP_FIREBASE_API_KEY production
vercel env add REACT_APP_FIREBASE_AUTH_DOMAIN production
vercel env add REACT_APP_FIREBASE_PROJECT_ID production
vercel env add REACT_APP_FIREBASE_STORAGE_BUCKET production
vercel env add REACT_APP_FIREBASE_MESSAGING_SENDER_ID production
vercel env add REACT_APP_FIREBASE_APP_ID production

# Deploy to Heroku
heroku ps:scale web=1
heroku open

echo "\nDeployment complete!"
