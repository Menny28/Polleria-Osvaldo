// Animazioni allo scorrimento: le sezioni con classe "reveal" compaiono
// con una piccola dissolvenza quando entrano nello schermo.
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!window.IntersectionObserver) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(function (el) { observer.observe(el); });
})();

// Pulsante "torna su": compare dopo un po' di scorrimento
(function () {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    btn.hidden = window.scrollY < 500;
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
