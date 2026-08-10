// =====================================
// LOS HIJOS DE TENCHA
// EVENTOS GOOGLE ANALYTICS - VERSIÓN MEJORADA 2.0
// =====================================

// =====================================
// CONFIGURACIÓN
// =====================================

// Verificar que gtag existe
if (typeof gtag !== 'function') {
    console.warn('⚠️ Google Analytics no está cargado');
} else {
    console.log('✅ Google Analytics cargado correctamente');
}

// =====================================
// 1. PÁGINA VISTA DETALLADA (ENRIQUECIDA)
// =====================================

function trackPageView() {
    const pageData = {
        page_title: document.title || 'Los Hijos de Tencha',
        page_location: window.location.href,
        page_path: window.location.pathname,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        device_type: getDeviceType(),
        referrer: document.referrer || '(directo)'
    };

    // Enviar evento personalizado de página vista
    gtag('event', 'page_view_detailed', pageData);

    // También enviar a GA4 como page_view estándar
    gtag('config', 'G-YNRK4G09LN', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
    });

    console.log('📄 Page View:', pageData);
}

function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'tablet';
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua))
        return 'mobile';
    return 'desktop';
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(trackPageView, 100);
});

// =====================================
// 2. RASTREO DE ENLACES EXTERNOS (MEJORADO)
// =====================================

document.querySelectorAll('a[href^="http"]').forEach(function (enlace) {
    if (!enlace.href.includes('tavoramirezmusico-hub.github.io')) {
        enlace.addEventListener('click', function (e) {
            const destino = this.href;
            const texto = this.textContent.trim() || 'enlace';
            const esWhatsApp = destino.includes('whatsapp');
            const esYouTube = destino.includes('youtube') || destino.includes('youtu.be');
            const esSpotify = destino.includes('spotify');

            gtag('event', 'click_enlace_externo', {
                'destino': destino,
                'texto_enlace': texto,
                'tipo': esWhatsApp ? 'whatsapp' : esYouTube ? 'youtube' : esSpotify ? 'spotify' : 'otro',
                'seccion': this.closest('section')?.id || 'desconocida'
            });
        });
    }
});

// =====================================
// 3. RASTREO DE REDES SOCIALES (MEJORADO)
// =====================================

document.querySelectorAll('.redes a, .redes-sociales a, .social-links a, [class*="social"] a, [class*="redes"] a').forEach(
    function (enlace) {
        enlace.addEventListener('click', function (e) {
            let red = 'red_social';
            const url = this.href.toLowerCase();

            if (url.includes('whatsapp')) red = 'whatsapp';
            else if (url.includes('facebook') || url.includes('fb.com')) red = 'facebook';
            else if (url.includes('instagram')) red = 'instagram';
            else if (url.includes('youtube') || url.includes('youtu.be')) red = 'youtube';
            else if (url.includes('tiktok')) red = 'tiktok';
            else if (url.includes('spotify')) red = 'spotify';
            else if (url.includes('mailto')) red = 'email';
            else if (url.includes('twitter') || url.includes('x.com')) red = 'twitter';

            gtag('event', 'click_red_social', {
                'red_social': red,
                'url': this.href,
                'texto': this.textContent.trim() || this.title || red
            });
        });
    });

// =====================================
// 4. RASTREO DE CONTRATACIONES (MEJORADO)
// =====================================

document.querySelectorAll('.boton.principal, .hero-botones a, .menu a[href*="contacto"], .btn-contratar, .contrataciones-btn, [class*="contrat"] a, [class*="reserv"] a')
    .forEach(function (boton) {
        const textoCompleto = boton.textContent?.trim() || '';
        const esContratacion = textoCompleto.includes('Contratac') ||
            textoCompleto.includes('Reservar') ||
            textoCompleto.includes('Cotizar') ||
            boton.href.includes('contacto') ||
            boton.href.includes('contratar');

        if (esContratacion) {
            boton.addEventListener('click', function () {
                const seccion = this.closest('section')?.id || this.closest('[id]')?.id || 'desconocida';
                gtag('event', 'click_contratacion', {
                    'seccion': seccion,
                    'texto': this.textContent.trim(),
                    'url': this.href || 'none'
                });
            });
        }
    });

// =====================================
// 5. RASTREO DE TIENDA / PRODUCTOS (MEJORADO)
// =====================================

