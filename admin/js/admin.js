// ============================================================
// ADMIN - LOS HIJOS DE TENCHA
// LÓGICA COMPARTIDA Y UTILIDADES (VERSIÓN CORREGIDA - FIX MENÚ MÓVIL)
// ============================================================

// ============================================================
// CONFIGURACIÓN DE FIREBASE
// ============================================================
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDvp_6UFymZZnqxMyL6yobJ3twLMvVkThw",
    authDomain: "base-entradas-tenchos.firebaseapp.com",
    projectId: "base-entradas-tenchos",
    storageBucket: "base-entradas-tenchos.firebasestorage.app",
    messagingSenderId: "273676503007",
    appId: "1:273676503007:web:56180c485b648ef076a66a"
};

let db = null;
let storage = null;
let firebaseInicializado = false;

try {
    if (typeof firebase !== 'undefined' && !firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CONFIG);
        console.log('✅ Firebase inicializado');
        firebaseInicializado = true;
    } else if (typeof firebase !== 'undefined' && firebase.apps.length) {
        console.log('✅ Firebase ya estaba inicializado');
        firebaseInicializado = true;
    } else {
        console.warn('⚠️ Firebase no está cargado');
    }

    if (firebaseInicializado) {
        db = firebase.firestore();
        storage = firebase.storage();
        console.log('✅ Firestore y Storage disponibles');
    }
} catch (error) {
    console.error('❌ Error al inicializar Firebase:', error);
}

// ============================================================
// CONFIGURACIÓN DE EMAILJS
// ============================================================
const EMAILJS_CONFIG = {
    userId: '7bmV4hpwq7pFObQ8W',
    serviceId: 'service_49w40s8',
    templateId: 'template_correos'
};

if (typeof emailjs !== 'undefined') {
    try {
        emailjs.init(EMAILJS_CONFIG.userId);
        console.log('✅ EmailJS inicializado');
    } catch (error) {
        console.error('❌ Error al inicializar EmailJS:', error);
    }
} else {
    console.warn('⚠️ EmailJS no está cargado');
}

// ============================================================
// CONFIGURACIÓN DE SEGURIDAD
// ============================================================
const PASSWORD_HASH = '435a4954c470cee2b68da8bee7f879e00db66866b6d4dd7be0af3701e21db53f';

// ============================================================
// FUNCIONES DE AUTENTICACIÓN
// ============================================================

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function verificarSesionAdmin() {
    const auth = sessionStorage.getItem('adminAuth');
    const loginTime = sessionStorage.getItem('adminLoginTime');

    if (auth === 'authenticated' && loginTime) {
        const timeElapsed = Date.now() - parseInt(loginTime);
        if (timeElapsed < 14400000) {
            return true;
        } else {
            sessionStorage.removeItem('adminAuth');
            sessionStorage.removeItem('adminLoginTime');
        }
    }
    return false;
}

function verificarSesionValidador() {
    const auth = sessionStorage.getItem('validadorAuth');
    const loginTime = sessionStorage.getItem('validadorLoginTime');

    if (auth === 'authenticated' && loginTime) {
        const timeElapsed = Date.now() - parseInt(loginTime);
        if (timeElapsed < 14400000) {
            return true;
        } else {
            sessionStorage.removeItem('validadorAuth');
            sessionStorage.removeItem('validadorLoginTime');
        }
    }
    return false;
}

function cerrarSesionAdmin() {
    sessionStorage.removeItem('adminAuth');
    sessionStorage.removeItem('adminLoginTime');
    window.location.href = 'login.html';
}

function cerrarSesionValidador() {
    sessionStorage.removeItem('validadorAuth');
    sessionStorage.removeItem('validadorLoginTime');
    window.location.href = 'login.html';
}

function salirYRedirigir(destino) {
    sessionStorage.removeItem('adminAuth');
    sessionStorage.removeItem('adminLoginTime');
    sessionStorage.removeItem('validadorAuth');
    sessionStorage.removeItem('validadorLoginTime');
    window.location.href = destino;
}

// ============================================================
// FUNCIONES DE NOTIFICACIONES (TOAST)
// ============================================================

function mostrarToast(mensaje, tipo = 'info', duracion = 4000) {
    let toast = document.getElementById('adminToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'adminToast';
        toast.className = 'admin-toast';
        document.body.appendChild(toast);
    }

    toast.innerHTML = mensaje;
    toast.className = 'admin-toast show toast-' + tipo;

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, duracion);
}

// ============================================================
// FUNCIONES DE UTILIDAD GENERAL
// ============================================================

