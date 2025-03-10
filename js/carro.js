let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save car to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to car
function addToCart(id, name, price, image) {
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price: parseFloat(price), image, quantity: 1 });
  }

  saveCart();
  updateCartDisplay();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  updateCartDisplay();
}

function updateQuantity(id, newQuantity) {
  const item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity = Math.max(1, newQuantity);
    saveCart();
    updateCartDisplay();
  }
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartDisplay();
}

function calculateTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function updateCartDisplay() {
  const cartContainer = document.getElementById("cart-items");
  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    return;
  }

  cart.forEach((item) => {
    console.log("Imagen cargada:", item.image);

    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `
    <link rel="stylesheet" href="css/main.css" />
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>Price: $${item.price.toFixed(2)}</p>
        <div class="quantity-controls">
          <button onclick="updateQuantity('${item.id}', ${
      item.quantity - 1
    })"><div class = "menos">-</div></button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity('${item.id}', ${
      item.quantity + 1
    })"><div class ="mas">+</div></button>
        </div>
        <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
        <button onclick="removeFromCart('${item.id}')">Remove</button>
      </div>
    `;
    cartContainer.appendChild(itemElement);
  });

  // Add total
  const totalElement = document.createElement("div");
  totalElement.className = "cart-total";
  totalElement.innerHTML = `<h3>Total: $${calculateTotal().toFixed(2)}</h3>`;
  cartContainer.appendChild(totalElement);
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initialize cart display
  updateCartDisplay();

  // Add to car buttons
  const addButtons = document.querySelectorAll(".add-button");
  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const { id, name, price, image } = button.dataset;
      addToCart(id, name, price, image);
    });
  });

  // Clear car button
  const clearButton = document.getElementById("clear-cart");
  if (clearButton) {
    clearButton.addEventListener("click", clearCart);
  }
});
