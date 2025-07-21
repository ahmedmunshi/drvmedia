#!/bin/bash

# Cloudinary upload script
# You need to set your API credentials here
CLOUD_NAME="dqrj6xsjs"
API_KEY="699615797954432"
API_SECRET="EICC6wpX9H8ElJfXqJmUfSsiPjI"

# Directory containing images
IMAGE_DIR="public/images/automotive"

# Upload each image
for image in "$IMAGE_DIR"/*.jpg "$IMAGE_DIR"/*.JPG; do
    if [[ -f "$image" ]]; then
        filename=$(basename "$image")
        # Remove extension for public_id
        public_id="${filename%.*}"
        
        echo "Uploading $filename as portfolio/$public_id..."
        
        curl -X POST \
          "https://api.cloudinary.com/v1_1/$CLOUD_NAME/image/upload" \
          -F "file=@$image" \
          -F "public_id=portfolio/$public_id" \
          -F "api_key=$API_KEY" \
          -F "api_secret=$API_SECRET" \
          -F "overwrite=true" \
          -F "use_filename=true" \
          -F "unique_filename=false"
        
        echo -e "\n---\n"
    fi
done

echo "Upload complete!"