// Función para rastrear productos de la tienda
function trackProductClick(producto, accion) {
    gtag('event', 'tienda_interaccion', {
        'producto': producto?.nombre || 'desconocido',
        'precio': producto?.precio || 0,
        'accion': accion || 'click',
        'categoria': producto?.categoria || 'general'
    });
}

// Rastrear todos los botones de "Comprar" y "Ver productos"
document.querySelectorAll('.btn-whatsapp-compra, .btn-destacado, .camiseta a, .producto-principal button, .btn-comprar, .tienda-btn')
    .forEach(function (elemento) {
        elemento.addEventListener('click', function (e) {
            let nombre_producto = 'producto_desconocido';
            let precio = 0;

            // Buscar en el contexto cercano
            const contenedor = this.closest('.camiseta, .producto-principal, .producto-card, .tienda-item');
            if (contenedor) {
                const nombreEl = contenedor.querySelector('p, h3, .nombre-producto, .titulo-producto');
                if (nombreEl) nombre_producto = nombreEl.textContent.trim();

                const precioEl = contenedor.querySelector('.precio-tienda, .precio-destacado, .precio-producto');
                if (precioEl) {
                    const precioText = precioEl.textContent.replace(/[^\d]/g, '');
                    precio = parseInt(precioText) || 0;
                }
            }

            // Si es "Ver diseños" o "Ver todos"
            const texto = this.textContent.trim();
            if (texto.includes('Ver diseños') || texto.includes('Ver todos') || texto.includes('Todos los productos')) {
                gtag('event', 'tienda_interaccion', {
                    'accion': 'ver_todos',
                    'texto': texto
                });
                return;
            }

            // Si es compra por WhatsApp
            if (this.href && this.href.includes('whatsapp')) {
                gtag('event', 'tienda_interaccion', {
                    'producto': nombre_producto,
                    'precio': precio,
                    'accion': 'comprar_whatsapp'
                });
            } else {
                gtag('event', 'tienda_interaccion', {
                    'producto': nombre_producto,
                    'precio': precio,
                    'accion': texto || 'click'
                });
            }
        });
    });

// Rastrear clics en imágenes de productos (zoom)
document.querySelectorAll('.camiseta img, .producto-principal img, .tienda-item img, .producto-card img')
    .forEach(function (img) {
        img.addEventListener('click', function () {
            const contenedor = this.closest('.camiseta, .producto-principal, .tienda-item, .producto-card');
            let nombre = 'producto';
            if (contenedor) {
                const nombreEl = contenedor.querySelector('p, h3, .nombre-producto');
                if (nombreEl) nombre = nombreEl.textContent.trim();
            }
            gtag('event', 'tienda_interaccion', {
                'producto': nombre,
                'accion': 'ver_imagen_ampliada'
            });
        });
    });

// =====================================
// 6. RASTREO DE REPRODUCCIÓN DE SPOTIFY (MEJORADO)
// =====================================

document.querySelectorAll('.btn-spotify, .spotify a, .spotify-embed, [class*="spotify"]')
    .forEach(function (elemento) {
        elemento.addEventListener('click', function (e) {
            let cancion = 'desconocida';
            let album = 'desconocido';
            let artista = 'Los Hijos de Tencha';

            // Buscar el nombre de la canción en el contexto
            const contenedor = this.closest('.cancion, .noticia, .contenido-cancion, .contenido-noticia, .card-musica, .lanzamiento-card');
            if (contenedor) {
                const titulo = contenedor.querySelector('summary h3, h3, .titulo-cancion, .nombre-cancion');
                if (titulo) cancion = titulo.textContent.trim();

                const artistaEl = contenedor.querySelector('.artista, .nombre-artista');
                if (artistaEl) artista = artistaEl.textContent.trim();

                const albumEl = contenedor.querySelector('.album, .nombre-album');
                if (albumEl) album = albumEl.textContent.trim();
            }

            gtag('event', 'click_spotify', {
                'cancion': cancion,
                'artista': artista,
                'album': album,
                'url': this.href || 'embedded',
                'seccion': this.closest('section')?.id || 'desconocida'
            });
        });
    });

// =====================================
// 7. RASTREO DE REPRODUCCIÓN DE VIDEOS (MEJORADO)
// =====================================

