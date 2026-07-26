// =====================================
// LOS HIJOS DE TENCHA
// SCRIPT.JS
// =====================================



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



window.addEventListener("scroll", () => {

    if (menu && menu.classList.contains("activo")) {

        menu.classList.remove("activo");

    }

});





// =====================================
// GALERÍA 2.0 - VISOR PROFESIONAL
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



if (
    visorGaleria &&
    imagenGaleria &&
    fotos.length
) {


    totalFotos.textContent = fotos.length;



    function mostrarFoto(indice) {


        indiceActual = indice;


        imagenGaleria.src = fotos[indice].src;


        fotoActual.textContent = indice + 1;


        visorGaleria.style.display = "flex";


        document.body.style.overflow = "hidden";


        visorGaleria.classList.remove("mostrar");


        setTimeout(() => {


            visorGaleria.classList.add("mostrar");


        }, 10);


    }




    fotos.forEach((foto, indice) => {


        foto.addEventListener("click", () => {


            mostrarFoto(indice);


        });


    });




    // CERRAR CON BOTÓN X

    cerrarGaleria.addEventListener("click", () => {


        visorGaleria.style.display = "none";


        document.body.style.overflow = "";


    });





    // CERRAR HACIENDO CLICK FUERA DE LA FOTO

    visorGaleria.addEventListener("click", (e) => {


        if (e.target === visorGaleria) {


            visorGaleria.style.display = "none";


            document.body.style.overflow = "";


        }


    });






    // SIGUIENTE FOTO

    siguiente.addEventListener("click", (e) => {


        e.stopPropagation();


        indiceActual++;


        if (indiceActual >= fotos.length) {


            indiceActual = 0;


        }


        mostrarFoto(indiceActual);


    });






    // FOTO ANTERIOR

    anterior.addEventListener("click", (e) => {


        e.stopPropagation();


        indiceActual--;


        if (indiceActual < 0) {


            indiceActual = fotos.length - 1;


        }


        mostrarFoto(indiceActual);


    });






    // TECLADO

    document.addEventListener("keydown", (e) => {


        if (visorGaleria.style.display !== "flex") return;



        if (e.key === "Escape") {


            visorGaleria.style.display = "none";


            document.body.style.overflow = "";


        }



        if (e.key === "ArrowRight") {


            siguiente.click();


        }



        if (e.key === "ArrowLeft") {


            anterior.click();


        }


    });



}



// =====================================
// ANIMACIONES AL HACER SCROLL
// =====================================


const elementosAnimados = document.querySelectorAll(".animar");


const observador = new IntersectionObserver((entradas) => {


    entradas.forEach(entrada => {


        if (entrada.isIntersecting) {


            entrada.target.classList.add("visible");

        }


    });


}, {

    threshold: 0.15

});



elementosAnimados.forEach(elemento => {


    observador.observe(elemento);


});







// =====================================
// BOTÓN SUBIR ARRIBA
// =====================================


const botonSubir = document.getElementById("subir");


if (botonSubir) {



    window.addEventListener("scroll", () => {


        if (window.scrollY > 400) {


            botonSubir.classList.add("visible");


        } else {


            botonSubir.classList.remove("visible");


        }


    });



    botonSubir.addEventListener("click", () => {

        // Cerrar todas las noticias
        document.querySelectorAll(".noticia").forEach((noticia) => {
            noticia.open = false;
        });

        // Subir al inicio
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });



}






// =====================================
// MOSTRAR CAMISETAS
// =====================================


