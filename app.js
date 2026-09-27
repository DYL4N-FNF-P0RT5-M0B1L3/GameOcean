// Nombre del almacén en localStorage
const DB_KEY = "gameocean_mods";

function getLocalMods() {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : [];
}

function loadMods() {
  window.mods = getLocalMods();
  renderFilters();
  render(window.mods);
}

function renderFilters() {
  const f = document.querySelector("#filters");
  if (!f) return;
  const sections = ["Todos", "V-slice", "Psych Engine", "P-slice", "Codename Engine", "Executables"];
  
  f.innerHTML = sections.map((x, i) => 
    `<button class="filter ${i === 0 ? "active" : ""}" data-filter="${x}">${x}</button>`
  ).join("");

  f.onclick = e => {
    if (!e.target.matches(".filter")) return;
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    const x = e.target.dataset.filter;
    render(x === "Todos" ? window.mods : window.mods.filter(m => m.section === x));
  };
}

function render(list) {
  const q = (document.querySelector("#search")?.value || "").toLowerCase();
  list = list.filter(m => m.title.toLowerCase().includes(q) || m.section.toLowerCase().includes(q));
  const grid = document.querySelector("#modsGrid");
  if (!grid) return;

  if (!list.length) {
    grid.innerHTML = '<div class="empty">Aún no hay mods subidos. ¡Usa el engranaje para agregar el primero!</div>';
    return;
  }

  grid.innerHTML = list.map(m => `
    <article class="card" onclick="location.href='mod.html?id=${m.id}'">
      <img src="${m.image_path}" alt="${esc(m.title)}">
      <div class="card-body">
        <h3>${esc(m.title)}</h3>
        <div class="muted">v${esc(m.version)}</div>
        <span class="tag">${esc(m.section)}</span>
      </div>
    </article>
  `).join("");
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

// Buscador
document.querySelector("#search")?.addEventListener("input", () => render(window.mods || []));

// Botón de engranaje y modal de contraseña
const settingsBtn = document.querySelector("#settingsBtn");
if (settingsBtn) {
  settingsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#passwordModal")?.classList.remove("hidden");
  });
}

const closeBtn = document.querySelector("[data-close]");
if (closeBtn) {
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#passwordModal")?.classList.add("hidden");
  });
}

document.querySelector("#passwordForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const pass = document.querySelector("#password")?.value;
  const configPass = window.GAMEOCEAN_CONFIG?.ADMIN_PASSWORD || "DFPM0";
  
  if (pass === configPass) {
    sessionStorage.setItem("gameocean_admin", "1");
    location.href = "admin.html";
  } else {
    document.querySelector("#passError").textContent = "Contraseña incorrecta.";
  }
});

// Cargar al iniciar
document.addEventListener("DOMContentLoaded", loadMods);
      
