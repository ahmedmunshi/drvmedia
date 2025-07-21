#!/bin/bash

echo "🔧 Setting up environment variables for lateoptics portfolio..."
echo ""

# Check if .env already exists
if [ -f .env ]; then
    echo "⚠️  .env file already exists. Creating backup..."
    cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
fi

# Copy example to .env
cp .env.example .env

echo "📋 .env file created from .env.example"
echo ""
echo "🔑 Please update the following values in your .env file:"
echo ""
echo "1. CLOUDINARY_API_KEY - Get this from your Cloudinary dashboard"
echo "2. CLOUDINARY_API_SECRET - Get this from your Cloudinary dashboard"
echo "3. CONTACT_EMAIL - Your contact email address"
echo "4. Other optional values as needed"
echo ""
echo "📍 To get your Cloudinary credentials:"
echo "   1. Go to https://cloudinary.com/console"
echo "   2. Sign in to your account (dqrj6xsjs)"
echo "   3. Copy API Key and API Secret from the dashboard"
echo ""
echo "✅ Don't forget to restart your dev server after updating .env!"
echo ""
echo "🚀 Run: npm run dev"
