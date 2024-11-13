const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        const productDetailsContainer = document.getElementById('product-details');

        productDetailsContainer.innerHTML = `
            <div class="product-details">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h2>${product.title}</h2>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <div class="product-description">
                        <p class="description-text">${product.description}</p>
                        <button class="show-more-btn" onclick="toggleDescription()">Show More</button>
                    </div>
                    <div class="quantity">
                        <button id="decrease">-</button>
                        <span id="quantity">1</span>
                        <button id="increase">+</button>
                    </div>
                    <button id="add-to-cart">Add to Cart</button>
                </div>
            </div>
        `;

        let quantity = 1;
        document.getElementById('increase').addEventListener('click', () => {
            quantity++;
            document.getElementById('quantity').textContent = quantity;
        });

        document.getElementById('decrease').addEventListener('click', () => {
            if (quantity > 1) quantity--;
            document.getElementById('quantity').textContent = quantity;
        });

        document.getElementById('add-to-cart').addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProduct = cart.find(item => item.id === product.id);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.push({ id: product.id, title: product.title, price: product.price, quantity, image: product.image });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            document.getElementById("cart-count").textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
            alert(`${product.title} has been added to the cart.`);
        });
    })
    .catch(error => console.error('Error fetching product:', error));

function toggleDescription() {
    const descriptionContainer = document.querySelector('.product-description');
    descriptionContainer.classList.toggle('expanded');
    const button = descriptionContainer.querySelector('.show-more-btn');
    button.textContent = descriptionContainer.classList.contains('expanded') ? 'Show Less' : 'Show More';
}