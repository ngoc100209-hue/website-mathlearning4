@echo off
REM Script cài đặt Prisma và tạo database

echo ========================================
echo Setup Database with Prisma
echo ========================================
echo.

echo Step 1: Installing Prisma...
npm install @prisma/client prisma

echo.
echo Step 2: Creating database and running migrations...
npx prisma migrate dev --name init

echo.
echo Step 3: Generating Prisma Client...
npx prisma generate

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Update .env.local with your Supabase DATABASE_URL and DIRECT_URL
echo 2. Run: npm run dev
echo.
pause
