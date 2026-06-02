@echo off
setlocal enabledelayedexpansion

cd /d c:\webhoctoan\website-mathlearning4

echo.
echo ========================================
echo Prisma Setup Script
echo ========================================
echo.

echo Step 1: Cleaning up old packages...
if exist node_modules (
    rmdir /s /q node_modules
    echo ✓ Removed node_modules
) else (
    echo ✓ node_modules already clean
)

if exist package-lock.json (
    del package-lock.json
    echo ✓ Removed package-lock.json
)

echo.
echo Step 2: Installing packages (this may take 2-3 minutes)...
call npm install
if %errorlevel% neq 0 (
    echo ✗ ERROR: npm install failed
    pause
    exit /b 1
)
echo ✓ Packages installed successfully

echo.
echo Step 3: Generating Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ✗ ERROR: prisma generate failed
    pause
    exit /b 1
)
echo ✓ Prisma Client generated

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo IMPORTANT: Update .env.local with your database credentials
echo.
echo From Supabase Dashboard:
echo 1. Go to Settings ^> Database
echo 2. Copy your connection string
echo 3. Update DATABASE_URL and DIRECT_URL in .env.local
echo.
echo Then run:
echo   npm run db:migrate
echo.
pause
