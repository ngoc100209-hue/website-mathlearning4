@echo off
cd /d c:\webhoctoan\website-mathlearning4
echo Installing @prisma/client...
call npm install @prisma/client
echo.
echo Installing prisma as devDependency...
call npm install -D prisma
echo.
echo Installation complete!
pause
