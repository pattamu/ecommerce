// Retrieve saved form data from local storage
const savedFormData = JSON.parse(localStorage.getItem("checkoutForm"));
if (savedFormData) {
    // Populate the shipping information section with the saved data
    document.querySelector(".left .section .content").innerHTML = `
        <p>${savedFormData.firstName} ${savedFormData.lastName}</p>
        <p>${savedFormData.streetAddress} ${savedFormData.streetAddress2 || ''}</p>
        <p>${savedFormData.city}, ${savedFormData.state} ${savedFormData.zip}</p>
        <p>${savedFormData.country}</p>
    `;
}

// Load pricing summary from localStorage
let pricingData = JSON.parse(localStorage.getItem("pricingSummary"));
// Select all .label elements and loop through them
const labelElements = document.querySelectorAll('.pricing-summary .row .label');

if (pricingData) {
    labelElements.forEach(label => {
        // Check the inner text of each label
        if (label.innerText.includes('Subtotal')) {
            label.nextElementSibling.textContent = `$ ${pricingData.subtotal?.toFixed(2) || "0.00"}`;
        } else if (label.innerText.includes('Coupon')) {
            label.nextElementSibling.textContent = `- $ ${pricingData.coupon?.toFixed(2) || "0.00"}`;
        } else if (label.innerText.includes('Gift Card')) {
            label.nextElementSibling.textContent = `- $ ${pricingData.giftCard?.toFixed(2) || "0.00"}`;
        } else if (label.innerText.includes('Tax')) {
            label.nextElementSibling.textContent = `$ ${pricingData.tax?.toFixed(2) || "0.00"}`;
        } else if (label.innerText.includes('Estimated shipping')) {
            label.nextElementSibling.textContent = pricingData?.shipping === 0 ? "FREE" : `$ ${pricingData.shipping}`;
        } else if (label.innerText.includes('Estimated Total')) {
            label.nextElementSibling.textContent = `$ ${pricingData.total?.toFixed(2) || "0.00"}`;
        }
    });
}

// Shipping method costs
const shippingCosts = {
    standard: 0,
    express: 17.95,
    nextDay: 53.61
};

// Get all radio buttons in the radio-group
const radioButtons = document.querySelectorAll('input[name="shipping"]');

// Add event listeners to each radio button
radioButtons.forEach(button => {
    button.addEventListener('change', (event) => {
        // Get the selected radio button's value (standard, express, or nextDay)
        const selectedShippingMethod = event.target.value;
        console.log(selectedShippingMethod)
        // Output the selected shipping method (you can also update the UI or store it as needed)
        if (pricingData) {
            labelElements.forEach(label => {
                if (label.innerText.includes('Estimated shipping')) {
                    updatePricingSummary(shippingCosts[selectedShippingMethod], selectedShippingMethod)
                    label.nextElementSibling.textContent = `${shippingCosts[selectedShippingMethod] === 0 ? "FREE" : "$ " + shippingCosts[selectedShippingMethod]}`;
                }
                if (label.innerText.includes('Estimated Total')) {
                    pricingData = JSON.parse(localStorage.getItem("pricingSummary"))
                    label.nextElementSibling.textContent = `$ ${pricingData.total?.toFixed(2)}`;
                }
            });
        }
    });
});

// Function to handle shipping option change & updatePricingSummary
function updatePricingSummary(shippingCost, shippingMethod) {
    pricingData.shipping = shippingCost;
    pricingData.shippingMethod = shippingMethod;
    pricingData.total = pricingData.subtotal - (pricingData?.coupon || 0) - (pricingData?.giftCard || 0) + pricingData.tax + shippingCost;
    localStorage.setItem("pricingSummary", JSON.stringify(pricingData));
}

