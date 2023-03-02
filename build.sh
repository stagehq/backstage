#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "test" || "$VERCEL_GIT_COMMIT_REF" == "main"  ]] ; then
  # Proceed with the build
    echo "✅ - Build can proceed, VERCEL_GIT_COMMIT_REF is 'test' or 'main'"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled, VERCEL_GIT_COMMIT_REF is not 'test' or 'main'"
  exit 0;
fi