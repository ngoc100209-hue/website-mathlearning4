@echo off
cd /d c:\webhoctoan\website-mathlearning4

echo Installing pg...
npm install pg

echo Installing @prisma/adapter-pg...
npm install @prisma/adapter-pg

echo Installing @types/pg...
npm install -D @types/pg

echo.
echo All packages installed successfully!
pause
