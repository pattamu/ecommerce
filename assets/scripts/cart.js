document.addEventListener("DOMContentLoaded", () => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();

    function renderCartItems() {
        const cartContainer = document.getElementById("cart-items-container");
        const summarySection = document.querySelector(".summary");
        cartContainer.innerHTML = "";

        if (cartItems.length === 0) {
            // Hide the summary section if the cart is empty
            summarySection.style.display = "none";
            // Show an empty basket message if the cart is empty
            cartContainer.innerHTML = `
                    <div class="empty-cart">
                        <img src="https://img.freepik.com/free-vector/shopping-cart-icon-isolated-illustration_18591-82226.jpg?t=st=1731524066~exp=1731527666~hmac=913f663689382e050d3fd14aec99f5ebf85ce0f3611347384d8e3b9e13fee3dd&w=740" 
                        alt="Empty Basket" class="empty-cart-image">
                        <p>Your cart is empty. <a href="index.html">Click here to go to the home page</a>.</p>
                    </div>
                `;
            // document.getElementById("subtotal").textContent = "$0.00";
            // document.getElementById("total").textContent = "$0.00";
            // document.getElementById("tax").textContent = "$0.00";
            return;
        }

        let subtotal = 0;
        cartItems.forEach((item, index) => {
            subtotal += item.price * item.quantity;
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                    <img class="product-details" data-id=${item.id} src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details product-details" data-id=${item.id}>
                        <p><strong>${item.title}</strong></p>
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

            document.querySelectorAll(".product-details").forEach(item => {
                item.addEventListener('click', () => {
                    const productId = item.getAttribute('data-id'); // Ensure each item has a data-id with the product ID
                    window.location.href = `product-details.html?id=${productId}`;
                });
            });
        });

        document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById("total").textContent = `$${(subtotal * 1.08).toFixed(2)}`;
        document.getElementById("tax").textContent = `$${(subtotal * 0.08).toFixed(2)}`;
    }

    renderCartItems();
    updateCartCount();
});

function updateQuantity(index, change) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartItems[index].quantity + change > 0) {
        cartItems[index].quantity += change;
        saveCart(cartItems);
    }
}

function removeItem(index) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.splice(index, 1);
    saveCart(cartItems);
}

function saveCart(cartItems) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    document.dispatchEvent(new Event("DOMContentLoaded")); // Reload cart items and count
}

function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
}

function navigateToCategoryPage(category) {
    window.location.href = `${category}.html`;
}