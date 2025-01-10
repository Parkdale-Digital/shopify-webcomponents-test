// I always use IIFE to wrap my vanilla javascript code within javascript files to prevent any unintented leakage of variables to the global scope.
(function() {
  class ProductCard extends HTMLElement {
    constructor() {
      super();
      this.variantButtons = Array.from(this.querySelectorAll('.product-variant-button'));
      this.productThumbnail = this.querySelector('.product-image');
      this.productThumbnailLarge = this.querySelector('.product-image--large');
      this.variantThumbsContainer = this.querySelector('.product-variants');
      
      this.activeVariant = this.dataset.activeVariant;
      this.productData = JSON.parse(this.dataset.productData);
      this.variants = this.productData.variants;
      this.activeVariantData = this.productData.variants[this.activeVariant];
      

      console.log(this.activeVariant);
      console.log(this.productData);
      console.log(this.activeVariantData, this.productThumbnail);
    
    }

    connectedCallback() {
      this.renderProductContents();
      this.renderVariantThumbnails();
      this.bindUIElements();
    }

    disconnectedCallback() {
      this.unbindUIElements();
    }

    bindUIElements() {
      for(let variantButton of this.variantButtons) {
        console.log(variantButton);

      }
    }

    unbindUIElements() {}

    renderVariantThumbnails() {
      let variantsArray = Object.values(this.variants);
      let markup = '';

      for(let variant of variantsArray) {
        markup += `
          <li class="product-variant__item">
            <a href="${ variant.url }" class="product-variant-button" data-variant-id="${ variant.id }" aria-label="${ variant['variant_title'] }">
              <img src="${ variant.image_switch_thumb  }" alt="${ variant['variant_title'] }" loading="lazy" width="50" height="50" />
            </a>
          </li>
        `
      }
      
      this.variantThumbsContainer.innerHTML = markup;
    }

    renderProductContents() {
      this.productThumbnailLarge.srcset = this.activeVariantData['image_large'];
      this.productThumbnail.src = this.activeVariantData['image'];
      this.productThumbnail.alt = this.activeVariantData['variant_title'];
    }

    renderVariant
  }

  customElements.define('product-card', ProductCard);
})();