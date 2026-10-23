/**
 * ============================================================================
 * Samira's Henna Artwork - Frontend Application Script
 * Vanilla JavaScript • Beginner Friendly • No Framework Dependencies
 * ============================================================================
 * 
 * TABLE OF CONTENTS:
 * 1. Business Configuration (WhatsApp Number & Currency)
 * 2. Organic Henna Product Data (Easily edit, add, or change prices here)
 * 3. Henna Artwork Gallery Data (Easily edit or replace image paths)
 * 4. DOM Initialization & Event Handlers
 * 5. Product Rendering, Quantity Management & Subtotal Calculation
 * 6. WhatsApp Order Message Generator & Click-to-Chat Handlers
 * 7. Gallery Category Filtering & Image Lightbox Modal
 * 8. FAQ Accordion Functionality
 * 9. Mobile Navigation & Header Scroll State
 * ============================================================================
 */

/* ============================================================================
   1. BUSINESS CONFIGURATION
   ============================================================================ */

/**
 * YOUR WHATSAPP NUMBER:
 * ----------------------------------------------------------------------------
 * Replace "8801XXXXXXXXX" below with your actual WhatsApp phone number.
 * 
 * Rules:
 * - Digits ONLY (no '+', no dashes, no spaces, no parentheses).
 * - Must include your country code. For Bangladesh, use "880".
 * - Omit the initial '0' of your domestic number.
 * - Example: If your number is 01712-345678, write "8801712345678".
 */
const WHATSAPP_NUMBER = "8801630082729";

// Currency symbol used across the website (Bangladeshi Taka)
const CURRENCY_SYMBOL = "৳";


/* ============================================================================
   2. ORGANIC HENNA PRODUCT DATA
   ============================================================================
   To modify products:
   - Change `price` to update unit price in BDT.
   - Set `available: false` to mark as Out of Stock (disables ordering).
   - Change `image` to point to your product photo (e.g., 'assets/images/my-cone.jpg').
   - Modify `comboDetails` to list items in a combo or write 'Not applicable'.
   - Add new items to this array to add more products to the shop!
*/
const products = [
  {
    id: "henna-cone",
    name: "Organic Henna Cone",
    tagline: "Hand-rolled with 100% natural organic henna paste",
    description: "Prepared fresh with pure Rajasthani henna powder, premium eucalyptus essential oil, and natural lemon sugar brew. Delivers an intense, deep mahogany-burgundy stain with zero chemical dyes or PPD.",
    size: "25 g per cone",
    price: 150,
    comboDetails: "Not applicable",
    available: true,
    badge: "Fresh Batch 🌿",
    image: "assets/images/product-cone.jpg"
  },
  {
    id: "henna-powder",
    name: "Pure Organic Henna Powder",
    tagline: "Triple-sifted micro-fine Rajasthani Sojat crop",
    description: "100% raw, certified organic henna leaves sourced from Sojat, Rajasthan. Triple-filtered to body-art quality for a super smooth, stringy paste that glides effortlessly through fine cone tips.",
    size: "100 g pouch",
    price: 350,
    comboDetails: "Not applicable",
    available: true,
    badge: "100% Pure 🌱",
    image: "assets/images/product-powder.webp"
  },
  {
    id: "henna-combo",
    name: "Henna Lover's Artistry Combo",
    tagline: "Complete DIY kit for henna enthusiasts and brides",
    description: "Our signature all-in-one gift package containing everything needed for salon-grade henna art and rich dark stains at home. Perfect for gifting, weddings, and festive Eid celebrations.",
    size: "Full Deluxe Kit",
    price: 850,
    comboDetails: "Includes: 4x Fresh Cones (25g), 1x Pure Powder Pouch (100g), 1x Eucalyptus Aftercare Oil (15ml), 2x Reusable Adhesive Design Stencils, and 1x Application Guide",
    available: true,
    badge: "Best Value 🎁",
    image: "assets/images/product-combo.jpg"
  },
  {
    id: "henna-oil",
    name: "Herbal Henna Aftercare Oil",
    tagline: "Natural essential blend for intense, lasting stain",
    description: "Formulated with pure Nilgiri eucalyptus, clove bud, and tea tree oils. Nourishes the freshly peeled skin, locks in the natural pigment, and deepens stain intensity over 48 hours.",
    size: "15 ml spray bottle",
    price: 220,
    comboDetails: "Not applicable",
    available: true,
    badge: "Stain Booster ✨",
    image: "assets/images/product-oil.jpg"
  }
];


