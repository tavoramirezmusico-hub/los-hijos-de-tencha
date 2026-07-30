// =====================================
// LOS HIJOS DE TENCHA
// SCRIPT.JS - COMPLETO CON SISTEMA DE REGISTRO Y GALERÍA MEJORADA
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
// GALERÍA CON CATEGORÍAS - DATOS
// =====================================

const galeriaDatos = {
    'vocho': {
        titulo: 'Sesión Vocho',
        fotos: [
            'img/galeria/foto1.webp',
            'img/galeria/foto2.webp'
        ]
    },
    'disco': {
        titulo: 'Sesión Disco Cumbias',
        fotos: [
            'img/galeria/foto3.webp',
            'img/galeria/foto4.webp'
        ]
    },
    'lanzamiento': {
        titulo: 'Cumbia Salvaje - Lanzamiento',
        fotos: [
            'img/galeria/lanzamiento/foto1.webp',
            'img/galeria/lanzamiento/foto2.webp',
            'img/galeria/lanzamiento/foto3.webp'
        ]
    },
    // 'eventos': {   // ← COMENTADO
    //     titulo: 'Eventos',
    //     fotos: [
    //         'img/galeria/eventos/foto1.webp',
    //         'img/galeria/eventos/foto2.webp'
    //     ]
    // }
};

// =====================================
// GALERÍA CON CATEGORÍAS - FUNCIONES
// =====================================

let categoriaActual = 'todas';
let fotosActuales = [];
let indiceActualVisor = 0;

function cargarGaleria(categoria) {
    const grid = document.getElementById('galeriaGrid');
    if (!grid) return;

    categoriaActual = categoria;

    let fotos = [];
    if (categoria === 'todas') {
        Object.keys(galeriaDatos).forEach(key => {
            fotos = fotos.concat(galeriaDatos[key].fotos);
        });
    } else if (galeriaDatos[categoria]) {
        fotos = galeriaDatos[categoria].fotos;
    }

    fotosActuales = fotos;

    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.categoria === categoria);
    });

    if (fotos.length === 0) {
        grid.innerHTML = `<div class="galeria-vacia">📸 No hay fotos en esta categoría aún.</div>`;
        return;
    }

    grid.innerHTML = fotos.map((foto, index) => `
        <div class="foto animar" data-index="${index}">
            <img src="${foto}" loading="lazy" alt="${galeriaDatos[categoria]?.titulo || 'Foto'}">
            <div class="foto-overlay">
                <span>${galeriaDatos[categoria]?.titulo || 'Evento'}</span>
            </div>
        </div>
    `).join('');

    grid.querySelectorAll('.foto').forEach(el => {
        el.addEventListener('click', function () {
            const index = parseInt(this.dataset.index);
            abrirVisor(index);
        });
    });

    document.querySelectorAll('.galeria-grid .foto').forEach(el => {
        setTimeout(() => el.classList.add('visible'), 100);
    });
}

// =====================================
// VISOR DE GALERÍA MEJORADO
// =====================================

const visorGaleria = document.getElementById('visor-galeria');
const imagenGaleria = document.getElementById('imagen-galeria');
const cerrarGaleria = document.getElementById('cerrar-galeria');
const anterior = document.getElementById('foto-anterior');
const siguiente = document.getElementById('foto-siguiente');
const fotoActual = document.getElementById('foto-actual');
const totalFotos = document.getElementById('total-fotos');

