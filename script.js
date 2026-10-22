const products = [
  { id: "gibas", name: "Gibas", category: "carnes", price: 16, icon: '<img src="imagenes/gibas.jpg" alt="Brocheta de giba">', description: "Brocheta a la parrilla · Bs 16" },
  { id: "costillas", name: "Costillas de cerdo", category: "carnes", price: 16, icon: '<img src="imagenes/costilla-cerdo.jpg" alt="Brocheta de costilla de cerdo">', description: "Costillitas con sabor a parrilla · Bs 16" },
  { id: "alitas", name: "Alitas", category: "carnes", price: 16, icon: '<img src="imagenes/alitas.jpg" alt="Brocheta de alitas">', description: "Alitas a la parrilla · Bs 16" },
  { id: "pechuga", name: "Pechuga", category: "carnes", price: 16, icon: '<img src="imagenes/pechuga.jpg" alt="Brocheta de pechuga">', description: "Pechuga de pollo a la parrilla · Bs 16" },
  { id: "chorizo", name: "Chorizo normal", category: "carnes", price: 16, icon: '<img src="imagenes/chorizo-normal.jpg" alt="Brocheta de chorizo normal">', description: "Chorizo tradicional · Bs 16" },
  { id: "chorizo-picante", name: "Chorizo picante", category: "carnes", price: 16, icon: '<img src="imagenes/chorizo-picante.jpg" alt="Brocheta de chorizo picante">', description: "Para quienes prefieren un toque picante · Bs 16" },
  
// Acompañamientos
  { id: "yuca", name: "Yuca", category: "acompanamientos", price: 0, icon: '<img src="imagenes/yuca.webp" alt="Yuca">', description: "Acompañamiento incluido con la brocheta" },
  { id: "arroz", name: "Arroz batido", category: "acompanamientos", price: 0, icon: '<img src="imagenes/arroz-batido.jpg" alt="Arroz">', description: "Acompañamiento incluido con la brocheta" },
  { id: "papa", name: "Papa salteada", category: "acompanamientos", price: 0, icon: '<img src="imagenes/papa-salteada.jpg" alt="Papa">', description: "Acompañamiento incluido con la brocheta" },  
  // Refrescos
  { id: "copuazu", name: "Refresco de copuazú", category: "refrescos", price: 4, icon: '<img src="imagenes/refresco-copuazu.jpg" alt="Refresco de copuazú">', description: "Refresco hervido · vaso de 400 ml a Bs 4" },
  { id: "tumbo", name: "Refresco de tumbo", category: "refrescos", price: 4, icon: '<img src="imagenes/refresco-tumbo.jpg" alt="Refresco de tumbo">', description: "Refresco hervido · vaso de 400 ml a Bs 4" },
  { id: "maracuya", name: "Refresco de maracuyá", category: "refrescos", price: 4, icon: '<img src="imagenes/refresco-maracuya.jpg" alt="Refresco de maracuyá">', description: "Refresco hervido · vaso de 400 ml a Bs 4" },
  
  // Gaseosas
  { id: "mini", name: "Gaseosa mini", category: "gaseosas", price: 3, icon: '<img src="imagenes/gaseosa-mini.jpg" alt="Gaseosa mini">', description: "Gaseosa mini · Bs 3" },
  { id: "polar", name: "Polar", category: "gaseosas", price: 8, icon: '<img src="imagenes/gaseosa-polar.png" alt="Gaseosa Polar">', description: "Gaseosa Polar · Bs 8" },
  { id: "litro", name: "Coca-Cola o Fanta · 1 litro", category: "gaseosas", price: 10, icon: '<img src="imagenes/gaseosa-litro.jpg" alt="Gaseosa de un litro">', description: "Coca-Cola o Fanta · Bs 10" },
  { id: "dos-litros", name: "Coca-Cola o Fanta · 2 litros", category: "gaseosas", price: 18, icon: '<img src="imagenes/gaseosa-dos-litros.jpg" alt="Gaseosa de dos litros">', description: "Coca-Cola o Fanta · Bs 18" },
  
  // Salsas
  { id: "verde", name: "Salsa verde", category: "salsas", price: 0, icon: '<img src="imagenes/salsa-verde.webp" alt="Salsa verde">', description: "Salsa verde fresca para acompañar tu brocheta" },
  { id: "mani", name: "Salsa de maní", category: "salsas", price: 0, icon: '<img src="imagenes/salsa-mani.jpg" alt="Salsa de maní">', description: "Salsa de maní cremosa para acompañar" },
  { id: "llajua", name: "Salsa Llajua (normal)", category: "salsas", price: 0, icon: '<img src="imagenes/salsa-llajua.jpg" alt="Salsa llajua tradicional roja">', description: "Llajua tradicional para darle un toque picante" }
];

