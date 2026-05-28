@echo off
echo ===== Fixing Next.js Build Issues =====
echo.

echo Step 1: Removing .next cache directory...
if exist .next rmdir /s /q .next
echo ✓ Cache cleared

echo.
echo Step 2: Removing node_modules and reinstalling...
if exist node_modules rmdir /s /q node_modules
echo Reinstalling dependencies...
call npm install
echo ✓ Dependencies reinstalled

echo.
echo Step 3: Running build...
call npm run build

if %errorlevel% == 0 (
    echo.
    echo ✓ Build successful!
    echo.
    echo You can now deploy to Vercel.
) else (
    echo.
    echo ✗ Build failed. Check the errors above.
)

pause
