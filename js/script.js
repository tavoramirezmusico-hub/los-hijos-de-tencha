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

if (visorGaleria && imagenGaleria && fotos.length) {
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

    cerrarGaleria.addEventListener("click", () => {
        visorGaleria.style.display = "none";
        document.body.style.overflow = "";
    });

    visorGaleria.addEventListener("click", (e) => {
        if (e.target === visorGaleria) {
            visorGaleria.style.display = "none";
            document.body.style.overflow = "";
        }
    });

    siguiente.addEventListener("click", (e) => {
        e.stopPropagation();
        indiceActual++;
        if (indiceActual >= fotos.length) {
            indiceActual = 0;
        }
        mostrarFoto(indiceActual);
    });

    anterior.addEventListener("click", (e) => {
        e.stopPropagation();
        indiceActual--;
        if (indiceActual < 0) {
            indiceActual = fotos.length - 1;
        }
        mostrarFoto(indiceActual);
    });

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
        document.querySelectorAll(".noticia").forEach((noticia) => {
            noticia.open = false;
        });
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
// TRANSICIÓN ENTRE PÁGINAS (MODIFICADO)
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

            // ⚠️ EXCLUIR enlaces que van a noticias.html con ancla
            if (destino.includes("noticias.html#")) {
                return; // No aplicar transición
            }

            // ⚠️ EXCLUIR enlaces que van a noticias.html con parámetros
            if (destino.includes("noticias.html?abrir=")) {
                return; // No aplicar transición
            }

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
// TENCHA NOTICIAS - SOLO UNA ABIERTA
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
    function fixSpotifyPlayer() {
        const spotifyEmbeds = document.querySelectorAll('.spotify-embed iframe');
        spotifyEmbeds.forEach(function (iframe) {
            const container = iframe.closest('.spotify-embed');
            if (container) {
                const containerWidth = container.offsetWidth;
                if (containerWidth > 0 && containerWidth < 500) {
                    iframe.style.width = '100%';
                    iframe.style.minWidth = '100%';
                }
            }
        });
    }

    fixSpotifyPlayer();
    window.addEventListener('resize', fixSpotifyPlayer);
    setTimeout(fixSpotifyPlayer, 1000);
});


// =====================================
// CONTROL DE VIDEOS - VERSIÓN SIMPLE Y 100% EFECTIVA
// =====================================

document.addEventListener('DOMContentLoaded', function () {

    // 1. Seleccionar todos los contenedores de video
    var contenedores = document.querySelectorAll(
        '.video-card, .momento-card, .lanzamiento-principal, .lanzamiento-secundario, .youtube-player'
    );

    console.log('🎬 Contenedores de video encontrados:', contenedores.length);

    // 2. Función para recargar todos los iframes excepto uno
    function recargarTodosLosIframes(excepto) {
        var todos = document.querySelectorAll(
            '.video-card iframe, .momento-card iframe, .lanzamiento-principal iframe, .lanzamiento-secundario iframe, .youtube-player iframe'
        );
        todos.forEach(function (iframe) {
            if (iframe !== excepto) {
                var src = iframe.src;
                if (src) {
                    iframe.src = '';
                    setTimeout(function () {
                        iframe.src = src;
                    }, 50);
                }
            }
        });
    }

    // 3. Agregar evento a cada contenedor
    contenedores.forEach(function (contenedor) {
        var iframe = contenedor.querySelector('iframe');
        if (!iframe) return;

        // Guardar la URL original del iframe
        var urlOriginal = iframe.src;
        iframe.dataset.urlOriginal = urlOriginal;

        // Cuando el usuario haga clic en el contenedor
        contenedor.addEventListener('click', function (e) {
            // Si el clic fue en el iframe o en el contenedor
            console.log('▶️ Clic en video:', contenedor.className);

            // Recargar todos los demás iframes (para detenerlos)
            recargarTodosLosIframes(iframe);

            // Ahora, recargar el iframe clicado con autoplay (solo para YouTube)
            var src = iframe.dataset.urlOriginal || iframe.src;
            if (src.includes('youtube.com') || src.includes('youtu.be')) {
                // Agregar autoplay=1
                var nuevaSrc = src;
                if (nuevaSrc.includes('?')) {
                    nuevaSrc += '&autoplay=1';
                } else {
                    nuevaSrc += '?autoplay=1';
                }
                // Quitar posibles autoplay previos
                nuevaSrc = nuevaSrc.replace(/autoplay=0/g, 'autoplay=1');
                iframe.src = '';
                setTimeout(function () {
                    iframe.src = nuevaSrc;
                }, 100);
            } else {
                // Para Cloudinary, solo recargar (ya se reproduce automáticamente)
                iframe.src = '';
                setTimeout(function () {
                    iframe.src = src;
                }, 100);
            }
        });

        // También capturar clics directamente en el iframe
        iframe.addEventListener('click', function (e) {
            // El clic en el iframe no siempre se propaga, pero forzamos
            contenedor.click();
        });
    });

    console.log('✅ Control de videos activado (modo simple)');
});


// =====================================
// FIX PARA ANCLA EN NOTICIAS (MÓVIL)
// =====================================

document.addEventListener('DOMContentLoaded', function () {
    // Verificar si venimos con ancla
    if (window.location.hash === '#noticia-25-julio') {
        const noticia = document.getElementById('noticia-25-julio');
        if (noticia) {
            // 1. Abrir la noticia
            noticia.open = true;

            // 2. Esperar a que se renderice
            setTimeout(function () {
                // 3. Forzar scroll con offset para móvil
                const rect = noticia.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const offset = 80; // Espacio desde arriba
                const targetPosition = rect.top + scrollTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // 4. Forzar un segundo scroll después de la animación
                setTimeout(function () {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 500);

            }, 300);
        }
    }

    // Verificar si venimos con parámetro URL (Plan B)
    const params = new URLSearchParams(window.location.search);
    if (params.get('abrir') === '25-julio') {
        const noticia = document.getElementById('noticia-25-julio');
        if (noticia) {
            noticia.open = true;
            setTimeout(function () {
                const rect = noticia.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const offset = 80;
                const targetPosition = rect.top + scrollTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 300);
        }
    }
});