function abrirVisor(index) {
    if (!visorGaleria || !imagenGaleria) return;
    if (fotosActuales.length === 0) return;

    indiceActualVisor = index;
    mostrarFotoVisor(indiceActualVisor);
    visorGaleria.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function mostrarFotoVisor(indice) {
    if (!imagenGaleria || !fotoActual || !totalFotos) return;
    if (fotosActuales.length === 0) return;

    if (indice < 0) indice = fotosActuales.length - 1;
    if (indice >= fotosActuales.length) indice = 0;

    indiceActualVisor = indice;
    imagenGaleria.src = fotosActuales[indice];
    fotoActual.textContent = indice + 1;
    totalFotos.textContent = fotosActuales.length;

    imagenGaleria.style.animation = 'none';
    setTimeout(() => {
        imagenGaleria.style.animation = 'zoomEntrada .35s ease';
    }, 50);
}

function cerrarVisor() {
    if (visorGaleria) {
        visorGaleria.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (cerrarGaleria) {
    cerrarGaleria.addEventListener('click', cerrarVisor);
}

if (visorGaleria) {
    visorGaleria.addEventListener('click', (e) => {
        if (e.target === visorGaleria) {
            cerrarVisor();
        }
    });
}

if (anterior) {
    anterior.addEventListener('click', (e) => {
        e.stopPropagation();
        mostrarFotoVisor(indiceActualVisor - 1);
    });
}

if (siguiente) {
    siguiente.addEventListener('click', (e) => {
        e.stopPropagation();
        mostrarFotoVisor(indiceActualVisor + 1);
    });
}

document.addEventListener('keydown', (e) => {
    if (!visorGaleria || !visorGaleria.classList.contains('active')) return;
    if (e.key === 'Escape') cerrarVisor();
    if (e.key === 'ArrowRight') mostrarFotoVisor(indiceActualVisor + 1);
    if (e.key === 'ArrowLeft') mostrarFotoVisor(indiceActualVisor - 1);
});

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
                pantallaTransicion.style.display = 'flex';

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
// CONTROL DE VIDEOS - VERSIÓN SIMPLE
// =====================================

document.addEventListener('DOMContentLoaded', function () {

    var contenedores = document.querySelectorAll(
        '.video-card, .momento-card, .lanzamiento-principal, .lanzamiento-secundario, .youtube-player'
    );

    console.log('🎬 Contenedores de video encontrados:', contenedores.length);

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

    contenedores.forEach(function (contenedor) {
        var iframe = contenedor.querySelector('iframe');
        if (!iframe) return;

        var urlOriginal = iframe.src;
        iframe.dataset.urlOriginal = urlOriginal;

        contenedor.addEventListener('click', function (e) {
            console.log('▶️ Clic en video:', contenedor.className);

            recargarTodosLosIframes(iframe);

            var src = iframe.dataset.urlOriginal || iframe.src;
            if (src.includes('youtube.com') || src.includes('youtu.be')) {
                var nuevaSrc = src;
                if (nuevaSrc.includes('?')) {
                    nuevaSrc += '&autoplay=1';
                } else {
                    nuevaSrc += '?autoplay=1';
                }
                nuevaSrc = nuevaSrc.replace(/autoplay=0/g, 'autoplay=1');
                iframe.src = '';
                setTimeout(function () {
                    iframe.src = nuevaSrc;
                }, 100);
            } else {
                iframe.src = '';
                setTimeout(function () {
                    iframe.src = src;
                }, 100);
            }
        });

        iframe.addEventListener('click', function (e) {
            contenedor.click();
        });
    });

    console.log('✅ Control de videos activado (modo simple)');
});

// ============================================================
// SISTEMA DE REGISTRO PÚBLICO - LOS HIJOS DE TENCHA
// ============================================================

// ============================================================
// CONFIGURACIÓN DE FIREBASE
// ============================================================
(function () {
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
        console.log('✅ Firebase inicializado desde script.js');
    } else if (typeof firebase === 'undefined') {
        console.error('❌ Firebase no está cargado. Verifica los scripts en index.html');
    }
})();

let db;
try {
    db = firebase.firestore();
    console.log('✅ Firestore disponible');
} catch (error) {
    console.error('❌ Error al obtener Firestore:', error);
}

// ============================================================
// EMAILJS CONFIGURACIÓN
// ============================================================
const EMAILJS_USER_ID = '7bmV4hpwq7pFObQ8W';
const EMAILJS_SERVICE_ID = 'service_49w40s8';
const EMAILJS_TEMPLATE_ID = 'template_5ulhotx';

function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        try {
            emailjs.init(EMAILJS_USER_ID);
            console.log('✅ EmailJS inicializado correctamente');
            return true;
        } catch (e) {
            console.error('❌ Error al inicializar EmailJS:', e);
            return false;
        }
    } else {
        console.warn('⚠️ EmailJS no está cargado, intentando cargar dinámicamente...');
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
            script.onload = function () {
                try {
                    emailjs.init(EMAILJS_USER_ID);
                    console.log('✅ EmailJS inicializado (carga dinámica)');
                    resolve(true);
                } catch (e) {
                    console.error('❌ Error al inicializar EmailJS (carga dinámica):', e);
                    resolve(false);
                }
            };
            script.onerror = function () {
                console.error('❌ No se pudo cargar EmailJS');
                resolve(false);
            };
            document.head.appendChild(script);
        });
    }
}

