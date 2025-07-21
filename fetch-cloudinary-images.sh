#!/bin/bash

# Cloudinary API script to fetch uploaded images
CLOUD_NAME="dqrj6xsjs"
API_KEY="699615797954432"
API_SECRET="EICC6wpX9H8ElJfXqJmUfSsiPjI"

echo "Fetching images from Cloudinary..."

# Fetch all resources from the portfolio folder
curl -u "$API_KEY:$API_SECRET" \
  "https://api.cloudinary.com/v1_1/$CLOUD_NAME/resources/image?prefix=portfolio&max_results=500" \
  | jq '.resources[] | {public_id: .public_id, filename: (.public_id | split("/")[1])}'
