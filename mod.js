const DB_KEY = "gameocean_mods";
const MAX_CREATORS = 10;

document.addEventListener("DOMContentLoaded", () => {
  const creatorFields = document.querySelector("#creatorFields");
  const addCreatorBtn = document.querySelector("#addCreator");
  const form = document.querySelector("#modForm");
  const statusMsg = document.querySelector("#status");

  // Añadir campos dinámicos de creadores
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

  // Guardar datos al enviar el formulario
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      if (statusMsg) statusMsg.textContent = "Procesando...";

      const formData = new FormData(form);
      const title = formData.get("title");
      const version = formData.get("version");
      const description = formData.get("description");
      const section = formData.get("section");
      const youtube = formData.get("youtube");
      const imageFile = formData.get("image");
      const modFile = formData.get("file");

      // Recopilar lista de creadores
      const creatorInputs = form.querySelectorAll("input[name='creators[]']");
      const creators = Array.from(creatorInputs)
        .map(input => input.value.trim())
        .filter(val => val !== "");

      try {
        // Convertir imagen a Base64
        let imageBase64 = "https://via.placeholder.com/400x225?text=Sin+Imagen";
        if (imageFile && imageFile.size > 0) {
          imageBase64 = await readFileAsBase64(imageFile);
        }

        const nuevoMod = {
          id: Date.now().toString(),
          title,
          version,
          description,
          section,
          videoUrl: youtube || "",
          fileName: modFile ? modFile.name : "",
          image_path: imageBase64,
          creators,
          created_at: new Date().toISOString()
        };

        // Guardar en localStorage
        const mods = JSON.parse(localStorage.getItem(DB_KEY)) || [];
        mods.unshift(nuevoMod);
        localStorage.setItem(DB_KEY, JSON.stringify(mods));

        if (statusMsg) statusMsg.textContent = "¡Mod publicado con éxito! 🎉";
        alert("¡Mod publicado con éxito! 🎉");
        window.location.href = "index.html";

      } catch (err) {
        console.error(err);
        if (statusMsg) statusMsg.textContent = "Error: La imagen es demasiado pesada para el almacenamiento local.";
        alert("Error: Intenta elegir una imagen de menor peso (menos de 2 MB).");
      }
    });
  }
});

// Función auxiliar para leer archivos de imagen a Base64
function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}
