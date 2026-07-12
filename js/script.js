console.log("Sitio Oficial de Los Hijos de Tencha");

const botonMenu = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");

botonMenu.addEventListener("click", () => {
    menu.classList.toggle("activo");
});
