# GameOcean

Página comunitaria para mods de Friday Night Funkin', preparada para GitHub Pages + Supabase.

## Qué incluye
- `index.html`: catálogo público.
- `admin.html`: panel de publicación protegido por la contraseña `?????`.
- `mod.html`: página automática para cada mod.
- Subida de imagen y archivo.
- YouTube, versión, descripción, sección y hasta 10 creadores.
- Comentarios y calificaciones de 1 a 5.
- `supabase.sql`: tablas, RLS y Storage.
- Diseño blanco/negro/neón y responsive.

## Configuración
1. Crea un proyecto en Supabase.
2. Abre SQL Editor y ejecuta `supabase.sql`.
3. Copia Project URL y la anon/public key.
4. Edita `config.js`:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
5. Publica la carpeta en GitHub Pages.

## Importante sobre GitHub Pages
GitHub Pages solamente sirve archivos estáticos; no puede ejecutar por sí solo un servidor Node/PHP ni guardar una base de datos. Por eso esta versión usa Supabase como backend/Storage.

La contraseña `?????` está en JavaScript porque el panel es estático. Esto NO es una protección real: alguien con conocimientos puede verla. Para una instalación pública real, usa Supabase Auth o una Edge Function que compruebe permisos en servidor.

## GitHub Pages
Sube todos los archivos del proyecto al repositorio y activa Settings > Pages > Deploy from branch. La URL resultante puede usarse como página principal.

## Seguridad recomendada antes de hacerlo público
- Sustituir la contraseña del cliente por Supabase Auth.
- Limitar tamaño/tipo de archivos en Storage.
- Añadir moderación/rate limiting para comentarios.
- Añadir CAPTCHA o login para evitar spam.
- No usar nunca `service_role` en `config.js`.
