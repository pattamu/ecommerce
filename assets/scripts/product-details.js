const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        const productDetailsContainer = document.getElementById('product-details');

        // Define the image source and alt text once
        const imageSrc = `${product.image}`;
        const altText = "Thumbnail image of a purple women's 3-in-1 snowboard jacket";

        productDetailsContainer.innerHTML = `
            <div class="thumbnails-column"></div>

            <div class="main-image-column">
                <img alt="${product.title}" height="600" src="${product.image}" width="400"/>
            </div>

            <div class="details-column">
                <div class="breadcrumb">
                    <a href="#">
                        ${product.category}
                    </a>
                </div>

                <div class="product-title">
                    ${product.title}
                </div>
                <div class="price">
                    $${product.price}
                </div>

                <div class="rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                    <span>(17)</span>
                </div>

                <div class="description product-description-exp">
                    <p class="description-text">${product.description}</p>
                    ${/* <button class="show-more-btn" onclick="toggleDescription()">Show more</button> */''}
                </div>

                <div class="quantity">
                    <span>
                        Quantity
                    </span>
                    <button id="decrease">-</button>
                    <input type="text" id="quantity" value="1"/>
                    <button id="increase">+</button>
                </div>

                <button id="add-to-cart" class="add-to-cart">
                    ADD TO CART
                </button>
                <div class="actions">
                    <i class="far fa-heart">
                    </i>
                    <i class="fas fa-share-alt">
                    </i>
                </div>
            </div>
        `;
        // Select the thumbnails column to append the images
        const thumbnailsColumn = document.querySelector('.thumbnails-column');

        // Create and append 5 thumbnail images
        Array.from({ length: 5 }).forEach(() => {
            const thumbnail = document.createElement('img');
            Object.assign(thumbnail, {
                src: imageSrc,
                alt: altText,
                className: 'thumbnail',
                width: 60,
                height: 90,
            });
            thumbnailsColumn.appendChild(thumbnail);
        });

        const productDescriptionContainer = document.querySelector('.product-description');
        productDescriptionContainer.innerHTML = `
                <h2>
                    ${product.title}
                </h2>
                <p>
                    Description
                </p>
                <p>
                    ${product.description}
                </p>
            `

        let quantity = 1;
        document.getElementById('increase').addEventListener('click', () => {
            quantity++;
            document.getElementById('quantity').value = quantity; // Update the input's value
        });

        document.getElementById('decrease').addEventListener('click', () => {
            if (quantity > 1) quantity--;
            document.getElementById('quantity').value = quantity; // Update the input's value
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

// function toggleDescription() {
//     const descriptionContainer = document.querySelector('.product-description-exp');
//     descriptionContainer.classList.toggle('expanded');
//     const button = descriptionContainer.querySelector('.show-more-btn');
//     button.textContent = descriptionContainer.classList.contains('expanded') ? 'Show Less' : 'Show More';
// }