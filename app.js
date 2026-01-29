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
