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
        let shipping = 0;
        let shippingMethod = "standard";

        // Set the text content for the summary elements
        document.querySelector(".summary-section p:nth-child(2) span").textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector(".summary-section p:nth-child(3) span").textContent = `- $${(0).toFixed(2)}`; // Assuming no coupon
        document.querySelector(".summary-section p:nth-child(4) span").textContent = `- $${(0).toFixed(2)}`; // Assuming no gift card
        document.querySelector(".summary-section p:nth-child(5) span").textContent = `$${tax.toFixed(2)}`;
        document.querySelector(".summary-section p:nth-child(6) span").textContent = `$0.00`; // Assuming no shipping
        document.querySelector(".summary-section p:nth-child(7) span").textContent = `$${total.toFixed(2)}`;

        localStorage.setItem("pricingSummary", JSON.stringify({ subtotal, tax, shipping, shippingMethod, total }));
    }
});

// Save form details to localStorage
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

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default form submission
        saveFormDetails();
        window.location.href = "shipping.html"; // Redirect to shipping.html
    });
});