function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function formatearFecha(fecha) {
    if (!fecha) return '-';
    const d = fecha instanceof Date ? fecha : new Date(fecha);
    if (isNaN(d.getTime())) return '-';
    return d.toLocaleDateString('es-CR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatearFechaHora(fecha) {
    if (!fecha) return '-';
    const d = fecha instanceof Date ? fecha : new Date(fecha);
    if (isNaN(d.getTime())) return '-';
    return d.toLocaleString('es-CR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function sanitizar(texto) {
    if (!texto) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return texto.replace(/[&<>"']/g, function (m) { return map[m]; });
}

function truncarTexto(texto, max = 100) {
    if (!texto) return '';
    if (texto.length <= max) return texto;
    return texto.substring(0, max) + '...';
}

function obtenerNombreArchivo(url) {
    if (!url) return '';
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename.split('?')[0];
}

function obtenerExtension(url) {
    const nombre = obtenerNombreArchivo(url);
    const parts = nombre.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
}

function esUrlValida(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// ============================================================
// FUNCIONES DE SUBIDA A FIREBASE STORAGE
// ============================================================

async function subirArchivo(file, path, onProgress = null) {
    if (!storage) {
        throw new Error('Firebase Storage no está disponible');
    }

    const nombreUnico = Date.now() + '_' + file.name.replace(/\s/g, '_');
    const ref = storage.ref(path + nombreUnico);
    const uploadTask = ref.put(file);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                if (onProgress) {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    onProgress(progress);
                }
            },
            (error) => {
                reject(error);
            },
            async () => {
                try {
                    const url = await ref.getDownloadURL();
                    resolve(url);
                } catch (error) {
                    reject(error);
                }
            }
        );
    });
}

async function subirArchivos(files, path, onProgress = null) {
    const resultados = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
            const url = await subirArchivo(file, path, (progress) => {
                if (onProgress) {
                    onProgress(file, progress, i, files.length);
                }
            });
            resultados.push({ file, url });
        } catch (error) {
            console.error('Error al subir ' + file.name + ':', error);
            if (onProgress) {
                onProgress(file, -1, i, files.length);
            }
            throw error;
        }
    }
    return resultados;
}

async function eliminarArchivo(url) {
    if (!storage) {
        throw new Error('Firebase Storage no está disponible');
    }
    try {
        const ref = storage.refFromURL(url);
        await ref.delete();
        return true;
    } catch (error) {
        console.error('Error al eliminar archivo:', error);
        throw error;
    }
}

// ============================================================
// FUNCIONES PARA CARGAR DATOS DE FIRESTORE
// ============================================================

async function cargarColeccion(coleccion, orden = null, direccion = 'asc') {
    if (!db) {
        throw new Error('Firestore no está disponible');
    }
    try {
        let query = db.collection(coleccion);
        if (orden) {
            query = query.orderBy(orden, direccion);
        }
        const snapshot = await query.get();
        const resultados = [];
        snapshot.forEach(doc => {
            resultados.push({ id: doc.id, ...doc.data() });
        });
        return resultados;
    } catch (error) {
        console.error('Error al cargar ' + coleccion + ':', error);
        throw error;
    }
}

async function cargarDocumento(coleccion, id) {
    if (!db) {
        throw new Error('Firestore no está disponible');
    }
    try {
        const doc = await db.collection(coleccion).doc(id).get();
        if (!doc.exists) {
            return null;
        }
        return { id: doc.id, ...doc.data() };
    } catch (error) {
        console.error('Error al cargar documento ' + id + ':', error);
        throw error;
    }
}

async function guardarDocumento(coleccion, id, datos) {
    if (!db) {
        throw new Error('Firestore no está disponible');
    }
    try {
        if (id) {
            await db.collection(coleccion).doc(id).set(datos, { merge: true });
            return id;
        } else {
            const docRef = await db.collection(coleccion).add(datos);
            return docRef.id;
        }
    } catch (error) {
        console.error('Error al guardar documento:', error);
        throw error;
    }
}

async function eliminarDocumento(coleccion, id) {
    if (!db) {
        throw new Error('Firestore no está disponible');
    }
    try {
        await db.collection(coleccion).doc(id).delete();
        return true;
    } catch (error) {
        console.error('Error al eliminar documento:', error);
        throw error;
    }
}

// ============================================================
// PREVENIR CIERRE CON CTRL+W
// ============================================================
document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
        e.preventDefault();
        mostrarToast('⚠️ Usa el botón "Salir" para cerrar sesión', 'warning');
        return false;
    }
});

// ============================================================
// UTILIDADES PARA EL FORMULARIO DE REGISTRO PÚBLICO
// ============================================================

