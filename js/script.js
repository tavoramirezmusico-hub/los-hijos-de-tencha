console.log("Sitio Oficial de Los Hijos de Tencha");

const botonMenu = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const enlacesMenu = document.querySelectorAll(".menu a");

botonMenu.addEventListener("click", () => {
    menu.classList.toggle("activo");
});

enlacesMenu.forEach(enlace => {
    enlace.addEventListener("click", () => {
        setTimeout(() => {
            menu.classList.remove("activo");
        }, 200);
    });
});
