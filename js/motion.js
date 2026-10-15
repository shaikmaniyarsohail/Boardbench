/* BoardBench — motion layer: orchestrated hero entrance, scroll reveals,
   progress trace, hero parallax, and the PCB current field (particles). */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js-anim");

  /* ---------------- reveal + stagger ---------------- */
  function assignStagger(el) {
    var parent = el.parentElement;
    if (!parent) return;
    var sibs = parent.children, n = 0;
    for (var i = 0; i < sibs.length; i++) {
      if (sibs[i] === el) {
        el.style.setProperty("--i", Math.min(n, 6));
        return;
      }
      if (sibs[i].classList && sibs[i].classList.contains("reveal")) n++;
    }
    el.style.setProperty("--i", 0);
  }

  var io = null;
  if ("IntersectionObserver" in window && !reduce) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
  }

  function watch(el) {
    if (el.__watched) return;
    el.__watched = true;
    assignStagger(el);
    if (io) io.observe(el);
    else el.classList.add("is-in");
  }

  document.querySelectorAll(".reveal").forEach(watch);

  /* board cards are rendered by main.js — give them the same reveal treatment */
  function enhanceGrid() {
    var grid = document.getElementById("boardGrid");
    if (!grid) return;
    Array.prototype.forEach.call(grid.children, function (card) {
      if (!card.classList.contains("reveal")) card.classList.add("reveal");
      watch(card);
    });
  }
  enhanceGrid();

  var grid = document.getElementById("boardGrid");
  if (grid && "MutationObserver" in window) {
    new MutationObserver(function (muts) {
      var need = false;
      muts.forEach(function (m) {
        Array.prototype.forEach.call(m.addedNodes, function (n) {
          if (n.nodeType === 1 && n.classList.contains("board-card")) need = true;
        });
      });
      if (need) enhanceGrid();
    }).observe(grid, { childList: true });
  }

  /* ---------------- hero stat count-up ---------------- */
  function countUp(el) {
    var txt = el.textContent.trim();
    var m = txt.match(/^(\d+)(\D*)$/);
    if (!m) return;
    var target = +m[1], suffix = m[2] || "";
    var t0 = performance.now(), dur = 1300;
    el.textContent = "0" + suffix;
    function frame(t) {
      var p = Math.min(1, (t - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e) + suffix;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = txt;
    }
    requestAnimationFrame(frame);
  }

  if (!reduce) {
    ["statBoards", "statGpio", "statClass"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) countUp(el);
    });
  }

  /* ---------------- progress trace + hero parallax ---------------- */
  var bar = document.querySelector(".scroll-progress");
  var traces = document.querySelector(".hero-traces");
  var hero = document.querySelector(".hero");
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var y = window.scrollY || document.documentElement.scrollTop;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
      if (traces && !reduce && hero && y < hero.offsetHeight + 200) {
        traces.style.transform = "translate3d(0," + (y * 0.18).toFixed(1) + "px,0)";
      }
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- PCB current field ---------------- */
  var cv = document.getElementById("pcb-field");
  if (!cv || !cv.getContext || reduce) return;

  var ctx = cv.getContext("2d");
  var W = 0, H = 0, DPR = 1;
  var L = 160;                       /* trace lattice */
  var agents = [], motes = [], vias = [];
  var mouse = { x: -9999, y: -9999 };
  var running = false, rafId = 0, last = 0;
  var GOLD = "221,164,58", GREEN = "94,251,146";
  var trackCv = document.createElement("canvas");
  var tctx = trackCv.getContext("2d");

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function buildTracks() {
    trackCv.width = Math.max(1, Math.round(W * DPR));
    trackCv.height = Math.max(1, Math.round(H * DPR));
    tctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    tctx.clearRect(0, 0, W, H);
    tctx.lineWidth = 1;
    tctx.strokeStyle = "rgba(65,118,85,.30)";
    tctx.beginPath();
    for (var x = 0; x <= W; x += L) { tctx.moveTo(x + 0.5, 0); tctx.lineTo(x + 0.5, H); }
    for (var y = 0; y <= H; y += L) { tctx.moveTo(0, y + 0.5); tctx.lineTo(W, y + 0.5); }
    tctx.stroke();
    /* copper pads at every 3rd junction */
    for (var i = 0; i <= W; i += L) {
      for (var j = 0; j <= H; j += L) {
        if (((i / L) + (j / L)) % 3 !== 0) continue;
        tctx.fillStyle = "rgba(221,164,58,.34)";
        tctx.beginPath(); tctx.arc(i, j, 2.6, 0, 6.2832); tctx.fill();
        tctx.fillStyle = "rgba(4,20,12,.85)";
        tctx.beginPath(); tctx.arc(i, j, 1.15, 0, 6.2832); tctx.fill();
      }
    }
  }

  function spawnAgent(a) {
    a.axis = Math.random() < 0.5 ? "h" : "v";
    a.dir = Math.random() < 0.5 ? -1 : 1;
    a.spd = rnd(46, 108);
    a.col = Math.random() < 0.5 ? GOLD : GREEN;
    a.boost = Math.random() < 0.22 ? rnd(1.5, 2.1) : 1;   /* fast data packets */
    a.tail = rnd(26, 56) * (a.boost > 1 ? 1.4 : 1);
    if (a.axis === "h") { a.y = Math.round(rnd(0, H / L)) * L; a.x = rnd(-20, W + 20); }
    else { a.x = Math.round(rnd(0, W / L)) * L; a.y = rnd(-20, H + 20); }
    return a;
  }

  function spawnMote(m, init) {
    m.bx = rnd(0, W);
    m.y = init ? rnd(0, H) : H + 12;
    m.vy = rnd(-16, -6);
    m.sw = rnd(6, 22);
    m.ph = rnd(0, 6.2832);
    m.f = rnd(0.4, 1.1);
    m.r = rnd(0.8, 1.8);
    m.col = Math.random() < 0.5 ? GOLD : GREEN;
    return m;
  }

  function rebuild() {
    buildTracks();
    var n = Math.max(14, Math.min(56, Math.round((W * H) / 26000)));
    agents = [];
    for (var i = 0; i < n; i++) agents.push(spawnAgent({}));
    var mn = Math.max(8, Math.min(15, Math.round(W / 90)));
    motes = [];
    for (var j = 0; j < mn; j++) motes.push(spawnMote({}, true));
    vias = [];
    for (var v = 0; v < 4; v++) {
      vias.push({
        x: Math.round(rnd(1, Math.max(1, W / L - 1))) * L,
        y: Math.round(rnd(1, Math.max(1, H / L - 1))) * L,
        ph: rnd(0, 6.2832)
      });
    }
  }

  function resize() {
    var w = window.innerWidth, h = window.innerHeight;
    if (w === W && h === H) return;
    W = w; H = h;
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(W * DPR);
    cv.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    rebuild();
  }

  function step(dt) {
    for (var i = 0; i < agents.length; i++) {
      var a = agents[i];
      var move = a.spd * a.boost * dt * a.dir;
      if (a.axis === "h") {
        var px = a.x;
        a.x += move;
        var c0 = Math.floor(px / L), c1 = Math.floor(a.x / L);
        if (c0 !== c1 && Math.random() < 0.16) {
          a.axis = "v"; a.x = c1 * L; a.dir = Math.random() < 0.5 ? -1 : 1;
        } else if (a.x < -30 || a.x > W + 30) spawnAgent(a);
      } else {
        var py = a.y;
        a.y += move;
        var r0 = Math.floor(py / L), r1 = Math.floor(a.y / L);
        if (r0 !== r1 && Math.random() < 0.16) {
          a.axis = "h"; a.y = r1 * L; a.dir = Math.random() < 0.5 ? -1 : 1;
        } else if (a.y < -30 || a.y > H + 30) spawnAgent(a);
      }
    }
    for (var m = 0; m < motes.length; m++) {
      var mo = motes[m];
      mo.y += mo.vy * dt;
      mo.ph += mo.f * dt;
      if (mo.y < -14) spawnMote(mo, false);
    }
  }

  function draw(t) {
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(trackCv, 0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";

    /* pulsing vias */
    for (var v = 0; v < vias.length; v++) {
      var vi = vias[v];
      var a = 0.16 + 0.2 * (0.5 + 0.5 * Math.sin(t * 1.4 + vi.ph));
      ctx.strokeStyle = "rgba(" + GOLD + "," + a.toFixed(3) + ")";
      ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(vi.x, vi.y, 3.4, 0, 6.2832); ctx.stroke();
    }

    /* electrons with comet tails */
    for (var i = 0; i < agents.length; i++) {
      var ag = agents[i];
      var hx = ag.x, hy = ag.y, tx, ty;
      if (ag.axis === "h") { tx = hx - ag.dir * ag.tail; ty = hy; }
      else { ty = hy - ag.dir * ag.tail; tx = hx; }

      var dx = hx - mouse.x, dy = hy - mouse.y;
      var d = Math.sqrt(dx * dx + dy * dy);
      var near = d < 130 ? 1 + (1 - d / 130) * 0.85 : 1;

      ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(" + ag.col + "," + (0.11 * near).toFixed(3) + ")";
      ctx.lineWidth = 5.5;
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(hx, hy); ctx.stroke();

      ctx.strokeStyle = "rgba(" + ag.col + "," + (0.72 * Math.min(near, 1.5)).toFixed(3) + ")";
      ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(hx, hy); ctx.stroke();

      ctx.fillStyle = "rgba(" + ag.col + ",.95)";
      ctx.beginPath(); ctx.arc(hx, hy, 2 + (ag.boost > 1 ? 0.6 : 0), 0, 6.2832); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,.8)";
      ctx.beginPath(); ctx.arc(hx, hy, 0.9, 0, 6.2832); ctx.fill();
    }

    /* floating solder motes */
    for (var m = 0; m < motes.length; m++) {
      var mo = motes[m];
      var tw = 0.14 + 0.26 * (0.5 + 0.5 * Math.sin(t * mo.f * 2 + mo.ph * 3));
      ctx.fillStyle = "rgba(" + mo.col + "," + tw.toFixed(3) + ")";
      ctx.beginPath();
      ctx.arc(mo.bx + Math.sin(mo.ph) * mo.sw, mo.y, mo.r, 0, 6.2832);
      ctx.fill();
    }

    ctx.globalCompositeOperation = "source-over";
  }

  function frame(ts) {
    rafId = requestAnimationFrame(frame);
    var dt = Math.min(0.05, (ts - last) / 1000 || 0);
    last = ts;
    step(dt);
    draw(ts / 1000);
  }

  function start() {
    if (running) return;
    running = true;
    last = performance.now();
    rafId = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(rafId);
  }

  window.addEventListener("pointermove", function (e) {
    mouse.x = e.clientX; mouse.y = e.clientY;
  }, { passive: true });
  document.addEventListener("pointerleave", function () {
    mouse.x = mouse.y = -9999;
  });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });

  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(resize, 180);
  });

  resize();
  start();
})();
