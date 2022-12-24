@echo off
echo Are you sure you want to clear the iutputs? If you want, press any key to clear. Otherwise, close this windows.
pause > nul
del /f /s /q /a input\*.*
echo Completed! Press any key to exit.
pause > nul