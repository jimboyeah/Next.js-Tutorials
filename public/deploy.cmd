@echo off
setlocal enabledelayedexpansion
cls

set TARGET=C:\coding\md-code\nextjs-blog\
set LINK=C:\coding\md-code\nextjs-blog\.next\server\pages\
if not exist %LINK% (
    mkdir %LINK%
)
cd %TARGET%public

mklink /D %LINK%_next ..\..\..\.next
for %%G in (*.*) do (
    rem echo %LINK%%%G === %%G
    rem 屏蔽 mklink 的输出
    rem mklink %LINK%%%G ..\..\..\public\%%G > nul 2>&1 
    mklink /H %LINK%%%G %TARGET%public\%%G 
)
endlocal

rem set n_dir=0
rem set n_count=0
rem     REM 每 1000 个提示一下
rem     set /A n_count += 1
rem     set /A r = !n_count! %% 1000
rem     if !r! EQU 0 (
rem         echo !n_count!
rem     )
rem )
rem set /A n_dir += 1
