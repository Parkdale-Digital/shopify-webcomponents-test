if (!customElements.get("product-card")) {
  customElements.define(
    "product-card",
    class ProductCard extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        // Access attributes
        const title = this.getAttribute("data-title");
        const url = this.getAttribute("data-url");
        const available = this.getAttribute("data-available") === "true";
        const compareAtPrice =
          parseFloat(this.getAttribute("data-compare-at-price")) || 0;
        const price = parseFloat(this.getAttribute("data-price")) || 0;
        const currencyCode = this.getAttribute("data-currency-code") || "USD"; // Fallback to "USD" if not provided
        const badgePosition =
          this.getAttribute("data-badge-position") || "bottom-left";
        const sectionId = this.getAttribute("data-section-id");
        const productId = this.getAttribute("data-product-id");

        // Parse the data attributes for featured media
        const featuredMediaSrcset = this.getAttribute("data-srcset");
        const SecondaryMediaSrcset = this.getAttribute("data-secondary-srcset");
        const featuredMedia = this.getAttribute("data-featured-media");
        const secondaryMedia = this.getAttribute("data-secondary-media");

        // Convert data strings into objects
        const featuredMediaData = this.parseMediaData(featuredMedia);
        const secondaryMediaData = secondaryMedia
          ? this.parseMediaData(secondaryMedia)
          : null;

        // Create elements and set attributes for featured image
        const featuredImg = this.createImageElement({
          src: featuredMediaData.src,
          width: featuredMediaData.width,
          height: featuredMediaData.height,
          alt: featuredMediaData.alt,
          srcset: featuredMediaSrcset,
          sizes: featuredMediaData.sizes,
        });

        // Create elements and set attributes for secondary image if it exists
        const mediaContainer = document.createElement("div");
        mediaContainer.classList.add(
          "media",
          "media--transparent",
          "media--hover-effect"
        );

        mediaContainer.appendChild(featuredImg);

        // If secondary media data exists, create the secondary image element
        if (secondaryMediaData) {
          const secondaryImg = this.createImageElement({
            src: secondaryMediaData.src,
            width: secondaryMediaData.width,
            height: secondaryMediaData.height,
            alt: secondaryMediaData.alt,
            srcset: SecondaryMediaSrcset,
            sizes: secondaryMediaData.sizes,
          });

          mediaContainer.appendChild(secondaryImg);
        }

        // Create card content container
        const cardContent = document.createElement("div");
        cardContent.classList.add("card__content");

        // Create card information container
        const cardInformation = document.createElement("div");
        cardInformation.classList.add("card__information");

        // Title and link
        const heading = document.createElement("h3");
        heading.classList.add("card__heading");
        if (
          !this.getAttribute("featured-media") &&
          this.getAttribute("card-style") === "standard"
        ) {
          heading.id = `title-${sectionId}-${productId}`;
        }

        const link = document.createElement("a");
        link.href = url;
        link.classList.add("full-unstyled-link");
        link.id = `StandardCardNoMediaLink-${sectionId}-${productId}`;
        link.setAttribute(
          "aria-labelledby",
          `StandardCardNoMediaLink-${sectionId}-${productId} NoMediaStandardBadge-${sectionId}-${productId}`
        );
        link.textContent = title;

        heading.appendChild(link);
        cardInformation.appendChild(heading);
        cardContent.appendChild(cardInformation);

        // Price container and logic
        const priceContainer = document.createElement("div");
        priceContainer.classList.add("price");

        if (!available) {
          priceContainer.classList.add("price--sold-out");
        }
        if (compareAtPrice > price) {
          priceContainer.classList.add("price--on-sale");
        }

        const priceContent = document.createElement("div");
        priceContent.classList.add("price__container");

        // Regular price display
        const regularPriceDiv = document.createElement("div");
        const currentPrice = document.createElement("span");
        if (compareAtPrice > price) {
          regularPriceDiv.classList.add("price__sale");
          currentPrice.classList.add(
            "price-item",
            "price-item--sale",
            "price-item--last"
          );
        } else {
          regularPriceDiv.classList.add("price__regular");
          currentPrice.classList.add("price-item", "price-item--regular");
        }

        // Format price
        const formattedPrice = `$${price.toLocaleString(
          "en-US"
        )} ${currencyCode}`;
        currentPrice.textContent = formattedPrice;

        regularPriceDiv.appendChild(currentPrice);

        if (compareAtPrice > price) {
          const compareAt = document.createElement("span");
          compareAt.classList.add(
            "price-item",
            "price-item--regular",
            "variant-item__old-price"
          );
          // Format compare-at price
          const formattedCompareAtPrice = `$${compareAtPrice.toLocaleString(
            "en-US"
          )} ${currencyCode}`;
          compareAt.textContent = formattedCompareAtPrice;
          regularPriceDiv.appendChild(compareAt);
        }

        // Badge for availability and sale status
        const badge = document.createElement("div");
        badge.classList.add("card__badge", badgePosition);

        if (!available) {
          const soldOutBadge = document.createElement("span");
          soldOutBadge.id = `NoMediaStandardBadge-${sectionId}-${productId}`;
          soldOutBadge.classList.add(
            "badge",
            "badge--bottom-left",
            "color-sold-out"
          );
          soldOutBadge.textContent = "Sold Out";
          badge.appendChild(soldOutBadge);
        } else if (compareAtPrice > price) {
          const saleBadge = document.createElement("span");
          saleBadge.id = `NoMediaStandardBadge-${sectionId}-${productId}`;
          saleBadge.classList.add("badge", "badge--bottom-left", "color-sale");
          saleBadge.textContent = "On Sale";
          badge.appendChild(saleBadge);
        }

        // Append the media container and card content to the component
        this.appendChild(mediaContainer);
        this.appendChild(cardContent);
        cardContent.appendChild(badge);
        // Add the price container to the card content
        priceContent.appendChild(regularPriceDiv);
        priceContainer.appendChild(priceContent);
        cardContent.appendChild(priceContainer);
      }

      // Define parseMediaData as an arrow function to bind it to the instance
      parseMediaData = (dataString) => {
        const dataObject = {};

        const regex = /([^,:]+):\s*(.+?)(?=,|$)/g; // This regex matches key-value pairs with optional quotes

        let match;
        while ((match = regex.exec(dataString)) !== null) {
          const key = match[1].trim();
          const value = match[2].trim().replace(/^['"]|['"]$/g, ""); // Remove quotes

          dataObject[key] = value;
        }

        return dataObject;
      };

      // Utility function to create an <img> element and set its attributes
      createImageElement({ src, width, height, alt, srcset, sizes }) {
        const img = document.createElement("img");
        img.src = src;
        img.width = width ? parseInt(width) : undefined;
        img.height = height ? parseInt(height) : undefined;
        img.alt = alt || "";
        img.srcset = srcset;
        img.sizes = sizes;
        img.loading = "lazy";
        img.classList.add("motion-reduce"); // Add any additional classes if needed
        return img;
      }
    }
  );
}
