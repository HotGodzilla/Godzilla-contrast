/**
 * GODZILLA CONTRAST - MID-FIDELITY PROTOTYPE SCRIPT
 * Simple, easy-to-understand vanilla JavaScript for a student prototype.
 * Loads filler content from local JSON and handles interactive features.
 */

// 1. Fallback data in case the page is opened locally via file:// (where fetch is blocked by CORS)
const fallbackContent = {
  aboutContrast: {
    whyItMatters: [
      {
        title: "Directs the Viewer's Eye",
        description: "The human eye is naturally drawn to differences. High-contrast boundaries instantly establish clear focal points in an artwork."
      },
      {
        title: "Creates Emotional Tension",
        description: "Stark contrast between deep black and vivid white evokes drama, mystery, and raw power—ideal for colossal monsters."
      },
      {
        title: "Builds Form and Space",
        description: "Shadows and highlights define three-dimensional volume, separating the subject from its background."
      }
    ]
  },
  contrastTypes: [
    {
      id: "value",
      title: "1. Value & Tonal Contrast",
      subtitle: "Light vs. Shadow (Chiaroscuro)",
      badge: "In Hero",
      summary: "The dynamic gap between the brightest whites and deepest blacks.",
      detail: "Demonstrated by the Godzilla hero above. On the left side, the inverted silhouette glows against pure black. On the right, dark textured scales stand firmly on pure white. Extreme value contrast creates iconic silhouettes.",
      artExample: "Renaissance masters used chiaroscuro to make figures emerge dramatically from pitch-black backgrounds."
    },
    {
      id: "scale",
      title: "2. Scale & Proportion Contrast",
      subtitle: "Monumental vs. Miniature",
      badge: "Cinematic",
      summary: "Placing massive and tiny objects side-by-side to evoke awe.",
      detail: "Godzilla's entire visual presence hinges on scale contrast. When towering hundreds of feet above city skylines and human onlookers, the disparity highlights impossible strength and colossal weight.",
      artExample: "Caspar David Friedrich's landscape paintings juxtapose miniature human wanderers against towering mountain peaks."
    },
    {
      id: "texture",
      title: "3. Texture & Surface Contrast",
      subtitle: "Rough vs. Smooth",
      badge: "Detail",
      summary: "Juxtaposing intricate organic detail with calm negative space.",
      detail: "Godzilla's jagged dorsal spikes and cracked reptilian skin stand out cleanly against smooth, flat backgrounds. This contrast ensures fine anatomical details remain crisp and readable.",
      artExample: "Classical sculptors contrasted polished, smooth marble skin with rough, unchiseled bedrock."
    },
    {
      id: "color",
      title: "4. Color & Temperature Contrast",
      subtitle: "Warm vs. Cool / Complementary",
      badge: "Vibrancy",
      summary: "Contrasting opposing color temperatures for optical energy.",
      detail: "In cinema, Godzilla's cool electric-blue atomic breath cuts through warm burning city infernos. The temperature contrast between warm orange and ice-cold blue commands immediate attention.",
      artExample: "Vincent van Gogh frequently paired intense cobalt blues with radiant golden yellows to energize his paintings."
    }
  ],
  interactiveTips: [
    {
      tip: "Tip #1: Contrast Requires Rest",
      explanation: "If an entire composition has equal high contrast, the viewer's eyes become fatigued. Contrast works best when reserved for key focal points."
    },
    {
      tip: "Tip #2: Negative Space is an Active Element",
      explanation: "The empty white or black space surrounding Godzilla defines his silhouette just as powerfully as his drawn body."
    },
    {
      tip: "Tip #3: The Mood Inversion Effect",
      explanation: "Notice how the black background evokes nocturnal mystery, while the white background feels like a graphic poster or architectural study."
    }
  ]
};

// 2. Main initialization when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initContent();
  initPanelInteractions();
});

/**
 * Fetch local content.json or fall back seamlessly
 */
function initContent() {
  fetch("content.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Local JSON fetch failed");
      }
      return response.json();
    })
    .then((data) => {
      renderContent(data);
    })
    .catch((error) => {
      // Fallback used when double-clicking HTML in browser (file:// protocol)
      console.info("Using embedded local data for prototype:", error.message);
      renderContent(fallbackContent);
    });
}

