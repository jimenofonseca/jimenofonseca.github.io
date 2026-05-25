// ── Theme toggle ─────────────────────────────────────────
function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  localStorage.setItem('theme', t);
  document.querySelectorAll('[data-theme-opt]').forEach(function(el){
    el.classList.toggle('active', el.getAttribute('data-theme-opt') === t);
  });
}
function toggleTheme() {
  var cur = document.documentElement.dataset.theme || 'light';
  applyTheme(cur === 'dark' ? 'light' : 'dark');
}

// ── Mobile sidebar ───────────────────────────────────────
function toggleSidebar() {
  var s = document.getElementById('sidebar');
  if (!s) return;
  s.classList.toggle('open');
  var btn = document.getElementById('menu-btn');
  if (btn) btn.textContent = s.classList.contains('open')
    ? (window.__lang === 'de' ? 'Schliessen' : 'Close')
    : (window.__lang === 'de' ? 'Menü' : 'Menu');
}

// ── Init ─────────────────────────────────────────────────
(function(){
  var t = localStorage.getItem('theme') || 'light';
  applyTheme(t);

  document.querySelectorAll('.sidebar a').forEach(function(a){
    a.addEventListener('click', function(){
      if (window.innerWidth <= 900) {
        var s = document.getElementById('sidebar');
        if (s) s.classList.remove('open');
      }
    });
  });

  document.querySelectorAll('.sidebar [aria-current="page"]').forEach(function(a){
    a.style.color = 'var(--fg)';
    var num = a.querySelector('.num');
    if (num) num.style.color = 'var(--fg)';
  });

  // ── Photo gallery lightbox ─────────────────────────────
  var figures = Array.prototype.slice.call(document.querySelectorAll('.photo-grid figure'));
  if (figures.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML =
      '<button class="lightbox-close" aria-label="Close">CLOSE ×</button>' +
      '<button class="lightbox-nav prev" aria-label="Previous">←</button>' +
      '<img alt="" />' +
      '<button class="lightbox-nav next" aria-label="Next">→</button>' +
      '<div class="lightbox-caption"></div>';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.lightbox-caption');
    var index = -1;

    function openAt(i) {
      index = i;
      var fig = figures[i];
      var img = fig.querySelector('img');
      var full = fig.getAttribute('data-full') || img.src;
      var cap = fig.querySelector('figcaption');
      lbImg.src = full;
      lbImg.alt = img.alt || '';
      lbCap.textContent = cap ? cap.textContent : '';
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
      index = -1;
    }
    function step(delta) {
      openAt((index + delta + figures.length) % figures.length);
    }

    figures.forEach(function(fig, i) {
      fig.addEventListener('click', function() { openAt(i); });
    });
    lb.querySelector('.lightbox-close').addEventListener('click', close);
    lb.querySelector('.lightbox-nav.prev').addEventListener('click', function(e) {
      e.stopPropagation(); step(-1);
    });
    lb.querySelector('.lightbox-nav.next').addEventListener('click', function(e) {
      e.stopPropagation(); step(1);
    });
    lb.addEventListener('click', function(e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function(e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    });
  }
})();


// ─────────────────────────────────────────────────────────
// app-morph.js — Hyperspace jump page transition.
//
// Intercepts internal nav link clicks, injects an overlay
// with ~120 stretching star streaks + a white flash, lets
// the animation play, then navigates. On the new page,
// flags <html> with .hyper-arrive so CSS plays the
// "deceleration" effect on arrival.
// ─────────────────────────────────────────────────────────

(function () {
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Arrival side: the inline <head> script already added .hyper-arrive
  // before paint. We just clean up the flag + remove the class after decel. ──
  if (sessionStorage.getItem('hyperjump-arriving') === '1') {
    sessionStorage.removeItem('hyperjump-arriving');
    if (!reduceMotion) {
      // Ensure class is present (in case inline script wasn't included)
      document.documentElement.classList.add('hyper-arrive');
      // Remove after the decel finishes (matches CSS 0.95s + small buffer)
      setTimeout(function () {
        document.documentElement.classList.remove('hyper-arrive');
      }, 1200);
    }
  }

  // ── Departure side: intercept link clicks ─────────────
  if (reduceMotion) return;

  function isInternalNav(a) {
    if (!a || a.tagName !== 'A') return false;
    if (a.target === '_blank') return false;
    if (a.hasAttribute('download')) return false;
    var href = a.getAttribute('href');
    if (!href) return false;
    if (href.startsWith('#')) return false;       // same-page anchor
    if (href.startsWith('mailto:')) return false;
    if (href.startsWith('tel:')) return false;
    // External? Only same-origin counts as internal.
    try {
      var url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return false;
    } catch (e) { return false; }
    return true;
  }

  function buildStarfield() {
    var overlay = document.createElement('div');
    overlay.className = 'hyperjump';
    var STAR_COUNT = 120;
    for (var i = 0; i < STAR_COUNT; i++) {
      var s = document.createElement('span');
      s.className = 'star';
      // Coordinates are now % of the overlay (not the viewport),
      // so streaks stay contained inside the main content frame.
      s.style.top = (Math.random() * 100) + '%';
      // Starting horizontal position skewed toward the left half of the overlay
      s.style.left = (Math.random() * 35 - 5) + '%';
      // Stagger when each star starts streaking (the chaotic-but-coherent feel)
      var delay = Math.random() * 0.35;
      s.style.animationDelay = delay + 's';
      var dur = 0.7 + Math.random() * 0.25;
      s.style.animationDuration = dur + 's';
      overlay.appendChild(s);
    }
    return [overlay];
  }

  document.addEventListener(
    'click',
    function (e) {
      // Find the closest <a>
      var a = e.target.closest && e.target.closest('a');
      if (!isInternalNav(a)) return;
      // Cmd/Ctrl/middle-click → let the browser do its thing (new tab, etc.)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

      e.preventDefault();
      var href = a.href;

      // Inject the overlay + flash
      var nodes = buildStarfield();
      nodes.forEach(function (n) { document.body.appendChild(n); });

      // Flag so the new page knows to play the arrival decel
      sessionStorage.setItem('hyperjump-arriving', '1');

      // Navigate at the peak of the white flash — gives streaks time to fully extend
      setTimeout(function () { window.location.href = href; }, 1150);
    },
    true // capture phase: get clicks before anything else
  );
})();
