@echo off
setlocal enabledelayedexpansion

cd /d c:\webhoctoan\website-mathlearning4

echo.
echo ========================================
echo Step 1: Installing packages...
echo ========================================
call npm install

if %errorlevel% neq 0 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo Step 2: Initialize Prisma...
echo ========================================
call npx prisma init

if %errorlevel% neq 0 (
    echo ERROR: prisma init failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS! Prisma initialized successfully
echo ========================================
echo.
echo Next steps:
echo 1. Update .env.local with DATABASE_URL and DIRECT_URL
echo 2. Run: npx prisma migrate dev --name init
echo.
pause
