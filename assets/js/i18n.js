/* =========================================================
   MIL FOCOS · localización regional del vocabulario (i18n.js)

   No traduce el sitio: adapta ciertos términos de juegos de
   cartas a la forma natural de cada país, sin tocar reglas.
   El HTML servido ya está en español latinoamericano neutral
   (es-419); esto es una mejora progresiva. Sin JavaScript el
   sitio se lee igual de bien.

   Mecanismos (ver LOCALIZACION.md):
   - data-term="clave" [data-form="p"] [data-gloss]
       Término suelto (sustantivo o verbo). El diccionario da
       singular/plural, una raíz verbal (stem) o formas sueltas.
   - data-i18n="clave"
       Frase completa. El diccionario da una plantilla con
       marcadores {trick}, {trick_p}, {suit}, {suit_p}, {draw}…
       que se resuelven con los términos del mismo locale.
   Prioridad: elección guardada > navigator.languages > es-419.
   ========================================================= */
(function () {
  'use strict';

  var STORAGE_KEY = 'mf-locale';
  var FALLBACK = 'es-419';

  /* ---------- Diccionarios ----------
     Cada locale puede declarar `parent` (por defecto es-419).
     Solo se escribe lo que cambia respecto al padre. */
  var locales = {

    'es-419': {
      name: 'Latinoamérica',
      terms: {
        // Sustantivos: s = singular, p = plural, gloss = primera mención
        trick: { s: 'ronda', p: 'rondas', gloss_s: 'ronda (baza)', gloss_p: 'rondas (bazas)',
                 title: 'También llamada «baza» en la terminología tradicional de los juegos de cartas.' },
        suit: { s: 'palo', p: 'palos' },
        discardPile: { s: 'pila de descarte', short: 'descarte' },
        // Verbos regulares en -ar: se sustituye la raíz y se conserva la terminación
        draw: { stem: 'rob' },     // robar, roba, roban, robaste…
        flip: { stem: 'volte' }    // voltear, voltea, volteen…
      },
      phrases: {
        'catalog.conventions': 'Convenciones: «{draw:ar}» es tomar carta del mazo; «{trick}» (tradicionalmente «baza») es una jugada de una carta por jugador, que gana la carta más alta {suit@del} de salida salvo triunfo. Orden de valores por defecto: A (alto) K Q J 10 … 2, salvo que la ficha diga otra cosa. Los comodines solo se usan donde se menciona.',
        'category.trick': 'Juegos de {trick_p} ({trick_p:baza})',
        'filter.trick': 'Rondas (bazas)',
        'faq.trickGames': 'Los juegos de {trick_p} (bazas) y de combinaciones suelen ir mejor a partir de 10, y Texas Hold’em con puntos a partir de 12.',
        'euchre.alias': 'Euchre · el juego de {trick_p} (bazas) de Norteamérica',
        'hearts.win': 'Gana la {trick} quien haya jugado la carta más alta {suit@del} de salida, y ese jugador sale en la siguiente.',
        'spades.intro': 'Cada pareja apuesta cuántas {trick_p} ganará y luego tiene que cumplirlo: pasarse también se castiga.',
        'spades.bid': 'cada jugador dice cuántas {trick_p} cree que ganará',
        'spades.win': 'Gana la {trick} quien haya jugado la pica más alta o, si no hay picas, la carta más alta {suit@del} de salida.',
        'ohhell.intro': 'apuesta cuántas {trick_p} ganarás y acierta exactamente',
        'ohhell.bid': 'cada jugador anuncia cuántas {trick_p} ganará',
        'ohhell.win': 'Gana la {trick} quien haya jugado el triunfo más alto o, si no hay triunfos, la carta más alta {suit@del} de salida.',
        'ohhell.exact': '10 + {trick_p} ganadas',
        'euchre.win': 'Gana la {trick} quien haya jugado el triunfo más alto o la carta más alta {suit@del} de salida.',
        'euchre.r1': 'Fabricantes ganan 3 o 4 {trick_p}',
        'euchre.r2': 'Fabricantes ganan 5 {trick_p}',
        'euchre.r3': 'Fabricante solo gana 5 {trick_p}',
        'euchre.alias2': 'El juego de {trick_p} (bazas) de Norteamérica',
        'spades.summary': 'Apuesta {trick_p} en equipo; las picas siempre triunfan.',
        'ohhell.summary': 'El Skull King / Wizard casero: acierta exactamente tus {trick_p}.',
        'euchre.summary': '{Trick_p} rápidas con 24 cartas y jotas que cambian de {suit}.'
      }
    },

    'es-PE': {
      name: 'Perú',
      terms: {
        trick: { gloss_s: 'ronda (tradicionalmente llamada baza)', gloss_p: 'rondas (tradicionalmente llamadas bazas)' }
        // «robar» se mantiene igual que en es-419 (decisión editorial, sept. 2026)
      },
      phrases: {
        'catalog.conventions': 'Convenciones: «{draw:ar}» es tomar carta del mazo; «{trick}», tradicionalmente llamada baza, es una jugada de una carta por jugador: gana la {trick} quien haya jugado la carta más alta {suit@del} de salida, salvo triunfo. Orden de valores por defecto: A (alto) K Q J 10 … 2, salvo que la ficha diga otra cosa. Los comodines solo se usan donde se menciona.',
        'category.trick': 'Juegos de ganar {trick_p}',
        'filter.trick': 'Ganar rondas',
        'faq.trickGames': 'Los juegos de ganar {trick_p} y los de combinaciones suelen ir mejor a partir de 10, y Texas Hold’em con puntos a partir de 12.',
        'euchre.alias': 'Euchre · el juego de ganar {trick_p} de Norteamérica',
        'euchre.alias2': 'El juego de ganar {trick_p} de Norteamérica'
      }
    },

    // Sin diferencias terminológicas confirmadas frente al neutro: heredan es-419.
    'es-MX': { name: 'México' },
    'es-CO': { name: 'Colombia' },

    'es-CL': {
      name: 'Chile',
      terms: { suit: { s: 'pinta', p: 'pintas', gender: 'f' } }
    },

    'es-AR': {
      name: 'Argentina',
      terms: {
        discardPile: { s: 'pozo', short: 'pozo' },
        // «dar vuelta» no es un verbo simple: se enumeran las formas usadas en el sitio
        flip: { forms: { ar: 'dar vuelta', a: 'da vuelta', an: 'dan vuelta', e: 'dé vuelta', en: 'den vuelta',
                         ado: 'dado vuelta', ada: 'dada vuelta', ados: 'dados vuelta', adas: 'dadas vuelta',
                         ando: 'dando vuelta', arla: 'darla vuelta', arlas: 'darlas vuelta', 'ó': 'dio vuelta' } }
      }
    },

    'es-ES': {
      name: 'España',
      terms: {
        trick: { s: 'baza', p: 'bazas', gloss_s: 'baza', gloss_p: 'bazas', title: '' }
      },
      phrases: {
        'catalog.conventions': 'Convenciones: «{draw:ar}» es tomar carta del mazo; «{trick}» es una jugada de una carta por jugador, que gana la carta más alta {suit@del} de salida salvo triunfo. Orden de valores por defecto: A (alto) K Q J 10 … 2, salvo que la ficha diga otra cosa. Los comodines solo se usan donde se menciona.',
        'category.trick': 'Juegos de {trick_p}',
        'filter.trick': 'Bazas',
        'faq.trickGames': 'Los juegos de {trick_p} y de combinaciones suelen ir mejor a partir de 10, y Texas Hold’em con puntos a partir de 12.',
        'euchre.alias': 'Euchre · el juego de {trick_p} de Norteamérica',
        'hearts.win': 'Gana la {trick} la carta más alta {suit@del} de salida y ese jugador sale en la siguiente.',
        'spades.intro': 'Cada pareja apuesta cuántas {trick_p} hará y luego tiene que cumplirlo: pasarse también se castiga.',
        'spades.bid': 'cada jugador dice cuántas {trick_p} cree que hará',
        'spades.win': 'Gana la {trick} la pica más alta o, si no hay, la carta más alta {suit@del} de salida.',
        'ohhell.intro': 'apuesta cuántas {trick_p} harás y acierta exactamente',
        'ohhell.bid': 'cada jugador anuncia cuántas {trick_p} hará',
        'ohhell.win': 'Gana la {trick} el triunfo más alto o, si no hay, la carta más alta {suit@del} de salida.',
        'ohhell.exact': '10 + {trick_p} hechas',
        'euchre.win': 'Gana la {trick} el triunfo más alto o la carta más alta {suit@del} de salida.',
        'euchre.r1': 'Fabricantes hacen 3 o 4 {trick_p}',
        'euchre.r2': 'Fabricantes hacen 5 {trick_p}',
        'euchre.r3': 'Fabricante solo hace 5 {trick_p}',
        'euchre.alias2': 'El juego de {trick_p} de Norteamérica'
      }
    }
  };

  /* Orden del selector */
  var ORDER = ['es-PE', 'es-MX', 'es-CO', 'es-CL', 'es-AR', 'es-ES', 'es-419'];

  /* ---------- Resolución con herencia ---------- */
  function chain(code) {
    var out = [], cur = code, guard = 0;
    while (cur && locales[cur] && guard++ < 5) { out.push(locales[cur]); cur = locales[cur].parent || (cur === FALLBACK ? null : FALLBACK); }
    return out;
  }
  function termDef(code, key) {
    // Fusiona la definición del término a lo largo de la cadena (hijo pisa al padre campo a campo)
    var def = {}, list = chain(code);
    for (var i = list.length - 1; i >= 0; i--) {
      var t = list[i].terms && list[i].terms[key];
      if (!t) continue;
      for (var k in t) if (Object.prototype.hasOwnProperty.call(t, k)) def[k] = t[k];
      // Si el hijo define stem o forms, anula el mecanismo del padre
      if (t.stem) delete def.forms; if (t.forms) delete def.stem;
    }
    return def;
  }
  function phrase(code, key) {
    var list = chain(code);
    for (var i = 0; i < list.length; i++) if (list[i].phrases && list[i].phrases[key]) return list[i].phrases[key];
    return null;
  }

  /* ---------- Utilidades de texto ---------- */
  function matchCase(sample, word) {
    if (!sample) return word;
    if (sample === sample.toUpperCase() && sample.length > 1) return word.toUpperCase();
    if (sample[0] === sample[0].toUpperCase()) return word.charAt(0).toUpperCase() + word.slice(1);
    return word;
  }
  // Conjuga un verbo regular en -ar a partir de la forma original y la definición
  function verbForm(def, original, baseStem) {
    var m = original.match(/^([A-Za-zÁÉÍÓÚáéíóúñÑ]*?)(a|as|an|ar|arse|arla|arlas|arlo|arlos|aste|ado|ada|ados|adas|ando|e|es|en|ó)$/);
    var ending = m ? m[2] : '';
    if (def.forms && def.forms[ending]) return matchCase(original, def.forms[ending]);
    var stem = def.stem || baseStem;
    return matchCase(original, stem + ending);
  }
  // Concordancia de determinantes cuando el término cambia de género (palo → pinta)
  var FEM = { el:'la', del:'de la', al:'a la', un:'una', mismo:'misma', otro:'otra', ese:'esa', este:'esta',
              'ningún':'ninguna', 'algún':'alguna', los:'las', otros:'otras', mismos:'mismas', esos:'esas', todos:'todas' };
  function agree(det, def) {
    if (!det) return '';
    if (def.gender !== 'f') return det;
    var low = det.toLowerCase(), out = FEM[low] || low;
    return matchCase(det, out);
  }
  function nounForm(def, form, gloss, original) {
    var key = gloss ? (form === 'p' ? 'gloss_p' : 'gloss_s') : (form === 'short' ? 'short' : (form === 'p' ? 'p' : 's'));
    var v = def[key] != null ? def[key] : (def[form === 'p' ? 'p' : 's']);
    return matchCase(original, v);
  }
  // Marcadores en frases: {trick} {trick_p} {trick_p:baza} {suit} {draw:ar}
  function render(code, template) {
    return template.replace(/\{(\w+?)(?:_(p))?(?:@(\w+))?(?::([^}]+))?\}/g, function (_, key, plural, det, extra) {
      var cap = key[0] === key[0].toUpperCase(); key = key.charAt(0).toLowerCase() + key.slice(1);
      var def = termDef(code, key);
      var r = renderOne(def, key, plural, extra);
      if (det) r = agree(det, def) + ' ' + r;
      return cap ? r.charAt(0).toUpperCase() + r.slice(1) : r;
    }).replace(/\s*\(\)\s*/g, ' ').replace(/\s{2,}/g, ' ').trim();
  }
  function renderOne(def, key, plural, extra) {
    {
      if (def.stem || def.forms) { var base = BASE_STEMS[key] || ''; return verbForm(def, base + (extra || 'ar'), base); }
      if (extra) {
        // {trick_p:baza}: solo se muestra el paréntesis tradicional si el término NO es ya «baza»
        var main = def[plural ? 'p' : 's'];
        return main === (plural ? extra + 's' : extra) ? '' : (plural ? extra + 's' : extra);
      }
      return def[plural ? 'p' : 's'] || '';
    }
  }

  /* ---------- Aplicar al DOM ---------- */
  var BASE_STEMS = { draw: 'rob', flip: 'volte' };

  function apply(code) {
    document.querySelectorAll('[data-term]').forEach(function (el) {
      if (!el.hasAttribute('data-orig')) el.setAttribute('data-orig', el.textContent);
      var key = el.getAttribute('data-term'), form = el.getAttribute('data-form') || 's';
      var def = termDef(code, key), orig = el.getAttribute('data-orig');
      if (!def || (!def.s && !def.stem && !def.forms)) return;
      if (def.stem || def.forms) el.textContent = verbForm(def, orig, BASE_STEMS[key] || '');
      else {
        var det = el.getAttribute('data-det');
        if (det) {
          var noun = orig.slice(det.length + 1);
          el.textContent = agree(det, def) + ' ' + nounForm(def, form, el.hasAttribute('data-gloss'), noun);
        } else el.textContent = nounForm(def, form, el.hasAttribute('data-gloss'), orig);
      }
      if (def.title != null) { if (def.title) el.setAttribute('title', def.title); else el.removeAttribute('title'); }
    });
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var t = phrase(code, el.getAttribute('data-i18n'));
      if (t) el.textContent = render(code, t);
    });
    document.documentElement.setAttribute('data-locale', code);
  }

  /* ---------- Detección ---------- */
  function detect() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved && locales[saved]) return saved;
    var langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < langs.length; i++) {
      var l = String(langs[i] || '').toLowerCase();
      if (!/^es\b/.test(l)) continue;                // otros idiomas: seguimos buscando español
      for (var code in locales) if (code.toLowerCase() === l) return code;
      return FALLBACK;                                // «es» o variante no soportada
    }
    return FALLBACK;                                  // ningún español en el navegador
  }

  /* ---------- Selector ---------- */
  function setLocale(code, announce) {
    if (!locales[code]) code = FALLBACK;
    apply(code);
    try { localStorage.setItem(STORAGE_KEY, code); } catch (e) {}
    document.querySelectorAll('select[data-locale-select]').forEach(function (s) { s.value = code; });
    var live = document.getElementById('locale-live');
    if (announce && live) live.textContent = 'Vocabulario adaptado a ' + locales[code].name + '.';
  }
  function buildSelectors(current) {
    document.querySelectorAll('select[data-locale-select]').forEach(function (s) {
      s.innerHTML = '';                              // reemplaza la opción estática del modo sin JS
      ORDER.forEach(function (code) {
        var o = document.createElement('option'); o.value = code; o.textContent = locales[code].name; s.appendChild(o);
      });
      s.value = current;
      s.addEventListener('change', function () { setLocale(s.value, true); });
    });
  }

  var initial = detect();
  apply(initial);
  buildSelectors(initial);

  // API mínima para depuración y pruebas
  window.MFLocale = { get: function () { return document.documentElement.getAttribute('data-locale'); }, set: setLocale, locales: locales };
})();
