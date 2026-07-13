/* ========================================================= */
/*                     KENZ LANDING PAGE                     */
/* ========================================================= */

"use strict";

/* ========================================================= */
/* APPLICATION                                               */
/* ========================================================= */

const app = {
  canvas: null,
  ctx: null,

  width: 0,
  height: 0,

  mouse: {
    x: 0,
    y: 0,
    active: false,
  },

  particles: [],
};

/* ========================================================= */
/* START                                                     */
/* ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  app.canvas = document.getElementById("compressionCanvas");

  if (!app.canvas) return;

  app.ctx = app.canvas.getContext("2d");

  resizeCanvas();

  createParticles();

  events();

  animate();
});

/* ========================================================= */
/* EVENTS                                                    */
/* ========================================================= */

function events() {
  window.addEventListener("resize", resizeCanvas);

  app.canvas.addEventListener("mousemove", (e) => {
    const rect = app.canvas.getBoundingClientRect();

    app.mouse.x = e.clientX - rect.left;
    app.mouse.y = e.clientY - rect.top;

    app.mouse.active = true;
  });

  app.canvas.addEventListener("mouseleave", () => {
    app.mouse.active = false;
  });
}
document.getElementById("folderTrigger").addEventListener("click", function () {
  const container = document.querySelector(".demo-container");
  const sizeCounter = document.getElementById("sizeCounter");
  const telemetryLevel = document.getElementById("telemetryLevel");
  const telemetryFiles = document.getElementById("telemetryFiles");
  const statusText = document.getElementById("statusText");

  // Activate CSS animations
  container.classList.add("is-compressing");
  statusText.innerText = "Processing pipeline...";
  telemetryLevel.innerText = "LEVEL 5";

  // Simulate file count ticking upward rapidly
  let files = 0;
  const fileInterval = setInterval(() => {
    files += 1139;
    if (files >= 28492) {
      files = 28492;
      clearInterval(fileInterval);
    }
    telemetryFiles.innerText = files.toLocaleString();
  }, 50);

  // Simulate storage capacity ticking downward smoothly
  let currentSize = 28.0;
  const targetSize = 9.0;
  const duration = 1500; // 1.5s execution window
  const startTime = performance.now();

  function animateSize(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Smooth linear interpolation metric math
    const currentDisplay = (
      currentSize -
      (currentSize - targetSize) * progress
    ).toFixed(2);
    sizeCounter.innerText = `${currentDisplay} GB`;

    if (progress < 1) {
      requestAnimationFrame(animateSize);
    } else {
      statusText.innerText = "Compression Complete!";
      statusText.style.color = "#10b981";
    }
  }

  requestAnimationFrame(animateSize);
});

const featureStates = [
  {
    status: "PAYLOAD READY",
    metric: "DROP DETECTED",
    label: "Tauri hook intercepted target path successfully.",
    color: "#a78bfa",
    lightMode: false,
    toast: false,
    bar: false,
  },
  {
    status: "THEME MANAGER",
    metric: "DARK ACTIVE",
    label: "Late-night high contrast rendering template active.",
    color: "#a78bfa",
    lightMode: false,
    toast: false,
    bar: false,
  },
  {
    status: "THEME MANAGER",
    metric: "LIGHT ACTIVE",
    label: "Daylight workspace rendering template active.",
    color: "#1e293b",
    lightMode: true,
    toast: false,
    bar: false,
  },
  {
    status: "LANGUAGE SWITCH",
    metric: "عربي / FR / EN",
    label: "Translating internal administrative dashboard headers.",
    color: "#f59e0b",
    lightMode: false,
    toast: false,
    bar: false,
  },
  {
    status: "TELEMETRY CALC",
    metric: "67% SAVED",
    label: "Total drive space recovered logged into system file schema.",
    color: "#10b981",
    lightMode: false,
    toast: false,
    bar: true,
  },
  {
    status: "ZIP PIPELINE",
    metric: ".TAR.ZST",
    label: "Injecting unrolled directory sequential fallback blocks.",
    color: "#3b82f6",
    lightMode: false,
    toast: false,
    bar: false,
  },
  {
    status: "COMPILATION DONE",
    metric: "SUCCESS",
    label:
      "Sending payload completion callback string out to system toast thread.",
    color: "#10b981",
    lightMode: false,
    toast: true,
    bar: false,
  },
];

const blocks = document.querySelectorAll(".scroll-feature-block");
const frame = document.getElementById("appMockupFrame");
const toast = document.getElementById("appNotification");

const featureObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        blocks.forEach((b) => b.classList.remove("is-active"));
        entry.target.classList.add("is-active");

        const index = entry.target.getAttribute("data-feature");
        const state = featureStates[index];

        // Mutate Left Frame content nodes
        document.getElementById("dynamicStatus").innerText = state.status;
        document.getElementById("dynamicMetric").innerText = state.metric;
        document.getElementById("dynamicMetric").style.color = state.color;
        document.getElementById("dynamicLabel").innerText = state.label;
        document.getElementById("dynamicVisual").style.opacity = state.bar
          ? "1"
          : "0";

        // Toggle Theme class definitions
        if (state.lightMode) {
          frame.classList.add("light-theme-preview");
        } else {
          frame.classList.remove("light-theme-preview");
        }

        // Handle local notification simulation
        if (state.toast) {
          toast.classList.add("show-toast");
        } else {
          toast.classList.remove("show-toast");
        }
      }
    });
  },
  { root: null, rootMargin: "-30% 0px -40% 0px", threshold: 0.1 },
);

blocks.forEach((block) => featureObserver.observe(block));
const tabButtons = document.querySelectorAll(".screenshot-tab-btn");
const panels = document.querySelectorAll(".screenshot-panel");
const frameTitle = document.getElementById("screenshotFrameTitle");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // 1. Reset all button highlight nodes
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    // 2. Clear current screenshot sheets
    panels.forEach((panel) => panel.classList.remove("active"));

    // 3. Highlight current clicked target
    button.classList.add("active");
    const targetID = button.getAttribute("data-target");
    document.getElementById(targetID).classList.add("active");

    // 4. Update the frame's window header text automatically
    const cleanName = button.innerText
      .replace(
        /[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g,
        "",
      )
      .trim();
    frameTitle.innerText = `Kenz — ${cleanName} View`;
  });
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const trigger = item.querySelector(".faq-trigger");
  const content = item.querySelector(".faq-content");

  trigger.addEventListener("click", () => {
    const isOpen = item.classList.contains("active");

    // 1. Close all other active open items
    faqItems.forEach((otherItem) => {
      otherItem.classList.remove("active");
      otherItem.querySelector(".faq-content").style.maxHeight = "0";
    });

    // 2. Toggle active state and height limits dynamically
    if (!isOpen) {
      item.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      item.classList.remove("active");
      content.style.maxHeight = "0";
    }
  });
});
const backToTopBtn = document.getElementById("backToTopBtn");

// 1. Monitor window scroll event
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

// 2. Smooth snap back to header element on click
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
const langBtn = document.getElementById('langBtn');
const langMenu = document.getElementById('langMenu');
const currentLangText = document.getElementById('currentLang');
const langOptions = document.querySelectorAll('.lang-option');

// Toggle Dropdown Menu View
langBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  langMenu.classList.toggle('open');
});

document.addEventListener('click', () => {
  langMenu.classList.remove('open');
});

// Main translation executor loop
function translatePage() {
  if (!window.translations) return;

  // Search the entire DOM for elements containing your translation target token attribute
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(element => {
    const translationKey = element.getAttribute('data-i18n');
    
    // Safely update text only if the dictionary key exists
    if (window.translations[translationKey]) {
      element.innerText = window.translations[translationKey];
    }
  });
}

function loadLanguageFile(langCode) {
  const oldScript = document.getElementById('active-lang-script');
  if (oldScript) oldScript.remove();

  const script = document.createElement('script');
  script.id = 'active-lang-script';
  
  // Point it directly into your Items folder
  script.src = `./Items/lang-${langCode}.js`; 
  
  script.onload = () => {
    translatePage();
  };

  script.onerror = () => {
    console.error(`Kenz Engine Error: Could not find lang-${langCode}.js inside Items/ folder.`);
  };

  document.head.appendChild(script);
}

// Handle layout adjustments and trigger the file loader on choice selection
langOptions.forEach(option => {
  option.addEventListener('click', () => {
    langOptions.forEach(opt => opt.classList.remove('active'));
    option.classList.add('active');
    
    const chosenLang = option.getAttribute('data-lang').toLowerCase();
    currentLangText.innerText = chosenLang.toUpperCase();
    
    // Apply dynamic alignment shifts based on selection targets
    if (chosenLang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }

    loadLanguageFile(chosenLang);
  });
});

// Boot up layout execution with default English dictionary
document.addEventListener('DOMContentLoaded', () => {
  loadLanguageFile('en');
});

document.getElementById("seeFeaturesBtn").addEventListener("click", () => {
  document.getElementById("features").scrollIntoView({
    behavior: "smooth"
  });
});

document.querySelectorAll(".to-the-CTA").forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById("CTA-Button").scrollIntoView({
      behavior: "smooth"
    });
  });
});

document.querySelector('[data-i18n="downloadWindows"]').addEventListener("click", () => {
  window.location.href = "Items/Kenz_1.0.0_x64-setup.exe";
});

document.querySelector('[data-i18n="downloadMacOs"]').addEventListener("click", () => {
  window.location.href = "Items/Kenz_1.0.0_aarch64.dmg";
});