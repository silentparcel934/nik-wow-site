const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealItems = document.querySelectorAll("[data-reveal]");

if (!prefersReducedMotion && revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (!prefersReducedMotion) {
  let ticking = false;

  const updateScroll = () => {
    document.documentElement.style.setProperty("--scroll", window.scrollY.toFixed(2));
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScroll);
      ticking = true;
    }
  };

  updateScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

const galleryData = {
  ferienhaus: {
    title: "Ferienhaus",
    tabs: [
      {
        key: "bauphase",
        label: "Bauphase",
        items: [
          { src: "assets/projects/ferienhaus/bauphase/01.jpg", caption: "Bauphase 01", alt: "Bauphase Bild 1" },
          { src: "assets/projects/ferienhaus/bauphase/02.jpg", caption: "Bauphase 02", alt: "Bauphase Bild 2" },
          { src: "assets/projects/ferienhaus/bauphase/03.jpg", caption: "Bauphase 03", alt: "Bauphase Bild 3" },
          { src: "assets/projects/ferienhaus/bauphase/04.jpg", caption: "Bauphase 04", alt: "Bauphase Bild 4" },
          { src: "assets/projects/ferienhaus/bauphase/05.jpg", caption: "Bauphase 05", alt: "Bauphase Bild 5" },
          { src: "assets/projects/ferienhaus/bauphase/06.jpg", caption: "Bauphase 06", alt: "Bauphase Bild 6" },
        ],
      },
      {
        key: "aussen",
        label: "Außen",
        items: [
          { src: "assets/projects/ferienhaus/aussen/01.jpg?v=20260129", caption: "Außen 01", alt: "Außen Bild 1" },
          { src: "assets/projects/ferienhaus/aussen/02.jpg?v=20260129", caption: "Außen 02", alt: "Außen Bild 2" },
          { src: "assets/projects/ferienhaus/aussen/03.jpg?v=20260129", caption: "Außen 03", alt: "Außen Bild 3" },
        ],
      },
      {
        key: "innen",
        label: "Innen",
        items: [
          { src: "assets/projects/ferienhaus/innen/01.jpg?v=20260129", caption: "Innen 01", alt: "Innen Bild 1" },
          { src: "assets/projects/ferienhaus/innen/02.jpg?v=20260129", caption: "Innen 02", alt: "Innen Bild 2" },
          { src: "assets/projects/ferienhaus/innen/03.jpg?v=20260129", caption: "Innen 03", alt: "Innen Bild 3" },
        ],
      },
    ],
  },
  weihnachten: {
    title: "Weihnachten",
    tabs: [
      {
        key: "2021",
        label: "2021",
        items: [
          {
            src: "assets/projects/weihnachten/2021/01.jpg",
            caption: "Weihnachten 2021",
            alt: "Weihnachten 2021",
          },
        ],
      },
      {
        key: "2022",
        label: "2022",
        items: [
          {
            src: "assets/projects/weihnachten/2022/01.jpg",
            caption: "Weihnachten 2022",
            alt: "Weihnachten 2022",
          },
        ],
      },
      {
        key: "2023",
        label: "2023",
        items: [
          {
            src: "assets/projects/weihnachten/2023/01.jpg",
            caption: "Weihnachten 2023 (1)",
            alt: "Weihnachten 2023",
          },
          {
            src: "assets/projects/weihnachten/2023/02.jpg",
            caption: "Weihnachten 2023 (2)",
            alt: "Weihnachten 2023",
          },
        ],
      },
      {
        key: "2024",
        label: "2024",
        items: [
          { src: "assets/projects/weihnachten/2024/01.jpg", caption: "Weihnachten 2024 (1)", alt: "Weihnachten 2024" },
          { src: "assets/projects/weihnachten/2024/02.jpg", caption: "Weihnachten 2024 (2)", alt: "Weihnachten 2024" },
          { src: "assets/projects/weihnachten/2024/03.jpg", caption: "Weihnachten 2024 (3)", alt: "Weihnachten 2024" },
          { src: "assets/projects/weihnachten/2024/04.jpg", caption: "Weihnachten 2024 (4)", alt: "Weihnachten 2024" },
          { src: "assets/projects/weihnachten/2024/05.jpg", caption: "Weihnachten 2024 (5)", alt: "Weihnachten 2024" },
          { src: "assets/projects/weihnachten/2024/06.jpg", caption: "Weihnachten 2024 (6)", alt: "Weihnachten 2024" }
        ],
      },
      {
        key: "2025",
        label: "2025",
        items: [
          { src: "assets/projects/weihnachten/2025/01.jpg", caption: "Weihnachten 2025 (1)", alt: "Weihnachten 2025" },
          { src: "assets/projects/weihnachten/2025/02.jpg", caption: "Weihnachten 2025 (2)", alt: "Weihnachten 2025" },
          { src: "assets/projects/weihnachten/2025/03.jpg", caption: "Weihnachten 2025 (3)", alt: "Weihnachten 2025" },
          { src: "assets/projects/weihnachten/2025/04.jpg", caption: "Weihnachten 2025 (4)", alt: "Weihnachten 2025" },
          { src: "assets/projects/weihnachten/2025/05.jpg", caption: "Weihnachten 2025 (5)", alt: "Weihnachten 2025" },
          { src: "assets/projects/weihnachten/2025/06.jpg", caption: "Weihnachten 2025 (6)", alt: "Weihnachten 2025" }
        ],
      },
    ],
    empty: {
      title: "Bilder folgen",
      copy: "Aktuell ist diese Jahresgalerie noch leer. Hier kommen bald weihnachtliche Eindrücke.",
    },
  },
  "partys-events": {
    title: "Partys & Events",
    tabs: [{ key: "galerie", label: "Galerie", items: [] }],
    empty: {
      title: "Momente in Planung",
      copy: "Hier sammeln sich bald die besten Party- und Eventfotos. Bleib dran!",
    },
  },
  fotografie: {
    title: "Fotografie",
    tabs: [
      { key: "landschaft", label: "Landschaft", items: [] },
      { key: "best-shots", label: "Best Shots", items: [] },
    ],
    empty: {
      title: "Shots folgen",
      copy: "Die Auswahl wird gerade kuratiert. Bald gibt es hier neue Lieblingsbilder.",
    },
  },
};

