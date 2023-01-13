@echo off
cls
echo [101;93m V1.0.0 UP TO DATE! [0m
echo.
echo [34m[0m


::: ________          _____.__         __________        __   
::: \______ \   _____/ ____\  | ___.__.\______   \ _____/  |_ 
:::  |    |  \_/ __ \   __\|  |<   |  | |    |  _//  _ \   __\
:::  |    `   \  ___/|  |  |  |_\___  | |    |   (  <_> )  |  
::: /_______  /\___  >__|  |____/ ____| |______  /\____/|__|  
:::         \/     \/           \/             \/             
for /f "delims=: tokens=*" %%A in ('findstr /b ::: "%~f0"') do @echo [34m(%%A[0m

echo [0m[0m


if not exist "node_modules" (
    goto install_node
)

if not exist ".env" (
    goto setup_config
)

echo.
echo.
echo [36m(1) Proxy Server[0m
echo [36m(2) 1v1 Coin Farm[0m

set /p choice=[33m(Enter Choice): [0m
if %choice%==1 (
    start cmd /k "cd scripts/internal/ && proxy.bat"
)
if %choice%==2 (
    echo "Running 1v1 Coin Farm"
    start cmd /k "cd scripts/internal/ && 1v1.bat"
)

exit 

:install_node
    echo [31mPackages not installed![0m
    echo [34mPlease Wait...[0m
    timeout /t 2 /nobreak >nul
    cd scripts
    call install.bat
    cls

:setup_config
    echo [31mConfig not setup![0m
    echo [35mConfiguring Config based on your inputs. Values can be always changed by deleting .env file and running this, or editing the .env file directly.[0m
    echo.
    echo.

    set /p username=[32m(Enter Username): [0m
    echo DEFLY_USERNAME=%username% >> .env
    
    set /p main_account=[32m(Enter Main Account): [0m
    echo MAIN_ACCOUNT=%main_account% >> .env
    
    set /p alt_account=[32m(Enter Alt Account): [0m
    echo ALT_ACCOUNT=%alt_account% >> .env

    rem "Main account token"
    set /p main_token=[32m(Enter Main Account Token): [0m
    echo TOKEN=%main_token% >> .env

    echo [34mConfig configured. Exiting in 5 seconds[0m
    timeout /t 5 /nobreak >nul