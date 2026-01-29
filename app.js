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

const galleryModal = document.getElementById("gallery-modal");
const galleryTriggers = document.querySelectorAll("[data-gallery='ferienhaus']");
const modalPanel = galleryModal?.querySelector(".gallery-modal__panel");
const modalCloseButtons = galleryModal?.querySelectorAll("[data-gallery-close]");
const tabButtons = galleryModal?.querySelectorAll(".gallery-tab");
const tabPanels = galleryModal?.querySelectorAll(".gallery-panel");
const galleryThumbs = galleryModal ? Array.from(galleryModal.querySelectorAll(".gallery-thumb")) : [];
const viewer = galleryModal?.querySelector(".gallery-viewer");
const viewerStage = galleryModal?.querySelector(".gallery-viewer__stage");
const viewerImage = document.getElementById("gallery-viewer-image");
const viewerCaption = document.getElementById("gallery-viewer-caption");
const viewerPrev = galleryModal?.querySelector("[data-viewer-prev]");
const viewerNext = galleryModal?.querySelector("[data-viewer-next]");
const viewerClose = galleryModal?.querySelector("[data-viewer-close]");

let lastFocusedElement = null;
let activeTrap = null;
let currentIndex = 0;

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

const openModal = () => {
  if (!galleryModal) return;
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

const setViewerIndex = (index) => {
  if (!viewerImage || !viewerCaption || galleryThumbs.length === 0) return;
  currentIndex = (index + galleryThumbs.length) % galleryThumbs.length;
  const thumbImage = galleryThumbs[currentIndex].querySelector("img");
  if (!thumbImage) return;
  viewerImage.src = thumbImage.src;
  viewerImage.alt = thumbImage.alt;
  viewerCaption.textContent = `Bauphase · Bild ${currentIndex + 1} von ${galleryThumbs.length}`;
};

const openViewer = (index) => {
  if (!viewer) return;
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
  if (!tabButtons || !tabPanels) return;
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
};

if (galleryTriggers.length > 0) {
  galleryTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
    trigger.addEventListener("keydown", (event) => {
      if ((event.key === "Enter" || event.key === " ") && trigger.tagName !== "BUTTON") {
        event.preventDefault();
        openModal();
      }
    });
  });
}

if (modalCloseButtons) {
  modalCloseButtons.forEach((button) => button.addEventListener("click", closeModal));
}

if (tabButtons) {
  tabButtons.forEach((tab) => {
    tab.addEventListener("click", () => activateTab(tab));
  });
}

galleryThumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => openViewer(index));
});

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