/* ============================================================================
   3. HENNA ARTWORK GALLERY DATA
   ============================================================================
   Categories:
   - "bridal"      -> Bridal Henna
   - "traditional" -> Traditional Designs
   - "minimal"     -> Minimal Henna
   - "festive"     -> Festive Henna
   - "floral"      -> Floral Patterns
*/
const galleryItems = [
  {
    id: 1,
    title: "Mughal Domes & Couple Monograms",
    category: "bridal",
    categoryLabel: "Bridal Henna",
    caption: "Regal full-arm bridal mehndi featuring Mughal architectural arches, domes, and custom bride-groom monograms ('Jahir' & 'SM').",
    image: "assets/images/henna-01.jpg"
  },
  {
    id: 2,
    title: "Heritage Peacock & Leafy Vines",
    category: "traditional",
    categoryLabel: "Traditional Designs",
    caption: "Handcrafted traditional peacock motif with lush botanical vine fills, rendered in rich organic henna paste.",
    image: "assets/images/henna-02.jpg"
  },
  {
    id: 3,
    title: "Jewelry Cuff & Monogram Jaali",
    category: "minimal",
    categoryLabel: "Minimal Henna",
    caption: "Modern back-of-hand jewelry design with delicate netted jaali chains and personal initial crest ('MS').",
    image: "assets/images/henna-03.jpg"
  },
  {
    id: 4,
    title: "Joyful Celebration Hands",
    category: "festive",
    categoryLabel: "Festive Henna",
    caption: "Playful and festive henna pattern celebrating family moments, smiles, and joyful Eid festivities.",
    image: "assets/images/henna-04.jpg"
  },
  {
    id: 5,
    title: "Crown Cuff & Shaded Roses",
    category: "floral",
    categoryLabel: "Floral Patterns",
    caption: "Crown-inspired wrist band complemented with delicately shaded rose blooms, organic leaves, and lace tips.",
    image: "assets/images/henna-05.jpg"
  },
  {
    id: 6,
    title: "Royal Palace Arch Symmetry",
    category: "bridal",
    categoryLabel: "Bridal Henna",
    caption: "Grand bilateral bridal masterpiece featuring symmetric temple arches, lotus domes, and fine geometric lattice.",
    image: "assets/images/henna-06.jpg"
  },
  {
    id: 7,
    title: "Dual Palm Lotus Medallion",
    category: "traditional",
    categoryLabel: "Traditional Designs",
    caption: "Classic double-hand design centered with blooming lotus medallions and detailed geometric finger bands.",
    image: "assets/images/henna-07.jpg"
  },
  {
    id: 8,
    title: "Dancing Peacock & Crimson Jaali",
    category: "traditional",
    categoryLabel: "Traditional Designs",
    caption: "Traditional peacock feather work paired with intricate cross-hatch jaali net and paisley curves.",
    image: "assets/images/henna-08.jpg"
  },
  {
    id: 9,
    title: "Blossoming Garden Lace",
    category: "festive",
    categoryLabel: "Festive Henna",
    caption: "Intricate floral glove lace design framed amidst fresh blossoms for wedding and festival parties.",
    image: "assets/images/henna-09.jpg"
  },
  {
    id: 10,
    title: "Natural Botanical & Garden Trail",
    category: "floral",
    categoryLabel: "Floral Patterns",
    caption: "Organic botanical vines and delicate floral chains gracefully wrapping around fingers and wrists.",
    image: "assets/images/henna-10.jpg"
  },
  {
    id: 11,
    title: "Bridal Arabic Script & Monogram",
    category: "bridal",
    categoryLabel: "Bridal Henna",
    caption: "Custom bridal design featuring personalized Arabic calligraphy ('ثاقب'), paired initials ('S&D'), and fine floral cuffs.",
    image: "assets/images/henna-11.jpg"
  },
  {
    id: 12,
    title: "Geometric Palm Mesh & Negative Space",
    category: "minimal",
    categoryLabel: "Minimal Henna",
    caption: "Clean contemporary lines, negative space symmetry, and micro-dot accents for modern henna lovers.",
    image: "assets/images/henna-12.jpg"
  },
  {
    id: 13,
    title: "Golden Heirloom Bridal Lotus",
    category: "bridal",
    categoryLabel: "Bridal Henna",
    caption: "Stunning bridal palm framed with golden bridal bangles, intricate lotus mandala, and heirloom finger motifs.",
    image: "assets/images/henna-13.jpg"
  },
  {
    id: 14,
    title: "Jasmine Blossom & Wrist Cuff",
    category: "floral",
    categoryLabel: "Floral Patterns",
    caption: "Delicate floral wrist cuff and graceful finger vines, holding fresh white jasmine blossoms.",
    image: "assets/images/henna-14.jpg"
  },
  {
    id: 15,
    title: "Custom Couple Calligraphy",
    category: "bridal",
    categoryLabel: "Bridal Henna",
    caption: "Artistic bridal forearm artwork featuring custom couple names ('Adnan & Shamna') nestled within delicate botanical lattice.",
    image: "assets/images/henna-15.jpg"
  },
  {
    id: 16,
    title: "Silk & Glass Bangles Festive Net",
    category: "festive",
    categoryLabel: "Festive Henna",
    caption: "Vibrant festive styling featuring fine diamond jaali, floral wrist arches, and traditional glass bangles.",
    image: "assets/images/henna-16.jpg"
  },
  {
    id: 17,
    title: "Symmetric Twin Palm Medallions",
    category: "traditional",
    categoryLabel: "Traditional Designs",
    caption: "Harmonious twin palm mandalas with chevron fingertip accents and balanced traditional shading.",
    image: "assets/images/henna-17.jpg"
  },
  {
    id: 18,
    title: "Mughal Cuff & Diamond Mesh",
    category: "minimal",
    categoryLabel: "Minimal Henna",
    caption: "Neat, crisp negative space styling with a Mughal-inspired wrist band and elegant diamond mesh.",
    image: "assets/images/henna-18.jpg"
  },
  {
    id: 19,
    title: "Crimson Velvet Bridal Grace",
    category: "bridal",
    categoryLabel: "Bridal Henna",
    caption: "Delicate bridal hand artwork against crimson velvet, highlighted by intricate ring chains and wrist lace.",
    image: "assets/images/henna-19.jpg"
  }
];

