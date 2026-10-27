/* ============ HELPERS ============ */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} }
};

/* ============ THEME (dark / light) ============ */
const root = document.documentElement;
function setTheme(t) {
  root.setAttribute("data-theme", t);
  store.set("theme", t);
}
setTheme(store.get("theme") || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
$("#themeBtn").addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

/* ============ LANGUAGE (UZ / EN) ============ */
let lang = store.get("lang") || "uz";
function setLang(l) {
  lang = l;
  store.set("lang", l);
  root.lang = l;
  $$("[data-i18n]").forEach((el) => {
    const v = I18N[l][el.dataset.i18n];
    if (v) el.textContent = v;
  });
  $$("[data-lang-opt]").forEach((el) => el.classList.toggle("on", el.dataset.langOpt === l));
  document.title = l === "uz" ? "Jo'rayeva Hojinur — Portfolio" : "Jo'rayeva Hojinur — Portfolio";
  restartTyping();
}
$("#langBtn").addEventListener("click", () => setLang(lang === "uz" ? "en" : "uz"));

/* ============ TYPING EFFECT ============ */
let typeTimer;
function restartTyping() {
  clearTimeout(typeTimer);
  const el = $("#typed");
  const roles = I18N[lang].roles;
  let r = 0, c = 0, del = false;
  (function tick() {
    const word = roles[r];
    el.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return (typeTimer = setTimeout(tick, 1400)); }
    if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
    c += del ? -1 : 1;
    typeTimer = setTimeout(tick, del ? 35 : 80);
  })();
}

/* ============ LOADER ============ */
window.addEventListener("load", () => {
  setTimeout(() => {
    $("#loader").classList.add("done");
    document.body.classList.add("loaded");
  }, 1300);
});

/* ============ SCROLL REVEAL + SKILLS + COUNTERS ============ */
$$(".reveal").forEach((el, i) => el.style.setProperty("--d", (i % 4) * 0.08 + "s"));

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    const n = $("[data-count]", e.target);
    if (n) countUp(n);
    io.unobserve(e.target);
  });
}, { threshold: 0.15 });
$$(".reveal").forEach((el) => io.observe(el));

function countUp(el) {
  const end = +el.dataset.count;
  const t0 = performance.now();
  (function step(t) {
    const p = Math.min((t - t0) / 1600, 1);
    el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

/* ============ NAV: progress, active link, mobile ============ */
const progress = $("#progress");
const sections = $$("main section[id]");
const links = $$(".nav__links a");
function onScroll() {
  const h = document.documentElement;
  progress.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
  let cur = "";
  sections.forEach((s) => { if (scrollY >= s.offsetTop - 160) cur = s.id; });
  links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

const burger = $("#burger"), navLinks = $("#navLinks");
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  navLinks.classList.toggle("open");
});
links.forEach((a) => a.addEventListener("click", () => {
  burger.classList.remove("open");
  navLinks.classList.remove("open");
}));

/* ============ CUSTOM CURSOR ============ */
if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.body.classList.add("has-cursor");
  const ring = $("#cursor"), dot = $("#cursorDot");
  let mx = 0, my = 0, rx = 0, ry = 0;
  addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px)`;
  });
  (function loop() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener("mouseover", (e) => {
    ring.classList.toggle("hover", !!e.target.closest("a, button, input, textarea, .tilt"));
  });
}

/* ============ 3D TILT ============ */
$$("[data-tilt]").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 12}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave", () => { card.style.transform = ""; });
});

/* ============ MAGNETIC BUTTONS ============ */
$$(".magnetic").forEach((b) => {
  b.addEventListener("mousemove", (e) => {
    const r = b.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    b.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  });
  b.addEventListener("mouseleave", () => { b.style.transform = ""; });
});

/* ============ PARTICLE NETWORK BACKGROUND ============ */
(function particles() {
  const cv = $("#bg"), ctx = cv.getContext("2d");
  let W, H, pts = [], mouse = { x: -999, y: -999 };
  const dpr = Math.min(devicePixelRatio || 1, 2);

  function resize() {
    W = cv.width = innerWidth * dpr;
    H = cv.height = innerHeight * dpr;
    const n = Math.min(90, Math.floor((innerWidth * innerHeight) / 18000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35 * dpr, vy: (Math.random() - 0.5) * 0.35 * dpr,
      r: (Math.random() * 1.6 + 0.8) * dpr
    }));
  }
  resize();
  addEventListener("resize", resize);
  addEventListener("mousemove", (e) => { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const light = root.getAttribute("data-theme") === "light";
    const rgb = light ? "124,92,255" : "190,170,255";
    pts.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 140 * dpr) { p.x += dx / d * 1.2; p.y += dy / d * 1.2; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 7);
      ctx.fillStyle = `rgba(${rgb},.7)`;
      ctx.fill();
      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j], dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist < 130 * dpr) {
          ctx.strokeStyle = `rgba(${rgb},${0.18 * (1 - dist / (130 * dpr))})`;
          ctx.lineWidth = dpr * 0.8;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  }
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) draw();
})();

/* ============ CONTACT FORM (opens mail app) ============ */
$("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const subject = encodeURIComponent(`Portfolio: ${f.get("name")}`);
  const body = encodeURIComponent(`${f.get("msg")}\n\n— ${f.get("name")} (${f.get("email")})`);
  location.href = `mailto:your@email.com?subject=${subject}&body=${body}`;
});

/* ============ INIT ============ */
$("#year").textContent = new Date().getFullYear();
setLang(lang);
