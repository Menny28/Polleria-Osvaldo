// Carrello condiviso tra menu.html e ordina.html, salvato nel browser (localStorage)
// così il contenuto resta anche passando da una pagina all'altra.
var PolleriaCart = (function () {
  var STORAGE_KEY = 'polleria-cart';

  function read() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function write(cart) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      // storage non disponibile: il carrello funziona comunque nella pagina corrente
    }
  }

  function addItem(id, name, price) {
    var cart = read();
    if (cart[id]) {
      cart[id].qty += 1;
    } else {
      cart[id] = { name: name, price: price, qty: 1 };
    }
    write(cart);
    return cart;
  }

  function setQty(id, qty) {
    var cart = read();
    if (!cart[id]) return cart;
    if (qty <= 0) {
      delete cart[id];
    } else {
      cart[id].qty = qty;
    }
    write(cart);
    return cart;
  }

  function removeItem(id) {
    var cart = read();
    delete cart[id];
    write(cart);
    return cart;
  }

  function clear() {
    write({});
  }

  function fmt(n) {
    return n.toFixed(2).replace('.', ',') + ' €';
  }

  return {
    read: read,
    write: write,
    addItem: addItem,
    setQty: setQty,
    removeItem: removeItem,
    clear: clear,
    fmt: fmt
  };
})();
