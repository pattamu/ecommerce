// Fetch products data from the API and populate products grid
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
        const productList = document.getElementById('product-list');
        // Filter products by "men's clothing" category
        const mensClothing = products.filter(product => product.category === "men's clothing");

        document.getElementById('results-count').textContent = `${mensClothing.length} Results`;

        displayProducts(mensClothing);

        function displayProducts(mensClothing) {
            mensClothing.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product';

                productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.title}" style="width: 100px; height: 150px;">
                        <h4>${product.title}</h4>
                        <p class="price">$${product.price.toFixed(2)}</p>
                        <i class="far fa-heart wishlist"></i>
                    `;
                productList.appendChild(productCard);

                // Add click event to navigate to product details page
                productCard.addEventListener('click', () => {
                    window.location.href = `product-details.html?id=${product.id}`;
                });
            });
        }

        document.getElementById('sort-options').addEventListener('change', sortProducts);
        // Function to sort products
        function sortProducts(event) {
            const sortOption = event.target.value;
            if (sortOption === 'low-to-high') {
                let data = mensClothing.sort((a, b) => a.price - b.price);
                console.log(data)
            } else if (sortOption === 'high-to-low') {
                let data = mensClothing.sort((a, b) => b.price - a.price);
                console.log(data)
            }
            // Select all product elements and remove them
            const productElements = document.querySelectorAll('.product');
            productElements.forEach(product => product.remove());
            displayProducts(mensClothing); // Re-render products with sorted data
        }
    })
    .catch(error => console.error('Error fetching products:', error));

