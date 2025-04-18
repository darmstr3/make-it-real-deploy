#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const clientPath = path.join(__dirname, 'client');
const distPath = path.join(__dirname, 'dist');
const publicPath = path.join(distPath, 'public');

console.log('🔍 Starting build process...');

try {
  // Create dist directory if it doesn't exist
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
    console.log('✅ Created dist directory');
  }

  // Create public directory if it doesn't exist
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath);
    console.log('✅ Created public directory');
  }

  // Build frontend (Vite)
  console.log('🔨 Building frontend with Vite...');
  execSync('vite build', { 
    stdio: 'inherit',
    cwd: __dirname
  });
  console.log('✅ Frontend build complete');

  // Build backend (esbuild)
  console.log('🔨 Building backend with esbuild...');
  execSync(
    'esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist',
    {
      stdio: 'inherit',
      cwd: __dirname
    }
  );
  console.log('✅ Backend build complete');

  console.log('🎉 Build process completed successfully');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}