// Para YouTube embeds
document.querySelectorAll('.youtube-player iframe, .video-card iframe, .lanzamiento-principal iframe, .lanzamiento-secundario iframe, .video-embed iframe')
    .forEach(function (iframe) {
        // Escuchar eventos de reproducción
        try {
            // Si el iframe tiene API de YouTube
            if (iframe.src && iframe.src.includes('youtube.com') && iframe.src.includes('enablejsapi=1')) {
                // Ya se maneja con la API
            }
        } catch (e) { }

        // Clic en el contenedor del video
        const contenedor = iframe.closest('.video-card, .momento-card, .lanzamiento-principal, .lanzamiento-secundario, .card-video, .video-wrapper');
        if (contenedor) {
            contenedor.addEventListener('click', function (e) {
                if (e.target.tagName !== 'IFRAME' && !e.target.closest('iframe')) {
                    const titulo = this.querySelector('h3, .titulo-video, .nombre-video')?.textContent || 'video';
                    gtag('event', 'click_video', {
                        'titulo': titulo.trim(),
                        'seccion': this.closest('section')?.id || 'desconocida',
                        'plataforma': iframe.src?.includes('youtube') ? 'youtube' :
                            iframe.src?.includes('cloudinary') ? 'cloudinary' : 'otro'
                    });
                }
            });
        }
    });

// =====================================
// 8. RASTREO DE SCROLL PROFUNDO (MEJORADO)
// =====================================

let scrollPorcentajes = { '25': false, '50': false, '75': false, '90': false, '100': false };

window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY;
    const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;

    if (alturaTotal <= 0) return;

    const porcentaje = Math.round((scrollTop / alturaTotal) * 100);

    // Enviar evento cuando se alcanza un hito de scroll
    for (let hito in scrollPorcentajes) {
        if (porcentaje >= parseInt(hito) && !scrollPorcentajes[hito]) {
            scrollPorcentajes[hito] = true;

            // Datos adicionales: qué sección es visible
            let seccionVisible = 'desconocida';
            const secciones = document.querySelectorAll('section[id]');
            secciones.forEach(sec => {
                const rect = sec.getBoundingClientRect();
                if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                    seccionVisible = sec.id;
                }
            });

            gtag('event', 'scroll_profundo', {
                'porcentaje': parseInt(hito),
                'pagina': window.location.pathname,
                'seccion_visible': seccionVisible,
                'tiempo_en_pagina': Math.floor(document._tiempoInicio ? (Date.now() - document._tiempoInicio) /
                    1000 : 0)
            });

            console.log(`📜 Scroll profundo: ${hito}% en ${seccionVisible}`);
        }
    }
}, { passive: true });

// =====================================
// 9. TIEMPO EN PÁGINA (MEJORADO)
// =====================================

let tiempoEnPagina = 0;
let hitosTiempo = { '10': false, '30': false, '60': false, '120': false, '300': false };
document._tiempoInicio = Date.now();

const intervaloTiempo = setInterval(function () {
    tiempoEnPagina += 10;
    const segundos = tiempoEnPagina;

    // Enviar evento en cada hito
    for (let hito in hitosTiempo) {
        if (segundos === parseInt(hito) && !hitosTiempo[hito]) {
            hitosTiempo[hito] = true;
            gtag('event', 'tiempo_pagina', {
                'segundos': parseInt(hito),
                'pagina': window.location.pathname,
                'scroll_porcentaje': Math.round((window.scrollY / (document.documentElement.scrollHeight - window
                    .innerHeight)) * 100) || 0
            });
            console.log(`⏱️ Tiempo: ${hito}s en ${window.location.pathname}`);
            break;
        }
    }

    // Limpiar después de 5 minutos
    if (segundos >= 300) {
        clearInterval(intervaloTiempo);
    }
}, 10000);

// =====================================
// 10. RASTREO DE SALIDA DE PÁGINA (Bounce Prevention)
// =====================================

let _paginaVistaIniciada = false;

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        // Usuario cambió de pestaña o minimizó
        gtag('event', 'salida_tab', {
            'tiempo_total': Math.floor((Date.now() - document._tiempoInicio) / 1000),
            'pagina': window.location.pathname
        });
    } else {
        // Usuario volvió a la pestaña
        gtag('event', 'retorno_tab', {
            'tiempo_fuera': Math.floor((Date.now() - document._tiempoInicio) / 1000),
            'pagina': window.location.pathname
        });
    }
});

