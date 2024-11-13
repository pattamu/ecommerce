document.addEventListener("DOMContentLoaded", () => {
    // Fetch cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Update cart count
    document.getElementById("cart-count").textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Update pricing summary based on localStorage cart items
    updatePricingSummary(cartItems);

    function updatePricingSummary(items) {
        let subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        let tax = subtotal * 0.08; // 8% tax
        let total = subtotal + tax;

        // Set the text content for the summary elements
        document.getElementById("summary-subtotal").textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById("summary-tax").textContent = `$${tax.toFixed(2)}`;
        document.getElementById("summary-total").textContent = `$${total.toFixed(2)}`;

        localStorage.setItem("pricingSummary", JSON.stringify({ subtotal, tax, total }));
    }
});

function saveFormDetails() {
    const formData = {
        email: document.querySelector("input[type='email']").value,
        phoneNumber: document.querySelector("input[type='tel']").value,
        country: document.querySelector("select").value,
        firstName: document.querySelector("input[placeholder='First Name']").value,
        lastName: document.querySelector("input[placeholder='Last Name']").value,
        streetAddress: document.querySelector("input[placeholder='Street Address']").value,
        streetAddress2: document.querySelector("input[placeholder='Street Address 2']").value,
        city: document.querySelector("input[placeholder='City']").value,
        state: document.querySelector("input[placeholder='State']").value,
        zip: document.querySelector("input[placeholder='ZIP']").value
    };
    localStorage.setItem("checkoutForm", JSON.stringify(formData));
}

document.querySelector(".btn").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default form submission
    saveFormDetails();
    window.location.href = "shipping.html"; // Redirect to shipping.html
});
