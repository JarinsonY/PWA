;
//Asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_afrobin',
    urlsToCache = [
        './',
        'https://fonts.googleapis.com/css?family=Raleway:400,700',
        'https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqZPAA.woff2',
        'https://use.fontawesome.com/releases/v5.0.7/css/all.css',
        'https://use.fontawesome.com/releases/v5.0.6/webfonts/fa-brands-400.woff2',
        './style.css',
        './script.js',
        './img/AfroBin.png',
        './img/favicon.png'
    ]


    /* Evento: Instalación */
//Durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => self.skipWaiting())
            })
            .catch(err => console.log('Falló registro de cache', err))
    )
})

    /* Evento: Activavción */
//Una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        //Eliminamos lo que ya no se necesita en cache
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName)
                        }
                    })
                )
            })
            // Le indica al SW activar el cache actual
            .then(() => self.clients.claim())
    )
})

    /* Evento: Fetch(Recuperar recursos del navegador cuando se tenga conexión a internet y detecta cambios) */
//Cuando el navegador recupera una url
self.addEventListener('fetch', e => {
    //Responder ya sea con el objeto en caché o continuar y buscar la url real
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    //Recuperar del cache (deja el caché que está)
                    return res
                }
                //Recuperar de la petición a la url (Tuvo que consultar URL real)
                return fetch(e.request)
            })
    )
})