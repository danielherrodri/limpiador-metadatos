/* Service worker del Limpiador de metadatos.
   Guarda la página y sus íconos para que la app abra sin conexión. Nunca ve ni guarda tus fotos:
   la limpieza ocurre en la página, en memoria, y aquí solo pasan peticiones de la propia app y de sus fuentes. */
const VERSION = 'limpiador-v2';
const APP = ['./', './index.html', './manifest.webmanifest', './iconos/icono.svg', './iconos/icono-192.png', './iconos/icono-512.png', './iconos/icono-maskable-512.png', './iconos/apple-touch-icon.png'];
const FUENTES = /^https:\/\/fonts\.(googleapis|gstatic)\.com\//;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(APP)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  /* La página: primero la red (para tener siempre la versión nueva) y, sin conexión, la copia guardada */
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); return res;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  /* Íconos y fuentes: la copia guardada al instante y se actualiza en segundo plano */
  if (url.origin === location.origin || FUENTES.test(req.url)) {
    e.respondWith(caches.open(VERSION).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    }));
  }
});
