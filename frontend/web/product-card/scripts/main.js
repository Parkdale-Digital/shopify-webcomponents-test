class ProductCard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Retrieve attributes
    const title = this.getAttribute("data-title") || "Product Name";
    const price = this.getAttribute("data-price") || "0.00";
    const image = this.getAttribute("data-image") || "";

    // Inner HTML for the component
    shadow.innerHTML = `
        <style>
          :host {
            display: block;
            font-family: Arial, sans-serif;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            width: 300px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .product-image {
            width: 100%;
            height: auto;
          }
          .product-details {
            padding: 16px;
          }
          .product-title {
            font-size: 1.2em;
            margin: 0 0 8px;
          }
          .product-price {
            color: #f60;
            font-size: 1.1em;
            margin: 0;
          }
        </style>
        <div>
          <img class="product-image" src="${image}" alt="${title}" />
          <div class="product-details">
            <h3 class="product-title">${title}</h3>
            <p class="product-price">£${price}</p>
          </div>
        </div>
      `;
  }
}

// Register the Web Component
customElements.define("product-card", ProductCard);
