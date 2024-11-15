 // frontend/web/product-card/scripts/main.js

  // Check if the `product-card` custom element already exists to prevent redefining

  const BaseProductCard = window.customElements.get("product-card");

    class ProductCard extends HTMLElement {
      constructor() {
        super();
        // Attach shadow DOM to encapsulate styles and markup
        this.attachShadow({ mode: "open" });
      }

      connectedCallback() {
        // Initialize product data from attributes
        const productData = this._fetchProductData();
        this._render(productData);

        // Set up the event listener for adding to cart
        this._setupEventListeners(productData.productId);
      }

      disconnectedCallback() {
        // Clean up the event listener to prevent memory leaks
        this.shadowRoot
          .querySelector(".add-to-cart")
          .removeEventListener("click", this._addToCart);
      }

      // Fetch data attributes into a structured object
      _fetchProductData() {
        return {
          title: this.getAttribute("data-product-name"),
          price: this.getAttribute("data-price"),
          salePrice: this.getAttribute("data-sale-price"),
          description: this.getAttribute("data-description"),
          image: this.getAttribute("data-image-url"),
          productId: this.getAttribute("data-product-id"),
        };
      }

      // Render the component's HTML and scoped CSS
      _render(productData) {
        this.shadowRoot.innerHTML = `
          <style>
            .product-card img { width: 100%; height: auto; border-radius: 8px; }
            .product-card .title { font-size: 16px; font-weight: 400; color: #000; margin-top: 1rem; }
            .product-card .all-price {display: flex; align-items: center; gap: 5px; margin-top: 0.5rem; }
            .product-card .price { color: #403b3b; font-size: 1.5rem; text-decoration: line-through; }
            .product-card .sale-price { color: green; font-size: 2rem; }
            .product-card .sale-badge {
              text-align: center;
              background-color: #484747;
              color: #fff;
              border: 1px solid transparent;
              border-radius: 40px;
              font-size: 14px;
              letter-spacing: 2px;
              padding: 0px 16px;
              position: absolute;
              top: 5px;
              right: 5px;
              word-break: break-word;
              font-weight: 600;
                display: inline-block;
              }
            .product-card .add-to-cart { padding: 12px 20px; background-color: #3e8ad9; color: white; cursor: pointer; width: 100%; border: none; margin-top: 0.5rem; border-radius: 5px;}
            @media (max-width: 550px) { .product-card { max-width: 100%; } }
          </style>
          
          <div class="product-card" role="region" aria-labelledby="product-title">
            ${productData.salePrice ? `<div class="sale-badge">OFF</div>` : ""}
            <img src="${productData.image}" alt="Image of ${productData.title}" />
            <div class="title" id="product-title">${productData.title}</div>
            <div class="all-price">
            ${
              productData.salePrice
                ? `<div class="price">${productData.price}</div>`
                : ""
            }
            <div class="sale-price">${
              productData.salePrice || productData.price
            }</div>
            </div>
            <div>${productData.description}</div>
            <button class="add-to-cart" aria-label="Add ${
              productData.title
            } to cart">Add to Cart</button>
          </div>
        `;
      }

      // Setup event listeners to manage "Add to Cart" action
      _setupEventListeners() {
        this.shadowRoot
          .querySelector(".add-to-cart")
          .addEventListener("click", () => this._addToCart());
      }

      // Handle "Add to Cart" action
      _addToCart() {
        const button = this.shadowRoot.querySelector(".add-to-cart");
        button.textContent = "Added to Cart"; 
        button.disabled = true; 
      }
    }

    // Register the custom element
    window.customElements.define("product-card", ProductCard);
