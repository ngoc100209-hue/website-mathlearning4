@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

cd /d c:\webhoctoan\website-mathlearning4

echo.
echo ========================================
echo Running Prisma Setup Commands
echo ========================================
echo.

echo [1/3] Running: npm install dotenv
call npm install dotenv
if %errorlevel% neq 0 (
    echo ✗ ERROR: npm install dotenv failed
    pause
    exit /b 1
)
echo ✓ dotenv installed
echo.

echo [2/3] Running: npx prisma generate
call npx prisma generate
if %errorlevel% neq 0 (
    echo ✗ ERROR: prisma generate failed
    pause
    exit /b 1
)
echo ✓ Prisma Client generated
echo.

echo [3/3] Running: npx prisma migrate dev --name init
echo.
echo IMPORTANT: You will be asked to create a database.
echo Make sure .env.local has correct DATABASE_URL and DIRECT_URL
echo.
call npx prisma migrate dev --name init
if %errorlevel% neq 0 (
    echo ✗ ERROR: prisma migrate failed
    pause
    exit /b 1
)
echo ✓ Database migration complete
echo.

echo ========================================
echo SUCCESS! All commands executed
echo ========================================
echo.
echo You can now run: npm run dev
echo.
pause