async function cargarEventosEnSelect(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;

    try {
        const eventos = await cargarColeccion('eventos', 'creadoEn', 'desc');
        let options = '<option value="">Selecciona un evento</option>';
        eventos.forEach(evento => {
            options += `<option value="${evento.id}">${sanitizar(evento.nombre)}</option>`;
        });
        select.innerHTML = options;
    } catch (error) {
        console.error('Error al cargar eventos:', error);
        select.innerHTML = '<option value="">Error al cargar eventos</option>';
    }
}

async function registrarAsistentePublico() {
    const eventoId = document.getElementById('selectEventoRegistro')?.value;
    const nombre = document.getElementById('nombreRegistro')?.value?.trim();
    const email = document.getElementById('emailRegistro')?.value?.trim();
    const mensajeEl = document.getElementById('mensajeRegistro');

    if (!eventoId) {
        mostrarMensajeRegistro(mensajeEl, '⚠️ Selecciona un evento', 'error');
        return;
    }
    if (!nombre) {
        mostrarMensajeRegistro(mensajeEl, '⚠️ Ingresa tu nombre completo', 'error');
        return;
    }
    if (!email || !email.includes('@')) {
        mostrarMensajeRegistro(mensajeEl, '⚠️ Ingresa un correo válido', 'error');
        return;
    }

    mostrarMensajeRegistro(mensajeEl, '⏳ Registrando...', 'info');

    try {
        const eventoData = await cargarDocumento('eventos', eventoId);
        if (!eventoData) {
            mostrarMensajeRegistro(mensajeEl, '❌ Evento no encontrado', 'error');
            return;
        }

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

        const id = await guardarDocumento('asistentes', null, asistente);

        const evento = await cargarDocumento('eventos', eventoId);
        const asistentes = evento.asistentes || [];
        asistentes.push(id);
        await guardarDocumento('eventos', eventoId, { asistentes });

        try {
            await enviarCorreoAsistente(nombre, email, eventoData.nombre, id, eventoData);
            await guardarDocumento('asistentes', id, {
                emailEnviado: true,
                emailEnviadoEn: new Date().toISOString()
            });
            mostrarMensajeRegistro(mensajeEl, '✅ ¡Registro exitoso! Se ha enviado un correo a ' + email, 'success');
        } catch (emailError) {
            console.error('Error al enviar correo:', emailError);
            mostrarMensajeRegistro(mensajeEl, '✅ Registro exitoso, pero no se pudo enviar el correo.', 'warning');
        }

        document.getElementById('nombreRegistro').value = '';
        document.getElementById('emailRegistro').value = '';

    } catch (error) {
        console.error('Error al registrar:', error);
        mostrarMensajeRegistro(mensajeEl, '❌ Error al registrar: ' + error.message, 'error');
    }
}

function mostrarMensajeRegistro(elemento, texto, tipo) {
    if (!elemento) return;
    elemento.style.display = 'block';
    elemento.textContent = texto;
    elemento.className = 'mensaje-registro ' + tipo;

    if (tipo === 'success' || tipo === 'error' || tipo === 'warning') {
        setTimeout(() => {
            elemento.style.display = 'none';
            elemento.className = 'mensaje-registro';
        }, 6000);
    }
}

async function enviarCorreoAsistente(nombre, email, nombreEvento, asistenteId, eventoData) {
    if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS no está disponible');
    }

    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    let fechaFormateada = 'Fecha por confirmar';
    let horaFormateada = 'Hora por confirmar';
    let lugarFormateado = eventoData?.lugar || '';

    if (eventoData?.fecha) {
        try {
            const fechaObj = new Date(eventoData.fecha + 'T00:00:00');
            fechaFormateada = fechaObj.getDate() + ' de ' + meses[fechaObj.getMonth()] + ' ' + fechaObj.getFullYear();
        } catch (e) {
            fechaFormateada = eventoData.fecha;
        }
    }

    if (eventoData?.hora) {
        horaFormateada = eventoData.hora;
    }

    const qrUrl = 'https://tavoramirezmusico-hub.github.io/los-hijos-de-tencha/admin/validador.html?id=' + asistenteId;

    const templateParams = {
        to_email: email,
        to_name: nombre,
        event_name: nombreEvento,
        asistente_id: asistenteId,
        qr_url: qrUrl,
        event_date: fechaFormateada,
        event_time: horaFormateada,
        event_location: lugarFormateado
    };

    return await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams);
}

// ============================================================
// INICIALIZACIÓN
// ============================================================

console.log('✅ Admin JS cargado correctamente');
console.log('🔥 Firebase disponible:', firebaseInicializado);