initEmailJS();

// ============================================================
// CARGAR EVENTOS EN EL SELECT DE REGISTRO
// ============================================================

async function cargarEventosRegistro() {
    const select = document.getElementById('selectEventoRegistro');
    if (!select) {
        console.warn('⚠️ No se encontró el select de eventos');
        return;
    }

    if (!db) {
        select.innerHTML = '<option value="">Error: Firebase no disponible</option>';
        console.error('❌ Firestore no disponible');
        return;
    }

    try {
        console.log('🔄 Cargando eventos desde Firebase...');
        const snapshot = await db.collection('eventos').orderBy('creadoEn', 'desc').get();

        let options = '<option value="">Selecciona un evento</option>';

        if (snapshot.empty) {
            options = '<option value="">No hay eventos disponibles</option>';
            console.log('ℹ️ No hay eventos creados');
        } else {
            snapshot.forEach(doc => {
                const data = doc.data();
                options += `<option value="${doc.id}">${data.nombre}</option>`;
            });
            console.log(`✅ ${snapshot.size} eventos cargados`);
        }

        select.innerHTML = options;
    } catch (error) {
        console.error('❌ Error al cargar eventos:', error);
        select.innerHTML = '<option value="">Error al cargar eventos</option>';
    }
}

// ============================================================
// REGISTRAR ASISTENTE DESDE FORMULARIO PÚBLICO - CORREGIDO
// ============================================================

