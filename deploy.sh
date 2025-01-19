#!/bin/bash

# Load environment variables from .env.local
source .env.local

# Build your static website
npm run export

# Sync the local files with the GCS bucket based on the environment
gsutil -m rsync -r -d out/ gs://$GCS_BUCKET_NAME/$GCS_BUCKET_PATH
gsutil -m setmeta -h "Cache-Control:public, max-age=600" gs://$GCS_BUCKET_NAME/$GCS_BUCKET_PATH/index.html