const galleryModal = document.getElementById("gallery-modal");
const galleryTriggers = document.querySelectorAll("[data-gallery]");
const modalPanel = galleryModal?.querySelector(".gallery-modal__panel");
const modalCloseButtons = galleryModal?.querySelectorAll("[data-gallery-close]");
const galleryTabs = galleryModal?.querySelector(".gallery-tabs");
const galleryBody = galleryModal?.querySelector(".gallery-body");
const galleryTitle = document.getElementById("gallery-title");
const viewer = galleryModal?.querySelector(".gallery-viewer");
const viewerStage = galleryModal?.querySelector(".gallery-viewer__stage");
const viewerImage = document.getElementById("gallery-viewer-image");
const viewerCaption = document.getElementById("gallery-viewer-caption");
const viewerPrev = galleryModal?.querySelector("[data-viewer-prev]");
const viewerNext = galleryModal?.querySelector("[data-viewer-next]");
const viewerClose = galleryModal?.querySelector("[data-viewer-close]");

let tabButtons = [];
let tabPanels = [];
let galleryThumbs = [];

let lastFocusedElement = null;
let activeTrap = null;
let currentIndex = 0;
let activeTabKey = "bauphase";
let activeThumbs = [];
let activeGalleryKey = "ferienhaus";

const defaultEmptyState = {
  title: "Bilder folgen",
  copy: "Diese Galerie ist noch leer. Schon bald gibt es hier neue Aufnahmen.",
};

const focusableSelector =
  "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";

const setTrap = (container) => {
  activeTrap = container;
};