// Product quantities state tracker (keyed by product id)
const productQuantities = {};


/* ============================================================================
   4. DOM INITIALIZATION
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  // Initialize product quantities and render product cards
  products.forEach(p => {
    productQuantities[p.id] = 1;
  });
  renderProducts();

  // Render initial gallery (all designs)
  renderGallery("all");

  // Setup gallery category filter listeners
  setupGalleryFilters();

  // Setup lightbox modal controls
  setupLightbox();

  // Setup mobile navigation drawer
  setupMobileNav();

  // Setup FAQ accordion toggles
  setupFaqAccordion();

  // Setup header sticky appearance
  setupHeaderScroll();

  // Set dynamic copyright year in footer
  const yearElement = document.getElementById("copyright-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Setup general WhatsApp inquiry buttons
  setupGeneralWhatsAppButtons();
});


/* ============================================================================
   5. PRODUCT RENDERING, QUANTITY & SUBTOTAL
   ============================================================================ */

/**
 * Helper: Automatically handles both local image paths and Google Drive shareable URLs.
 * If a Google Drive shareable link is provided:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * It automatically extracts the FILE_ID and converts it into a high-speed direct CDN URL:
 * https://lh3.googleusercontent.com/d/FILE_ID
 */
function formatImageUrl(pathOrUrl) {
  if (!pathOrUrl) return "";
  const str = String(pathOrUrl).trim();

  // Handle Google Drive links directly
  if (str.includes("drive.google.com")) {
    const match = str.match(/\/d\/([a-zA-Z0-9_-]+)/) || str.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  }

  return str;
}

