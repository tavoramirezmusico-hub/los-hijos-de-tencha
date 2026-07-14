// =====================================
// LOS HIJOS DE TENCHA
// SCRIPT.JS
// =====================================


// ABRIR SIEMPRE LA PÁGINA DESDE EL INICIO

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {

    setTimeout(() => {

        window.scrollTo(0, 0);

    }, 50);

});



console.log("Sitio Oficial de Los Hijos de Tencha");



// =====================================
// MENU HAMBURGUESA
// =====================================


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



// =====================================
// AMPLIAR IMÁGENES
// GALERÍA + EVENTO STARVIEW
// =====================================


const fotos = document.querySelectorAll(".foto img, .imagen-evento img");


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

// =====================================
// CARRUSEL GALERÍA
// =====================================

const galeria = document.querySelector(".galeria-grid");
const btnIzquierda = document.querySelector(".flecha.izquierda");
const btnDerecha = document.querySelector(".flecha.derecha");

if (galeria && btnIzquierda && btnDerecha) {

    btnDerecha.addEventListener("click", () => {

        galeria.scrollBy({
            left: 320,
            behavior: "smooth"
        });

    });

    btnIzquierda.addEventListener("click", () => {

        galeria.scrollBy({
            left: -320,
            behavior: "smooth"
        });

    });

}
