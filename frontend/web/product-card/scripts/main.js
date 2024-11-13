class ProductCard extends HTMLElement {
  constructor() {
    super();
    // Attach shadow DOM to the custom element
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Fetch the product data from attributes
    const productData = {
      title: this.getAttribute('data-title'),
      price: this.getAttribute('data-price'),
      salePrice: this.getAttribute('data-sale-price'),
      image: this.getAttribute('data-image'),
      productId: this.getAttribute('data-id'),
    };

    // Render the product card
    this.render(productData);
  }

  render(productData) {
    this.shadowRoot.innerHTML = `
      <style>
        /* Scoped styles specific to the product card */
 
        .product-card img {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }
        .product-card .title {
          font-size: 16px;
          font-weight: 400;
          line-height: 22px;
          margin-top: 1rem;
          color: #000;
        }
        .product-card .price {
          color: #ff6347;
          font-size: 1rem;
          margin-top: 0.5rem;
          text-decoration: line-through;
        }
        .product-card .sale-price {
          color: #ff6347;
          font-size: 1.25rem;
        }
        .product-card .sale-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          border: 1px solid transparent;
          border-radius: 4rem;
          display: inline-block;
          font-size: 1.2rem;
          letter-spacing: .1rem;
          line-height: 1;
          padding: .5rem 1.3rem .6rem;
          text-align: center;
          background-color: #444;
          color: #fff;
          word-break: break-word;
          font-weight: 600;
        }
       .product-card .add-to-cart {
          padding: 12px 20px;
          background-color: #3e8ad9;
          color: white;
          cursor: pointer;
          text-align: center;
          outline: none;
          display: block;
          border: none;
          margin: 10px auto 0;
          width: 100%;
          font-size: 14px;
          font-weight: 600;
          border-radius: 5px;
        }
        .product-card .add-to-cart:hover {
          background-color: #444;
        }
        .product-card .add-to-cart:focus {
          outline: 0;
        }
        .product-card .price, .product-card .sale-price {
          display: inline-block;
          font-size:14px;
          font-weight:600;
          color:#222;
        }
        .product-card .price {
          font-size: 13px;
          color: #121212bf;
          padding-right:5px;
          font-weight:400;
        }
          
        @media (max-width: 600px) {
          .product-card {
            max-width: 100%;
          }
        }
      </style>
      <div class="product-card" role="region" aria-labelledby="product-title">
  
        ${productData.salePrice ? `<div class="sale-badge" aria-live="assertive">SALE</div>` : ''}
        
        <img src="${productData.image}" alt="Image of ${productData.title}" aria-describedby="product-title" />


        <div class="title" id="product-title">${productData.title}</div>

        ${productData.salePrice ? `<div class="price">${productData.price}</div>` : ''}
        <div class="sale-price">${productData.salePrice ? productData.salePrice : productData.price}</div>

        <button class="add-to-cart" data-id="${productData.productId}" aria-label="Add ${productData.title} to cart">
          Add to Cart
        </button>
      </div>
    `;

    // Attach event listener for "Add to Cart" button
    this.shadowRoot.querySelector('.add-to-cart').addEventListener('click', this.addToCart.bind(this, productData.productId));
  }

  addToCart(productId) {
    const quantity = 1;
    const data = {
      items: [{
        id: productId,
        quantity: quantity,
      }]
    };

    // Use Shopify's AJAX API to add the item to the cart
    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(cart => {
      console.log('Product added to cart:', cart);
      alert('Product added to cart!');
    })
    .catch(error => {
      console.error('Error adding to cart:', error);
      alert('There was an error adding the product to the cart.');
    });
  }
}

// Define the custom element
customElements.define('product-card', ProductCard);
