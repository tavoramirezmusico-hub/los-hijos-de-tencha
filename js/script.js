console.log("Sitio Oficial de Los Hijos de Tencha");

const botonMenu = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const enlacesMenu = document.querySelectorAll(".menu a");


if (botonMenu && menu) {

    botonMenu.addEventListener("click", () => {

        menu.classList.toggle("activo");

    });


    enlacesMenu.forEach(enlace => {

        enlace.addEventListener("click", () => {

            menu.classList.remove("activo");

        });

    });

}

// AMPLIAR FOTOS DE GALERIA

const fotos = document.querySelectorAll(".foto img");

fotos.forEach(foto => {

    foto.addEventListener("click", () => {

        const ventana = document.createElement("div");

        ventana.className = "visor";

        ventana.innerHTML = `
            <img src="${foto.src}">
        `;

        document.body.appendChild(ventana);


        ventana.addEventListener("click", () => {

            ventana.remove();

        });

    });

});
