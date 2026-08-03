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
    templateId: 'template_5ulhotx'
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
        if (timeElapsed < 