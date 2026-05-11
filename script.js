const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
}

document.querySelectorAll('[data-count]').forEach((counter) => {
  const target = Number(counter.dataset.count);
  const suffix = counter.dataset.suffix || '';
  let started = false;
  const animate = () => {
    if (started) return;
    started = true;
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      counter.textContent = Math.floor(target * progress).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) {
      animate();
      obs.disconnect();
    }
  }).observe(counter);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const popup = document.querySelector('.exit-popup');
const closePopup = document.querySelector('.close-popup');
let popupShown = sessionStorage.getItem('seoPopupShown') === 'true';
if (popup) {
  document.addEventListener('mouseleave', (event) => {
    if (!popupShown && event.clientY <= 0) {
      popup.classList.add('show');
      popupShown = true;
      sessionStorage.setItem('seoPopupShown', 'true');
    }
  });
  closePopup?.addEventListener('click', () => popup.classList.remove('show'));
  popup.addEventListener('click', (event) => {
    if (event.target === popup) popup.classList.remove('show');
  });
}
