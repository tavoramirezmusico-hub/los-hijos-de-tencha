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
// CONTROL DE VIDEOS - SOLO UNO A LA VEZ (CON POINTER-EVENTS)
// =====================================

document.addEventListener('DOMContentLoaded', function () {

    // ================================
    // 1. DETECTAR CUANDO UN VIDEO SE REPRODUCE
    // ================================

    // Función para detener todos los videos excepto uno
    function detenerTodosLosVideos(exceptoIframe) {

        var todosLosIframes = document.querySelectorAll(
            '.video-card iframe, .momento-card iframe, .lanzamiento-principal iframe, .lanzamiento-secundario iframe, .youtube-player iframe'
        );

        todosLosIframes.forEach(function (otroIframe) {

            if (otroIframe !== exceptoIframe) {

                var src = otroIframe.src;

                if (src) {
                    // Recargar el iframe para detenerlo
                    otroIframe.src = '';
                    setTimeout(function () {
                        otroIframe.src = src;
                    }, 50);
                }

            }

        });

    }

    // ================================
    // 2. PARA YOUTUBE: USAR LA API
    // ================================

    // Variable para almacenar reproductores
    var reproductoresYT = [];
    var apiCargada = false;

    // Función que se ejecuta cuando la API de YouTube está lista
    window.onYouTubeIframeAPIReady = function () {
        console.log('API de YouTube lista');
        apiCargada = true;
        inicializarReproductoresYT();
    };

    function inicializarReproductoresYT() {

        var iframes = document.querySelectorAll('iframe[src*="youtube.com"], iframe[src*="youtu.be"]');

        iframes.forEach(function (iframe, index) {

            if (!iframe.id) {
                iframe.id = 'yt-player-' + Date.now() + '-' + index;
            }

            try {
                var reproductor = new YT.Player(iframe.id, {
                    events: {
                        'onStateChange': function (event) {
                            // Si el video está reproduciéndose (estado = 1)
                            if (event.data === 1) {
                                console.log('▶️ YouTube reproduciéndose');
                                // Detener todos los demás
                                detenerTodosLosVideos(iframe);
                            }
                        }
                    }
                });

                reproductoresYT.push(reproductor);

            } catch (e) {
                console.log('Error al crear reproductor YouTube:', e);
            }

        });

    }

    // Cargar la API de YouTube
    function cargarAPIYouTube() {
        if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
            return;
        }
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
    }

    cargarAPIYouTube();

    // ================================
    // 3. PARA CLOUDINARY: USAR OVERLAY CON POINTER-EVENTS: NONE
    // ================================

    var contenedoresCloud = document.querySelectorAll('.momento-card, .video-card');

    contenedoresCloud.forEach(function (contenedor) {

        var iframe = contenedor.querySelector('iframe[src*="player.cloudinary.com"]');

        if (iframe) {

            // Crear overlay transparente que NO bloquea clics
            var overlay = document.createElement('div');
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.zIndex = '10';
            overlay.style.pointerEvents = 'none'; // ¡IMPORTANTE! No bloquea clics
            overlay.style.background = 'rgba(0,0,0,0)';

            contenedor.style.position = 'relative';
            contenedor.appendChild(overlay);

            // Detectar clics en el iframe (para Cloudinary)
            iframe.addEventListener('click', function () {
                console.log('▶️ Cloudinary reproduciéndose');
                // Detener todos los demás
                detenerTodosLosVideos(iframe);
            });

        }

    });

    // ================================
    // 4. TAMBIÉN PARA LANZAMIENTOS (INDEX)
    // ================================

    var contenedoresLanzamiento = document.querySelectorAll('.lanzamiento-principal, .lanzamiento-secundario');

    contenedoresLanzamiento.forEach(function (contenedor) {

        var iframe = contenedor.querySelector('iframe[src*="youtube.com"]');

        if (iframe) {
            // Los de YouTube ya los maneja la API
        }

    });

    console.log('✅ Control de videos activado');

});