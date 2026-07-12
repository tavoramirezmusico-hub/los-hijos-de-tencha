console.log("Sitio Oficial de Los Hijos de Tencha");

const botonMenu = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");

botonMenu.addEventListener("click", () => {
    menu.classList.toggle("activo");
});

const enlacesMenu = document.querySelectorAll(".menu a");

enlacesMenu.forEach(enlace => {
    enlace.addEventListener("click", () => {
        menu.classList.remove("activo");
    });
});
