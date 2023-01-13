@echo off
cls
echo Make sure you paste proxy_script.js into your console, then press enter
pause
start cmd /k "ts-node ../../src/Proxy/Proxy.ts"
exit