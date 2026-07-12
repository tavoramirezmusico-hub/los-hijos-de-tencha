console.log("Sitio Oficial de Los Hijos de Tencha");
console.log("cerrando menú");

const botonMenu = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const enlacesMenu = document.querySelectorAll(".menu a");

botonMenu.addEventListener("click", () => {
    menu.classList.toggle("activo");
});

enlacesMenu.forEach(enlace => {
    enlace.addEventListener("click", () => {
        menu.classList.remove("activo");
    });
});
