#!/bin/bash

# Windows 12 Concept UI - "Compile" and Upload Script

# 1. Package the UI
echo "Packaging UI..."
zip -r win12-concept.zip index.html style.css main.js

# 2. Find a Gofile server
echo "Fetching Gofile server..."
SERVER=$(curl -s https://api.gofile.io/servers | jq -r '.data.servers[0].name')

if [ -z "$SERVER" ] || [ "$SERVER" == "null" ]; then
    echo "Error: Could not fetch Gofile server."
    exit 1
fi

echo "Uploading to server: $SERVER"

# 3. Upload the file
RESPONSE=$(curl -s -F "file=@win12-concept.zip" https://${SERVER}.gofile.io/contents/uploadfile)

# 4. Extract and display the link
DOWNLOAD_LINK=$(echo $RESPONSE | jq -r '.data.downloadPage')

if [ -z "$DOWNLOAD_LINK" ] || [ "$DOWNLOAD_LINK" == "null" ]; then
    echo "Error: Upload failed."
    echo "Response: $RESPONSE"
    exit 1
fi

echo "----------------------------------------"
echo "Upload Successful!"
echo "Download Link: $DOWNLOAD_LINK"
echo "----------------------------------------"
