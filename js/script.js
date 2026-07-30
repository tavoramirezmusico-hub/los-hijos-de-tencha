// =====================================
// LOS HIJOS DE TENCHA
// SCRIPT.JS
// =====================================

console.log("Sitio Oficial de Los Hijos de Tencha");

// =====================================
// OCULTAR TRANSICIÓN AL CARGAR (FIX)
// =====================================
window.addEventListener('load', function () {
    const transicion = document.getElementById('transicion');
    if (transicion) {
        transicion.classList.remove('activo');
        transicion.style.display = 'none';
    }
});

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
// TRANSICIÓN ENTRE PÁGINAS
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
                pantallaTransicion.style.display = 'flex'; // forzar display

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

// ============================================================
// SISTEMA DE REGISTRO PÚBLICO - LOS HIJOS DE TENCHA
// ============================================================

// ============================================================
// CONFIGURACIÓN DE FIREBASE (si no está ya inicializado)
// ============================================================
if (typeof firebase === 'undefined') {
    console.warn('Firebase no está cargado, cargando...');
    // Firebase ya debería estar cargado desde el HTML
}

// Verificar que Firebase esté disponible
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    const firebaseConfig = {
        apiKey: "AIzaSyDvp_6UFymZZnqxMyL6yobJ3twLMvVkThw",
        authDomain: "base-entradas-tenchos.firebaseapp.com",
        projectId: "base-entradas-tenchos",
        storageBucket: "base-entradas-tenchos.firebasestorage.app",
        messagingSenderId: "273676503007",
        appId: "1:273676503007:web:56180c485b648ef076a66a"
    };
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// ============================================================
// EMAILJS CONFIGURACIÓN
// ============================================================
const EMAILJS_USER_ID = '7bmV4hpwq7pFObQ8W';
const EMAILJS_SERVICE_ID = 'service_49w40s8';
const EMAILJS_TEMPLATE_ID = 'template_5ulhotx';

// Cargar EmailJS dinámicamente si no está cargado
if (typeof emailjs === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    document.head.appendChild(script);
    script.onload = function () {
        emailjs.init(EMAILJS_USER_ID);
        console.log('✅ EmailJS inicializado');
    };
} else {
    emailjs.init(EMAILJS_USER_ID);
}

// ============================================================
// CARGAR EVENTOS EN EL SELECT DE REGISTRO
// ============================================================

async function cargarEventosRegistro() {
    const select = document.getElementById('selectEventoRegistro');
    if (!select) return;

    try {
        const snapshot = await db.collection('eventos').orderBy('creadoEn', 'desc').get();
        let options = '<option value="">Selecciona un evento</option>';

        snapshot.forEach(doc => {
            const data = doc.data();
            options += `<option value="${doc.id}">${data.nombre}</option>`;
        });

        select.innerHTML = options;
    } catch (error) {
        console.error('Error al cargar eventos:', error);
        select.innerHTML = '<option value="">Error al cargar eventos</option>';
    }
}

// ============================================================
// REGISTRAR ASISTENTE DESDE FORMULARIO PÚBLICO
// ============================================================

async function registrarAsistentePublico() {
    const eventoId = document.getElementById('selectEventoRegistro').value;
    const nombre = document.getElementById('nombreRegistro').value.trim();
    const email = document.getElementById('emailRegistro').value.trim();
    const mensaje = document.getElementById('mensajeRegistro');

    // Validar campos
    if (!eventoId) {
        mostrarMensajeRegistro('⚠️ Selecciona un evento', 'error');
        return;
    }
    if (!nombre) {
        mostrarMensajeRegistro('⚠️ Ingresa tu nombre completo', 'error');
        return;
    }
    if (!email || !email.includes('@')) {
        mostrarMensajeRegistro('⚠️ Ingresa un correo válido', 'error');
        return;
    }

    // Mostrar estado de carga
    mostrarMensajeRegistro('⏳ Registrando...', 'info');

    try {
        // Obtener nombre del evento
        const eventoDoc = await db.collection('eventos').doc(eventoId).get();
        const nombreEvento = eventoDoc.exists ? eventoDoc.data().nombre : 'Evento';

        // Crear asistente en Firebase
        const asistente = {
            nombre,
            email,
            ingresado: false,
            fechaIngreso: null,
            eventoId: eventoId,
            creadoEn: new Date().toISOString(),
            banda: 'Los Hijos de Tencha',
            registradoDesde: 'formulario_publico',
            emailEnviado: false
        };

        const docRef = await db.collection('asistentes').add(asistente);

        // Agregar ID al evento
        await db.collection('eventos').doc(eventoId).update({
            asistentes: firebase.firestore.FieldValue.arrayUnion(docRef.id)
        });

        // =====================================
        // ENVIAR CORREO CON EMAILJS
        // =====================================
        try {
            // Esperar a que EmailJS esté listo
            if (typeof emailjs === 'undefined') {
                await new Promise(resolve => {
                    const checkEmailJS = setInterval(() => {
                        if (typeof emailjs !== 'undefined') {
                            clearInterval(checkEmailJS);
                            resolve();
                        }
                    }, 100);
                });
            }

            const qrUrl = `https://tavoramirezmusico-hub.github.io/los-hijos-de-tencha/admin/validador.html?id=${docRef.id}`;

            const templateParams = {
                to_email: email,
                to_name: nombre,
                event_name: nombreEvento,
                asistente_id: docRef.id,
                qr_url: qrUrl
            };

            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

            // Marcar como enviado
            await db.collection('asistentes').doc(docRef.id).update({
                emailEnviado: true,
                emailEnviadoEn: new Date().toISOString()
            });

            console.log('✅ Correo enviado a', email);

        } catch (emailError) {
            console.error('Error al enviar correo:', emailError);
            // El asistente ya está registrado aunque falle el correo
        }

        // Mostrar éxito
        mostrarMensajeRegistro(`✅ ¡Registro exitoso! Se ha enviado un correo a ${email} con tu entrada digital.`, 'success');

        // Limpiar formulario
        document.getElementById('nombreRegistro').value = '';
        document.getElementById('emailRegistro').value = '';

    } catch (error) {
        console.error('Error al registrar:', error);
        mostrarMensajeRegistro('❌ Error al registrar: ' + error.message, 'error');
    }
}

// ============================================================
// MOSTRAR MENSAJE EN FORMULARIO DE REGISTRO
// ============================================================

function mostrarMensajeRegistro(texto, tipo) {
    const mensaje = document.getElementById('mensajeRegistro');
    if (!mensaje) return;

    mensaje.style.display = 'block';
    mensaje.textContent = texto;

    const colores = {
        success: '#00c853',
        error: '#d32f2f',
        info: '#ffcc00'
    };
    mensaje.style.color = colores[tipo] || '#fff';

    if (tipo === 'success' || tipo === 'error') {
        setTimeout(() => {
            mensaje.style.display = 'none';
        }, 6000);
    }
}

// ============================================================
// INICIALIZAR REGISTRO AL CARGAR LA PÁGINA
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
    // Cargar eventos para el registro público
    if (document.getElementById('selectEventoRegistro')) {
        cargarEventosRegistro();
    }
});