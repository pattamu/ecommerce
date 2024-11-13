document.addEventListener("DOMContentLoaded", () => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();

    function renderCartItems() {
        const cartContainer = document.getElementById("cart-items-container");
        cartContainer.innerHTML = "";
        let subtotal = 0;
        cartItems.forEach((item, index) => {
            subtotal += item.price * item.quantity;
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <p><strong>${item.name}</strong></p>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <input class="quantity" type="text" value="${item.quantity}" readonly>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                    <a href="#" onclick="removeItem(${index})">Remove</a>
                </div>
            `;
            cartContainer.appendChild(itemElement);
        });
        document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById("total").textContent = `$${(subtotal * 1.08).toFixed(2)}`;
        document.getElementById("tax").textContent = `$${(subtotal * 0.08).toFixed(2)}`;
    }

    function updateQuantity(index, change) {
        if (cartItems[index].quantity + change > 0) {
            cartItems[index].quantity += change;
            saveCart();
        }
    }

    function removeItem(index) {
        cartItems.splice(index, 1);
        saveCart();
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cartItems));
        renderCartItems();
        updateCartCount();
    }

    function updateCartCount() {
        document.getElementById("cart-count").textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    }

    renderCartItems();
});

function navigateToCategoryPage(category) {
    window.location.href = `${category}.html`;
}