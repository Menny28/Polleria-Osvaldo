(function () {
  var fmt = PolleriaCart.fmt;

  function renderCart() {
    var cart = PolleriaCart.read();
    var list = document.getElementById('cart-list');
    var empty = document.getElementById('cart-empty');
    var totalRow = document.getElementById('cart-total-row');
    var submit = document.getElementById('cart-submit');
    var ids = Object.keys(cart);

    list.innerHTML = '';

    if (ids.length === 0) {
      empty.hidden = false;
      totalRow.hidden = true;
      submit.disabled = true;
      return;
    }

    empty.hidden = true;
    totalRow.hidden = false;
    submit.disabled = false;

    var total = 0;
    ids.forEach(function (id) {
      var item = cart[id];
      var lineTotal = item.price * item.qty;
      total += lineTotal;

      var row = document.createElement('div');
      row.className = 'cart-row';
      row.innerHTML =
        '<span class="cart-row-name">' + item.name + '</span>' +
        '<div class="cart-row-qty">' +
          '<button type="button" class="cart-qty-btn" data-action="dec" data-id="' + id + '">&minus;</button>' +
          '<span>' + item.qty + '</span>' +
          '<button type="button" class="cart-qty-btn" data-action="inc" data-id="' + id + '">+</button>' +
        '</div>' +
        '<span class="cart-row-price">' + fmt(lineTotal) + '</span>' +
        '<button type="button" class="cart-row-remove" data-action="remove" data-id="' + id + '" aria-label="Rimuovi">&times;</button>';
      list.appendChild(row);
    });

    document.getElementById('cart-total-value').textContent = fmt(total);
  }

  document.getElementById('cart-list').addEventListener('click', function (e) {
    var target = e.target;
    if (!target.hasAttribute('data-action')) return;
    var action = target.getAttribute('data-action');
    var id = target.getAttribute('data-id');
    var cart = PolleriaCart.read();
    if (!cart[id]) return;

    if (action === 'inc') PolleriaCart.setQty(id, cart[id].qty + 1);
    if (action === 'dec') PolleriaCart.setQty(id, cart[id].qty - 1);
    if (action === 'remove') PolleriaCart.removeItem(id);

    renderCart();
  });

  document.getElementById('cart-submit').addEventListener('click', function () {
    var cart = PolleriaCart.read();
    var ids = Object.keys(cart);
    if (ids.length === 0) return;

    var lines = ['Ciao! Vorrei ordinare:'];
    var total = 0;
    ids.forEach(function (id) {
      var item = cart[id];
      var lineTotal = item.price * item.qty;
      total += lineTotal;
      lines.push('- ' + item.qty + 'x ' + item.name + ' (' + fmt(lineTotal) + ')');
    });
    lines.push('Totale: ' + fmt(total));
    lines.push('');
    lines.push('(in attesa di conferma da parte vostra)');

    var url = 'https://wa.me/393665488260?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank');
  });

  renderCart();
})();
