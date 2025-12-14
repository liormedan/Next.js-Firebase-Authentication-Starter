# Firebase Setup Guide

## 🔴 Error: CONFIGURATION_NOT_FOUND (400)

If you're seeing this error, it means Firebase Authentication is not properly configured in your Firebase project.

### Solution Steps:

1. **Go to Firebase Console:**
   - Visit: https://console.firebase.google.com/
   - Select your project: `fir-starter-auth-5ae6b`

2. **Enable Authentication:**
   - Click on "Authentication" in the left sidebar
   - Click "Get started" if you haven't enabled it yet
   - Go to "Sign-in method" tab

3. **Enable Sign-in Providers:**
   
   **Email/Password:**
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

   **Google:**
   - Click on "Google"
   - Toggle "Enable" to ON
   - Add your project support email
   - Click "Save"

   **GitHub:**
   - Click on "GitHub"
   - Toggle "Enable" to ON
   - You'll need to:
     - Create a GitHub OAuth App: https://github.com/settings/developers
     - Add Client ID and Client Secret
   - Click "Save"

4. **Verify API Restrictions (if needed):**
   - Go to Google Cloud Console
   - Navigate to "APIs & Services" > "Credentials"
   - Find your API key
   - Make sure "Application restrictions" allows your domain
   - Or set to "None" for development

5. **Check Authorized Domains:**
   - In Firebase Console > Authentication > Settings
   - Under "Authorized domains"
   - Make sure `localhost` is listed (should be by default)

6. **Restart Your App:**
   ```powershell
   # Stop the server (Ctrl+C)
   npm run dev
   ```

### Quick Checklist:

- ✅ Authentication enabled in Firebase Console
- ✅ Email/Password sign-in method enabled
- ✅ Google sign-in enabled (if using)
- ✅ GitHub sign-in enabled (if using)
- ✅ API key restrictions allow localhost
- ✅ Authorized domains include localhost

### Testing:

After enabling authentication, try:
1. Refresh your browser
2. The error should disappear
3. You should be able to see the login form
4. Try creating an account

### Still Having Issues?

1. **Check Browser Console:**
   - Open DevTools (F12)
   - Look for specific error messages
   - Check Network tab for failed requests

2. **Verify Firebase Config:**
   ```powershell
   Get-Content frontend\.env
   ```
   Make sure all values are correct (not placeholders)

3. **Check Firebase Project:**
   - Verify you're using the correct project
   - Check that the project is active (not deleted/suspended)

4. **API Key Restrictions:**
   - If your API key has restrictions, temporarily remove them for testing
   - Or add `localhost` and your domain to allowed referrers