/**
 * Renders product cards into #products-grid with full details,
 * live quantity selectors, subtotal calculation, and WhatsApp buttons.
 */
function renderProducts() {
  const container = document.getElementById("products-grid");
  if (!container) return;

  container.innerHTML = "";

  products.forEach(product => {
    const qty = productQuantities[product.id] || 1;
    const subtotal = product.price * qty;

    const card = document.createElement("div");
    card.className = "bg-white rounded-2xl p-6 border border-[#EFE7D8] card-shadow flex flex-col justify-between relative";
    card.dataset.productId = product.id;

    // Check if combo
    const isCombo = product.comboDetails && product.comboDetails.toLowerCase() !== "not applicable";

    card.innerHTML = `
      <div>
        <!-- Product Image Container -->
        <div class="relative w-full aspect-square rounded-xl overflow-hidden bg-[#FAF6EE] mb-5 border border-[#EFE7D8]">
          <img 
            src="${formatImageUrl(product.image)}" 
            alt="${escapeHtml(product.name)}" 
            class="w-full h-full object-cover object-[center_35%] transition-transform duration-500 hover:scale-105"
            loading="lazy"
            onerror="this.onerror=null; this.src='assets/images/hero-henna.jpg';"
          />
          <!-- Badge -->
          <div class="absolute top-3 left-3 bg-[#1B4332] text-[#FAF5ED] text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            ${escapeHtml(product.badge)}
          </div>
          ${!product.available ? `
            <div class="absolute inset-0 bg-[#2C140E]/75 backdrop-blur-[2px] flex items-center justify-center">
              <span class="bg-[#C86D51] text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow">
                Currently Out of Stock
              </span>
            </div>
          ` : ""}
        </div>

        <!-- Product Name & Tagline -->
        <div class="mb-3">
          <div class="flex items-center justify-between gap-2 mb-1">
            <h3 class="font-serif text-xl sm:text-2xl font-bold text-[#3D1E16]">
              ${escapeHtml(product.name)}
            </h3>
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#F4EFE6] text-[#5A2E1F] whitespace-nowrap">
              ${escapeHtml(product.size)}
            </span>
          </div>
          <p class="text-xs text-[#C86D51] font-medium mb-2">${escapeHtml(product.tagline)}</p>
          <p class="text-sm text-[#5A2E1F]/90 leading-relaxed">
            ${escapeHtml(product.description)}
          </p>
        </div>

        <!-- Combo Details Pill if applicable -->
        ${isCombo ? `
          <div class="mb-4 p-3 bg-[#FAF6EE] rounded-xl border border-[#EFE7D8] text-xs text-[#3D1E16]">
            <p class="font-semibold text-[#1B4332] flex items-center gap-1.5 mb-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              What is included in this combo:
            </p>
            <p class="text-[#5A2E1F] pl-5 leading-normal">${escapeHtml(product.comboDetails)}</p>
          </div>
        ` : ""}
      </div>

      <!-- Footer & Pricing Section -->
      <div class="pt-4 border-t border-[#EFE7D8] mt-4">
        <div class="flex items-baseline justify-between mb-3">
          <div>
            <span class="text-xs text-[#7A5B4C] uppercase font-semibold">Unit Price</span>
            <div class="text-2xl font-serif font-bold text-[#1B4332]">
              ${CURRENCY_SYMBOL}${product.price.toLocaleString()}
            </div>
          </div>
          ${product.available ? `
            <div class="text-right">
              <span class="text-xs text-[#7A5B4C] uppercase font-semibold">Subtotal</span>
              <div id="subtotal-${product.id}" class="text-lg font-bold text-[#3D1E16]">
                ${CURRENCY_SYMBOL}${subtotal.toLocaleString()}
              </div>
            </div>
          ` : ""}
        </div>

        ${product.available ? `
          <!-- Quantity Controls -->
          <div class="flex items-center gap-2 mb-4">
            <span class="text-xs font-medium text-[#5A2E1F]">Quantity:</span>
            <div class="flex items-center border border-[#D9CBB6] rounded-lg overflow-hidden bg-[#FAF6EE]">
              <button 
                type="button" 
                onclick="changeQuantity('${product.id}', -1)"
                class="w-9 h-9 flex items-center justify-center text-base font-bold text-[#3D1E16] hover:bg-[#EFE7D8] transition-colors focus:outline-none"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input 
                type="number" 
                id="qty-${product.id}" 
                value="${qty}" 
                min="1" 
                max="99" 
                onchange="handleManualQuantityChange('${product.id}', this.value)"
                class="w-12 h-9 text-center bg-transparent font-semibold text-sm text-[#3D1E16] border-x border-[#D9CBB6] focus:outline-none"
                aria-label="Quantity of ${escapeHtml(product.name)}"
              />
              <button 
                type="button" 
                onclick="changeQuantity('${product.id}', 1)"
                class="w-9 h-9 flex items-center justify-center text-base font-bold text-[#3D1E16] hover:bg-[#EFE7D8] transition-colors focus:outline-none"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <!-- Order on WhatsApp Button -->
          <button 
            type="button"
            onclick="orderProduct('${product.id}')"
            class="w-full py-3 px-4 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm hover:shadow"
          >
            <!-- WhatsApp Icon -->
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.969.54 1.777.818 2.796.818 3.182 0 5.768-2.587 5.768-5.766.001-3.18-2.585-5.766-5.768-5.766zm9.969 5.768c0 5.503-4.469 9.972-9.969 9.972-1.705 0-3.32-.435-4.743-1.199l-5.288 1.387 1.41-5.155c-.864-1.488-1.348-3.214-1.348-5.005 0-5.503 4.469-9.972 9.969-9.972 5.5 0 9.969 4.469 9.969 9.972z"/>
            </svg>
            <span>Order Now on WhatsApp</span>
          </button>
        ` : `
          <!-- Inquire Button when unavailable -->
          <button 
            type="button"
            onclick="inquireUnavailableProduct('${product.id}')"
            class="w-full py-3 px-4 rounded-xl bg-[#FAF6EE] border border-[#C86D51] text-[#C86D51] hover:bg-[#C86D51] hover:text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.969.54 1.777.818 2.796.818 3.182 0 5.768-2.587 5.768-5.766.001-3.18-2.585-5.766-5.768-5.766zm9.969 5.768c0 5.503-4.469 9.972-9.969 9.972-1.705 0-3.32-.435-4.743-1.199l-5.288 1.387 1.41-5.155c-.864-1.488-1.348-3.214-1.348-5.005 0-5.503 4.469-9.972 9.969-9.972 5.5 0 9.969 4.469 9.969 9.972z"/>
            </svg>
            <span>Inquire Availability on WhatsApp</span>
          </button>
        `}
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * Handles + and - quantity changes
 */
window.changeQuantity = function(productId, delta) {
  const current = productQuantities[productId] || 1;
  const next = Math.max(1, Math.min(99, current + delta));
  productQuantities[productId] = next;

  // Update input value
  const input = document.getElementById(`qty-${productId}`);
  if (input) input.value = next;

  // Update subtotal
  updateCardSubtotal(productId);
};

/**
 * Handles manual typed quantity changes
 */
window.handleManualQuantityChange = function(productId, rawValue) {
  let val = parseInt(rawValue, 10);
  if (isNaN(val) || val < 1) val = 1;
  if (val > 99) val = 99;

  productQuantities[productId] = val;

  const input = document.getElementById(`qty-${productId}`);
  if (input) input.value = val;

  updateCardSubtotal(productId);
};

/**
 * Updates the displayed subtotal for a given product card
 */
function updateCardSubtotal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const qty = productQuantities[productId] || 1;
  const subtotal = product.price * qty;
  const subtotalEl = document.getElementById(`subtotal-${productId}`);
  if (subtotalEl) {
    subtotalEl.textContent = `${CURRENCY_SYMBOL}${subtotal.toLocaleString()}`;
  }
}


/* ============================================================================
   6. WHATSAPP ORDER MESSAGE GENERATION & CLICK-TO-CHAT
   ============================================================================ */

/**
 * Verifies if the WhatsApp number is still the placeholder.
 * If so, displays an informative modal with the generated message
 * so the site owner/tester can see exactly what would be sent.
 */
function isPlaceholderNumber(number) {
  return !number || number.includes("X") || number.length < 10;
}

/**
 * Builds the exact structured WhatsApp order message requested:
 */
function buildOrderMessage(product, quantity, subtotal) {
  const comboText = (product.comboDetails && product.comboDetails.trim() !== "") 
    ? product.comboDetails 
    : "Not applicable";

  return `Hello Samira's Henna Artwork! 🌿

I would like to place an order.

Product: ${product.name}
Package size: ${product.size}
Quantity: ${quantity}
Unit price: ${CURRENCY_SYMBOL}${product.price}
Subtotal: ${CURRENCY_SYMBOL}${subtotal}
Combo details: ${comboText}

Please confirm the product availability, delivery charge, and total amount.

My name: [I will fill this in]
Delivery address: [I will fill this in]
Additional notes: [Optional]

Thank you!`;
}

/**
 * Triggers order placement via WhatsApp for a specific product
 */
window.orderProduct = function(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) {
    console.error("Product not found:", productId);
    return;
  }

  const quantity = productQuantities[productId] || 1;
  const subtotal = product.price * quantity;
  const message = buildOrderMessage(product, quantity, subtotal);

  // If the owner has not yet configured their real phone number
  if (isPlaceholderNumber(WHATSAPP_NUMBER)) {
    showPlaceholderNotice(
      "WhatsApp Number Setup Needed",
      `Your product order message was prepared perfectly! To open live WhatsApp chats, open <strong>script.js</strong> and replace <code>const WHATSAPP_NUMBER = "8801XXXXXXXXX";</code> with your real phone number.`,
      message
    );
    return;
  }

  // Live WhatsApp dispatch
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
};

/**
 * Inquires about an out of stock product
 */
window.inquireUnavailableProduct = function(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const message = `Hello Samira's Henna Artwork! 🌿

I am interested in your product: "${product.name}" (${product.size}), which is currently marked as out of stock.

Could you please let me know when this product will be back in stock or if pre-orders are available?

Thank you!`;

  if (isPlaceholderNumber(WHATSAPP_NUMBER)) {
    showPlaceholderNotice(
      "WhatsApp Number Setup Needed",
      `Your inquiry message was created! Update <strong>WHATSAPP_NUMBER</strong> in <code>script.js</code> to connect this directly to your WhatsApp.`,
      message
    );
    return;
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
};

/**
 * General WhatsApp click-to-chat inquiry
 */
window.openGeneralWhatsApp = function(customMessage) {
  const message = customMessage || `Hello Samira's Henna Artwork! 🌿

I would like to know more about your henna artwork, booking an appointment, and your organic henna products.`;

  if (isPlaceholderNumber(WHATSAPP_NUMBER)) {
    showPlaceholderNotice(
      "WhatsApp Number Setup Needed",
      `Your general inquiry message was prepared! To receive messages on your phone, open <code>script.js</code> and change <code>const WHATSAPP_NUMBER = "8801XXXXXXXXX";</code> to your actual phone number.`,
      message
    );
    return;
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
};

/**
 * Wire general WhatsApp buttons
 */
function setupGeneralWhatsAppButtons() {
  const navBtn = document.getElementById("nav-whatsapp-btn");
  if (navBtn) {
    navBtn.addEventListener("click", () => openGeneralWhatsApp());
  }

  const contactBtn = document.getElementById("contact-whatsapp-btn");
  if (contactBtn) {
    contactBtn.addEventListener("click", () => openGeneralWhatsApp());
  }

  const floatingBtn = document.getElementById("floating-whatsapp-btn");
  if (floatingBtn) {
    floatingBtn.addEventListener("click", () => openGeneralWhatsApp());
  }

  const footerBtn = document.getElementById("footer-whatsapp-link");
  if (footerBtn) {
    footerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openGeneralWhatsApp();
    });
  }
}

/**
 * Displays helpful preview modal if WhatsApp number is still placeholder
 */
function showPlaceholderNotice(title, explanationHtml, prefilledMessage) {
  let modal = document.getElementById("placeholder-notice-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "placeholder-notice-modal";
    modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C140E]/60 backdrop-blur-sm";
    modal.innerHTML = `
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#EFE7D8] text-[#3D1E16] max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-3 border-b border-[#EFE7D8] mb-4">
          <div class="flex items-center gap-2">
            <span class="w-8 h-8 rounded-full bg-[#1B4332] text-white flex items-center justify-center font-bold text-sm">🌿</span>
            <h3 id="modal-title" class="font-serif text-lg font-bold text-[#3D1E16]"></h3>
          </div>
          <button type="button" onclick="closePlaceholderNotice()" class="text-[#7A5B4C] hover:text-[#3D1E16] p-1 text-xl font-bold">&times;</button>
        </div>
        <div id="modal-explanation" class="text-xs text-[#5A2E1F] mb-3 leading-relaxed"></div>
        <div class="mb-4">
          <p class="text-xs font-semibold text-[#1B4332] uppercase tracking-wider mb-1">Generated WhatsApp Message Preview:</p>
          <pre id="modal-message-preview" class="p-3 bg-[#FAF6EE] rounded-xl text-xs font-mono text-[#3D1E16] border border-[#EFE7D8] whitespace-pre-wrap break-words leading-relaxed"></pre>
        </div>
        <div class="flex flex-col sm:flex-row gap-2">
          <button type="button" onclick="copyMessageToClipboard()" id="copy-msg-btn" class="flex-1 py-2.5 px-4 rounded-xl bg-[#FAF6EE] border border-[#D9CBB6] hover:bg-[#EFE7D8] text-xs font-semibold text-[#3D1E16] transition-colors">
            Copy Message Text
          </button>
          <button type="button" onclick="closePlaceholderNotice()" class="flex-1 py-2.5 px-4 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white text-xs font-semibold transition-colors">
            Understood
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-explanation").innerHTML = explanationHtml;
  document.getElementById("modal-message-preview").textContent = prefilledMessage;
  modal.style.display = "flex";
}

window.closePlaceholderNotice = function() {
  const modal = document.getElementById("placeholder-notice-modal");
  if (modal) modal.style.display = "none";
};

window.copyMessageToClipboard = function() {
  const text = document.getElementById("modal-message-preview").textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copy-msg-btn");
    if (btn) {
      btn.textContent = "Copied to Clipboard! ✓";
      setTimeout(() => {
        btn.textContent = "Copy Message Text";
      }, 2000);
    }
  });
};


