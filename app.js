(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Now Playing / Mood rotator
  const npText = document.getElementById("npText");
  const lines = [
    "✨ Dreamwave: “Neon Skies”",
    "💿 Looping: hyperpop glitter mix",
    "🌈 Mood: glossy, brave, electric",
    "🪩 Vibe: disco comet",
    "💖 Energy: soft neon thunder"
  ];
  let idx = 0;
  if (!prefersReduced && npText) {
    setInterval(() => {
      idx = (idx + 1) % lines.length;
      npText.textContent = lines[idx];
    }, 3000);
  }

  // Modal
  const aboutBtn = document.getElementById("aboutBtn");
  const modal = document.getElementById("aboutModal");
  const backdrop = document.getElementById("modalBackdrop");
  const closeBtn = document.getElementById("modalClose");
  const contactBtn = document.getElementById("contactBtn");

  const openModal = () => {
    modal.hidden = false;
    backdrop.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    closeBtn.focus();
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.hidden = true;
    backdrop.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    aboutBtn.focus();
    document.body.style.overflow = "";
  };

  aboutBtn?.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", closeModal);
  backdrop?.addEventListener("click", closeModal);
  contactBtn?.addEventListener("click", () => {
    window.location.href = "mailto:hello@nikthedreamer.com";
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  // Particles
  const canvas = document.getElementById("particles");
  const ctx = canvas?.getContext("2d");
  let particles = [];
  const resize = () => {
    if (!canvas) return;
    canvas.width = canvas.offsetWidth * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
  };
  window.addEventListener("resize", resize);
  resize();

  if (canvas && ctx && !prefersReduced) {
    const count = 60;
    particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 1 + Math.random() * 2.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      a: 0.4 + Math.random() * 0.5
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
      requestAnimationFrame(draw);
    };
    draw();
  }

  // Easter egg: GAYWOW => confetti
  const confettiCanvas = document.getElementById("confetti");
  const cctx = confettiCanvas?.getContext("2d");
  const seq = [];
  const secret = "GAYWOW";
  let confetti = [];

  const resizeConfetti = () => {
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth * devicePixelRatio;
    confettiCanvas.height = window.innerHeight * devicePixelRatio;
  };
  window.addEventListener("resize", resizeConfetti);
  resizeConfetti();

  const burstConfetti = () => {
    if (!confettiCanvas || !cctx) return;
    const colors = ["#ff2d95", "#00ffd5", "#6a00ff", "#fff56b", "#ff9bd6"];
    const total = 120;
    confetti = Array.from({ length: total }).map(() => ({
      x: confettiCanvas.width / 2,
      y: confettiCanvas.height / 2,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.9) * 10,
      r: 2 + Math.random() * 4,
      a: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI
    }));

    let frames = 0;
    const tick = () => {
      frames++;
      cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      for (const p of confetti) {
        cctx.save();
        cctx.translate(p.x, p.y);
        cctx.rotate(p.rot);
        cctx.fillStyle = p.color;
        cctx.globalAlpha = p.a;
        cctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 2);
        cctx.restore();
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.a *= 0.98;
        p.rot += 0.1;
      }
      if (frames < 120) requestAnimationFrame(tick);
      else cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    };
    if (!prefersReduced) tick();
  };

  document.addEventListener("keydown", (e) => {
    const key = e.key.toUpperCase();
    if (key.length === 1 && key >= "A" && key <= "Z") {
      seq.push(key);
      if (seq.length > secret.length) seq.shift();
      if (seq.join("") === secret) burstConfetti();
    }
  });
})();
