# Localización regional del vocabulario

MIL FOCOS no se traduce: se **adapta el vocabulario** de juegos de cartas a la forma natural de hablar de cada país, manteniendo exactamente las mismas reglas. Todo ocurre en el navegador con JavaScript, sin backend y sin servicios externos.

## Cómo funciona

1. El HTML publicado ya está en **español latinoamericano neutral (`es-419`)**. Es lo que ven Google y cualquier visitante sin JavaScript.
2. `assets/js/i18n.js` detecta la región, busca en el DOM los elementos marcados y sustituye solo el texto de esos elementos.
3. Un selector en el footer permite cambiar de región. La elección se guarda en `localStorage` (`mf-locale`) y prevalece en visitas siguientes.

### Prioridad de detección

1. Elección guardada en `localStorage`.
2. `navigator.languages` (y `navigator.language`): la primera entrada en español decide. Coincidencia exacta (`es-PE`, `es-MX`…) → ese locale. Solo `es`, o una variante no soportada (`es-VE`) → `es-419`.
3. Sin español en el navegador → `es-419`.

No se usa la zona horaria ni la IP.

## Locales soportados

| Código | Nombre | Hereda de | Diferencias activas |
|---|---|---|---|
| `es-419` | Latinoamérica | — | base neutra |
| `es-PE` | Perú | es-419 | ronda con glosa larga, `robar → jalar`, «Juegos de ganar rondas» |
| `es-MX` | México | es-419 | ninguna confirmada (hereda todo) |
| `es-CO` | Colombia | es-419 | ninguna confirmada (hereda todo) |
| `es-CL` | Chile | es-419 | `palo → pinta` (femenino, con concordancia de artículos) |
| `es-AR` | Argentina | es-419 | `pila de descarte / descarte → pozo`, `voltear → dar vuelta` |
| `es-ES` | España | es-419 | `ronda → baza` como término principal, frases con «hacer bazas» |

## Tabla de diferencias terminológicas

Se revisó la lista completa del brief (baza, mano, ronda, mazo/baraja, descarte, repartir, robar, comodín/joker, palo, figura, triunfo, pasar, plantarse, puntaje/puntuación, fichas, pares/parejas, voltear, boca arriba/abajo). Solo se modifica lo que tiene una diferencia real y frecuente en el sitio:

| Clave | es-419 (base) | es-PE | es-CL | es-AR | es-ES | Ocurrencias |
|---|---|---|---|---|---|---|
| `trick` (baza) | ronda · primera mención «ronda (baza)» · tooltip | ronda · «ronda (tradicionalmente llamada baza)» | = | = | baza | ~30 en reglas, 4 tipos, 1 filtro, 3 resúmenes |
| `draw` (robar) | robar | jalar | = | = | = | 22 (todas las formas del verbo) |
| `suit` (palo) | palo | = | pinta | = | = | 48 |
| `flip` (voltear) | voltear | = | = | dar vuelta | = | 25 |
| `discardPile` | pila de descarte / descarte | = | = | pozo | = | 15 |

Sin cambios, por ser comprensibles en toda la región o por no existir una alternativa claramente más natural: **mazo** (además es parte de la promesa de marca), **comodín**, **figura**, **triunfo**, **repartir**, **plantarse**, **boca arriba/abajo**, **pareja**, **ficha**, **puntuación**.

Decisiones editoriales que conviene validar con hablantes: `es-PE` «jalar» (también se dice «robar» y «coger»); `es-AR` «dar vuelta»; `es-CL` «pinta» (también se usa «palo»). Cada una se cambia en **una línea** del diccionario.

## Marcado en el HTML

### Término suelto: `data-term`

```html
<span data-term="trick">ronda</span>
<span data-term="trick" data-form="p">rondas</span>
<span data-term="trick" data-form="p" data-gloss>rondas (bazas)</span>   <!-- primera mención -->
<span data-term="discardPile" data-form="short">descarte</span>
<span data-term="suit" data-det="del">del palo</span>                     <!-- artículo incluido: concuerda en género -->
<span data-term="draw">roban</span>                                       <!-- verbo: se conserva la terminación -->
```

