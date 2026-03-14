@echo off
title QuickLaunch v7 — Setup
echo.
echo  ╔══════════════════════════════════════════════╗
echo  ║      QuickLaunch v7 — Setup                  ║
echo  ╠══════════════════════════════════════════════╣
echo  ║  Горячая клавиша:  Win+Q (или Alt+Space)     ║
echo  ║  Трей: правый клик → Показать/Скрыть         ║
echo  ╚══════════════════════════════════════════════╝
echo.

node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo  [!] Node.js не найден. Скачай: https://nodejs.org
    start https://nodejs.org
    pause & exit /b 1
)
echo  [✓] Node.js: && node -v

echo.
echo  [→] Устанавливаю зависимости...
npm install --no-audit --no-fund
if %errorlevel% neq 0 ( echo  [!] Ошибка npm install & pause & exit /b 1 )

echo.
echo  [✓] Всё готово! Запускаю приложение...
echo.
echo  При первом запуске окно появится автоматически.
echo  Затем скрывайте/открывайте через Win+Q или трей.
echo.
npm start
