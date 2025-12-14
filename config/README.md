# Configuration Files

This directory contains configuration templates and example files.

## Files

- **`firebase_secrets.json.example`** - Example Firebase configuration (if exists)
  - Copy this to `firebase_secrets.json` and fill in your credentials
  - This file is in `.gitignore` and won't be committed

## Security

⚠️ **Never commit actual secrets to git!**
- All secret files are in `.gitignore`
- Only `.example` files should be in git
- Keep your actual `firebase_secrets.json` local only

## Usage

If you have a `firebase_secrets.json` file:
1. Place it in this `config/` directory
2. Run `npm run setup:env` from the root
3. The script will automatically detect and use it

