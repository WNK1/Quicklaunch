@echo off
chcp 65001 >nul
echo.
echo  ╔══════════════════════════════════╗
echo  ║        CSDROP — Запуск           ║
echo  ╚══════════════════════════════════╝
echo.

:: Проверка Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ОШИБКА] Node.js не установлен!
    echo  Скачай и установи с https://nodejs.org ^(версия LTS^)
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%v in ('node -v') do set NODE_VER=%%v
echo  Node.js %NODE_VER% найден

:: Установка зависимостей
if not exist "node_modules" (
    echo  Установка зависимостей...
    call npm install
    if %errorlevel% neq 0 (
        echo  [ОШИБКА] npm install завершился с ошибкой
        pause
        exit /b 1
    )
)

:: Создать .env из примера если его нет
if not exist ".env" (
    if exist ".env.example" (
        copy ".env.example" ".env" >nul
        echo  Создан файл .env ^(скопирован из .env.example^)
        echo  Отредактируй .env и задай STEAM_API_KEY для входа через Steam
    )
)

echo.
echo  Открой в браузере: http://localhost:3000
echo  Для остановки нажми Ctrl+C
echo.

node server.js
pause
