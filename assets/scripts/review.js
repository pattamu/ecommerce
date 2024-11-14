document.addEventListener("DOMContentLoaded", function () {
    // Retrieve saved form data from localStorage
    const cartData = JSON.parse(localStorage.getItem("cart"));
    const savedFormData = JSON.parse(localStorage.getItem("checkoutForm"));
    const pricingSummary = JSON.parse(localStorage.getItem("pricingSummary"));

    // Function to update the shipping information section
    function updateShippingInfo() {
        if (savedFormData) {
            const infoContainer = document.querySelector(".address-info");
            if (infoContainer) {
                infoContainer.innerHTML = `
                    <p>${savedFormData.email || ""}</p>
                    <p>${savedFormData.phone || ""}</p>
                    <p>${savedFormData.firstName || ""} ${savedFormData.lastName || ""}</p>
                    <p>${savedFormData.streetAddress || ""}</p>
                    <p>${savedFormData.city || ""}, ${savedFormData.state || ""} ${savedFormData.zip || ""}</p>
                    <p>${savedFormData.country || ""}</p>
                `;
            }
        } else {
            console.error("No shipping information found in localStorage.");
        }
    }

    const deliveryType = {
        standard: "Est. delivery in 4 - 8 business days",
        express: "Est. delivery in 2-5 business days",
        nextDay: "Est. delivery in Next business days"
    }
    // Function to update the shipping method section
    function updateShippingMethod() {
        if (pricingSummary) {
            const shippingMethodContainer = document.querySelector(".shipping-info");
            if (shippingMethodContainer) {
                // Determine shipping method details based on pricing summary
                const shippingMethod = pricingSummary.shippingMethod + " Shipping" || "Standard Shipping";
                const estimatedDelivery = deliveryType[pricingSummary.shippingMethod];
                const shippingCost = pricingSummary.shipping === 0 ? "FREE" : `$ ${pricingSummary.shipping}`;

                shippingMethodContainer.innerHTML = `
                    <p>${shippingMethod}</p>
                    <p>${estimatedDelivery}</p>
                    <p>${shippingCost}</p>
                `;
            }
        } else {
            console.error("No pricing summary found in localStorage.");
        }
    }

    function updatePricinginfo() {
        if (pricingSummary) {
            const pricingInfoCard = document.querySelector(".pricing-summary");
            if (pricingInfoCard) {
                pricingInfoCard.innerHTML = `
                <p>Subtotal <span style="float: right;" id="subtotal">$ ${pricingSummary?.subtotal?.toFixed(2) || "0.00"}</span></p>
                <p>Coupon <span style="float: right;" id="coupon">- $ ${pricingSummary?.coupon?.toFixed(2) || "0.00"}</span></p>
                <p>Gift Card <span style="float: right;" id="gift-card">- $ ${pricingSummary?.giftCard?.toFixed(2) || "0.00"}</span></p>
                <p>Tax <span style="float: right;" id="tax">$ ${pricingSummary?.tax?.toFixed(2) || "0.00"}</span></p>
                <p>Estimated shipping <span style="float: right;" id="shipping">${"$ " + pricingSummary?.shipping?.toFixed(2) || "FREE"}</span></p>
                <h3>Estimated Total <span style="float: right;" id="total">$ ${pricingSummary?.total?.toFixed(2) || "0.00"}</span></h3>
                `
            }
        }
    }

    function updateOrderinfo() {
        if (pricingSummary) {
            document.querySelector(".order-qty").textContent = `${cartData.length} items in your order`
            const orderInfoCard = document.querySelector(".order-items");
            let innerHTML = ``

            if (orderInfoCard) {
                cartData.forEach(data => {
                    innerHTML += `
                    <div>
                        <img alt="Electric Leggings" height="150"
                            src="${data.image}"
                            width="100" />
                        <div class="item-details">
                            <p> ${data.title} </p>
                            <p> Quantity: ${data.quantity} </p>
                            <p> Price: $ ${data.price} </p>
                        </div>
                    </div>
                    `
                })
                orderInfoCard.innerHTML = innerHTML
                console.log(orderInfoCard)
            }
        }
    }

    // Update the page sections with retrieved data
    updateShippingInfo();
    updateShippingMethod();
    updatePricinginfo();
    updateOrderinfo();
});
