/* ═══ NC Indoor Cricket — Static Site JS ═══ */
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  /* ── Navbar scroll effect ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ── Mobile menu ── */
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuIcon.setAttribute('data-lucide', open ? 'x' : 'menu');
    lucide.createIcons();
    document.body.style.overflow = open ? 'hidden' : '';
  });
  window.closeMobile = () => {
    menu.classList.remove('open');
    menuIcon.setAttribute('data-lucide', 'menu');
    lucide.createIcons();
    document.body.style.overflow = '';
  };

  /* ── Hero Carousel ── */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  const heroData = [
    { title: '<span>Box Cricket.</span><span class="gradient-text glow">Unleashed.</span>', sub: 'Full-contact, high-intensity 6v6 and 8v8 matches under stadium lights. Year-round leagues start at launch.' },
    { title: '<span>The Future of Cricket</span><span class="gradient-text glow">in North Carolina</span>', sub: "Greater Charlotte's first purpose-built indoor cricket arena — engineered for the sport, not adapted from a warehouse." },
    { title: '<span>Train Like</span><span class="gradient-text glow">a Pro.</span>', sub: 'Full 85ft run-up lanes with 2024 BOLA pitching machines. Professional-grade turf engineered for consistent bounce.' }
  ];
  let current = 0;
  let timer;

  function goTo(i) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = i;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    document.getElementById('hero-title').innerHTML = heroData[i].title;
    document.getElementById('hero-subtitle').textContent = heroData[i].sub;
    resetTimer();
  }
  function next() { goTo((current + 1) % slides.length); }
  function prev() { goTo((current - 1 + slides.length) % slides.length); }
  function resetTimer() { clearInterval(timer); timer = setInterval(next, 6000); }

  dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.dot)));
  document.getElementById('hero-prev').addEventListener('click', prev);
  document.getElementById('hero-next').addEventListener('click', next);
  resetTimer();

  /* ── Scroll Reveal ── */
  const revealSections = document.querySelectorAll('.reveal-section');
  const revealItems = document.querySelectorAll('.reveal-item');
  const heroAnims = document.querySelectorAll('.animate-in');

  // Hero animations on load
  setTimeout(() => heroAnims.forEach(el => el.classList.add('visible')), 300);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealSections.forEach(s => observer.observe(s));

  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 150);
        itemObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealItems.forEach(item => itemObserver.observe(item));

  /* ── Form Handling ── */
  const form = document.getElementById('interest-form');
  const formSuccess = document.getElementById('form-success');
  const formError = document.getElementById('form-error');
  const errorMsg = document.getElementById('error-message');
  const btnText = document.getElementById('btn-text');
  const btnLoading = document.getElementById('btn-loading');
  const btnIcon = form.querySelector('.btn-icon');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formError.style.display = 'none';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const interest = form.interest.value;

    // Validate
    if (!name) return showError('Please enter your full name.');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showError('Please enter a valid email address.');
    if (!phone || phone.replace(/\D/g, '').length < 10) return showError('Please enter a valid phone number.');
    if (!interest) return showError('Please select your primary interest.');

    // Submit
    btnText.style.display = 'none';
    if (btnIcon) btnIcon.style.display = 'none';
    btnLoading.style.display = 'inline-flex';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, phone, interest, _subject: 'NC Indoor Cricket — ' + name })
      });
      if (res.ok) {
        form.style.display = 'none';
        formSuccess.style.display = 'block';
        lucide.createIcons();
      } else { throw new Error(); }
    } catch {
      // Fallback: mailto
      const body = 'Name: ' + name + '%0AEmail: ' + email + '%0APhone: ' + phone + '%0AInterest: ' + interest;
      window.open('mailto:info@ncindoorcricket.com?subject=Interest%20Registration&body=' + body, '_blank');
      form.style.display = 'none';
      formSuccess.style.display = 'block';
      lucide.createIcons();
    }
  });

  function showError(msg) {
    errorMsg.textContent = msg;
    formError.style.display = 'flex';
    lucide.createIcons();
  }
});
