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
const pricingData = JSON.parse(localStorage.getItem("pricingSummary"));
if (pricingData) {
    document.getElementById("subtotal").textContent = `$ ${pricingData?.subtotal.toFixed(2) || "0.00"}`;
    document.getElementById("coupon").textContent = `- $ ${pricingData?.coupon?.toFixed(2) || "0.00"}`;
    document.getElementById("gift-card").textContent = `- $ ${pricingData?.giftCard?.toFixed(2) || "0.00"}`;
    document.getElementById("tax").textContent = `$ ${pricingData?.tax?.toFixed(2) || "0.00"}`;
    document.getElementById("shipping").textContent = pricingData?.shipping?.toFixed(2) || "FREE";
    document.getElementById("total").textContent = `$ ${pricingData?.total?.toFixed(2) || "0.00"}`;
}
