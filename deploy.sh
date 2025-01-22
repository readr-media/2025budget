#!/bin/bash

# Load environment variables from .env.local
source .env.local

# Build your static website
npm run export

# Sync the local files with the GCS bucket based on the environment
gsutil -m rsync -r out/ gs://$NEXT_PUBLIC_GCS_BUCKET_NAME/$NEXT_PUBLIC_GCS_BUCKET_PATH

