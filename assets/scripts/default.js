let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
document.getElementById("cart-count").textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);

function navigateToCategoryPage(category) {
    window.location.href = `${category}.html`;
}