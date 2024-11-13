function getSelectedItems() {
    // Select all checked checkboxes within the list items
    return Array.from(document.querySelectorAll('#categories li input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.parentElement.textContent.trim());
}

function displayFilteredProducts() {
    let selectedItems = getSelectedItems().map(item => item === 'Jewellery' ? 'jewelery' : item.toLowerCase());

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            let productListClass = document.getElementById('product-list');
            // Filter products by "men's clothing" category
            let productList = products.filter(product => selectedItems.includes(product.category.toLowerCase()));

            document.getElementById('results-count').textContent = `${productList.length} Results`;

            // Select all product elements and remove them
            const productElements = document.querySelectorAll('.product');
            productElements.forEach(product => product.remove());

            displayProducts(productList);

            function displayProducts(productList) {
                productList.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.className = 'product';

                    productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" style="width: 100px; height: 150px;">
                    <h4>${product.title}</h4>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <i class="far fa-heart wishlist"></i>
                `;
                    productListClass.appendChild(productCard);

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
                    let data = productList.sort((a, b) => a.price - b.price);
                    console.log(data)
                } else if (sortOption === 'high-to-low') {
                    let data = productList.sort((a, b) => b.price - a.price);
                    console.log(data)
                }
                // Select all product elements and remove them
                const productElements = document.querySelectorAll('.product');
                productElements.forEach(product => product.remove());
                displayProducts(productList); // Re-render products with sorted data
            }
        })
        .catch(error => console.error('Error fetching products:', error));


}
// Attach the event listener to each checkbox in the "categories" list
document.querySelectorAll('#categories li input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', displayFilteredProducts);
});