- El texto dentro del span es el neutro (`es-419`). El script lo guarda en `data-orig` la primera vez y siempre parte de ahí, así se puede volver a la región base.
- Sustantivos: el diccionario da `s`, `p`, opcionalmente `short`, `gloss_s`, `gloss_p`, `title` (tooltip) y `gender` (`'f'` activa la concordancia de artículos: el → la, del → de la, al → a la, un → una, mismo → misma, otro → otra…).
- Verbos regulares en -ar: `stem` sustituye la raíz y conserva la terminación (`rob|an` → `jal|an`). Si la forma no es un verbo simple (`dar vuelta`), se enumeran las `forms` por terminación.
- Se respetan mayúsculas iniciales.

### Frase completa: `data-i18n`

Cuando la estructura de la oración cambia (por ejemplo «hacer bazas» frente a «ganar rondas»), se marca la frase entera:

```html
<span data-i18n="spades.bid">cada jugador dice cuántas rondas cree que ganará</span>
```

La plantilla del diccionario usa marcadores que se resuelven con los términos del mismo locale, para no duplicar vocabulario:

- `{trick}` / `{trick_p}` → singular / plural del término.
- `{Trick_p}` → con mayúscula inicial.
- `{suit@del}` → determinante con concordancia + término («del palo», «de la pinta»).
- `{draw:ar}` → forma verbal con esa terminación («robar», «jalar»).
- `{trick_p:baza}` → escribe «bazas» solo si el término principal **no** es ya «baza» (evita «bazas (bazas)»).

## Cómo añadir un país

1. En `assets/js/i18n.js`, añade una entrada en `locales`:
   ```js
   'es-UY': { name: 'Uruguay', parent: 'es-AR', terms: { /* solo lo que cambia */ } }
   ```
   `parent` es opcional; por defecto hereda de `es-419`.
2. Añádelo a `ORDER` para que aparezca en el selector.
3. Listo: la detección por `navigator.languages` lo reconoce automáticamente.

## Cómo añadir una clave

- **Término nuevo**: defínelo en `es-419.terms` (es obligatorio que el neutro exista) y envuelve las apariciones en el HTML con `data-term`. Para las variantes que cambian, añade solo la clave en su locale.
- **Frase nueva**: defínela en `es-419.phrases` y marca el elemento con `data-i18n`. Los locales que no la definan heredan la neutra.
- Nunca reemplaces texto con búsquedas globales: el marcado explícito es lo que garantiza que las reglas no se toquen.

## Selector de región

- Está en el footer de las tres páginas: `<select data-locale-select>` con etiqueta visible «Región» y texto de ayuda. En el HTML solo lleva la opción neutra; el script rellena el resto (funciona sin JS mostrando el estado real).
- Es un `select` nativo: teclado, lectores de pantalla y móvil sin código extra. No se usan banderas.
- Al cambiar: se aplica al instante sin recargar, se guarda en `localStorage` y una región `aria-live` anuncia «Vocabulario adaptado a …».
- `document.documentElement` recibe `data-locale="es-XX"` por si se quiere estilizar algo por región. `lang` se mantiene en `es`.

## SEO

- El HTML es neutro y completo; la regionalización es una mejora progresiva. No hay páginas duplicadas por país ni parámetros de URL.
- Si algún día se crean versiones indexables (`/pe/`, `/es/`…), cada una debe llevar `<link rel="alternate" hreflang="es-PE" href="…/pe/">` para cada variante, más `hreflang="es"` apuntando a la neutra y `hreflang="x-default"` a la raíz, y todas deben enlazarse entre sí de forma recíproca. Mientras tanto no hace falta nada.

## Evolución futura: país real con Cloudflare

Cuando se quiera detectar el país físico, un Cloudflare Worker delante de GitHub Pages puede leer `request.cf.country` (o la cabecera `CF-IPCountry`) e inyectar `<meta name="mf-country" content="PE">` o una cookie. El orden de prioridad pasaría a ser:

1. elección manual guardada (`localStorage`);
2. país detectado por Cloudflare;
3. idioma/región del navegador;
4. `es-419`.

En `i18n.js` basta con leer esa meta/cookie dentro de `detect()` entre los pasos 1 y 2. No está implementado ni previsto en esta versión: añade dependencia externa y una consideración de privacidad que hoy no hace falta.

## Pruebas realizadas

Con Chromium sin cabeza, para cada locale: la secuencia completa de números de `main` en `catalogo.html` es idéntica a la de `es-419` (ninguna regla cambia); las sustituciones esperadas aparecen y las no esperadas no; el cambio se guarda y se mantiene al navegar a otra página; sin JavaScript el texto neutro y las anclas están presentes; los filtros de `/juegos/` siguen funcionando con la región activa; el selector funciona con teclado; sin overflow en móvil.
