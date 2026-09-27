const DB_KEY = "gameocean_mods";

document.addEventListener("DOMContentLoaded", () => {
  const detailContainer = document.querySelector("#detail");
  if (!detailContainer) return;

  // Obtener el ID del mod desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const modId = urlParams.get("id");

  if (!modId) {
    window.location.href = "index.html";
    return;
  }

  // Cargar mods desde localStorage
  const mods = JSON.parse(localStorage.getItem(DB_KEY)) || [];
  const mod = mods.find(m => m.id === modId);

  if (!mod) {
    detailContainer.innerHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <h2>Mod no encontrado ❌</h2>
        <p class="muted">El proyecto solicitado no existe o fue eliminado.</p>
        <a href="index.html" class="ghost" style="margin-top: 15px; display: inline-block;">← Volver al catálogo</a>
      </div>
    `;
    return;
  }

  // Renderizar la información del mod
  const creadoresTexto = mod.creators && mod.creators.length > 0 
    ? mod.creators.join(", ") 
    : "Comunidad";

  detailContainer.innerHTML = `
    <article class="detail-card">
      <img src="${mod.image_path}" alt="${esc(mod.title)}" class="hero-img" style="width: 100%; max-height: 350px; object-fit: cover; border-radius: 8px;">
      
      <div class="detail-body" style="margin-top: 20px;">
        <h1>${esc(mod.title)}</h1>
        
        <div style="margin: 10px 0; display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
          <span class="tag" style="background: #333; padding: 4px 8px; border-radius: 4px;">${esc(mod.section)}</span>
          <span class="muted">Versión: ${esc(mod.version)}</span>
        </div>

        <p class="muted" style="font-size: 14px; margin-bottom: 20px;">
          <b>Creado por:</b> ${esc(creadoresTexto)}
        </p>

        <p class="description" style="white-space: pre-line; line-height: 1.6;">${esc(mod.description || "Sin descripción disponible.")}</p>

        <div style="margin-top: 30px; display: flex; flex-direction: column; gap: 12px;">
          ${mod.videoUrl ? `
            <a href="${esc(mod.videoUrl)}" target="_blank" rel="noopener noreferrer" class="ghost" style="text-align: center; padding: 12px; border: 1px solid #444; border-radius: 6px; text-decoration: none;">
              📺 Ver Trailer / Vídeo en YouTube
            </a>
          ` : ""}

          ${mod.downloadUrl ? `
            <a href="${esc(mod.downloadUrl)}" target="_blank" rel="noopener noreferrer" class="primary" style="text-align: center; padding: 14px; background: #0070f3; color: white; border-radius: 6px; text-decoration: none; font-weight: bold;">
              ⬇️ Descargar Mod
            </a>
          ` : ""}
        </div>
      </div>
    </article>
  `;
});

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}
