@echo off
setlocal enabledelayedexpansion

cd /d c:\webhoctoan\website-mathlearning4

echo.
echo ========================================
echo Prisma Setup - No Init Needed
echo ========================================
echo.

echo Step 1: Installing packages...
call npm install
if %errorlevel% neq 0 (
    echo ✗ ERROR: npm install failed
    pause
    exit /b 1
)
echo ✓ Packages installed

echo.
echo Step 2: Generating Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ✗ ERROR: prisma generate failed
    pause
    exit /b 1
)
echo ✓ Prisma Client generated

echo.
echo ========================================
echo SUCCESS!
echo ========================================
echo.
echo Next: Update .env.local with Supabase credentials
echo Then run: npm run db:migrate
echo.
pause