// Detectar cierre de página / navegación
window.addEventListener('beforeunload', function () {
    const tiempoTotal = Math.floor((Date.now() - document._tiempoInicio) / 1000);
    if (tiempoTotal > 3) { // Solo si estuvo más de 3 segundos
        gtag('event', 'salida_pagina', {
            'tiempo_total': tiempoTotal,
            'pagina': window.location.pathname,
            'scroll_maximo': Math.round((window.scrollY / (document.documentElement.scrollHeight - window
                .innerHeight)) * 100) || 0
        });
    }
});

// =====================================
// 11. RASTREO DE FORMULARIO DE REGISTRO
// =====================================

// Interacción con el selector de eventos
document.addEventListener('DOMContentLoaded', function () {
    const selectEvento = document.getElementById('selectEventoRegistro');
    if (selectEvento) {
        selectEvento.addEventListener('change', function () {
            const eventoId = this.value;
            const eventoNombre = this.options[this.selectedIndex]?.text || 'desconocido';
            gtag('event', 'evento_seleccionado', {
                'evento_id': eventoId,
                'evento_nombre': eventoNombre,
                'pagina': window.location.pathname
            });
        });
    }
});

// Interacción con campos del formulario
document.querySelectorAll('#nombreRegistro, #emailRegistro, #sinpeRegistro, #transferenciaRegistro')
    .forEach(function (input) {
        input.addEventListener('focus', function () {
            gtag('event', 'formulario_focus', {
                'campo': this.id,
                'pagina': window.location.pathname
            });
        });

        input.addEventListener('blur', function () {
            if (this.value && this.value.length > 0) {
                gtag('event', 'formulario_rellenado', {
                    'campo': this.id,
                    'pagina': window.location.pathname
                });
            }
        });
    });

// =====================================
// 12. RASTREO DE CLICS EN EL MENÚ DE NAVEGACIÓN
// =====================================

document.querySelectorAll('.menu a, .menu span, nav a, .nav-link')
    .forEach(function (item) {
        item.addEventListener('click', function () {
            const texto = this.textContent.trim();
            const destino = this.getAttribute('href') || 'none';
            const esActivo = this.classList.contains('menu-activo');

            gtag('event', 'click_menu', {
                'texto': texto,
                'destino': destino,
                'es_activo': esActivo,
                'pagina': window.location.pathname
            });
        });
    });

// =====================================
// 13. RASTREO DE INTERACCIÓN CON SECCIONES (Engagement)
// =====================================

// Detectar cuando una sección entra en el viewport
const seccionesObservadas = new Set();

const observerSecciones = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.target.id && !seccionesObservadas.has(entry.target.id)) {
            seccionesObservadas.add(entry.target.id);
            gtag('event', 'seccion_visible', {
                'seccion': entry.target.id,
                'pagina': window.location.pathname,
                'tiempo_en_pagina': Math.floor((Date.now() - document._tiempoInicio) / 1000)
            });
            console.log(`👁️ Sección visible: ${entry.target.id}`);
        }
    });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('section[id]').forEach(function (sec) {
        observerSecciones.observe(sec);
    });
});

// =====================================
// 14. RASTREO DE CLICS EN EL BOTÓN DE COMUNIDAD WHATSAPP
// =====================================

document.querySelectorAll('.btn-comunidad, .whatsapp-comunidad, [class*="comunidad"] a')
    .forEach(function (btn) {
        btn.addEventListener('click', function () {
            gtag('event', 'click_comunidad_whatsapp', {
                'seccion': this.closest('section')?.id || 'desconocida',
                'texto': this.textContent.trim() || 'unirse_comunidad',
                'pagina': window.location.pathname
            });
        });
    });

// =====================================
// 15. RASTREO DE CLICS EN GALERÍA / IMÁGENES
// =====================================

document.querySelectorAll('.grid-integrantes img, .galeria img, .fotos img, .integrante-img')
    .forEach(function (img) {
        img.addEventListener('click', function () {
            const alt = this.alt || 'imagen';
            const contenedor = this.closest('.integrante, .galeria-item, .foto-item');
            const nombre = contenedor?.querySelector('p, h3, .nombre')?.textContent || alt;

            gtag('event', 'click_imagen', {
                'imagen': alt,
                'nombre': nombre.trim(),
                'seccion': this.closest('section')?.id || 'desconocida',
                'pagina': window.location.pathname
            });
        });
    });

// =====================================
// 16. RASTREO DE TIEMPO DE CARGA (Performance)
// =====================================

