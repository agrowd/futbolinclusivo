#!/bin/bash

# Script de instalación y ejecución para el extractor de contenido legacy

echo "🚀 Instalando dependencias del extractor de contenido legacy..."

# Entrar al directorio de scripts
cd "$(dirname "$0")"

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js primero."
    exit 1
fi

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado. Por favor instala npm primero."
    exit 1
fi

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Verificar instalación de jsdom
if ! npm list jsdom &> /dev/null; then
    echo "❌ Error instalando jsdom. Por favor instala manualmente:"
    echo "npm install jsdom"
    exit 1
fi

echo "✅ Dependencias instaladas correctamente!"
echo ""
echo "🎯 Para ejecutar el extractor:"
echo "node extract-legacy-content.js"
echo ""
echo "📊 El resultado se guardará en la carpeta 'extracted_content'"
echo "📄 Se generará un reporte visual en 'extracted_content/report.html'"
echo ""
echo "🚀 Ejecutando el extractor ahora..."

# Ejecutar el extractor
node extract-legacy-content.js

echo ""
echo "✅ ¡Extracción completada!"
echo "📁 Revisa la carpeta 'extracted_content' para ver todos los datos extraídos"
echo "🌐 Abre 'extracted_content/report.html' en tu navegador para ver el reporte visual"
