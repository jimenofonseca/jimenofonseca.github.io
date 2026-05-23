// ── Dropdown ────────────────────────────────────────────
function toggleDropdown(id) {
  var item = document.getElementById(id);
  var btn  = item.querySelector('button');
  var isOpen = item.classList.contains('open');
  document.querySelectorAll('.nav-item').forEach(function(el) {
    el.classList.remove('open');
    var b = el.querySelector('button');
    if (b) b.setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

document.addEventListener('click', function(e) {
  if (!e.target.closest('.nav-item')) {
    document.querySelectorAll('.nav-item').forEach(function(el) {
      el.classList.remove('open');
      var b = el.querySelector('button');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.nav-item').forEach(function(el) {
      el.classList.remove('open');
      var b = el.querySelector('button');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
    var mm = document.getElementById('mobile-menu');
    if (mm) mm.classList.remove('open');
  }
});

// ── Mobile menu ─────────────────────────────────────────
function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

document.querySelectorAll('.mobile-menu a').forEach(function(a) {
  a.addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.remove('open');
  });
});
