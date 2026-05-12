/* ============================================================
   ATHA EQUIPMENT RENTAL — main.js
   Handles: nav toggle, scroll reveal, lightbox
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── HAMBURGER ── */
  const ham   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (ham && links) {
    ham.addEventListener('click', () => links.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (!ham.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
      }
    });
  }

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    reveals.forEach(el => obs.observe(el));
  }

  /* ── STICKY TAB HIGHLIGHT ── */
  const sections = document.querySelectorAll('.cat-section');
  const tabs     = document.querySelectorAll('.cat-tab');
  if (sections.length && tabs.length) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) current = s.id; });
      tabs.forEach(t => {
        t.classList.remove('active');
        if (t.getAttribute('href') === '#' + current) t.classList.add('active');
      });
    });
  }

  /* ── LIGHTBOX ── */
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lb-img');
  const lbCap   = document.getElementById('lb-caption');
  const lbClose = document.getElementById('lb-close');
  const lbPrev  = document.getElementById('lb-prev');
  const lbNext  = document.getElementById('lb-next');

  if (!lb) return;

  let photos = [], cur = 0;

  function buildPhotoList() {
    photos = [];
    document.querySelectorAll('.item-photo:not(.no-photo)').forEach(el => {
      photos.push({ src: el.dataset.src, caption: el.dataset.caption });
    });
  }

  function showPhoto(i) {
    if (!photos.length) return;
    cur = (i + photos.length) % photos.length;
    lbImg.src = photos[cur].src;
    lbCap.textContent = photos[cur].caption;
    lbPrev.style.display = photos.length > 1 ? 'flex' : 'none';
    lbNext.style.display = photos.length > 1 ? 'flex' : 'none';
  }

  function openLightbox(src, caption) {
    buildPhotoList();
    cur = photos.findIndex(p => p.src === src);
    if (cur === -1) cur = 0;
    showPhoto(cur);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  document.addEventListener('click', e => {
    const p = e.target.closest('.item-photo:not(.no-photo)');
    if (p) openLightbox(p.dataset.src, p.dataset.caption);
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click',  e => { e.stopPropagation(); showPhoto(cur - 1); });
  lbNext.addEventListener('click',  e => { e.stopPropagation(); showPhoto(cur + 1); });
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   showPhoto(cur - 1);
    if (e.key === 'ArrowRight')  showPhoto(cur + 1);
  });

});
