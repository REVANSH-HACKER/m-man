/* =====================================================================
   THE MISSILE MAN — shared interactions
   Vanilla JS, no dependencies. Each block guards its own selectors so the
   same file can be dropped onto every page (and later become hooks/effects
   in a Next.js migration).
   ===================================================================== */
(function () {
  "use strict";

  /* ----------  Sticky header state  ---------- */
  const header = document.querySelector(".header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ----------  Mobile nav toggle  ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.classList.remove("open");
        document.body.style.overflow = "";
      })
    );
  }

  /* ----------  Scroll reveal  ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ----------  Animated number counters  ---------- */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const dur = 1600;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = (Number.isInteger(target) ? Math.round(val) : val.toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run(e.target);
            cio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => cio.observe(el));
  }

  /* ----------  Countdown timer (data-deadline="YYYY-MM-DD")  ---------- */
  const cd = document.querySelector("[data-deadline]");
  if (cd) {
    const deadline = new Date(cd.dataset.deadline + "T06:00:00").getTime();
    const fields = {
      days: cd.querySelector('[data-cd="days"]'),
      hours: cd.querySelector('[data-cd="hours"]'),
      mins: cd.querySelector('[data-cd="mins"]'),
      secs: cd.querySelector('[data-cd="secs"]'),
    };
    const pad = (n) => String(n).padStart(2, "0");
    const update = () => {
      let diff = deadline - Date.now();
      if (diff < 0) diff = 0;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      if (fields.days) fields.days.textContent = pad(d);
      if (fields.hours) fields.hours.textContent = pad(h);
      if (fields.mins) fields.mins.textContent = pad(m);
      if (fields.secs) fields.secs.textContent = pad(s);
    };
    update();
    setInterval(update, 1000);
  }

  /* ----------  FAQ accordion  ---------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", () => {
      const open = item.classList.toggle("open");
      a.style.maxHeight = open ? a.scrollHeight + "px" : 0;
    });
  });

  /* ----------  Register form (front-end demo only)  ---------- */
  const form = document.querySelector("[data-register]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const ok = form.querySelector(".form-success");
      if (ok) ok.classList.add("show");
      form.querySelectorAll("input, select, button").forEach((el) => {
        if (el.type !== "button") el.setAttribute("disabled", "");
      });
    });
  }

  /* ----------  Mark active nav link by pathname  ---------- */
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === here) a.classList.add("active");
  });

  /* ----------  Subtle parallax on hero glow  ---------- */
  const glow = document.querySelector(".hero-glow");
  if (glow && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY * 0.25;
        glow.style.transform = `translateY(${y}px)`;
      },
      { passive: true }
    );
  }
})();
