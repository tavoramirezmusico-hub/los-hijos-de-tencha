// =====================================
// LOS HIJOS DE TENCHA
// SCRIPT.JS
// =====================================


// =====================================
// ABRIR SIEMPRE LA PÁGINA DESDE EL INICIO
// =====================================

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
// MENÚ HAMBURGUESA
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


// CERRAR MENÚ AL HACER SCROLL

window.addEventListener("scroll", () => {

    if(menu && menu.classList.contains("activo")){

        menu.classList.remove("activo");

    }

});



// =====================================
// GALERÍA 2.0
// =====================================

const fotos = document.querySelectorAll(".foto img");

const visorGaleria = document.getElementById("visor-galeria");
const imagenGaleria = document.getElementById("imagen-galeria");

const cerrarGaleria = document.getElementById("cerrar-galeria");

const anterior = document.getElementById("foto-anterior");
const siguiente = document.getElementById("foto-siguiente");

const fotoActual = document.getElementById("foto-actual");
const totalFotos = document.getElementById("total-fotos");

let indiceActual = 0;

if(
    visorGaleria &&
    imagenGaleria &&
    fotos.length
){

    totalFotos.textContent = fotos.length;

    function mostrarFoto(indice){

        indiceActual = indice;

        imagenGaleria.src = fotos[indice].src;

        fotoActual.textContent = indice + 1;

        visorGaleria.style.display = "flex";

    }

    fotos.forEach((foto, indice)=>{

        foto.addEventListener("click",()=>{

            mostrarFoto(indice);

        });

    });

    cerrarGaleria.addEventListener("click",()=>{

        visorGaleria.style.display="none";

    });

    visorGaleria.addEventListener("click",(e)=>{

        if(e.target===visorGaleria){

            visorGaleria.style.display="none";

        }

    });

    siguiente.addEventListener("click",(e)=>{

        e.stopPropagation();

        indiceActual++;

        if(indiceActual>=fotos.length){

            indiceActual=0;

        }

        mostrarFoto(indiceActual);

    });

    anterior.addEventListener("click",(e)=>{

        e.stopPropagation();

        indiceActual--;

        if(indiceActual<0){

            indiceActual=fotos.length-1;

        }

        mostrarFoto(indiceActual);

    });

    document.addEventListener("keydown",(e)=>{

        if(visorGaleria.style.display!=="flex") return;

        if(e.key==="Escape"){

            visorGaleria.style.display="none";

        }

        if(e.key==="ArrowRight"){

            siguiente.click();

        }

        if(e.key==="ArrowLeft"){

            anterior.click();

        }

    });

}

// =====================================
// CARRUSEL GALERÍA
// =====================================

const galeria = document.querySelector(".galeria-grid");
const btnIzquierda = document.querySelector(".flecha.izquierda");
const btnDerecha = document.querySelector(".flecha.derecha");


if (galeria && btnIzquierda && btnDerecha) {


    btnDerecha.addEventListener("click", () => {


        galeria.scrollBy({

            left:320,

            behavior:"smooth"

        });


    });



    btnIzquierda.addEventListener("click", () => {


        galeria.scrollBy({

            left:-320,

            behavior:"smooth"

        });


    });


}





// =====================================
// ANIMACIONES AL HACER SCROLL
// =====================================

const elementosAnimados = document.querySelectorAll(".animar");


const observador = new IntersectionObserver((entradas)=>{


    entradas.forEach(entrada=>{


        if(entrada.isIntersecting){


            entrada.target.classList.add("visible");


        }


    });


},{

    threshold:0.15

});



elementosAnimados.forEach(elemento=>{


    observador.observe(elemento);


});







// =====================================
// BOTÓN SUBIR ARRIBA
// =====================================

const botonSubir = document.getElementById("subir");


if(botonSubir){


    window.addEventListener("scroll",()=>{


        if(window.scrollY > 400){


            botonSubir.classList.add("visible");


        }else{


            botonSubir.classList.remove("visible");


        }


    });



    botonSubir.addEventListener("click",()=>{


        window.scrollTo({


            top:0,


            behavior:"smooth"


        });


    });


}






// =====================================
// MOSTRAR CAMISETAS
// =====================================

function mostrarCamisetas(){


    const galeria = document.getElementById("galeria-camisetas");


    if(galeria){

        galeria.classList.toggle("mostrar");

    }


}





// =====================================
// VISOR CAMISETAS + INTEGRANTES
// =====================================

const imagenes = document.querySelectorAll(".camiseta img, .zoom-integrante");

const visor = document.getElementById("visor-camiseta");

const imagenAmpliada = document.getElementById("imagen-ampliada");

const cerrar = document.getElementById("cerrar-visor");



if(visor && imagenAmpliada){



    imagenes.forEach(imagen => {


        imagen.addEventListener("click", function(){


            imagenAmpliada.src = this.src;


            visor.style.display="flex";


        });


    });



    if(cerrar){


        cerrar.addEventListener("click",()=>{


            visor.style.display="none";


        });


    }



    visor.addEventListener("click",(e)=>{


        if(e.target === visor){


            visor.style.display="none";


        }


    });



}

// =====================================
// TRANSICIÓN ENTRE PÁGINAS
// INDEX <-> CANCIONES
// =====================================

document.addEventListener("DOMContentLoaded", () => {


    const pantallaTransicion = document.getElementById("transicion");


    if (!pantallaTransicion) return;



    const enlaces = document.querySelectorAll("a");



    enlaces.forEach(enlace => {



        enlace.addEventListener("click", function(e){


            const href = this.getAttribute("href");


            // Evitar transición en enlaces internos
            // (#inicio, #banda, #contacto, etc.)
            if(!href || href.startsWith("#")){

                return;

            }



            const destino = this.href;



            // Solo aplicar transición entre páginas
            if(
                destino.includes("index.html") ||
                destino.includes("canciones.html")
            ){


                // Si ya estamos en esa misma página,
                // no hacer transición

                if(
                    destino === window.location.href ||
                    destino === window.location.href.split("#")[0]
                ){

                    return;

                }



                e.preventDefault();



                pantallaTransicion.classList.add("activo");



                setTimeout(() => {


                    window.location.href = destino;



                },1200);



            }



        });



    });



});





