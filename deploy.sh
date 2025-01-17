#!/bin/bash

# Load environment variables from .env.local
source .env.local

# Build your static website
npm run export

# Sync the local files with the GCS bucket based on the environment
gsutil -m rsync -r -d out/ $GSUTIL_URI/$GCS_BUCKET_PATH
