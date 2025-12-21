#!/bin/bash

# Script para limpiar completamente el proyecto y empezar de cero

echo "🧹 Limpiando proyecto Lumina..."

# 1. Detener cualquier proceso corriendo
echo "⏹️  Deteniendo procesos..."
pkill -f "react-scripts"

# 2. Limpiar caché de npm
echo "🗑️  Limpiando caché de npm..."
npm cache clean --force

# 3. Eliminar node_modules y package-lock
echo "📦 Eliminando node_modules..."
rm -rf node_modules
rm -rf package-lock.json

# 4. Eliminar build y caché
echo "🗂️  Eliminando carpetas de build..."
rm -rf build
rm -rf .cache

# 5. Reinstalar dependencias
echo "📥 Reinstalando dependencias..."
npm install

# 6. Limpiar puerto 3000 si está ocupado
echo "🔌 Limpiando puerto 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

echo "✅ Limpieza completada!"
echo ""
echo "Ahora ejecuta: npm run start"
