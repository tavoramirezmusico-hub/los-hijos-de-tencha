// =====================================
// LOS HIJOS DE TENCHA
// EVENTOS GOOGLE ANALYTICS
// =====================================

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {

    // =====================================
    // CONFIGURACIÓN GENERAL
    // =====================================

    // Verificar que gtag existe
    if (typeof gtag !== 'function') {
        console.warn('Google Analytics no está cargado');
        return;
    }

    // =====================================
    // 1. RASTREO DE ENLACES EXTERNOS
    // =====================================

    document.querySelectorAll('a[href^="http"]').forEach(function (enlace) {
        // Solo enlaces externos (que no sean del mismo sitio)
        if (!enlace.href.includes('tavoramirezmusico-hub.github.io')) {
            enlace.addEventListener('click', function (e) {
                const destino = this.href;
                const texto = this.textContent.trim() || 'enlace';

                gtag('event', 'click_enlace_externo', {
                    'destino': destino,
                    'texto_enlace': texto
                });
            });
        }
    });

    // =====================================
    // 2. RASTREO DE CLICS EN REDES SOCIALES
    // =====================================

    document.querySelectorAll('.redes a').forEach(function (enlace) {
        enlace.addEventListener('click', function (e) {
            let red = 'red_social';
            if (this.href.includes('whatsapp')) red = 'whatsapp';
            else if (this.href.includes('facebook')) red = 'facebook';
            else if (this.href.includes('instagram')) red = 'instagram';
            else if (this.href.includes('mailto')) red = 'email';

            gtag('event', 'click_red_social', {
                'red_social': red,
                'url': this.href
            });
        });
    });

    // =====================================
    // 3. RASTREO DE CLICS EN CONTRATACIONES
    // =====================================

    document.querySelectorAll('.boton.principal, .hero-botones a, .menu a[href="#contacto"]').forEach(function (boton) {
        // Filtrar para que solo sea el botón de contrataciones
        if (boton.textContent.includes('Contrataciones') ||
            boton.textContent.includes('Reservar') ||
            boton.href.includes('contacto')) {

            boton.addEventListener('click', function () {
                gtag('event', 'click_contratacion', {
                    'seccion': this.closest('section')?.id || 'desconocida',
                    'texto': this.textContent.trim()
                });
            });
        }
    });

    // =====================================
    // 4. RASTREO DE CLICS EN TIENDA (WhatsApp)
    // =====================================

    document.querySelectorAll('.camiseta a, .producto-principal button').forEach(function (elemento) {
        elemento.addEventListener('click', function (e) {
            let nombre_producto = 'producto_desconocido';
            let precio = 'desconocido';

            // Si es un enlace de WhatsApp dentro de una camiseta
            const camiseta = this.closest('.camiseta');
            if (camiseta) {
                const nombre = camiseta.querySelector('p')?.textContent || 'camiseta';
                nombre_producto = nombre;
            }

            // Si es el botón "Ver diseños"
            if (this.textContent.includes('Ver diseños')) {
                nombre_producto = 'galeria_camisetas';
            }

            gtag('event', 'click_tienda', {
                'producto': nombre_producto,
                'accion': this.textContent.trim()
            });
        });
    });

    // =====================================
    // 5. RASTREO DE REPRODUCCIÓN DE SPOTIFY
    // =====================================

    document.querySelectorAll('.btn-spotify, .spotify a, .spotify-embed').forEach(function (elemento) {
        elemento.addEventListener('click', function (e) {
            let cancion = 'desconocida';

            // Buscar el nombre de la canción en el contexto
            const contenedor = this.closest('.cancion, .noticia, .contenido-cancion, .contenido-noticia');
            if (contenedor) {
                const titulo = contenedor.querySelector('summary h3, h3, .noticia summary h3')?.textContent || 'desconocida';
                cancion = titulo.trim();
            }

            gtag('event', 'click_spotify', {
                'cancion': cancion,
                'url': this.href || 'embedded'
            });
        });
    });

    // =====================================
    // 6. RASTREO DE REPRODUCCIÓN DE VIDEOS (YouTube/Cloudinary)
    // =====================================

    document.querySelectorAll('.youtube-player iframe').forEach(function (iframe) {
        // Los iframes de YouTube se rastrean con la API de YouTube
        // Esto es un marcador para clics en el contenedor del video
        const contenedor = iframe.closest('.video-card, .momento-card, .lanzamiento-principal, .lanzamiento-secundario');
        if (contenedor) {
            contenedor.addEventListener('click', function (e) {
                // Evitar que se dispare si el clic es en otro elemento
                if (e.target.tagName !== 'IFRAME' && !e.target.closest('iframe')) {
                    gtag('event', 'click_video', {
                        'titulo': this.querySelector('h3')?.textContent || 'video',
                        'seccion': this.closest('section')?.id || 'desconocida'
                    });
                }
            });
        }
    });

    // =====================================
    // 7. RASTREO DE SCROLL PROFUNDO
    // =====================================

    let scrollPorcentajes = { '25': false, '50': false, '75': false, '90': false };

    window.addEventListener('scroll', function () {
        const scrollTop = window.scrollY;
        const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
        const porcentaje = Math.round((scrollTop / alturaTotal) * 100);

        // Enviar evento cuando se alcanza un hito de scroll
        for (let hito in scrollPorcentajes) {
            if (porcentaje >= parseInt(hito) && !scrollPorcentajes[hito]) {
                scrollPorcentajes[hito] = true;
                gtag('event', 'scroll_profundo', {
                    'porcentaje': parseInt(hito),
                    'pagina': window.location.pathname
                });
            }
        }
    });

    // =====================================
    // 8. TIEMPO EN PÁGINA (INTERVALOS)
    // =====================================

    let tiempoEnPagina = 0;
    const intervaloTiempo = setInterval(function () {
        tiempoEnPagina += 10; // Cada 10 segundos
        if (tiempoEnPagina === 30) {
            gtag('event', 'tiempo_pagina', {
                'segundos': 30,
                'pagina': window.location.pathname
            });
        } else if (tiempoEnPagina === 60) {
            gtag('event', 'tiempo_pagina', {
                'segundos': 60,
                'pagina': window.location.pathname
            });
            clearInterval(intervaloTiempo);
        }
    }, 10000); // Cada 10 segundos

    // =====================================
    // 9. PÁGINAS VISTAS POR SECCIÓN (SPA)
    // =====================================

    // Rastrear clics en enlaces internos (para páginas HTML)
    document.querySelectorAll('a[href$=".html"]').forEach(function (enlace) {
        enlace.addEventListener('click', function (e) {
            // Solo si es un enlace a otra página del sitio
            if (this.href.includes('tavoramirezmusico-hub.github.io')) {
                gtag('event', 'navegacion_interna', {
                    'destino': this.href,
                    'texto': this.textContent.trim()
                });
            }
        });
    });

    console.log('✅ Eventos de Analytics configurados correctamente');
});

// =====================================
// CONTROL DE VIDEOS - SOLO UNO A LA VEZ
// =====================================

document.addEventListener('DOMContentLoaded', function () {

    // Seleccionar todos los iframes de video
    const videos = document.querySelectorAll('iframe[src*="youtube.com"], iframe[src*="youtu.be"], iframe[src*="player.cloudinary.com"]');

    videos.forEach(function (video) {

        // Escuchar cuando el video comienza a reproducirse
        video.addEventListener('play', function () {

            // Detener todos los demás videos
            videos.forEach(function (otroVideo) {

                if (otroVideo !== video) {

                    // Para YouTube: enviar comando de pausa
                    try {
                        otroVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                    } catch (e) { }

                    // Para otros videos (Cloudinary, Vimeo, etc.)
                    try {
                        const src = otroVideo.src;
                        otroVideo.src = '';
                        setTimeout(function () {
                            otroVideo.src = src;
                        }, 50);
                    } catch (e) { }

                }

            });

        });

    });

});