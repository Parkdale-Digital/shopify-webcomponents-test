// I always use IIFE to wrap my vanilla javascript code within javascript files to prevent any unintented leakage of variables to the global scope.
(function() {
  class ProductCard extends HTMLElement {
    constructor() {
      super();
      this.variantButtons = [];
      this.productThumbnail = this.querySelector('.product-image');
      this.productThumbnailLarge = this.querySelector('.product-image--large');
      this.variantThumbsContainer = this.querySelector('.product-variants');
      this.productLink = this.querySelector('.product-link');
      this.productCardThumbLink = this.querySelector('.product-thumbnail__link');
      this.regularPrice = this.querySelector('.regular-price');
      this.originalPrice = this.querySelector('.original-price');
      this.salePrice = this.querySelector('.sale-price');
      this.saleBadge = this.querySelector('.badge');
      
      this.activeVariant = this.dataset.activeVariant;
      this.productData = JSON.parse(this.dataset.productData);
      this.productLocale = JSON.parse(this.dataset.productLocale);
      this.variants = this.productData.variants;
      this.activeVariantData = this.productData.variants[this.activeVariant];
      

      console.log(this.activeVariant);
      console.log(this.productData);
      console.log(this.activeVariantData, this.productThumbnail);
    
    }

    connectedCallback() {
      this.renderProductContents();
      this.renderVariantThumbnails();
      this.clearVariantThumb();
      this.setActiveVariantThumb()
      this.bindUIElements();
    }

    disconnectedCallback() {
      this.unbindUIElements();
    }

    onVariantButtonClick(e) {
      const newVariant = e.target.parentElement.dataset.variantId;
      e.preventDefault();

      this.activeVariant = newVariant;
      this.activeVariantData = this.productData.variants[newVariant];
      this.dataset.activeVariant = newVariant;
      this.renderProductContents();

      this.clearVariantThumb();
      this.setActiveVariantThumb()

    }

    bindUIElements() {
      let onVariantButtonClick = this.onVariantButtonClick.bind(this);
      this.variantButtons = Array.from(this.querySelectorAll('.product-variant-button'));

      for(let variantButton of this.variantButtons) {
        console.log(variantButton);
        variantButton.addEventListener('click', onVariantButtonClick);
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
      this.productLink.innerHTML = this.productData['product_title'];
      this.productLink.href = this.activeVariantData['url'];
      this.productLink.ariaLabel = this.activeVariantData['variant_title'];
      this.productCardThumbLink.href = this.activeVariantData['url'];
      this.productCardThumbLink.ariaLabel = this.activeVariantData['variant_title'];

      this.originalPrice.innerHTML = '';
      this.salePrice.innerHTML = '';
      this.regularPrice.innerHTML = '';

      if(this.activeVariantData['is_sale']) {
        this.classList.add('price--on-sale');
        this.originalPrice.innerHTML = this.activeVariantData['compare_at_price'];
        this.salePrice.innerHTML = this.activeVariantData['price'];
        this.saleBadge.innerHTML = this.productLocale['sale_label'];
      } else {
        this.classList.remove('price--on-sale');
        this.regularPrice.innerHTML = this.activeVariantData['price'];
        this.saleBadge.innerHTML = '';
      }

    }


    clearVariantThumb() {
      for(let variantButton of this.variantButtons) {
        variantButton.classList.remove('product-variant-button--active');
      }
    }

    setActiveVariantThumb() {
      let activeVariant = this.querySelector(`.product-variant-button[data-variant-id="${this.activeVariant}"]`);

      if(activeVariant) {
        activeVariant.classList.add('product-variant-button--active');
      }
    }
    
  }

  customElements.define('product-card', ProductCard);
})();