const trapFocus = (event) => {
  if (!activeTrap) return;
  const focusable = Array.from(activeTrap.querySelectorAll(focusableSelector)).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

const renderGallery = (galleryKey) => {
  if (!galleryModal || !galleryTabs || !galleryBody) return;
  const gallery = galleryData[galleryKey];
  if (!gallery) return;
  activeGalleryKey = galleryKey;
  if (galleryTitle) {
    galleryTitle.textContent = gallery.title;
  }

  galleryTabs.innerHTML = "";
  galleryBody.innerHTML = "";

  gallery.tabs.forEach((tab, index) => {
    const tabId = `tab-${tab.key}`;
    const panelId = `panel-${tab.key}`;
    const tabButton = document.createElement("button");
    tabButton.className = "gallery-tab";
    tabButton.type = "button";
    tabButton.setAttribute("role", "tab");
    tabButton.id = tabId;
    tabButton.setAttribute("aria-controls", panelId);
    tabButton.dataset.tab = tab.key;
    tabButton.textContent = tab.label;

    const panel = document.createElement("div");
    panel.className = "gallery-panel";
    panel.id = panelId;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tabId);

    const grid = document.createElement("div");
    grid.className = "gallery-grid";

    if (tab.items.length === 0) {
      const emptyState = tab.empty || gallery.empty || defaultEmptyState;
      const emptyCard = document.createElement("div");
      emptyCard.className = "gallery-empty-card";
      const emptyTitle = document.createElement("p");
      emptyTitle.className = "gallery-empty-title";
      emptyTitle.textContent = emptyState.title;
      const emptyCopy = document.createElement("p");
      emptyCopy.className = "gallery-empty";
      emptyCopy.textContent = emptyState.copy;
      emptyCard.append(emptyTitle, emptyCopy);
      grid.append(emptyCard);
    } else {
      tab.items.forEach((item, itemIndex) => {
        const thumb = document.createElement("button");
        thumb.className = "gallery-thumb";
        thumb.type = "button";
        thumb.setAttribute("aria-label", `${tab.label} Bild ${itemIndex + 1} öffnen`);
        thumb.dataset.caption = item.caption || "";
        const image = document.createElement("img");
        image.src = item.src;
        image.alt = item.alt || item.caption || `${tab.label} Bild ${itemIndex + 1}`;
        image.loading = "lazy";
        thumb.append(image);
        grid.append(thumb);
      });
    }

    panel.append(grid);
    galleryTabs.append(tabButton);
    galleryBody.append(panel);
  });

  tabButtons = Array.from(galleryModal.querySelectorAll(".gallery-tab"));
  tabPanels = Array.from(galleryModal.querySelectorAll(".gallery-panel"));
  galleryThumbs = Array.from(galleryModal.querySelectorAll(".gallery-thumb"));

  tabButtons.forEach((tab) => tab.addEventListener("click", () => activateTab(tab)));
  galleryThumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const panel = thumb.closest(".gallery-panel");
      const tabKey = panel?.id?.replace("panel-", "") || activeTabKey;
      const thumbsInPanel = getThumbsForTab(tabKey);
      const index = thumbsInPanel.indexOf(thumb);
      openViewer(index === -1 ? 0 : index, tabKey);
    });
  });

  const defaultTab = tabButtons[0];
  if (defaultTab) {
    activateTab(defaultTab);
  }
};

const openModal = (galleryKey) => {
  if (!galleryModal) return;
  renderGallery(galleryKey);
  lastFocusedElement = document.activeElement;
  galleryModal.classList.add("is-active");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTrap(modalPanel);
  const defaultTab = galleryModal.querySelector(".gallery-tab");
  if (defaultTab) activateTab(defaultTab);
  if (defaultTab) defaultTab.focus();
};

const closeModal = () => {
  if (!galleryModal) return;
  closeViewer();
  galleryModal.classList.remove("is-active");
  galleryModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  setTrap(null);
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
};

const getTabLabel = (tabKey) => {
  const tabButton = galleryModal?.querySelector(`.gallery-tab[data-tab="${tabKey}"]`);
  return tabButton ? tabButton.textContent.trim() : "Galerie";
};

const getThumbsForTab = (tabKey) => {
  const panel = galleryModal?.querySelector(`#panel-${tabKey}`);
  return panel ? Array.from(panel.querySelectorAll(".gallery-thumb")) : [];
};

const setViewerIndex = (index) => {
  if (!viewerImage || !viewerCaption || activeThumbs.length === 0) return;
  currentIndex = (index + activeThumbs.length) % activeThumbs.length;
  const thumbImage = activeThumbs[currentIndex].querySelector("img");
  if (!thumbImage) return;
  viewerImage.src = thumbImage.src;
  viewerImage.alt = thumbImage.alt;
  const tabLabel = getTabLabel(activeTabKey);
  const caption = activeThumbs[currentIndex].dataset.caption;
  if (caption) {
    viewerCaption.textContent = `${tabLabel} · ${caption} (${currentIndex + 1} von ${activeThumbs.length})`;
  } else {
    viewerCaption.textContent = `${tabLabel} · Bild ${currentIndex + 1} von ${activeThumbs.length}`;
  }
};

