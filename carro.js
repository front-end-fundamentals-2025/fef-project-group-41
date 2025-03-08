document.addEventListener("DOMContentLoaded", () => {
    showCart(); // Mostrar carrito al cargar la página

    // Selección de todos los botones para agregar al carrito
    const addToCartButtons = document.querySelectorAll(".add-button");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const product = {
                id: button.dataset.id,
                name: button.dataset.name,
                price: parseFloat(button.dataset.price),
                image: button.dataset.image,
                quantity: 1
            };
            
            // Añadir producto al carrito
            addToCart(product);
        });
    });

    // Botón para vaciar el carrito
    const clearCartButton = document.getElementById("clear-cart");
    if (clearCartButton) {
        clearCartButton.addEventListener("click", clearCart);
    }
});

// Función para agregar producto al carrito
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Obtenemos el carrito del localStorage

    const existingProduct = cart.find(item => item.id === product.id); // Verificamos si el producto ya existe

    if (existingProduct) {
        existingProduct.quantity += 1; // Si existe, aumentamos la cantidad
    } else {
        cart.push(product); // Si no existe, lo agregamos al carrito
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Guardamos el carrito actualizado en el localStorage
    alert("Producto agregado al carrito");
}

// Función para mostrar los productos en el carrito
function showCart() {
    const cartItemsContainer = document.getElementById("cart-items"); // Contenedor donde se mostrarán los productos
    if (!cartItemsContainer) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Obtenemos el carrito del localStorage
    cartItemsContainer.innerHTML = ""; // Limpiamos el contenido antes de mostrar los nuevos productos

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>"; // Si el carrito está vacío, mostramos un mensaje
        return;
    }

    // Por cada producto, creamos un elemento HTML para mostrarlo
    cart.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("cart-item");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="50">
            <p>${product.name} - $${product.price} x ${product.quantity}</p>
            <button onclick="removeFromCart('${product.id}')">Eliminar</button>
        `;
        cartItemsContainer.appendChild(productElement); // Añadimos el producto al contenedor
    });
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Obtenemos el carrito del localStorage
    cart = cart.filter(item => item.id !== productId); // Filtramos el carrito para eliminar el producto seleccionado
    localStorage.setItem("cart", JSON.stringify(cart)); // Guardamos el carrito actualizado
    showCart(); // Volvemos a mostrar el carrito
}

// Función para vaciar el carrito
function clearCart() {
    localStorage.removeItem("cart"); // Eliminamos el carrito del localStorage
    showCart(); // Volvemos a mostrar el carrito vacío
}
