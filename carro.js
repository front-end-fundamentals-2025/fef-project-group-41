document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || []; // Cargar carrito desde LocalStorage
    const addButton = document.querySelector(".add-button");

    addButton.addEventListener("click", function () {
        const product = {
            id: this.dataset.id,
            name: this.dataset.name,
            price: this.dataset.price,
            image: this.dataset.image,
            quantity: 1
        };

        // Verificar si el producto ya está en el carrito
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1; // Si ya está, aumentar cantidad
        } else {
            cart.push(product); // Si no, añadirlo al carrito
        }

        localStorage.setItem("cart", JSON.stringify(cart)); // Guardar en LocalStorage
        alert(`${product.name} añadido al carrito 🛒`);
    });
});

function showCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    cartItemsContainer.innerHTML = "";
    cart.forEach((item, index) => {
        cartItemsContainer.innerHTML += `
            <div>
                <img src="${item.image}" width="50">
                <p>${item.name} - $${item.price} x ${item.quantity}</p>
                <button onclick="removeFromCart(${index})">Eliminar</button>
            </div>
        `;
    });
}

// Función para eliminar productos
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
}

// Función para vaciar carrito
document.getElementById("clear-cart").addEventListener("click", function () {
    localStorage.removeItem("cart");
    showCart();
});

document.addEventListener("DOMContentLoaded", showCart);
