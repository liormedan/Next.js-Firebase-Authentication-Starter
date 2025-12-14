// Helper script to check environment variables
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');

console.log('🔍 Checking Firebase Configuration...\n');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found!');
  console.log('\n📝 Create .env.local file in the root directory with:');
  console.log(`
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
  `);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));

const requiredVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

const foundVars = {};
lines.forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    foundVars[key.trim()] = valueParts.join('=').trim();
  }
});

console.log('📋 Found variables:\n');
let allValid = true;

requiredVars.forEach(varName => {
  const value = foundVars[varName];
  const isValid = value && 
                  !value.includes('your_') && 
                  value !== '' && 
                  !value.includes('your_api_key_here');
  
  const status = isValid ? '✅' : '❌';
  const displayValue = value ? (value.length > 50 ? value.substring(0, 50) + '...' : value) : '(missing)';
  
  console.log(`${status} ${varName}`);
  console.log(`   Value: ${displayValue}`);
  
  if (!isValid) {
    allValid = false;
  }
  console.log('');
});

if (allValid) {
  console.log('✅ All Firebase environment variables are configured correctly!');
  console.log('💡 Make sure to restart your dev server: npm run dev');
} else {
  console.log('❌ Some variables are missing or contain placeholder values.');
  console.log('💡 Update .env.local with your actual Firebase values from:');
  console.log('   https://console.firebase.google.com/');
  console.log('💡 Then restart: npm run dev');
  process.exit(1);
}

