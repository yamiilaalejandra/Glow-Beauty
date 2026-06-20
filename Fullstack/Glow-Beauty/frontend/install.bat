@echo off
cd /d c:\Users\Yamila\Desktop\glow-beauty
echo Eliminando node_modules...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
echo Reinstalando dependencias...
npm install
echo Listo! Ahora ejecuta: npm run dev
pause
