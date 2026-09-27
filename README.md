# 🌊 GameOcean — Catálogo de Mods de Friday Night Funkin'

**GameOcean** es un portal web comunitario y responsivo diseñado para explorar, filtrar y publicar mods de *Friday Night Funkin'* de forma rápida y sencilla.

Actualmente funciona de manera **100% local** mediante la memoria del navegador (`localStorage`), convirtiendo las imágenes subidas a formato Base64 para una previsualización inmediata sin depender de servidores o bases de datos externas.

---

## 🚀 Características Principales

* 🔍 **Buscador en tiempo real:** Filtra mods por título o categoría al instante.
* 🏷️ **Filtros por Motor:** Organización por categorías (*Psych Engine, V-slice, P-slice, Codename Engine, Executables*).
* ⚙️ **Panel de Administración:** Acceso protegido mediante contraseña para la publicación de contenido.
* 🖼️ **Soporte Multimedia:** Carga de imágenes en tiempo real, incrustación de vídeos y enlaces de descarga.
* 📱 **Diseño Adaptativo (Responsive):** Optimizado tanto para computadoras de escritorio como para dispositivos móviles.

---

## 📁 Estructura del Proyecto

```text
GameOcean/
├── index.html       # Página principal (Catálogo de mods)
├── admin.html       # Panel de administración (Subida de mods)
├── mod.html         # Vista detallada de un mod individual
├── styles.css       # Estilos globales y diseño responsive
├── config.js        # Configuración de credenciales de administración
├── app.js           # Lógica del catálogo principal, filtros y buscador
├── admin.js         # Lógica de subida y procesamiento en localStorage
└── mod.js           # Lógica para mostrar la información del mod seleccionado
