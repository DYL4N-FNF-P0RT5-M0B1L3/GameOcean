const C=window.GAMEOCEAN_CONFIG||{};if(sessionStorage.getItem("gameocean_admin")!=="1")location.href="index.html";
let sb=null;let creatorCount=0;
async function boot(){if(C.https://arikxzlrnhkmstykentk.supabase.co.includes("DFPM' Projects")){status("Configura Supabase en config.js.");return}const {createClient}=await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");sb=createClient(C.https://arikxzlrnhkmstykentk.supabase.co,C.sb_publishable_jw1klNRlgz9zbpI7PnoRAw_t86Pc_N8);addCreator()}
function addCreator(){if(creatorCount>=10)return;creatorCount++;const box=document.querySelector("#creatorFields");const row=document.createElement("div");row.className="creator-row";row.innerHTML=`<input name="creator${creatorCount}" maxlength="60" placeholder="Etiqueta del creador #${creatorCount}"><button type="button" class="remove">×</button>`;row.querySelector(".remove").onclick=()=>{row.remove();creatorCount--};box.appendChild(row)}
document.querySelector("#addCreator").onclick=addCreator;
function status(x){document.querySelector("#status").textContent=x}
document.querySelector("#modForm").onsubmit=async e=>{e.preventDefault();if(!sb){status("Supabase no está configurado.");return}const f=new FormData(e.target), image=f.get("image"), file=f.get("file");if(!image||!file){status("Selecciona una imagen y un archivo.");return}const btn=document.querySelector("#publishBtn");btn.disabled=true;status("Subiendo archivos...");
const uid=crypto.randomUUID();const imagePath=uid+"-"+safe(image.name);const filePath=uid+"-"+safe(file.name);
let r=await sb.storage.from("mod-images").upload(imagePath,image,{upsert:false});if(r.error){status("Error con la imagen: "+r.error.message);btn.disabled=false;return}
r=await sb.storage.from("mod-files").upload(filePath,file,{upsert:false});if(r.error){status("Error con el archivo: "+r.error.message);btn.disabled=false;return}
const creators=[...document.querySelectorAll("#creatorFields input")].map(x=>x.value.trim()).filter(Boolean).map(label=>({label}));
const row={title:f.get("title").trim(),description:f.get("description").trim(),version:f.get("version").trim(),section:f.get("section"),youtube:f.get("youtube").trim()||null,image_path:imagePath,file_path:filePath,creators};
r=await sb.from("mods").insert(row);if(r.error){status("Error guardando el mod: "+r.error.message);btn.disabled=false;return}
status("Publicado correctamente. Abriendo catálogo...");setTimeout(()=>location.href="index.html",700)}
function safe(s){return s.replace(/[^a-zA-Z0-9._-]/g,"_")}
boot();
