/* MIL FOCOS · comportamiento compartido
   - Menú móvil (aria-expanded)
   - FAQ accordion accesible (button + aria-expanded + hidden)
   - Año automático en el footer
   - Filtros y búsqueda en /juegos/ (solo si existe #games) */
(function () {
  'use strict';

  /* ---------- Menú móvil ---------- */
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    // Cierra el menú al elegir un enlace o al pulsar Escape
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { menuBtn.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        menuBtn.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); menuBtn.focus();
      }
    });
  }

  /* ---------- FAQ ---------- */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', String(!open));
      if (panel) panel.hidden = open;
    });
  });

  /* ---------- Año en el footer ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Filtros de /juegos/ ---------- */
  var list = document.getElementById('games');
  if (!list) return;

  var cards = Array.prototype.slice.call(list.querySelectorAll('.game-card'));
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip[data-filter]'));
  var search = document.getElementById('search');
  var count = document.getElementById('count');
  var empty = document.getElementById('empty');
  var active = 'todos';

  function norm(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function apply() {
    var q = norm(search ? search.value.trim() : '');
    var shown = 0;
    cards.forEach(function (card) {
      var tags = (card.getAttribute('data-tags') || '').split(' ');
      var okTag = active === 'todos' || tags.indexOf(active) !== -1;
      var okText = !q || norm(card.getAttribute('data-name')).indexOf(q) !== -1;
      var show = okTag && okText;
      card.hidden = !show;
      if (show) shown++;
    });
    if (count) count.textContent = shown === 1 ? '1 juego' : shown + ' juegos';
    if (empty) empty.hidden = shown !== 0;
  }

  function setFilter(f, push) {
    active = f;
    chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-filter') === f)); });
    apply();
    if (push && window.history && history.replaceState) {
      var url = new URL(window.location.href);
      if (f === 'todos') url.searchParams.delete('f'); else url.searchParams.set('f', f);
      history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  }

  chips.forEach(function (c) {
    c.addEventListener('click', function () { setFilter(c.getAttribute('data-filter'), true); });
  });
  if (search) search.addEventListener('input', apply);

  // Estado inicial desde ?f=... (los enlaces de la home lo usan)
  var initial = new URL(window.location.href).searchParams.get('f');
  var valid = chips.some(function (c) { return c.getAttribute('data-filter') === initial; });
  setFilter(valid ? initial : 'todos', false);
})();
