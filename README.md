# Limpiador de metadatos

Herramienta gratis para quitar de tus fotos los datos ocultos antes de compartirlas: ubicación GPS, marca y modelo del teléfono, número de serie, fechas, autor, miniaturas escondidas y marcas de IA (C2PA, prompts de Stable Diffusion/ComfyUI, etiqueta IPTC «generada con IA»).

**Demo:** https://danielherrodri.github.io/limpiador-metadatos/

## Cómo funciona

- Todo ocurre en tu navegador. Las imágenes no se suben a ningún servidor ni se guardan; solo tus opciones quedan guardadas en el navegador (localStorage).
- JPG, PNG, WebP y GIF se limpian sin volver a comprimir: se quitan los bloques de metadatos y los píxeles quedan intactos.
- HEIC y AVIF se convierten a JPG o PNG.
- Cada imagen limpia se vuelve a revisar para confirmar que no quedó ningún metadato.
- Conserva la orientación (para que la foto no salga girada) y, si quieres, el perfil de color.
- Opción para cambiar el nombre del archivo, porque nombres como `IMG_20261027_091405` revelan la fecha.

## Qué no quita

- Marcas de agua invisibles incrustadas en los píxeles, como SynthID.
- Lo que se ve en la imagen: placas, letreros, fachadas, reflejos o pantallas.

## Uso local

Es un solo archivo, sin dependencias ni compilación. Abre `index.html` en el navegador o sírvelo con cualquier servidor estático:

```bash
python3 -m http.server 8000
```

## Stack

HTML, CSS y JavaScript sin librerías. Lectura y escritura de EXIF/TIFF, segmentos JPEG, chunks PNG/WebP y bloques GIF a mano.

## Licencia

MIT. Parte de las herramientas gratis de [danielherrodri.github.io](https://danielherrodri.github.io/).
