#!/bin/bash

# Build script for Firefox extension
echo "Building QuickConfigS for Firefox..."

# Create temporary directory
BUILD_DIR="firefox-build"
rm -rf "$BUILD_DIR"
mkdir "$BUILD_DIR"

# Copy necessary files
cp -r images/ "$BUILD_DIR/"
cp -r js/ "$BUILD_DIR/"
cp index.html "$BUILD_DIR/"

# Use Firefox manifest
cp manifest-firefox.json "$BUILD_DIR/manifest.json"

# Create ZIP file
ZIP_NAME="firefox.zip"
rm -f "$ZIP_NAME"

cd "$BUILD_DIR"
zip -r "../$ZIP_NAME" ./*
cd ..

# Cleanup
rm -rf "$BUILD_DIR"

echo "Firefox extension built: $ZIP_NAME"
echo ""
echo "To install in Firefox:"
echo "1. Open about:debugging in Firefox"
echo "2. Click 'This Firefox'"
echo "3. Click 'Load Temporary Add-on'"
echo "4. Select the manifest.json from the extracted ZIP"
echo ""
echo "For permanent installation, submit the ZIP to Mozilla for signing."
