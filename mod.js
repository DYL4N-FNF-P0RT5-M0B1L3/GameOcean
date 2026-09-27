const DB_KEY = "gameocean_mods";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const modId = urlParams.get("id");

  if (!modId) {
    location.href = "index.html";
    return;
  }

  const mods = JSON.parse(localStorage.getItem(DB_KEY)) || [];
  const mod = mods.find(m => m.id === modId);

  if (!mod) {
    document.body.innerHTML = "<h2 style='text-align:center;padding:50px;'>Mod no encontrado. <a href='index.html'>Volver</a></h2>";
    return;
  }

  // Rellenar datos en la pantalla
  if (document.querySelector("#modTitle")) document.querySelector("#modTitle").textContent = mod.title;
  if (document.querySelector("#modVersion")) document.querySelector("#modVersion").textContent = "v" + mod.version;
  if (document.querySelector("#modSection")) document.querySelector("#modSection").textContent = mod.section;
  if (document.querySelector("#modImage")) document.querySelector("#modImage").src = mod.image_path;
  if (document.querySelector("#modDesc")) document.querySelector("#modDesc").textContent = mod.description;
  if (document.querySelector("#modDownload")) document.querySelector("#modDownload").href = mod.downloadUrl || "#";
});
