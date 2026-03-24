/* nav.js – injects shared nav + footer into every page */
const NAV_HTML = `
<nav>
  <a href="index.html" class="nav-logo">
    <img src="https://lirp.cdn-website.com/940f2b22/dms3rep/multi/opt/web_logo_number-235w.jpg" alt="Atha Rental"/>
  </a>
  <ul class="nav-links" id="navLinks">
    <li>
      <a href="rentals.html">Rental Items <span class="arrow">▼</span></a>
      <div class="dropdown">
        <a href="rentals.html#dumpsters">Dumpsters</a>
        <a href="rentals.html#toilets">Toilets</a>
        <a href="rentals.html#heavy-equipment">Heavy Equipment</a>
        <a href="rentals.html#other">Other</a>
      </div>
    </li>
    <li><a href="contact.html">Contact Us</a></li>
    <li>
      <a href="about.html">About Us <span class="arrow">▼</span></a>
      <div class="dropdown">
        <a href="about.html#team">Our Team</a>
        <a href="about.html#mission">Our Mission</a>
        <a href="about.html#values">Our Values</a>
      </div>
    </li>
    <li>
      <a href="blog.html">Learn More <span class="arrow">▼</span></a>
      <div class="dropdown">
        <a href="blog.html">Equipment 101</a>
      </div>
    </li>
    <li><a href="contact.html" class="nav-cta">Get a Quote</a></li>
  </ul>
  <div class="hamburger" id="hamburger">
    <span></span><span></span><span></span>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer>
  <div class="footer-top">
    <div class="footer-brand">
      <img src="https://lirp.cdn-website.com/940f2b22/dms3rep/multi/opt/web_logo_number-235w.jpg" alt="Atha Rental"/>
      <p>Family-owned equipment rental serving Monroe, GA and the surrounding Georgia Piedmont since 2003. Friendly service, fair prices — real neighbors.</p>
    </div>
    <div class="footer-col">
      <h5>Rental Items</h5>
      <ul>
        <li><a href="rentals.html#dumpsters">Dumpsters</a></li>
        <li><a href="rentals.html#toilets">Toilets</a></li>
        <li><a href="rentals.html#heavy-equipment">Heavy Equipment</a></li>
        <li><a href="rentals.html#other">Other Equipment</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h5>Company</h5>
      <ul>
        <li><a href="about.html#team">Our Team</a></li>
        <li><a href="about.html#mission">Our Mission</a></li>
        <li><a href="about.html#values">Our Values</a></li>
        <li><a href="blog.html">Equipment 101</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h5>Contact</h5>
      <ul>
        <li><a href="tel:7702076041">(770) 207-6041</a></li>
        <li><a href="mailto:athaequipmentrental@yahoo.com">Email Us</a></li>
        <li><a href="https://goo.gl/maps/4B25SZKKHK4zaw7TA" target="_blank">519 E. Spring St., Monroe, GA</a></li>
        <li><a href="contact.html">Hours &amp; Location</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2025 Atha Equipment Rental. All rights reserved.</span>
    <span>Monroe, Georgia · <a href="tel:7702076041">(770) 207-6041</a></span>
  </div>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {
  // Inject nav
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) navPlaceholder.outerHTML = NAV_HTML;

  // Inject footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) footerPlaceholder.outerHTML = FOOTER_HTML;

  // Hamburger toggle
  document.addEventListener('click', e => {
    const ham = document.getElementById('hamburger');
    const links = document.getElementById('navLinks');
    if (ham && ham.contains(e.target)) {
      links.classList.toggle('open');
    } else if (links && !links.contains(e.target)) {
      links.classList.remove('open');
    }
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
});
