# MIL FOCOS — milfocos.com

MIL FOCOS es la marca; MIL IDEAS es el producto: **un mazo, veinte juegos**. Sitio estático servido con GitHub Pages (sin build, sin framework).

## Estructura

- `index.html` — home: hero, beneficios, tipos de juego, catálogo PDF, selección de juegos, por qué existe, cómo funciona, FAQ.
- `juegos/index.html` — los 20 juegos (+ bonus) con filtros por tipo y búsqueda por nombre. Acepta `?f=familiar|bazas|combinaciones|modernos|cooperativos|solitarios|clasicos`.
- `catalogo.html` — reglas completas de los 20 juegos. Cada juego tiene un id estable (`#01-ocho-loco` … `#20-texas-hold-em-con-puntos`, `#bonus-solitarios`); las tarjetas de la home y de `/juegos/` enlazan aquí.
- `MIL_IDEAS_catalogo.pdf` — catálogo en PDF (24 páginas A4). `Un_mazo_20_juegos.pdf` es una copia con el nombre antiguo para no romper enlaces ya compartidos.
- `assets/css/site.css` — tokens (colores, tipografía, radios, espaciado) y componentes compartidos.
- `assets/js/site.js` — menú móvil, FAQ accesible, año del footer y filtros de `/juegos/`.
- `assets/js/i18n.js` — localización regional del vocabulario (ronda/baza, palo/pinta, descarte/pozo…) con selector de región en el footer. Documentado en `LOCALIZACION.md`.
- `assets/img/` — producto (WebP con transparencia, 2 tamaños), portada del PDF, foto de mesa y `og.jpg` para Open Graph.
- `fonts/` — Bricolage Grotesque (licencia OFL) servida localmente.
- Analíticas: GoatCounter (`milfocos.goatcounter.com`), sin cookies. El script está al final de cada página; los clics en «Descargar catálogo», «Ver juegos» y «Lista de espera» se registran como eventos con `data-goatcounter-click`. No cuenta visitas desde `localhost`.
- `CNAME` — dominio personalizado (no borrar). `.nojekyll`, `robots.txt`, `sitemap.xml`.

## Editar contenido

- Para cambiar una regla, edita el `<article class="game">` correspondiente en `catalogo.html` sin tocar su `id`. Si la frase contiene un término regionalizable (ronda, robar, palo, voltear, descarte), consérvalo dentro de su `<span data-term>`; ver `LOCALIZACION.md`.
- Para cambiar jugadores, duración, edad o tipo de un juego, actualiza tanto la `.ficha` de `catalogo.html` como su tarjeta en `juegos/index.html`.
- Los colores y tipografía se cambian una sola vez en `:root` de `assets/css/site.css`.

## Probar en local

```bash
python3 -m http.server 8000
# abrir http://localhost:8000/
```
