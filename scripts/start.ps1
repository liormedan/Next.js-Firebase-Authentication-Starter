# Firebase Auth Starter - Startup Script
# This script automates the setup and startup of the entire application

param(
    [switch]$SkipInstall,
    [switch]$SkipEnv,
    [switch]$Help
)

$ErrorActionPreference = "Stop"

# Colors for output
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

function Write-Success {
    param([string]$Message)
    Write-ColorOutput "[OK] $Message" "Green"
}

function Write-Info {
    param([string]$Message)
    Write-ColorOutput "[INFO] $Message" "Cyan"
}

function Write-Warning {
    param([string]$Message)
    Write-ColorOutput "[WARN] $Message" "Yellow"
}

function Write-Error {
    param([string]$Message)
    Write-ColorOutput "[ERROR] $Message" "Red"
}

function Show-Help {
    $helpText = @"
Firebase Auth Starter - Startup Script

Usage:
    .\start.ps1 [options]

Options:
    -SkipInstall    Skip dependency installation
    -SkipEnv        Skip environment setup
    -Help           Show this help message

Examples:
    .\start.ps1                    # Full setup and start
    .\start.ps1 -SkipInstall      # Skip npm install
    .\start.ps1 -SkipEnv          # Skip environment setup
"@
    Write-ColorOutput $helpText "Cyan"
}

if ($Help) {
    Show-Help
    exit 0
}

# Banner
$banner = @"

╔═══════════════════════════════════════════════════════════╗
║         Firebase Auth Starter - Startup Script            ║
╚═══════════════════════════════════════════════════════════╝

"@
Write-ColorOutput $banner "Cyan"

# Check if Node.js is installed
Write-Info "Checking prerequisites..."
try {
    $nodeVersion = node --version
    Write-Success "Node.js found: $nodeVersion"
} catch {
    Write-Error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
}

# Check Node.js version
$nodeMajorVersion = [int](node --version).Substring(1).Split('.')[0]
if ($nodeMajorVersion -lt 18) {
    Write-Error "Node.js version 18 or higher is required. Current version: $nodeVersion"
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Success "npm found: $npmVersion"
} catch {
    Write-Error "npm is not installed."
    exit 1
}

# Check if root package.json exists
if (-not (Test-Path "package.json")) {
    Write-Error "package.json not found. Are you in the project root directory?"
    exit 1
}

# Step 1: Install dependencies
if (-not $SkipInstall) {
    Write-Info "Step 1: Installing dependencies..."
    Write-Info "This may take a few minutes..."
    
    try {
        # Install root dependencies
        Write-Info "Installing root dependencies..."
        npm install
        
        # Install frontend dependencies
        Write-Info "Installing frontend dependencies..."
        Push-Location frontend
        npm install
        Pop-Location
        
        # Install backend dependencies
        Write-Info "Installing backend dependencies..."
        Push-Location backend
        npm install
        Pop-Location
        
        Write-Success "All dependencies installed successfully!"
    } catch {
        Write-Error "Failed to install dependencies: $_"
        exit 1
    }
} else {
    Write-Warning "Skipping dependency installation..."
}

# Step 2: Environment setup
if (-not $SkipEnv) {
    Write-Info "Step 2: Setting up environment variables..."
    
    $envLocalExists = Test-Path ".env.local"
    $firebaseSecretsExists = Test-Path "config\firebase_secrets.json"
    
    if (-not $envLocalExists -and -not $firebaseSecretsExists) {
        Write-Warning ".env.local or firebase_secrets.json not found!"
        Write-Info "Creating .env.local from template..."
        
        if (Test-Path ".env.local.example") {
            Copy-Item ".env.local.example" ".env.local"
            Write-Success ".env.local created from template"
            Write-Warning "[IMPORTANT] Please edit .env.local and add your Firebase credentials!"
            Write-Info "Press any key to continue after editing .env.local..."
            $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        } else {
            Write-Error ".env.local.example not found. Cannot create .env.local"
            exit 1
        }
    }
    
    # Run setup script
    try {
        Write-Info "Running environment setup script..."
        npm run setup:env
        Write-Success "Environment variables configured!"
    } catch {
        Write-Warning "Environment setup script failed. You may need to configure .env files manually."
    }
} else {
    Write-Warning "Skipping environment setup..."
}

# Step 3: Verify environment files
Write-Info "Step 3: Verifying environment configuration..."

$frontendEnvExists = Test-Path "frontend\.env"
$backendEnvExists = Test-Path "backend\.env"

if (-not $frontendEnvExists) {
    Write-Warning "frontend/.env not found. Frontend may not work correctly."
}

if (-not $backendEnvExists) {
    Write-Warning "backend/.env not found. Backend may not work correctly."
}

if ($frontendEnvExists -and $backendEnvExists) {
    Write-Success "Environment files verified!"
}

# Step 4: Start the application
Write-Info "Step 4: Starting application..."
$startMessage = @"

Starting both frontend and backend...
Frontend will be available at: http://localhost:3000
Backend will be available at: http://localhost:5000

Press Ctrl+C to stop both servers.

"@
Write-ColorOutput $startMessage "Cyan"

try {
    # Start both frontend and backend
    npm run dev
} catch {
    Write-Error "Failed to start application: $_"
    Write-Info "You can try starting manually:"
    Write-Info "  Frontend: cd frontend && npm run dev"
    Write-Info "  Backend:  cd backend && npm run dev"
    exit 1
}

