# Troubleshooting Guide

## Common Issues and Solutions

### ❌ Error: `auth/invalid-api-key` / White Page

**Problem:** Firebase API key is invalid or not loaded.

**Solutions:**

1. **Check environment variables:**
   ```powershell
   # Verify frontend/.env exists and has values
   Get-Content frontend\.env
   ```

2. **Re-sync environment variables:**
   ```powershell
   npm run setup:env
   ```

3. **Restart the dev server:**
   - Stop the current server (Ctrl+C)
   - Restart: `npm run dev`
   - **Important:** Vite requires a restart to load new .env files

4. **Verify .env.local has correct values:**
   - Check that `.env.local` in root has all `VITE_FIREBASE_*` variables
   - Values should NOT contain `your_` or `here` placeholders

5. **Manual fix - Create frontend/.env directly:**
   ```powershell
   # Copy from firebase_secrets.json or .env.local
   # Make sure all VITE_FIREBASE_* variables are set
   ```

### 🔄 Environment Variables Not Loading

**Problem:** Changes to .env files not reflected in the app.

**Solution:**
- Vite only loads .env files on startup
- **Always restart the dev server after changing .env files**
- Check browser console for environment variable values

### 🚫 Backend Not Starting

**Problem:** Firebase Admin SDK errors.

**Solutions:**

1. **Check service account file:**
   ```powershell
   Test-Path backend\config\serviceAccountKey.json
   ```

2. **Verify backend/.env:**
   ```powershell
   Get-Content backend\.env
   ```

3. **Re-run setup:**
   ```powershell
   npm run setup:env
   ```

### 📝 Quick Fixes

**Reset everything:**
```powershell
# 1. Delete existing .env files
Remove-Item frontend\.env -ErrorAction SilentlyContinue
Remove-Item backend\.env -ErrorAction SilentlyContinue

# 2. Re-sync from .env.local
npm run setup:env

# 3. Restart servers
npm run dev
```

**Check Firebase config in browser console:**
- Open browser DevTools (F12)
- Check Console for Firebase initialization messages
- Look for any error messages about missing variables

### 🔍 Debugging Steps

1. **Verify files exist:**
   ```powershell
   Test-Path .env.local
   Test-Path frontend\.env
   Test-Path backend\.env
   ```

2. **Check environment variable values:**
   ```powershell
   Get-Content frontend\.env | Select-String "VITE_FIREBASE_API_KEY"
   ```

3. **Verify no placeholder values:**
   - Make sure values don't contain `your_`, `here`, or similar placeholders
   - All values should be actual Firebase credentials

4. **Check browser console:**
   - Open DevTools (F12)
   - Look for Firebase initialization errors
   - Check Network tab for failed requests

### 💡 Prevention

- Always use `.env.local` in root (not committed to git)
- Run `npm run setup:env` after changing `.env.local`
- Restart dev server after environment changes
- Keep `firebase_secrets.json` in root for easy setup