const openViewer = (index, tabKey = activeTabKey) => {
  if (!viewer) return;
  activeTabKey = tabKey;
  activeThumbs = getThumbsForTab(activeTabKey);
  setViewerIndex(index);
  viewer.classList.add("is-active");
  viewer.classList.remove("is-ui-hidden");
  viewer.setAttribute("aria-hidden", "false");
  if (modalPanel) {
    modalPanel.setAttribute("aria-hidden", "true");
    modalPanel.setAttribute("inert", "");
  }
  setTrap(viewer);
  if (viewerClose) viewerClose.focus();
};

const closeViewer = () => {
  if (!viewer) return;
  viewer.classList.remove("is-active");
  viewer.classList.remove("is-ui-hidden");
  viewer.setAttribute("aria-hidden", "true");
  if (modalPanel) {
    modalPanel.removeAttribute("aria-hidden");
    modalPanel.removeAttribute("inert");
  }
  setTrap(modalPanel);
};

const activateTab = (tab) => {
  if (tabButtons.length === 0 || tabPanels.length === 0) return;
  tabButtons.forEach((button) => {
    const isActive = button === tab;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  tabPanels.forEach((panel) => {
    const isTarget = panel.id === `panel-${tab.dataset.tab}`;
    panel.classList.toggle("is-active", isTarget);
    panel.hidden = !isTarget;
  });
  activeTabKey = tab.dataset.tab;
  activeThumbs = getThumbsForTab(activeTabKey);
  currentIndex = 0;
  if (viewer?.classList.contains("is-active")) {
    closeViewer();
  }
};

if (galleryTriggers.length > 0) {
  galleryTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const galleryKey = trigger.dataset.gallery || activeGalleryKey;
      openModal(galleryKey);
    });
    trigger.addEventListener("keydown", (event) => {
      if ((event.key === "Enter" || event.key === " ") && trigger.tagName !== "BUTTON") {
        event.preventDefault();
        const galleryKey = trigger.dataset.gallery || activeGalleryKey;
        openModal(galleryKey);
      }
    });
  });
}

if (modalCloseButtons) {
  modalCloseButtons.forEach((button) => button.addEventListener("click", closeModal));
}

renderGallery(activeGalleryKey);

if (viewerPrev) {
  viewerPrev.addEventListener("click", () => setViewerIndex(currentIndex - 1));
}

if (viewerNext) {
  viewerNext.addEventListener("click", () => setViewerIndex(currentIndex + 1));
}

if (viewerClose) {
  viewerClose.addEventListener("click", closeViewer);
}

const toggleViewerUi = () => {
  if (!viewer || viewer.getAttribute("aria-hidden") === "true") return;
  viewer.classList.toggle("is-ui-hidden");
};

let touchStartX = 0;
let touchEndX = 0;

const handleSwipe = () => {
  if (!viewer || !viewer.classList.contains("is-active")) return;
  const delta = touchEndX - touchStartX;
  if (Math.abs(delta) < 40) return;
  if (delta > 0) {
    setViewerIndex(currentIndex - 1);
  } else {
    setViewerIndex(currentIndex + 1);
  }
};

if (viewerStage) {
  viewerStage.addEventListener("touchstart", (event) => {
    if (event.target.closest("button")) return;
    touchStartX = event.changedTouches[0].screenX;
  });
  viewerStage.addEventListener("touchend", (event) => {
    if (event.target.closest("button")) return;
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  });
}

if (viewerStage) {
  viewerStage.addEventListener("click", (event) => {
    if (event.target.closest("button")) return;
    toggleViewerUi();
  });
}

if (viewerImage) {
  viewerImage.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleViewerUi();
  });
}

document.addEventListener("keydown", (event) => {
  if (!galleryModal || galleryModal.getAttribute("aria-hidden") === "true") return;

  if (event.key === "Escape") {
    if (viewer?.classList.contains("is-active")) {
      closeViewer();
    } else {
      closeModal();
    }
  }

  if (event.key === "Tab") {
    trapFocus(event);
  }

  if (viewer?.classList.contains("is-active")) {
    if (event.key === "ArrowRight") {
      setViewerIndex(currentIndex + 1);
    }
    if (event.key === "ArrowLeft") {
      setViewerIndex(currentIndex - 1);
    }
  }
});
