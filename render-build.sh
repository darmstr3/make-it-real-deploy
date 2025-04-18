#!/bin/bash

# This script is used by Render to build the application

echo "🔍 Starting custom build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Fix the client/index.html issue by creating a symbolic link if needed
echo "🔧 Ensuring proper file structure..."
if [ ! -f "./client/index.html" ]; then
  echo "Creating symbolic link for index.html if it doesn't exist..."
  # This is just a fallback in case the file structure is different on Render
  cp -f ./client/index.html ./ 2>/dev/null || true
fi

# Build the frontend and backend
echo "🔨 Building frontend with Vite..."
npx vite build

echo "🔨 Building backend with esbuild..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "🎉 Custom build process completed."