async function registrarAsistentePublico() {
    const eventoId = document.getElementById('selectEventoRegistro').value;
    const nombre = document.getElementById('nombreRegistro').value.trim();
    const email = document.getElementById('emailRegistro').value.trim();

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

    mostrarMensajeRegistro('⏳ Registrando...', 'info');

    try {
        // Obtener datos completos del evento
        const eventoDoc = await db.collection('eventos').doc(eventoId).get();
        const eventoData = eventoDoc.exists ? eventoDoc.data() : null;
        const nombreEvento = eventoData ? eventoData.nombre : 'Evento';

        // Formatear fecha y hora para el correo
        let fechaFormateada = 'Fecha por confirmar';
        let horaFormateada = 'Hora por confirmar';
        let lugarFormateado = eventoData?.lugar || '';

        if (eventoData?.fecha) {
            try {
                const fechaObj = new Date(eventoData.fecha + 'T00:00:00');
                const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
                fechaFormateada = fechaObj.getDate() + ' de ' + meses[fechaObj.getMonth()] + ' ' + fechaObj.getFullYear();
            } catch (e) {
                fechaFormateada = eventoData.fecha;
            }
        }

        if (eventoData?.hora) {
            horaFormateada = eventoData.hora;
        }

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
        // ENVIAR CORREO CON EMAILJS (con fecha, hora y lugar)
        // =====================================
        try {
            if (typeof emailjs === 'undefined') {
                await new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
                    script.onload = function () {
                        try {
                            emailjs.init(EMAILJS_USER_ID);
                            console.log('✅ EmailJS inicializado (carga dinámica en registro)');
                        } catch (e) {
                            console.error('❌ Error al inicializar EmailJS:', e);
                        }
                        resolve();
                    };
                    script.onerror = function () {
                        console.error('❌ No se pudo cargar EmailJS');
                        resolve();
                    };
                    document.head.appendChild(script);
                });
            }

            if (typeof emailjs !== 'undefined') {
                await new Promise(resolve => setTimeout(resolve, 500));
            }

            const qrUrl = `https://tavoramirezmusico-hub.github.io/los-hijos-de-tencha/admin/validador.html?id=${docRef.id}`;

            const templateParams = {
                to_email: email,
                to_name: nombre,
                event_name: nombreEvento,
                asistente_id: docRef.id,
                qr_url: qrUrl,
                event_date: fechaFormateada,
                event_time: horaFormateada,
                event_location: lugarFormateado
            };

            console.log('📧 Enviando correo a:', email);
            console.log('📧 Parámetros:', templateParams);

            const result = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
            console.log('✅ Correo enviado exitosamente:', result);

            await db.collection('asistentes').doc(docRef.id).update({
                emailEnviado: true,
                emailEnviadoEn: new Date().toISOString()
            });

            console.log('✅ Registro completado y correo enviado a', email);
            mostrarMensajeRegistro(`✅ ¡Registro exitoso! Se ha enviado un correo a ${email} con tu entrada digital.`, 'success');

        } catch (emailError) {
            console.error('❌ Error al enviar correo:', emailError);
            if (emailError.text) {
                console.error('❌ Detalle del error:', emailError.text);
            }
            mostrarMensajeRegistro(`✅ Registro exitoso, pero no se pudo enviar el correo. Contacta al organizador.`, 'error');
        }

        // Limpiar formulario
        document.getElementById('nombreRegistro').value = '';
        document.getElementById('emailRegistro').value = '';

        // Recargar eventos para actualizar contador
        cargarEventosRegistro();

    } catch (error) {
        console.error('❌ Error al registrar:', error);
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
    mensaje.className = 'mensaje-registro ' + tipo;

    if (tipo === 'success' || tipo === 'error') {
        setTimeout(() => {
            mensaje.style.display = 'none';
            mensaje.className = 'mensaje-registro';
        }, 8000);
    }
}

// ============================================================
// FUNCIÓN DE PRUEBA PARA EMAILJS
// ============================================================

async function probarEmailJS() {
    console.log('🧪 Probando EmailJS...');

    try {
        if (typeof emailjs === 'undefined') {
            console.error('❌ EmailJS no está cargado');
            alert('❌ EmailJS no está cargado. Verifica los scripts.');
            return;
        }

        console.log('✅ EmailJS está cargado');

        const templateParams = {
            to_email: 'tavoramirezmusico@gmail.com',
            to_name: 'Prueba Completa',
            event_name: 'Evento de Prueba con Fecha',
            asistente_id: 'test_123456',
            qr_url: 'https://tavoramirezmusico-hub.github.io/los-hijos-de-tencha/admin/validador.html?id=test_123456',
            event_date: '30 de Julio 2026',
            event_time: '20:00',
            event_location: 'Bar Starview, San José'
        };

        console.log('📧 Enviando correo de prueba con parámetros:', templateParams);

        const result = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );

        console.log('✅ Correo de prueba enviado:', result);
        alert('✅ Correo de prueba enviado. Revisa tu bandeja.');

    } catch (error) {
        console.error('❌ Error al enviar correo de prueba:', error);
        alert('❌ Error: ' + (error.text || error.message) + ' - Revisa la consola para más detalles');
    }
}

// ============================================================
// INICIALIZAR REGISTRO Y GALERÍA AL CARGAR LA PÁGINA
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('🔄 Inicializando sistema...');

    // Inicializar registro
    if (document.getElementById('selectEventoRegistro')) {
        console.log('✅ Select de eventos encontrado, cargando...');
        setTimeout(cargarEventosRegistro, 500);
    } else {
        console.warn('⚠️ No se encontró el select de eventos en la página');
    }

    // Inicializar galería
    if (document.getElementById('galeriaGrid')) {
        console.log('✅ Galería encontrada, cargando...');
        cargarGaleria('todas');

        document.querySelectorAll('.cat-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const categoria = this.dataset.categoria;
                cargarGaleria(categoria);
            });
        });
    }
});