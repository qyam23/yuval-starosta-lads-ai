@echo off
setlocal

cd /d "%~dp0"

set "APP_URL=http://localhost:3000"
set "CHECK_CMD=powershell -NoProfile -ExecutionPolicy Bypass -Command"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed or not available in PATH.
  echo Please install Node.js and try again.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm is not installed or not available in PATH.
  echo Please install Node.js and try again.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo Failed to install dependencies.
    pause
    exit /b 1
  )
)

%CHECK_CMD% "try { $response = Invoke-WebRequest -Uri '%APP_URL%' -UseBasicParsing -TimeoutSec 3; if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) { exit 0 } else { exit 1 } } catch { exit 1 }"
if not errorlevel 1 (
  echo A local server is already running.
  echo Opening %APP_URL% ...
  start "" "%APP_URL%"
  pause
  exit /b 0
)

echo Starting local development server in a new window...
start "AI2 Review Renew - Local Server" cmd /k "cd /d ""%~dp0"" && npm run dev"

echo Waiting for the local site to become available...
%CHECK_CMD% ^
  "$deadline = (Get-Date).AddSeconds(45);" ^
  "while ((Get-Date) -lt $deadline) {" ^
  "  try {" ^
  "    $response = Invoke-WebRequest -Uri '%APP_URL%' -UseBasicParsing -TimeoutSec 3;" ^
  "    if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) { exit 0 }" ^
  "  } catch {}" ^
  "  Start-Sleep -Milliseconds 750" ^
  "}" ^
  "exit 1"

if errorlevel 1 (
  echo The server did not respond in time.
  echo You can still wait for it to finish loading and open %APP_URL% manually.
  pause
  exit /b 1
)

echo Opening %APP_URL% ...
start "" "%APP_URL%"

echo Local server is running. Keep the server window open while you work.
pause