/* ============================================================================
   7. GALLERY CATEGORY FILTERING & LIGHTBOX MODAL
   ============================================================================ */

/**
 * Setup category filter tabs
 */
function setupGalleryFilters() {
  const filterBtns = document.querySelectorAll(".gallery-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category || "all";

      // Update button active states
      filterBtns.forEach(b => {
        b.classList.remove("active", "bg-[#1B4332]", "text-white");
        b.classList.add("bg-[#FAF6EE]", "text-[#5A2E1F]");
      });

      btn.classList.remove("bg-[#FAF6EE]", "text-[#5A2E1F]");
      btn.classList.add("active", "bg-[#1B4332]", "text-white");

      renderGallery(category);
    });
  });
}

/**
 * Renders gallery items matching the selected filter
 */
function renderGallery(category) {
  const container = document.getElementById("gallery-grid");
  if (!container) return;

  const filtered = category === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === category);

  container.innerHTML = "";

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "gallery-card cursor-pointer group";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View ${item.title}`);

    card.innerHTML = `
      <div class="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-[#FAF6EE] border border-[#EFE7D8]">
        <img 
          src="${formatImageUrl(item.image)}" 
          alt="${escapeHtml(item.title)} - ${escapeHtml(item.categoryLabel)}" 
          class="w-full h-full object-cover"
          loading="lazy"
          onerror="this.onerror=null; this.src='assets/images/hero-henna.jpg';"
        />
        <!-- Category Tag -->
        <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#3D1E16] text-[11px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full shadow-sm">
          ${escapeHtml(item.categoryLabel)}
        </div>

        <!-- Hover Overlay -->
        <div class="gallery-overlay absolute inset-0 p-5 flex flex-col justify-end text-white">
          <span class="text-xs uppercase tracking-wider text-[#C9933E] font-semibold mb-1">Click to expand</span>
          <h4 class="font-serif text-lg font-bold text-white mb-1 leading-snug">${escapeHtml(item.title)}</h4>
          <p class="text-xs text-stone-200 line-clamp-2">${escapeHtml(item.caption)}</p>
        </div>
      </div>
      <!-- Card Caption below image -->
      <div class="p-3">
        <h4 class="font-serif font-bold text-base text-[#3D1E16] group-hover:text-[#1B4332] transition-colors">
          ${escapeHtml(item.title)}
        </h4>
        <p class="text-xs text-[#7A5B4C] mt-0.5">${escapeHtml(item.caption)}</p>
      </div>
    `;

    // Click & Keyboard Enter to open lightbox
    card.addEventListener("click", () => openLightbox(item.id));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(item.id);
      }
    });

    container.appendChild(card);
  });
}

/**
 * Lightbox Modal Controls
 */
let currentLightboxItemId = null;

function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  const closeBtn = document.getElementById("lightbox-close");
  const backdrop = document.getElementById("lightbox-backdrop");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeLightbox);
  }

  // Keyboard navigation: Escape key closes lightbox
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });

  // Lightbox WhatsApp inquiry button
  const lightboxInquireBtn = document.getElementById("lightbox-inquire-btn");
  if (lightboxInquireBtn) {
    lightboxInquireBtn.addEventListener("click", () => {
      if (!currentLightboxItemId) return;
      const item = galleryItems.find(i => i.id === currentLightboxItemId);
      if (!item) return;

      const message = `Hello Samira's Henna Artwork! 🌿

