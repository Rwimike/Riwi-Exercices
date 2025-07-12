const rutes = {
    home: "./Views/home.html",
    about: "./Views/about.html",
    contact: "./Views/contact.html",
    "404" : "./Views/404.html"
};
const API = "http://localhost:3000";

async function loadView(path) {
    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error('No se pudo cargar la vista');
        const html = await res.text();
        const overlay = document.querySelector(".overlay");
        overlay.innerHTML = html;
    } catch (err) {
        const overlay = document.querySelector(".overlay");
        overlay.innerHTML = `<h2>Error cargando la vista</h2><p>${err.message}</p>`;
    }
}
Object.keys(rutes).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener("click", async (e) => {
            e.preventDefault();
            loadView(rutes[id]);
        });
    }
});
window.addEventListener("DOMContentLoaded", () => {
  loadView("./Views/home.html");
});
