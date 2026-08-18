// Schede (tab) per categoria
(function () {
  var tabs = document.querySelectorAll('.menu-tab');
  var panels = document.querySelectorAll('.menu-panel');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-tab');
      tabs.forEach(function (t) { t.classList.remove('is-active'); });
      panels.forEach(function (p) { p.classList.remove('is-active'); });
      tab.classList.add('is-active');
      document.querySelector('.menu-panel[data-panel="' + target + '"]').classList.add('is-active');
    });
  });
})();

// Aggiunta al carrello (salvato nel browser, condiviso con ordina.html)
(function () {
  document.querySelectorAll('.add-cart-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-id');
      var name = btn.getAttribute('data-name');
      var price = parseFloat(btn.getAttribute('data-price'));

      PolleriaCart.addItem(id, name, price);

      var original = btn.textContent;
      btn.textContent = 'Aggiunto ✓';
      btn.classList.add('is-added');
      setTimeout(function () {
        btn.textContent = original;
        btn.classList.remove('is-added');
      }, 900);

      var navLink = document.querySelector('.site-nav a[href="ordina.html"]');
      if (navLink) {
        var cart = PolleriaCart.read();
        var count = 0;
        Object.keys(cart).forEach(function (i) { count += cart[i].qty; });
        navLink.textContent = 'Ordina (' + count + ')';
      }
    });
  });
})();

// Ingrandimento foto con descrizione
(function () {
  var descriptions = {
    'patatine': 'Tagliate fresche ogni giorno e fritte fino a renderle dorate e croccanti fuori, morbide dentro.',
    'mozzarelline': 'Bocconcini di mozzarella filante avvolti in una panatura croccante, fritti al momento.',
    'anelli': 'Cipolla dolce tagliata ad anelli, panata e fritta fino a un croccante perfetto.',
    'nuggets': 'Pollo tenero in bocconcini panati, fritti fino a renderli dorati e croccanti.',
    'alette-paprika': 'Alette di pollo marinate alla paprika dolce, cotte fino a un colore intenso e un sapore avvolgente.',
    'pollo-intero': 'Cotto lentamente e girato di continuo sul fuoco vivo, per una pelle croccante e una carne succosa fino all\'ultimo boccone.',
    'mezzo-pollo': 'La stessa cottura lenta sul fuoco del pollo intero, in porzione da condividere in due o gustare con calma da soli.',
    'coscia': 'Coscia di pollo grigliata fino a una doratura intensa, succosa e saporita.',
    'alette-piccanti': 'Alette fritte e speziate, per chi ama un tocco di piccante deciso.',
    'straccetti': 'Petto di pollo tagliato sottile, saltato in padella con agrumi freschi o paprika, a seconda della scelta.',
    'cotoletta': 'Petto di pollo impanato e fritto fino a una doratura croccante, servito con contorno a scelta.',
    'apollo': 'Pollo sfilacciato e rucola fresca, avvolti in una salsa leggermente piccante al pomodoro, dentro un pane ciabatta croccante.',
    'american': 'Cotoletta di pollo croccante, lattuga fresca, pomodoro e salsa cremosa, in un morbido pane baguette.',
    'patate-arrosto': 'Patate rosolate con rosmarino ed erbe aromatiche, dorate e croccanti fuori, morbide dentro.',
    'verdure': 'Selezione di verdure di stagione grigliate alla piastra, per un contorno leggero e saporito.',
    'acqua': 'Acqua naturale in bottiglia da 0,5 litri.',
    'bibita': 'Bibita gassata in lattina, servita ben fredda.',
    'birra33': 'Birra chiara in bottiglia da 33 cl.',
    'birra66': 'Birra chiara in bottiglia da 66 cl, formato da condividere.'
  };

  var modal = document.getElementById('photo-modal');
  var modalImg = document.getElementById('photo-modal-img');
  var modalTitle = document.getElementById('photo-modal-title');
  var modalDesc = document.getElementById('photo-modal-desc');

  document.querySelectorAll('.menu-item-photo').forEach(function (card) {
    var img = card.querySelector('img');
    var btn = card.querySelector('.add-cart-btn');
    if (!img || !btn) return;

    var hint = document.createElement('span');
    hint.className = 'zoom-hint';
    hint.innerHTML = '<svg viewBox="0 0 24 24"><circle cx="10" cy="10" r="6"></circle><line x1="14.5" y1="14.5" x2="20" y2="20"></line></svg>';
    card.appendChild(hint);

    img.addEventListener('click', function () {
      var id = btn.getAttribute('data-id');
      var name = btn.getAttribute('data-name');
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalTitle.textContent = name;
      modalDesc.textContent = descriptions[id] || '';
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  document.getElementById('photo-modal-close').addEventListener('click', closeModal);
  document.querySelector('.photo-modal-backdrop').addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
})();

// QR code verso questa stessa pagina del menù
(function () {
  if (window.QRCode && document.getElementById('qr-code')) {
    new QRCode(document.getElementById('qr-code'), {
      text: 'https://menny28.github.io/Polleria-Osvaldo/menu.html',
      width: 120,
      height: 120,
      colorDark: '#2B1B12',
      colorLight: '#FBF3E7'
    });
  }
})();
