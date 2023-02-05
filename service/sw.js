const nameCache = 'pokeapi';

const archivos = [
    '/sources/images/poke_icon.png',
    '/js/class/Api.js',
    '/js/class/App.js',
    '/js/class/CreateComponents.js',
    '/js/class/EventFunctions.js',
    '/js/class/Mediator.js',
    '/js/class/UI.js',
    '/js/namespace.js',
    '/js/selectors.js',
    '/index.html',
    '/styles/css/index.css'
]

self.addEventListener('install', e => {
    console.log(e);
    //Wailt Until
    e.waitUntil(
        caches.open(nameCache)
            .then(cache => {
                cache.addAll(archivos);
            })
            .catch(err => console.log(err))
    )
});

self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(
            keys => {
                //Elimina todas los storages que no se estén usando
                return Promise.all([
                    keys.filter(key => key !== nameCache)
                    .forEach( key => caches.delete(key))
                ])
            }
        )
    )
});

self.addEventListener('fetch', e => {
    e.respondWith(
        (async () => {
            //Valida los valores en caché
            const responseCache = await caches.match(e.request);
            console.log(responseCache);

            if(responseCache) return responseCache;
            return fetch(e.request);
        })()
    )
});

/**
 * e.respondWith(
        (async () => {
            //Intenta tomar los valores desde la caché
            const responseCache = await caches.match(e.request);
            //Si ha encontrado un el elemento que coindica en caché, lo retorna
            if(responseCache) return responseCache;
            
            //Si estamos en modo offline y intentamos acceder a una url que no se
            // encuentre cacheada, este nos entregará el elemento error.html
            if(e.request.url.includes('.html')){
                return caches.match('/error.html');
            };

            //Si no lo encuentra en el match de la caché, Usa la red
            return fetch(e.request);
        })()
    );
    /**
     * ###  fetch event ###
     * Este evento, permite interceptar todas las peticiones sobre archivos
     * que se realizan en la app.
     * 
     * Este fetch event, captura cada una de estas peticiones, y nosotros por medio
     * del código le indicamos qué respuesta deben de tener.
     * 
     * Para ello se usa el event.respondWith(), Este nos permite identificar
     * si existe dicho elemento solicitado por medio de la url, en la caché de la App.
     * Y los elementos que no tengamos en la caché, entregará un null.
     * 
     * Así que para estos archivos en donde no se encuentran en caché, sí se debe
     * realizar la solicitud desde una petición al fetch(). y retornar la promesa.
 */