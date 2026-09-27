const DB_KEY = "gameocean_mods";
const MAX_CREATORS = 10;

document.addEventListener("DOMContentLoaded", () => {
  const creatorFields = document.querySelector("#creatorFields");
  const addCreatorBtn = document.querySelector("#addCreator");
  const form = document.querySelector("#modForm");
  const statusMsg = document.querySelector("#status");

  // Control de creadores dinámicos
  if (addCreatorBtn && creatorFields) {
    addCreatorBtn.addEventListener("click", () => {
      const inputs = creatorFields.querySelectorAll("input");
      if (inputs.length >= MAX_CREATORS) {
        alert("Máximo 10 creadores permitidos.");
        return;
      }

      const row = document.createElement("div");
      row.className = "creator-row";
      row.style.display = "flex";
      row.style.gap = "8px";
      row.style.marginTop = "8px";

      row.innerHTML = `
        <input type="text" name="creators[]" placeholder="Nombre del creador" maxlength="50" style="flex:1;">
        <button type="button" class="ghost remove-creator" style="padding:4px 12px; cursor:pointer;">✕</button>
      `;

      row.querySelector(".remove-creator").addEventListener("click", () => row.remove());
      creatorFields.appendChild(row);
    });
  }

  // Interceptar el envío del formulario
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (statusMsg) statusMsg.textContent = "Guardando mod...";

      try {
        const formData = new FormData(form);
        const title = formData.get("title");
        const version = formData.get("version");
        const description = formData.get("description");
        const section = formData.get("section");
        const youtube = formData.get("youtube");
        const imageFile = formData.get("image");

        // Lista de creadores
        const creatorInputs = form.querySelectorAll("input[name='creators[]']");
        const creators = Array.from(creatorInputs)
          .map(input => input.value.trim())
          .filter(val => val !== "");

        // Convertir imagen seleccionada a Base64
        let imageBase64 = "https://via.placeholder.com/400x225?text=Sin+Imagen";
        if (imageFile && imageFile.size > 0) {
          imageBase64 = await readFileAsBase64(imageFile);
        }

        // Crear objeto del mod
        const nuevoMod = {
          id: Date.now().toString(),
          title: title || "Sin título",
          version: version || "1.0",
          description: description || "",
          section: section || "V-slice",
          videoUrl: youtube || "",
          image_path: imageBase64,
          creators: creators,
          created_at: new Date().toISOString()
        };

        // Guardar en la base de datos local (localStorage)
        const mods = JSON.parse(localStorage.getItem(DB_KEY)) || [];
        mods.unshift(nuevoMod); // Se agrega al principio para aparecer de primero
        localStorage.setItem(DB_KEY, JSON.stringify(mods));

        // Feedback al usuario y Redirección automática al catálogo
        if (statusMsg) statusMsg.textContent = "¡Publicado! Redirigiendo...";
        
        // Redirecciona al catálogo principal de inmediato
        window.location.assign("index.html");

      } catch (err) {
        console.error(err);
        if (statusMsg) statusMsg.textContent = "Error al guardar.";
        alert("La imagen es muy pesada para el almacenamiento de tu teléfono. Elige una de menor tamaño (menos de 1 MB).");
      }
    });
  }
});

// Convierte archivos de imagen a formato legible por el navegador
function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
    }
