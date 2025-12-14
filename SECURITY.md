# Security Policy

## Supported Versions

We actively support the latest version of this starter template.

## Security Best Practices

### Environment Variables

**NEVER commit sensitive information to the repository!**

The following files are automatically ignored by `.gitignore`:
- `.env.local`
- `.env.development.local`
- `.env.test.local`
- `.env.production.local`
- `firebase_secrets.json`
- `firebase-adminsdk-*.json`
- `serviceAccountKey.json`

### Firebase Configuration

1. **API Keys**: Firebase API keys are safe to expose client-side (they're public by design)
2. **Service Account Keys**: NEVER commit service account keys or admin SDK credentials
3. **Environment Variables**: Always use `.env.local` for local development (already in `.gitignore`)

### Before Committing

Always verify that:
- ✅ No `.env.local` files are tracked
- ✅ No Firebase service account keys are included
- ✅ No API keys with write permissions are exposed
- ✅ No passwords or tokens are hardcoded

### Reporting Security Issues

If you discover a security vulnerability, please report it responsibly:
1. Do NOT open a public issue
2. Contact the repository maintainer privately
3. Provide details about the vulnerability

## Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] No secrets in committed files
- [ ] Firebase Security Rules are configured
- [ ] Storage Security Rules are configured
- [ ] User input is validated
- [ ] Authentication is required for protected routes

