@echo off
REM Script de instalación y ejecución para el extractor de contenido legacy (Windows)

echo 🚀 Instalando dependencias del extractor de contenido legacy...

REM Verificar Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no está instalado. Por favor instala Node.js primero.
    pause
    exit /b 1
)

REM Verificar npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm no está instalado. Por favor instala npm primero.
    pause
    exit /b 1
)

REM Instalar dependencias
echo 📦 Instalando dependencias...
npm install

REM Verificar instalación de jsdom
npm list jsdom >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error instalando jsdom. Por favor instala manualmente:
    echo npm install jsdom
    pause
    exit /b 1
)

echo ✅ Dependencias instaladas correctamente!
echo.
echo 🎯 Para ejecutar el extractor:
echo node extract-legacy-content.js
echo.
echo 📊 El resultado se guardará en la carpeta "extracted_content"
echo 📄 Se generará un reporte visual en "extracted_content/report.html"
echo.
echo 🚀 Ejecutando el extractor ahora...

REM Ejecutar el extractor
node extract-legacy-content.js

echo.
echo ✅ ¡Extracción completada!
echo 📁 Revisa la carpeta "extracted_content" para ver todos los datos extraídos
echo 🌐 Abre "extracted_content/report.html" en tu navegador para ver el reporte visual
pause
