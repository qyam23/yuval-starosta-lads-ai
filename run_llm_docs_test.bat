@echo off
setlocal

REM Run from the repository root
cd /d "%~dp0"

REM If the existing local site launcher exists, start it in a separate window.
REM This keeps the known project workflow intact without inventing a new one.
if exist "run-local.bat" (
  echo Starting local website using existing run-local.bat...
  start "Local Site" "%~dp0run-local.bat"
) else (
  echo No existing local site launcher found. Skipping website startup.
)

REM Prefer Python from PATH, then fall back to the Windows py launcher.
where python >nul 2>nul
if not errorlevel 1 (
  echo Running machine-readable docs scan with python...
  python tools\llm_scan_test.py
  goto :done
)

where py >nul 2>nul
if not errorlevel 1 (
  echo Running machine-readable docs scan with py...
  py -3 tools\llm_scan_test.py
  goto :done
)

echo Python was not found in PATH.
echo Please install Python or add it to PATH, then rerun this file.
exit /b 1

:done
echo.
echo Scan finished. Review the summary above.
pause
