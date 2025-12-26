# Lumina 📸

Aplicación web de fotografía social construida con React y Supabase.

## 🚀 Despliegue

### Variables de Entorno

Necesitas configurar las siguientes variables de entorno en tu plataforma de despliegue:

```bash
REACT_APP_SUPABASE_URL=tu_url_de_supabase
REACT_APP_SUPABASE_ANON_KEY=tu_clave_publica_de_supabase
```

### Desplegar en Vercel

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Despliega:
```bash
vercel
```

3. Configura las variables de entorno en el dashboard de Vercel

Para más detalles, consulta la [Guía de Despliegue Completa](deployment_guide.md)

## 🛠️ Desarrollo Local

1. Clona el repositorio
2. Copia `.env.example` a `.env.local` y completa las variables
3. Instala dependencias:
```bash
npm install
```

4. Inicia el servidor de desarrollo:
```bash
npm start
```

## 📦 Build de Producción

```bash
npm run build
```

El build optimizado estará en la carpeta `build/`.

## 🗄️ Base de Datos

Este proyecto usa Supabase. Ejecuta los siguientes scripts SQL en tu proyecto de Supabase:

1. `supabase-schema.sql` - Crea las tablas necesarias
2. `supabase-seed-data.sql` - (Opcional) Datos de prueba

## 🔧 Stack Tecnológico

- **Frontend**: React 18
- **Routing**: React Router v7
- **Estilos**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Storage + Auth)
- **Estado**: Zustand
- **Formularios**: React Hot Toast

## 📝 Características

- ✅ Autenticación (Email + Google OAuth)
- ✅ Feed de publicaciones con infinite scroll
- ✅ Crear posts con imágenes
- ✅ Sistema de likes y comentarios
- ✅ Perfiles de usuario
- ✅ Seguir/Dejar de seguir usuarios
- ✅ Mensajería directa
- ✅ Guard posts
- ✅ Compartir posts
- ✅ Modo responsive

## 📄 Licencia

Este proyecto es de uso personal.
