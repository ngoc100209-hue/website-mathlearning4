@echo off
setlocal enabledelayedexpansion

cd /d c:\webhoctoan\website-mathlearning4

echo.
echo ========================================
echo Prisma Setup Complete!
echo ========================================
echo.
echo Next steps:
echo.
echo 1. Clean node_modules and reinstall:
echo    npm install
echo.
echo 2. Update .env.local with your Supabase credentials:
echo    DATABASE_URL="postgresql://..."
echo    DIRECT_URL="postgresql://..."
echo.
echo 3. Run migrations:
echo    npm run db:migrate
echo.
echo 4. Start development server:
echo    npm run dev
echo.
echo ========================================
echo.
pause
