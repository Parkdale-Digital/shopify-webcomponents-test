// Card HTML template
function templateMaker(productElement) {
  console.log(productElement);
  const productCardTemplate = document.createElement("template");
  productCardTemplate.innerHTML = `
  <div>
      <a href="${productElement.dataset.url}">
          <img src="${productElement.dataset.featuredMedia}"
            srcset="${productElement.dataset.srcsets}"
            sizes="${productElement.dataset.sizes}"
           alt="${productElement.dataset.mediaAlt}">
      </a>
      <div>
          <a href="${productElement.dataset.url}">
               <h5 slot="title">${productElement.dataset.title}</h5>
          </a>
          <div><span>${productElement.dataset.price}</span></div>
      </div>
      <a href="${productElement.dataset.url}">View Product</a>
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
