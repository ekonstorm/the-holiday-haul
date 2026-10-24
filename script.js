/* ============================================================
 *  script.js — The Holiday Haul · Interactive Logic
 * ============================================================
 *
 *  Features:
 *    1. Product Grid Rendering (with graceful SVG fallback)
 *    2. Dual Category & Gift Guide Filtering
 *    3. Instant Live Search with Clear Trigger
 *    4. Deep-link & Hash Navigation (Pinterest Pin Compatibility)
 *    5. Robust Mobile Navigation (Backdrop & Escape handling)
 *    6. Accessible Modals (Disclosure, Privacy, Contact)
 *    7. Non-intrusive Toast Notifications for Demo Links
 *    8. Smooth Scrolling & Reduced Motion Respect
 *    9. Back to Top Button
 *
 * ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---- DOM References ---- */
  const menuToggle        = document.getElementById("menu-toggle");
  const mainNav           = document.getElementById("main-nav");
  const navBackdrop       = document.getElementById("nav-backdrop");
  const featuredGrid      = document.getElementById("featured-grid");
  const filterBar         = document.getElementById("filter-bar");
  const searchInput       = document.getElementById("search-input");
  const searchClearBtn    = document.getElementById("search-clear-btn");
  const productCountBadge = document.getElementById("product-count-badge");
  const filterIndicator   = document.getElementById("active-filter-indicator");
  const indicatorText     = document.getElementById("indicator-text");
  const resetFiltersBtn   = document.getElementById("btn-reset-filters");
  const backToTopBtn      = document.getElementById("back-to-top");
  const toastContainer    = document.getElementById("toast-container");

  // Modals
  const modalDisclosure   = document.getElementById("modal-disclosure");
  const modalPrivacy      = document.getElementById("modal-privacy");
  const modalContact      = document.getElementById("modal-contact");

  let activeFilter = "all";
  let activeSearch = "";

  /* ===========================================================
   *  SVG PLACEHOLDER FALLBACK
   * =========================================================== */
  function getFallbackSvgDataUri(title, category) {
    const iconMap = {
      halloween: "🎃",
      christmas: "🎄",
      newyear: "🥂",
      valentines: "💝",
      everyday: "🏡",
      giftguide: "🎁",
    };
    const icon = iconMap[category] || "✨";
    const cleanTitle = (title || "Product").replace(/"/g, "'").slice(0, 24);

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
        <rect width="600" height="600" fill="#F4EFEA"/>
        <rect x="20" y="20" width="560" height="560" rx="12" fill="none" stroke="#E2D8CD" stroke-width="2"/>
        <circle cx="300" cy="270" r="90" fill="#FAF7F2" stroke="#E2D8CD" stroke-width="2"/>
        <text x="300" y="305" font-size="70" text-anchor="middle" font-family="system-ui, sans-serif">${icon}</text>
        <text x="300" y="420" font-size="22" font-weight="600" fill="#292722" text-anchor="middle" font-family="'Playfair Display', Georgia, serif">${cleanTitle}</text>
        <text x="300" y="455" font-size="14" font-weight="500" fill="#777067" text-anchor="middle" font-family="'Inter', sans-serif">The Holiday Haul Curated Pick</text>
      </svg>
    `.trim();

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  /* ===========================================================
   *  1. RENDER PRODUCT CARDS
   * =========================================================== */

  /**
   * Generates HTML for a single product card
   */
  function createProductCardHTML(product) {
    const categoryObj = (typeof CATEGORIES !== "undefined")
      ? CATEGORIES.find(c => c.id === product.category)
      : null;
    const categoryLabel = categoryObj ? categoryObj.label : product.category;
    const categoryIcon = categoryObj ? categoryObj.icon : "✨";

    const isDemo = product.title.toLowerCase().startsWith("demo");
    const isPlaceholderLink = !product.amazonUrl ||
      product.amazonUrl.includes("YOUR_AMAZON_AFFILIATE_LINK") ||
      product.amazonUrl === "#";

    const fallbackUri = getFallbackSvgDataUri(product.title, product.category);

    return `
      <article class="product-card fade-in-up" data-id="${product.id}" data-category="${product.category}">
        <div class="product-card-img">
          <img
            src="${product.image}"
            alt="${product.title}"
            loading="lazy"
            width="600"
            height="600"
            onerror="this.onerror=null; this.src='${fallbackUri}';"
          />
          <span class="product-category-label">
            <span aria-hidden="true">${categoryIcon}</span> ${categoryLabel}
          </span>
        </div>
        <div class="product-card-body">
          ${isDemo ? '<span class="demo-badge">Demo Product</span>' : ""}
          <h3 class="product-card-title">${product.title}</h3>
          <p class="product-card-desc">${product.description}</p>
          ${product.price ? `<p class="product-card-price">${product.price}</p>` : ""}
          
          <div class="product-card-action">
            <a
              href="${isPlaceholderLink ? '#featured' : product.amazonUrl}"
              class="btn btn-primary btn-small product-affiliate-link"
              ${isPlaceholderLink ? '' : 'target="_blank" rel="noopener noreferrer nofollow sponsored"'}
              data-is-placeholder="${isPlaceholderLink}"
              aria-label="View ${product.title} on Amazon ${isPlaceholderLink ? '(Demo preview)' : '(opens in new tab)'}"
            >
              View on Amazon <span class="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </article>
    `;
  }

  /**
   * Filters and renders products inside #featured-grid
   */
  function renderProducts() {
    if (!featuredGrid || typeof PRODUCTS === "undefined") return;

    let items = [...PRODUCTS];

    // Category / Guide Filter
    if (activeFilter !== "all") {
      if (activeFilter.startsWith("guide:")) {
        const guideKey = activeFilter.replace("guide:", "");
        items = items.filter(p => Array.isArray(p.giftGuide) && p.giftGuide.includes(guideKey));
      } else {
        items = items.filter(p => p.category === activeFilter);
      }
    }

    // Live Search Filter
    if (activeSearch) {
      const q = activeSearch.toLowerCase();
      items = items.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (Array.isArray(p.giftGuide) && p.giftGuide.some(g => g.toLowerCase().includes(q)))
      );
    }

    // Update Product Count Badge & Active Status Indicator
    if (productCountBadge) {
      productCountBadge.textContent = `${items.length} ${items.length === 1 ? 'Find' : 'Finds'}`;
    }

    if (filterIndicator && indicatorText) {
      if (activeFilter !== "all" || activeSearch) {
        let label = "Filtered by: ";
        if (activeFilter !== "all") {
          const activeChip = document.querySelector(`.filter-chip[data-filter="${activeFilter}"]`);
          label += activeChip ? activeChip.textContent.trim() : activeFilter;
        }
        if (activeSearch) {
          label += (activeFilter !== "all" ? " + " : "") + `Search "${activeSearch}"`;
        }
        indicatorText.textContent = label;
        filterIndicator.hidden = false;
      } else {
        filterIndicator.hidden = true;
      }
    }

    // Empty state handling
    if (items.length === 0) {
      featuredGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon" aria-hidden="true">🔍</div>
          <h3>No matching finds found</h3>
          <p>We couldn't find anything matching your current filter or search criteria.</p>
          <button type="button" class="btn btn-secondary btn-small" id="btn-empty-reset" style="margin-top: 1rem;">
            Reset All Filters
          </button>
        </div>
      `;
      const emptyReset = document.getElementById("btn-empty-reset");
      if (emptyReset) {
        emptyReset.addEventListener("click", resetAllFilters);
      }
    } else {
      featuredGrid.innerHTML = items.map(createProductCardHTML).join("");
    }

    // Attach click listeners to product affiliate links
    featuredGrid.querySelectorAll(".product-affiliate-link").forEach(btn => {
      btn.addEventListener("click", (e) => {
        if (btn.dataset.isPlaceholder === "true") {
          e.preventDefault();
          showToast(
            "Demo Link: Replace 'amazonUrl' in products.js with your real Amazon Associates tag before publishing.",
            "info"
          );
        }
      });
    });

    // Re-observe animations
    observeAnimatedElements(featuredGrid);
  }

  function resetAllFilters() {
    activeFilter = "all";
    activeSearch = "";
    if (searchInput) searchInput.value = "";
    if (searchClearBtn) searchClearBtn.hidden = true;

    if (filterBar) {
      filterBar.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      const allChip = filterBar.querySelector('.filter-chip[data-filter="all"]');
      if (allChip) allChip.classList.add("active");
    }

    renderProducts();
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", resetAllFilters);
  }


  /* ===========================================================
   *  2. FILTER CHIP INTERACTIONS
   * =========================================================== */
  if (filterBar) {
    filterBar.addEventListener("click", (e) => {
      const chip = e.target.closest(".filter-chip");
      if (!chip) return;

      activeFilter = chip.dataset.filter;

      filterBar.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");

      renderProducts();
    });
  }


  /* ===========================================================
   *  3. LIVE SEARCH WITH CLEAR BUTTON
   * =========================================================== */
  if (searchInput) {
    let debounceTimer;

    searchInput.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      const val = searchInput.value.trim();
      if (searchClearBtn) {
        searchClearBtn.hidden = val.length === 0;
      }

      debounceTimer = setTimeout(() => {
        activeSearch = val;
        renderProducts();
      }, 200);
    });

    if (searchClearBtn) {
      searchClearBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchClearBtn.hidden = true;
        activeSearch = "";
        searchInput.focus();
        renderProducts();
      });
    }
  }


  /* ===========================================================
   *  4. CATEGORY & GUIDE TILE QUICK SWITCHERS
   * =========================================================== */

  function applyCategoryFilter(catId, shouldScroll = true) {
    activeFilter = catId;
    if (filterBar) {
      filterBar.querySelectorAll(".filter-chip").forEach(c => {
        c.classList.toggle("active", c.dataset.filter === catId);
      });
    }
    renderProducts();

    if (shouldScroll) {
      const target = document.getElementById("featured");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  // Handle clicks on Seasonal tiles
  document.querySelectorAll("[data-category-target]").forEach(tile => {
    tile.addEventListener("click", (e) => {
      const targetCat = tile.getAttribute("data-category-target");
      if (targetCat === "giftguide") {
        // Scroll to gift guides section
        const guidesSec = document.getElementById("gift-guides");
        if (guidesSec) {
          e.preventDefault();
          guidesSec.scrollIntoView({ behavior: "smooth", block: "start" });
          history.pushState(null, null, "#gift-guides");
        }
      } else {
        e.preventDefault();
        applyCategoryFilter(targetCat, true);
        history.pushState(null, null, `#collection-${targetCat}`);
      }
    });
  });

  // Handle clicks on Gift Guide cards
  document.querySelectorAll("[data-guide-target]").forEach(card => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const guideKey = card.getAttribute("data-guide-target");
      const filterKey = `guide:${guideKey}`;
      applyCategoryFilter(filterKey, true);
      history.pushState(null, null, `#guide-${guideKey}`);
    });
  });


  /* ===========================================================
   *  5. MOBILE NAVIGATION (Accessible & Robust)
   * =========================================================== */
  function closeMobileNav() {
    if (!mainNav || !menuToggle) return;
    mainNav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    if (navBackdrop) navBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openMobileNav() {
    if (!mainNav || !menuToggle) return;
    mainNav.classList.add("open");
    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    if (navBackdrop) navBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.contains("open");
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    if (navBackdrop) {
      navBackdrop.addEventListener("click", closeMobileNav);
    }

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mainNav.classList.contains("open")) {
        closeMobileNav();
      }
    });

    // Close menu when any nav link is clicked
    mainNav.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", closeMobileNav);
    });

    // Ensure body scroll is restored if screen is resized beyond mobile breakpoint
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && mainNav.classList.contains("open")) {
        closeMobileNav();
      }
    }, { passive: true });
  }


  /* ===========================================================
   *  6. SMOOTH SCROLLING & INTERNAL LINKS
   * =========================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      targetEl.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });

      history.pushState(null, null, targetId);
    });
  });


  /* ===========================================================
   *  7. DEEP LINK / HASH ON INITIAL LOAD (e.g. from Pinterest)
   * =========================================================== */
  function handleInitialHash() {
    const hash = window.location.hash.toLowerCase();
    if (!hash) return;

    const categoryHashMap = {
      "#collection-halloween": "halloween",
      "#halloween-picks": "halloween",
      "#collection-christmas": "christmas",
      "#christmas-picks": "christmas",
      "#collection-newyear": "newyear",
      "#newyear-picks": "newyear",
      "#collection-valentines": "valentines",
      "#valentines-picks": "valentines",
      "#collection-everyday": "everyday",
      "#everyday-picks": "everyday",
      "#guide-under25": "guide:under25",
      "#guide-forher": "guide:forher",
      "#guide-hostess": "guide:hostess",
      "#guide-party": "guide:party",
    };

    if (categoryHashMap[hash]) {
      setTimeout(() => {
        applyCategoryFilter(categoryHashMap[hash], true);
      }, 100);
    }
  }


  /* ===========================================================
   *  8. MODALS (Affiliate Disclosure, Privacy, Contact)
   * =========================================================== */
  function setupModal(triggerBtnId, modalEl) {
    const trigger = document.getElementById(triggerBtnId);
    if (!trigger || !modalEl) return;

    trigger.addEventListener("click", () => {
      if (typeof modalEl.showModal === "function") {
        modalEl.showModal();
      } else {
        modalEl.setAttribute("open", "");
      }
      document.body.style.overflow = "hidden";
    });

    modalEl.querySelectorAll("[data-close-modal]").forEach(btn => {
      btn.addEventListener("click", () => {
        if (typeof modalEl.close === "function") {
          modalEl.close();
        } else {
          modalEl.removeAttribute("open");
        }
        document.body.style.overflow = "";
      });
    });

    // Close on backdrop click
    modalEl.addEventListener("click", (e) => {
      const rect = modalEl.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
        && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        if (typeof modalEl.close === "function") {
          modalEl.close();
        } else {
          modalEl.removeAttribute("open");
        }
        document.body.style.overflow = "";
      }
    });

    modalEl.addEventListener("cancel", () => {
      document.body.style.overflow = "";
    });
  }

  setupModal("open-disclosure-btn", modalDisclosure);
  setupModal("open-privacy-btn", modalPrivacy);
  setupModal("open-contact-btn", modalContact);


  /* ===========================================================
   *  9. TOAST NOTIFICATIONS (Replaces intrusive alerts)
   * =========================================================== */
  function showToast(message, type = "info") {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'info' ? 'ℹ️' : '✨'}</span>
      <span class="toast-text">${message}</span>
      <button type="button" class="toast-close" aria-label="Dismiss">&times;</button>
    `;

    toastContainer.appendChild(toast);

    // Auto remove after 5 seconds
    const timer = setTimeout(() => {
      toast.classList.add("toast-fade-out");
      setTimeout(() => toast.remove(), 300);
    }, 5000);

    toast.querySelector(".toast-close").addEventListener("click", () => {
      clearTimeout(timer);
      toast.remove();
    });
  }


  /* ===========================================================
   *  10. BACK TO TOP BUTTON
   * =========================================================== */
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }, { passive: true });

    backToTopBtn.addEventListener("click", () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }


  /* ===========================================================
   *  11. SCROLL-IN ANIMATIONS (IntersectionObserver)
   * =========================================================== */
  function observeAnimatedElements(root) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      (root || document).querySelectorAll(".fade-in-up").forEach(el => {
        el.classList.add("visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    (root || document).querySelectorAll(".fade-in-up:not(.visible)").forEach(el => {
      observer.observe(el);
    });
  }


  /* ===========================================================
   *  INITIALIZATION
   * =========================================================== */
  renderProducts();
  observeAnimatedElements(document);
  handleInitialHash();

});
