@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

cd /d c:\webhoctoan\website-mathlearning4

echo.
echo ========================================
echo RUNNING ALL PRISMA SETUP COMMANDS
echo ========================================
echo.

echo [1/3] npm install dotenv
npm install dotenv
if %errorlevel% neq 0 (
    echo ERROR: npm install dotenv failed with code %errorlevel%
    pause
    exit /b 1
)
echo ✓ Success: dotenv installed
echo.

echo [2/3] npx prisma generate
npx prisma generate
if %errorlevel% neq 0 (
    echo ERROR: prisma generate failed with code %errorlevel%
    pause
    exit /b 1
)
echo ✓ Success: Prisma Client generated
echo.

echo [3/3] npx prisma migrate dev --name init
npx prisma migrate dev --name init
if %errorlevel% neq 0 (
    echo ERROR: prisma migrate failed with code %errorlevel%
    pause
    exit /b 1
)
echo ✓ Success: Database migration complete
echo.

echo ========================================
echo ALL COMMANDS COMPLETED SUCCESSFULLY!
echo ========================================
echo.
echo Next step: npm run dev
echo.
timeout /t 5