/**
 * Populate HTML sections with data from local JSON
 */
function renderContent(data) {
  // Render "Why Contrast Matters" cards
  const whyGrid = document.getElementById("whyMattersGrid");
  if (whyGrid && data.aboutContrast && data.aboutContrast.whyItMatters) {
    whyGrid.innerHTML = data.aboutContrast.whyItMatters
      .map(
        (item) => `
        <article class="matter-card">
          <h3 class="matter-title">${item.title}</h3>
          <p class="matter-desc">${item.description}</p>
        </article>
      `
      )
      .join("");
  }

  // Render "Types of Contrast" grid
  const typesGrid = document.getElementById("contrastTypesGrid");
  if (typesGrid && data.contrastTypes) {
    typesGrid.innerHTML = data.contrastTypes
      .map(
        (item) => `
        <article class="type-card">
          <div>
            <div class="type-header">
              <h3 class="type-title">${item.title}</h3>
              <span class="type-badge">${item.badge}</span>
            </div>
            <div class="type-subtitle">${item.subtitle}</div>
            <p class="type-detail">${item.detail}</p>
          </div>
          <div class="type-example">
            <strong>Art Example:</strong> ${item.artExample}
          </div>
        </article>
      `
      )
      .join("");
  }

  // Render Interactive Lab tabs and inspector
  initInteractiveLab(data.contrastTypes);

  // Render Design Tips grid
  const tipsGrid = document.getElementById("tipsGrid");
  if (tipsGrid && data.interactiveTips) {
    tipsGrid.innerHTML = data.interactiveTips
      .map(
        (item) => `
        <div class="tip-card">
          <h3 class="tip-title">${item.tip}</h3>
          <p class="tip-text">${item.explanation}</p>
        </div>
      `
      )
      .join("");
  }
}

/**
 * Sets up the Interactive Lab component with tab switching
 */
function initInteractiveLab(principles) {
  const tabsContainer = document.getElementById("labTabs");
  if (!tabsContainer || !principles || principles.length === 0) return;

  // Build tab buttons
  tabsContainer.innerHTML = principles
    .map(
      (p, index) => `
      <button 
        class="lab-tab-btn ${index === 0 ? "is-active" : ""}" 
        data-index="${index}"
        role="tab"
        aria-selected="${index === 0 ? "true" : "false"}"
      >
        ${p.title.split(". ")[1] || p.title}
      </button>
    `
    )
    .join("");

  // Select elements to update
  const titleEl = document.getElementById("labDetailTitle");
  const metaEl = document.getElementById("labDetailMeta");
  const bodyEl = document.getElementById("labDetailBody");
  const exampleEl = document.getElementById("labDetailExample");

  // Helper to show a specific principle
  function showPrinciple(index) {
    const item = principles[index];
    if (!item) return;

    if (titleEl) titleEl.textContent = item.title;
    if (metaEl) metaEl.textContent = `${item.subtitle} — [${item.badge}]`;
    if (bodyEl) bodyEl.textContent = item.detail;
    if (exampleEl) {
      exampleEl.innerHTML = `<strong>Practical Art Insight:</strong> ${item.artExample}`;
    }

    // Update active tab styles
    const allTabs = tabsContainer.querySelectorAll(".lab-tab-btn");
    allTabs.forEach((tab, i) => {
      const isActive = i === Number(index);
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  // Set initial principle
  showPrinciple(0);

  // Click event listener for tabs
  tabsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".lab-tab-btn");
    if (!btn) return;
    const index = btn.dataset.index;
    showPrinciple(index);
  });
}

/**
 * Mobile touch & keyboard accessibility support for the split Godzilla panels
 */
function initPanelInteractions() {
  const panels = [document.getElementById("splitLeft"), document.getElementById("splitRight")];

  panels.forEach((panel) => {
    if (!panel) return;

    // Toggle on click/tap for touch screens
    panel.addEventListener("click", () => {
      panel.classList.toggle("is-hovered");
    });

    // Keyboard support: Toggle when pressing Enter or Space
    panel.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        panel.classList.toggle("is-hovered");
      }
    });
  });
}
