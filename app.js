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
