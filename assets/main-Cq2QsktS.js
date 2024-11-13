(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function d(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=d(t);fetch(t.href,r)}})();class a extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const e={title:this.getAttribute("data-title"),price:this.getAttribute("data-price"),salePrice:this.getAttribute("data-sale-price"),image:this.getAttribute("data-image"),productId:this.getAttribute("data-id")};this.render(e)}render(e){this.shadowRoot.innerHTML=`
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
  
        ${e.salePrice?'<div class="sale-badge" aria-live="assertive">SALE</div>':""}
        
        <img src="${e.image}" alt="Image of ${e.title}" aria-describedby="product-title" />


        <div class="title" id="product-title">${e.title}</div>

        ${e.salePrice?`<div class="price">${e.price}</div>`:""}
        <div class="sale-price">${e.salePrice?e.salePrice:e.price}</div>

        <button class="add-to-cart" data-id="${e.productId}" aria-label="Add ${e.title} to cart">
          Add to Cart
        </button>
      </div>
    `,this.shadowRoot.querySelector(".add-to-cart").addEventListener("click",this.addToCart.bind(this,e.productId))}addToCart(e){fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:[{id:e,quantity:1}]})}).then(t=>t.json()).then(t=>{alert("Product added to cart!")}).catch(t=>{alert("There was an error adding the product to the cart.")})}}customElements.define("product-card",a);
