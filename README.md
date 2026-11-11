# E-Commerce Landing Page

Aplicación web moderna desarrollada como parte de la actividad evaluada sobre **Next.js 16 (App Router)** y servicios serverless con **Supabase**.

## Tecnologías Utilizadas
* **Frontend / Framework:** Next.js 16+ (App Router) con TypeScript
* **Estilos:** Tailwind CSS
* **Base de Datos / Backend:** Supabase (PostgreSQL serverless)
* **Despliegue:** Vercel

## Rutas Dinámicas Implementadas
1. **Detalle de Producto:** `/productos/[slug]` - Renderiza información detallada de cada artículo consultando la base de datos de manera eficiente mediante Server Components.
2. **Filtro por Categoría:** `/categorias/[category]` - Permite listar productos agrupados por su respectiva clasificación de manera dinámica.

## Instrucciones de Instalación Local

Sigue estos pasos para clonar y ejecutar el proyecto en tu máquina local:

1. **Clona el repositorio:**
   git clone
   
   Instala las dependencias:
npm install

Configura las variables de entorno:
Crea un archivo denominado .env.local en la raíz del proyecto basándote en la siguiente estructura:

NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_llave_anonima_de_supabase

Ejecuta el servidor de desarrollo:

npm run dev
Abre http://localhost:3000 en tu navegador para ver la aplicación funcionando.
