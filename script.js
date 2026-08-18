// Banner "chiusi ora" — stessa logica su tutte le pagine
(function () {
  var banner = document.getElementById('closed-banner');
  if (!banner) return;
  var textEl = banner.querySelector('span');
  var now = new Date();
  var day = now.getDay();   // 0 domenica ... 1 lunedì, 2 martedì ...
  var hour = now.getHours();
  var msg = null;

  if (day === 2) {
    // Tutto il martedì è chiuso: il giorno dopo (mercoledì) è aperto
    msg = 'Oggi siamo chiusi \u2014 riapriamo domani alle 10:00.';
  } else if (hour >= 19) {
    // Chiusi per oggi: se è lunedì sera, domani (martedì) è chiuso -> si riapre mercoledì
    msg = (day === 1)
      ? 'Siamo chiusi \u2014 riapriamo mercoledì alle 10:00.'
      : 'Siamo chiusi \u2014 riapriamo domani alle 10:00.';
  } else if (hour < 10) {
    msg = 'Siamo chiusi \u2014 apriamo oggi alle 10:00.';
  }

  if (msg) {
    textEl.textContent = msg;
    banner.hidden = false;
  }
})();

// Contatore carrello nella barra di navigazione, su tutte le pagine
(function () {
  var link = document.querySelector('.site-nav a[href="ordina.html"]');
  if (!link) return;
  var cart = PolleriaCart.read();
  var count = 0;
  Object.keys(cart).forEach(function (id) { count += cart[id].qty; });
  if (count > 0) {
    link.textContent = 'Ordina (' + count + ')';
  }
})();
