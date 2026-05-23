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
})();
