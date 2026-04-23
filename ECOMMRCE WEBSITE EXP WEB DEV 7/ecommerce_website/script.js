const products = [
  {
    id: 1,
    name: 'Aurora Headphones',
    price: 79.99,
    description: 'Comfortable wireless headphones with balanced sound and all-day battery life.',
    tag: 'Audio'
  },
  {
    id: 2,
    name: 'Nova Watch',
    price: 129.5,
    description: 'A stylish smart watch that tracks activity, notifications, and daily routines.',
    tag: 'Wearable'
  },
  {
    id: 3,
    name: 'Terra Bottle',
    price: 24.0,
    description: 'Insulated stainless-steel bottle that keeps drinks hot or cold for hours.',
    tag: 'Lifestyle'
  }
];

const productGrid = document.getElementById('product-grid');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutForm = document.getElementById('checkout-form');
const confirmationMessage = document.getElementById('confirmation-message');
const customerNameInput = document.getElementById('customer-name');
const customerAddressInput = document.getElementById('customer-address');

const storageKey = 'velora-market-cart';
let cart = loadCart();

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

function loadCart() {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(storageKey, JSON.stringify(cart));
}

function getProductById(id) {
  return products.find((product) => product.id === id);
}

function addToCart(productId) {
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart();
  renderCart();
}

function updateQuantity(productId, delta) {
  const item = cart.find((entry) => entry.id === productId);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity < 1) {
    cart = cart.filter((entry) => entry.id !== productId);
  }

  saveCart();
  renderCart();
}

function removeItem(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  renderCart();
}

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <span class="product-badge">${product.tag}</span>
          <h4>${product.name}</h4>
          <div class="price">${formatCurrency(product.price)}</div>
          <p class="description">${product.description}</p>
          <button class="primary-btn add-to-cart" data-product-id="${product.id}">Add to Cart</button>
        </article>
      `
    )
    .join('');

  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      addToCart(Number(button.dataset.productId));
    });
  });
}

function renderCart() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<div class="empty-state">Your cart is empty. Add at least one product to see the summary update here.</div>';
    cartCount.textContent = '0';
    cartTotal.textContent = formatCurrency(0);
    return;
  }

  let totalItems = 0;
  let totalPrice = 0;

  cartItemsContainer.innerHTML = cart
    .map((item) => {
      const product = getProductById(item.id);
      const itemTotal = product.price * item.quantity;
      totalItems += item.quantity;
      totalPrice += itemTotal;

      return `
        <article class="cart-item">
          <div class="cart-item-top">
            <div class="item-meta">
              <h4>${product.name}</h4>
              <p>${formatCurrency(product.price)} each</p>
              <strong>${formatCurrency(itemTotal)}</strong>
            </div>
            <button class="remove-btn" data-remove-id="${product.id}">Remove</button>
          </div>
          <div class="quantity-control">
            <button class="quantity-btn" data-change-id="${product.id}" data-delta="-1">−</button>
            <span>Qty ${item.quantity}</span>
            <button class="quantity-btn" data-change-id="${product.id}" data-delta="1">+</button>
          </div>
        </article>
      `;
    })
    .join('');

  cartCount.textContent = String(totalItems);
  cartTotal.textContent = formatCurrency(totalPrice);

  document.querySelectorAll('[data-change-id]').forEach((button) => {
    button.addEventListener('click', () => {
      updateQuantity(Number(button.dataset.changeId), Number(button.dataset.delta));
    });
  });

  document.querySelectorAll('[data-remove-id]').forEach((button) => {
    button.addEventListener('click', () => {
      removeItem(Number(button.dataset.removeId));
    });
  });
}

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (cart.length === 0) {
    confirmationMessage.textContent = 'Please add at least one product to your cart before checkout.';
    return;
  }

  const customerName = customerNameInput.value.trim();
  const customerAddress = customerAddressInput.value.trim();
  const total = cart.reduce((sum, item) => {
    const product = getProductById(item.id);
    return sum + product.price * item.quantity;
  }, 0);

  confirmationMessage.textContent = `Thank you, ${customerName}! Your order for ${formatCurrency(total)} has been placed successfully${customerAddress ? ` and will be prepared for ${customerAddress}` : ''}.`;

  cart = [];
  saveCart();
  renderCart();
  checkoutForm.reset();
});

renderProducts();
renderCart();
