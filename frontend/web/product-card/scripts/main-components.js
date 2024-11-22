import 'vite/modulepreload-polyfill'

class ProductCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Create the container
        const container = document.createElement('div');
        container.className = 'product-card';

        // Populate content from atributes
        const productTitle = this.getAttribute('data-title');
        const productPrice = this.getAttribute('data-price');
        const productImage = this.getAttribute('data-image');
        const productId = this.getAttribute('data-product-id');

        container.innerHTML = `
            <img src="${productImage}" alt="${productTitle}" />
            <h2>${productTitle}</h2>
            <p>${productPrice}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;

        // Attachig styles
        const style = document.createElement('style');
        style.textContent = `
            .product-card {
                border: 1px solid #ddd;
                padding: 50px 25px;
                text-align: center;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                width: 100%;
                margin: 0;
            }
            .product-card img {
                max-width: 100%;
                height: auto;
                border-radius: 8px;
            }
            .product-card h2 {
                font-size: 20px;
                margin: 10px 0;
                font-weight: bold;
            }
            .product-card p {
                font-size: 18px;
                color: #333;
            }
            .add-to-cart {
                background-color: #1d3557;
                color: white;
                padding: 15px 20px;
                width: 100%;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                margin-top: 10px;
                transition: background-color 0.3s;
            }
            .add-to-cart:hover {
                background-color: #457b9d;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(container);

        this.addToCartButton = shadow.querySelector('.add-to-cart');
        this.addToCartButton.addEventListener('click', this.handleAddToCart.bind(this));
    }

    handleAddToCart() {
        const productId = this.getAttribute('data-product-id');
        const formData = {
            items: [
                {
                    id: parseInt(productId, 10),
                    quantity: 1,
                },
            ],
        };

        fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Product added to cart:', data);
                alert(`✅ Added "${this.getAttribute('data-title')}" to your cart.`);
            })
            .catch((error) => {
                console.error('Error adding to cart:', error);
                alert('❌ Failed to add product to cart. Please try again.');
            });
    }
}

customElements.define('product-card', ProductCard);
