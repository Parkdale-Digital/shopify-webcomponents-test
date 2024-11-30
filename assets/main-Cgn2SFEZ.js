(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();function n(e){const o=document.createElement("template"),a=`
  <style>
    .primary-button {
        width: 90%;
        margin: 16px 0;
        padding: 16px 5%;
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
    .product-card-title {
        font-family: Helvetica, sans-serif;
        color: #112A46;
        text-decoration: none;
        text-align: center;
        font-size: 2rem;
        margin-bottom: 1rem;
    }
  </style>
  `;return o.innerHTML=`
  ${a}
  <div class="product-card-content">
      <a href="${e.dataset.url}" aria-label="Go to the product page of ${e.dataset.title}" class="product-card-image-wrapper">
          <img src="${e.dataset.featuredMedia}"
            srcset="${e.dataset.srcsets}"
            sizes="${e.dataset.sizes}"
            alt="${e.dataset.mediaAlt}"
            class="product-card-image">
      </a>
      <div class="product-card-content-wrapper">
          <h5 class="product-card-title">${e.dataset.title}</h5>
          <slot name="price"></slot>
      </div>
      <a class="button primary-button" href="${e.dataset.url}" aria-label="Go to the product page of ${e.dataset.title}">View Product</a>
  </div>
  `,o}class c extends HTMLElement{constructor(){super();const a=n(this);this.attachShadow({mode:"open"}).appendChild(a.content.cloneNode(!0))}}customElements.define("product-card",c);
