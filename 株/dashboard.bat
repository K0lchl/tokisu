@echo off
cd /d "%~dp0"
echo Starting Dashboard...
start http://127.0.0.1:5000
..\.venv\Scripts\python.exe dashboard.py
pause