function mostrarCamisetas() {


    const galeria = document.getElementById("galeria-camisetas");



    if (galeria) {


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




if (visor && imagenAmpliada) {



    imagenes.forEach(imagen => {



        imagen.addEventListener("click", function () {



            imagenAmpliada.src = this.src;



            visor.style.display = "flex";



        });



    });




    if (cerrar) {


        cerrar.addEventListener("click", () => {


            visor.style.display = "none";


        });



    }





    visor.addEventListener("click", (e) => {


        if (e.target === visor) {


            visor.style.display = "none";


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



        enlace.addEventListener("click", function (e) {



            const href = this.getAttribute("href");




            if (!href || href.startsWith("#")) {


                return;


            }






            const destino = this.href;






            if (
                destino.includes("index.html") ||
                destino.includes("canciones.html") ||
                destino.includes("videoteca.html") ||
                destino.includes("noticias.html")
            ) {





                if (
                    destino === window.location.href ||
                    destino === window.location.href.split("#")[0]
                ) {


                    return;


                }





                e.preventDefault();




                pantallaTransicion.classList.add("activo");




                setTimeout(() => {



                    window.location.href = destino;



                }, 1200);




            }




        });



    });



});

// =====================================
// TENCHA NOTICIAS
// SOLO UNA NOTICIA ABIERTA
// =====================================

const noticias = document.querySelectorAll(".noticia");

noticias.forEach((noticia) => {

    noticia.addEventListener("toggle", () => {

        if (noticia.open) {

            noticias.forEach((otra) => {

                if (otra !== noticia) {
                    otra.open = false;
                }

            });

            // Llevar la noticia al inicio de la pantalla
            setTimeout(() => {

                noticia.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 50);

        }

    });

});

// =====================================
// FIX REPRODUCTOR SPOTIFY EN MÓVIL
// =====================================

document.addEventListener('DOMContentLoaded', function () {
    // Forzar redimensionamiento del iframe de Spotify en móvil
    function fixSpotifyPlayer() {
        const spotifyEmbeds = document.querySelectorAll('.spotify-embed iframe');

        spotifyEmbeds.forEach(function (iframe) {
            const container = iframe.closest('.spotify-embed');
            if (container) {
                const containerWidth = container.offsetWidth;
                if (containerWidth > 0 && containerWidth < 500) {
                    // En móvil, asegurar que el iframe ocupe todo el ancho
                    iframe.style.width = '100%';
                    iframe.style.minWidth = '100%';
                }
            }
        });
    }

    // Ejecutar al cargar y al redimensionar
    fixSpotifyPlayer();
    window.addEventListener('resize', fixSpotifyPlayer);

    // También forzar después de 1 segundo (por si carga lento)
    setTimeout(fixSpotifyPlayer, 1000);
});

// =====================================
// CONTROL DE VIDEOS - SOLO UNO A LA VEZ (VERSIÓN FINAL)
// =====================================

document.addEventListener('DOMContentLoaded', function () {

    // ================================
    // 1. SELECCIONAR TODOS LOS CONTENEDORES DE VIDEO
    // ================================

    var contenedores = document.querySelectorAll(
        '.video-card, .momento-card, .lanzamiento-principal, .lanzamiento-secundario, .youtube-player'
    );

    console.log('Contenedores de video encontrados:', contenedores.length);

    // ================================
    // 2. AGREGAR OVERLAY A CADA CONTENEDOR
    // ================================

    contenedores.forEach(function (contenedor) {

        var iframe = contenedor.querySelector('iframe');

        if (!iframe) return;

        // Guardar la URL original del iframe
        var urlOriginal = iframe.src;
        iframe.dataset.urlOriginal = urlOriginal;

        // Crear overlay transparente
        var overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.zIndex = '100';
        overlay.style.cursor = 'pointer';
        overlay.style.background = 'rgba(0,0,0,0.01)'; // Casi transparente pero captura clics

        // Asegurar que el contenedor tenga position relative
        contenedor.style.position = 'relative';
        contenedor.appendChild(overlay);

        // ================================
        // 3. EVENTO DE CLIC EN EL OVERLAY
        // ================================

        overlay.addEventListener('click', function (e) {

            e.stopPropagation();
            e.preventDefault();

            console.log('▶️ Clic en video:', contenedor.className);

            // ================================
            // 4. DETENER TODOS LOS DEMÁS VIDEOS
            // ================================

            var todosLosIframes = document.querySelectorAll(
                '.video-card iframe, .momento-card iframe, .lanzamiento-principal iframe, .lanzamiento-secundario iframe, .youtube-player iframe'
            );

            console.log('Total de iframes encontrados:', todosLosIframes.length);

            var contador = 0;

            todosLosIframes.forEach(function (otroIframe) {

                // NO recargar el iframe que se está reproduciendo
                if (otroIframe === iframe) {
                    console.log('  → Saltando video actual (no se recarga)');
                    return;
                }

                // Recargar el iframe para detenerlo
                var src = otroIframe.dataset.urlOriginal || otroIframe.src;

                if (src) {
                    console.log('  → Deteniendo video:', src.substring(0, 50) + '...');

                    // Recargar el iframe
                    otroIframe.src = '';
                    setTimeout(function () {
                        otroIframe.src = src;
                    }, 100);

                    contador++;
                }
            });

            console.log('✅ Videos detenidos:', contador);

            // ================================
            // 5. REPRODUCIR EL VIDEO SELECCIONADO
            // ================================

            // Forzar la reproducción del video clicado (solo para YouTube)
            try {
                // Para YouTube: enviar comando de reproducción
                if (iframe.src.includes('youtube.com') || iframe.src.includes('youtu.be')) {
                    iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                    console.log('▶️ Intentando reproducir YouTube');
                }

                // Para Cloudinary: el video se reproduce automáticamente al hacer clic
                if (iframe.src.includes('player.cloudinary.com')) {
                    console.log('▶️ Cloudinary se reproduce automáticamente');
                }
            } catch (e) {
                console.log('Error al reproducir:', e);
            }
        });

        // ================================
        // 6. TAMBIÉN CAPTURAR CLICS EN EL IFRAME
        // ================================

        iframe.addEventListener('click', function (e) {
            // Simular clic en el overlay
            overlay.click();
        });

    });

    console.log('✅ Control de videos activado');
});