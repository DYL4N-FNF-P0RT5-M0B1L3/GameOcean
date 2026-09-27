const DB_KEY = "gameocean_mods";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#modForm") || document.querySelector("form");
  if (form) {
    form.addEventListener("submit", guardarModLocal);
  }
});

function guardarModLocal(e) {
  e.preventDefault();

  const title = document.querySelector("#title")?.value || document.querySelector("[name='title']")?.value;
  const version = document.querySelector("#version")?.value || "1.0";
  const section = document.querySelector("#section")?.value || "Todos";
  const description = document.querySelector("#description")?.value || "";
  const downloadUrl = document.querySelector("#downloadUrl")?.value || "";
  const videoUrl = document.querySelector("#videoUrl")?.value || "";
  const imageInput = document.querySelector("#image") || document.querySelector("input[type='file']");

  if (!title) {
    alert("Por favor ingresa un título.");
    return;
  }

  const imageFile = imageInput?.files[0];

  // Si hay imagen, la convertimos a Base64
  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function (event) {
      finalizarGuardado({
        id: Date.now().toString(),
        title,
        version,
        section,
        description,
        downloadUrl,
        videoUrl,
        image_path: event.target.result, // Base64 de la imagen
        created_at: new Date().toISOString()
      });
    };
    reader.readAsDataURL(imageFile);
  } else {
    // Si no seleccionaron imagen, pon una por defecto
    finalizarGuardado({
      id: Date.now().toString(),
      title,
      version,
      section,
      description,
      downloadUrl,
      videoUrl,
      image_path: "https://via.placeholder.com/400x225?text=Sin+Imagen",
      created_at: new Date().toISOString()
    });
  }
}

function finalizarGuardado(nuevoMod) {
  const modsActuales = JSON.parse(localStorage.getItem(DB_KEY)) || [];
  modsActuales.unshift(nuevoMod); // Agregar al principio
  localStorage.setItem(DB_KEY, JSON.stringify(modsActuales));

  alert("¡Mod guardado exitosamente en tu navegador! 🎉");
  window.location.href = "index.html";
}