I saw your beautiful design "${item.title}" (${item.categoryLabel}) in your gallery.

I would love to enquire about booking an appointment for this design or checking the rates.

Thank you!`;

      openGeneralWhatsApp(message);
    });
  }
}

function openLightbox(itemId) {
  const item = galleryItems.find(i => i.id === itemId);
  if (!item) return;

  currentLightboxItemId = itemId;
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const title = document.getElementById("lightbox-title");
  const category = document.getElementById("lightbox-category");
  const caption = document.getElementById("lightbox-caption");

  if (img) {
    img.src = formatImageUrl(item.image);
    img.alt = item.title;
  }
  if (title) title.textContent = item.title;
  if (category) category.textContent = item.categoryLabel;
  if (caption) caption.textContent = item.caption;

  if (lightbox) {
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  }
  currentLightboxItemId = null;
}


/* ============================================================================
   8. FAQ ACCORDION
   ============================================================================ */

function setupFaqAccordion() {
  const faqButtons = document.querySelectorAll(".faq-trigger");

  faqButtons.forEach(button => {
    button.addEventListener("click", () => {
      const parent = button.closest(".faq-item");
      if (!parent) return;

      const isExpanded = button.getAttribute("aria-expanded") === "true";

      // Optional: Close all other open accordions for neatness
      document.querySelectorAll(".faq-item").forEach(item => {
        if (item !== parent) {
          item.classList.remove("open");
          const btn = item.querySelector(".faq-trigger");
          if (btn) btn.setAttribute("aria-expanded", "false");
        }
      });

      // Toggle current accordion
      if (isExpanded) {
        parent.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
      } else {
        parent.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}


/* ============================================================================
   9. MOBILE NAVIGATION & HEADER SCROLL STATE
   ============================================================================ */

function setupMobileNav() {
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileBackdrop = document.getElementById("mobile-menu-backdrop");
  const closeBtn = document.getElementById("mobile-menu-close");
  const navLinks = document.querySelectorAll(".mobile-nav-link");

  if (!menuToggle || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove("translate-x-full");
    if (mobileBackdrop) mobileBackdrop.classList.remove("hidden");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    mobileMenu.classList.add("translate-x-full");
    if (mobileBackdrop) mobileBackdrop.classList.add("hidden");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  menuToggle.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener("click", closeMenu);

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

function setupHeaderScroll() {
  const header = document.getElementById("main-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  }, { passive: true });
}


/* ============================================================================
   HELPER UTILITIES
   ============================================================================ */

/**
 * Escapes HTML characters to prevent XSS issues in rendered strings
 */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