if (window.performance) {
    window.addEventListener('load', function () {
        setTimeout(function () {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            const domReady = perfData.domContentLoadedEventEnd - perfData.navigationStart;

            gtag('event', 'rendimiento_pagina', {
                'tiempo_carga_total': loadTime,
                'tiempo_dom_ready': domReady,
                'pagina': window.location.pathname
            });

            console.log(`⚡ Rendimiento: carga ${loadTime}ms, DOM ${domReady}ms`);
        }, 500);
    });
}

// =====================================
// 17. RASTREO DE ERRORES DE CARGA DE IMÁGENES
// =====================================

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('img').forEach(function (img) {
        img.addEventListener('error', function () {
            gtag('event', 'error_imagen', {
                'src': this.src,
                'alt': this.alt || 'sin_alt',
                'pagina': window.location.pathname
            });
            console.warn(`🖼️ Error de carga de imagen: ${this.src}`);
        });
    });
});

// =====================================
// 18. RASTREO DE CLICS EN EL BOTÓN DE SUBIR
// =====================================

document.addEventListener('DOMContentLoaded', function () {
    const btnSubir = document.getElementById('subir');
    if (btnSubir) {
        btnSubir.addEventListener('click', function () {
            gtag('event', 'click_subir', {
                'pagina': window.location.pathname,
                'scroll_actual': Math.round((window.scrollY / (document.documentElement.scrollHeight - window
                    .innerHeight)) * 100) || 0
            });
        });
    }
});

// =====================================
// 19. RASTREO DE INTERACCIÓN CON EL VISOR DE IMÁGENES
// =====================================

document.addEventListener('DOMContentLoaded', function () {
    const visor = document.getElementById('visor-tienda');
    if (visor) {
        visor.addEventListener('click', function (e) {
            if (e.target === this || e.target.classList.contains('cerrar-visor-tienda')) {
                gtag('event', 'visor_cerrado', {
                    'pagina': window.location.pathname
                });
            }
        });
    }
});

// =====================================
// 20. REGISTRO DE USUARIO COMPLETADO (desde el formulario)
// =====================================

// Esta función se llama desde el código del formulario cuando el registro es exitoso
window.trackRegistroExitoso = function (eventoNombre, esPago) {
    gtag('event', 'registro_exitoso', {
        'evento': eventoNombre || 'desconocido',
        'es_pago': esPago || false,
        'pagina': window.location.pathname
    });
    console.log('🎟️ Registro exitoso rastreado:', eventoNombre);
};

// =====================================
// 21. RASTREO DE CLICS EN CANCIONES / LANZAMIENTOS
// =====================================

document.addEventListener('DOMContentLoaded', function () {
    const lista = document.getElementById('listaReproduccionIndex');
    if (lista) {
        lista.addEventListener('click', function (e) {
            const item = e.target.closest('.item-lista-index');
            if (item) {
                const titulo = item.querySelector('.item-titulo')?.textContent || 'desconocido';
                const tipo = item.querySelector('.item-tipo')?.textContent || 'sencillo';
                gtag('event', 'click_cancion_lista', {
                    'cancion': titulo,
                    'tipo': tipo,
                    'pagina': window.location.pathname
                });
            }
        });
    }
});

// =====================================
// 22. RASTREO DE CLICS EN TARJETAS DE EVENTOS
// =====================================

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.card-evento').forEach(function (card) {
        card.addEventListener('click', function (e) {
            // No rastrear si el clic fue en un botón o enlace
            if (e.target.closest('a, button, .boton')) return;

            const nombre = this.querySelector('.info-evento h3')?.textContent || 'evento';
            gtag('event', 'click_card_evento', {
                'evento': nombre.trim(),
                'pagina': window.location.pathname
            });
        });
    });
});

// =====================================
// RESUMEN FINAL
// =====================================

console.log('✅ EVENTOS DE ANALYTICS MEJORADOS - VERSIÓN 2.0');
console.log('📊 Eventos configurados:');
console.log('  • Page View detallado');
console.log('  • Enlaces externos y redes sociales');
console.log('  • Contrataciones y tienda');
console.log('  • Spotify, videos y lanzamientos');
console.log('  • Scroll profundo (25%, 50%, 75%, 90%, 100%)');
console.log('  • Tiempo en página (10s, 30s, 60s, 120s, 300s)');
console.log('  • Formulario de registro (interacciones)');
console.log('  • Menú de navegación');
console.log('  • Secciones visibles (engagement)');
console.log('  • Imágenes y galería');
console.log('  • Rendimiento y errores');
console.log('  • Salida de página y bounce');
console.log('  • Y más...');