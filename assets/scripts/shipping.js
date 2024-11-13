// Retrieve saved form data from local storage
const savedFormData = JSON.parse(localStorage.getItem("checkoutForm"));
if (savedFormData) {
    // Populate the shipping information section with the saved data
    document.getElementById("shipping-email").textContent = savedFormData.email || "";
    document.getElementById("shipping-phone").textContent = savedFormData.phone || "";
    document.getElementById("shipping-name").textContent = `${savedFormData.firstName || ""} ${savedFormData.lastName || ""}`;
    document.getElementById("shipping-address").textContent = `${savedFormData.streetAddress || ""} ${savedFormData.streetAddress2 || ""}`;
    document.getElementById("shipping-city").textContent = `${savedFormData.city || ""}, ${savedFormData.state || ""} ${savedFormData.zip || ""}`;
    document.getElementById("shipping-country").textContent = savedFormData.country || "";
}

// Load pricing summary from localStorage
const pricingData = JSON.parse(localStorage.getItem("pricingSummary"));
if (pricingData) {
    document.getElementById("subtotal").textContent = `$ ${pricingData.subtotal.toFixed(2) || "0.00"}`;
    document.getElementById("coupon").textContent = `- $ ${pricingData?.coupon.toFixed(2) || "0.00"}`;
    document.getElementById("gift-card").textContent = `- $ ${pricingData?.giftCard.toFixed(2) || "0.00"}`;
    document.getElementById("tax").textContent = `$ ${pricingData?.tax.toFixed(2) || "0.00"}`;
    document.getElementById("shipping").textContent = pricingData?.shipping.toFixed(2) || "FREE";
    document.getElementById("total").textContent = `$ ${pricingData?.total.toFixed(2) || "0.00"}`;
}

// Function to handle shipping option change
function handleShippingChange(cost, label) {
    pricingData.shipping = label;
    pricingData.total = pricingData.subtotal - pricingData.coupon - pricingData.giftCard + pricingData.tax + cost;
    localStorage.setItem("pricingSummary", JSON.stringify(pricingData));
    updatePricingSummary();
}

// Event listeners for shipping method radio buttons
document.querySelectorAll("input[name='shipping']").forEach((radio, index) => {
    radio.addEventListener("change", () => {
        if (index === 0) {
            handleShippingChange(shippingCosts.standard, "FREE");
        } else if (index === 1) {
            handleShippingChange(shippingCosts.express, "$17.95");
        } else if (index === 2) {
            handleShippingChange(shippingCosts.nextDay, "$53.61");
        }
    });
});