const cart = new Map();
const grid = document.querySelector("#menu-grid");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const cartItems = document.querySelector("#cart-items");
const orderTotal = document.querySelector("#order-total");
const sendWhatsappBtn = document.querySelector("#send-whatsapp-btn");

const WHATSAPP_NUMBER = "59171479101";

function money(value) { return `Bs ${value}`; }

function productCard(product) {
  const priceText = product.price ? money(product.price) : "Incluido";
  return `<article class="product-card">
    <div class="product-art">${product.icon}</div>
    <div class="product-info">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-bottom">
        <span class="price">${priceText}</span>
        <button class="add-btn" data-add="${product.id}">+ Agregar</button>
      </div>
    </div>
  </article>`;
}

function renderProducts(filter = "todos") {
  const shown = filter === "todos" ? products : products.filter(p => p.category === filter);
  grid.innerHTML = shown.map(productCard).join("");
}

function getTotal() {
  let total = 0;
  for (const [id, qty] of cart) {
    const p = products.find(item => item.id === id);
    if (p) total += p.price * qty;
  }
  return total;
}

function renderCart() {
  const count = [...cart.values()].reduce((sum, qty) => sum + qty, 0);
  const total = getTotal();
  cartCount.textContent = count;
  cartTotal.textContent = money(total);
  orderTotal.textContent = money(total);

  if (!cart.size) {
    cartItems.innerHTML = '<p class="empty-cart">Tu pedido está vacío. ¡Agrega algo rico del menú!</p>';
    return;
  }

  cartItems.innerHTML = [...cart.entries()].map(([id, qty]) => {
    const p = products.find(item => item.id === id);
    return `<div class="cart-row">
      <div><strong>${p.name}</strong><small>${p.price ? money(p.price) + " por unidad" : "Acompañamiento incluido"}</small></div>
      <div class="qty-controls">
        <button data-change="${id}" data-delta="-1" aria-label="Quitar uno">−</button>
        <b>${qty}</b>
        <button data-change="${id}" data-delta="1" aria-label="Agregar uno">+</button>
      </div>
      <button class="remove-item" data-remove="${id}">Quitar</button>
    </div>`;
  }).join("");
}

function addProduct(id) {
  cart.set(id, (cart.get(id) || 0) + 1);
  renderCart();
}

grid.addEventListener("click", e => {
  const btn = e.target.closest("[data-add]");
  if (btn) addProduct(btn.dataset.add);
});

document.querySelector(".category-tabs").addEventListener("click", e => {
  const tab = e.target.closest("[data-filter]");
  if (!tab) return;
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t === tab));
  renderProducts(tab.dataset.filter);
});

cartItems.addEventListener("click", e => {
  const change = e.target.closest("[data-change]");
  const remove = e.target.closest("[data-remove]");
  
  if (change) {
    const id = change.dataset.change;
    const next = (cart.get(id) || 0) + Number(change.dataset.delta);
    if (next <= 0) cart.delete(id); else cart.set(id, next);
  }
  if (remove) cart.delete(remove.dataset.remove);
  
  renderCart();
});

// Enviar directo a WhatsApp
sendWhatsappBtn.addEventListener("click", () => {
  const name = document.querySelector("#customer-name").value.trim();
  
  if (!cart.size) { 
    alert("Tu carrito está vacío. Agrega productos del menú primero."); 
    return; 
  }
  if (!name) { 
    alert("Escribe tu nombre antes de enviar el pedido."); 
    document.querySelector("#customer-name").focus(); 
    return; 
  }

  let message = `🔥 *NUEVO PEDIDO - MISTER BROCHETAS* 🔥\n\n`;
  message += `👤 *Nombre:* ${name}\n\n`;
  message += `🛒 *Detalle del pedido:*\n`;

  cart.forEach((qty, id) => {
    const p = products.find(item => item.id === id);
    const subtotal = p.price * qty;
    message += `• ${qty}x ${p.name} — ${money(subtotal)}${p.price === 0 ? " (incluido)" : ""}\n`;
  });

  message += `\n💰 *Total estimado:* ${money(getTotal())}\n`;
  message += `📍 *Ubicación:* Al lado de la Plaza Bolívar, avenida 6 de Agosto, acera este.`;

  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderProducts();
renderCart();