@echo off
echo Are you sure you want to clear the output of the results? If you want, press any key to clear. Otherwise, close this windows.
pause > nul
del /f /s /q /a output\*.*
echo Completed! Press any key to exit.
pause > nul