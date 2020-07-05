/* Sevice Worker para PWA*/
if ('serviceWorker' in navigator) {  /* Valida si navegador soporta Service Worker*/
    navigator.serviceWorker.register('./sw.js')    /* Función de registro de un Service Worker */
        .then(reg => console.log('Registro de SW exitoso', reg)) /* Si es verdadero (existe) envía mesaje por consola de registro exitoso e imprime objeto de registro*/
        .catch(err => console.warn('Error al tratar de registrar el SW', err))
} 