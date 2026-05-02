@echo off
cd /d "%~dp0"
call ..\.venv\Scripts\activate
echo Starting Day Trade Notification System...
echo Please keep this window open.
python main.py
pause
