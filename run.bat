@echo off
echo ===========================================
echo Starting SellSathi Platform...
echo ===========================================

echo.
echo [1/3] Installing Backend Dependencies (if missing)...
cd backend
call npm install
cd ..

echo.
echo [2/3] Starting Backend Server (Port 5000)...
start "SellSathi Backend" cmd /k "cd backend && npm start"

echo.
echo [3/3] Starting Frontend Dev Server (Port 5173)...
start "SellSathi Frontend" cmd /k "npm run dev"

echo.
echo All services started! 
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5000
echo.
pause
