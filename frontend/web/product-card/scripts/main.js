// Card HTML template
function templateMaker(productElement) {
  const productCardTemplate = document.createElement("template");
  const productCardStyles = `
  <style>
    .primary-button {
        width: 90%;
        margin: 16px 0;
        padding: 16px;
        display: inline-block;
        background: #112A46;
        text-decoration: none;
        text-transform: uppercase;
        color: #fff;
        text-align: center;
        font-size: 1.25rem;
        letter-spacing: .5rem;
        font-weight: 700;
        border-radius: 5px;
        font-family: Helvetica, sans-serif;
    }
    @media (max-width: 599px) {
        .primary-button {
          font-size: 1.5rem;
        }
    }
    a.primary-button::after {
        bottom: 0;
        content: '';
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
    }
    .product-card-image-wrapper {
        display: flex;
        justify-content: center;
        width: 100%;
        overflow: hidden;
        aspect-ratio: 1 / 1;
    }
    .product-card-title, h5 {
        font-family: Helvetica, sans-serif;
        color: #112A46;
        text-decoration: none;
        text-align: center;
        font-size: 2rem;
        margin-bottom: 1rem;
    }
  </style>
  `;
  productCardTemplate.innerHTML = `
  ${productCardStyles}
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
      <a class="button primary-button" href="${productElement.dataset.url}" aria-label="Go to the product page of ${productElement.dataset.title}">View Product</a>
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
