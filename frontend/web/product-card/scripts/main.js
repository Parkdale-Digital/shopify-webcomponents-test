// Card HTML template
function templateMaker(productElement) {
  const productCardTemplate = document.createElement("template");
  productCardTemplate.innerHTML = `
  <div class="product-card-content">
      <a href="${productElement.dataset.url}" aria-label="Go to the product page of ${productElement.dataset.title}" class="product-card-image-wrapper">
          <img src="${productElement.dataset.featuredMedia}"
            srcset="${productElement.dataset.srcsets}"
            sizes="${productElement.dataset.sizes}"
            alt="${productElement.dataset.mediaAlt}"
            class="product-card-image">
      </a>
      <div class="product-card-content-wrapper">
          <a href="${productElement.dataset.url}" class="product-card-title" aria-label="Go to the product page of ${productElement.dataset.title}">
               <h5>${productElement.dataset.title}</h5>
          </a>
          <slot name="price"></slot>
      </div>
      <a href="${productElement.dataset.url}" aria-label="Go to the product page of ${productElement.dataset.title}">View Product</a>
  </div>
  `;
  return productCardTemplate;
}

//Web component declaration
class ProductCard extends HTMLElement {
  constructor() {
    super();
    const productElement = this;
    const template = templateMaker(productElement);
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
  }
}
customElements.define("product-card", ProductCard);
