// Configuración general de la aplicación
const CONFIG = {
    // Si usas Supabase u otro backend, define tus llaves aquí de forma segura
    SUPABASE_URL: "https://arikxzlrnhkmstykentk.supabase.co",
    SUPABASE_ANON_KEY: "sb_publishable_jw1klNRlgz9zbpI7PnoRAw_t86Pc_N8",
    
    // Otras variables de entorno o configuración de la página
    APP_NAME: "GameOcean",
    VERSION: "1.0.0"
};

// Exportar para que otros scripts (como app.js o admin.js) puedan usarlo sin errores en el navegador
window.CONFIG = CONFIG;
