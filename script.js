// Basic interactivity for navigation and forms
window.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  const showMessage = (form, text) => {
    const msg = document.createElement('p');
    msg.className = 'form-message';
    msg.textContent = text;
    form.appendChild(msg);
    setTimeout(() => msg.remove(), 5000);
  };

  const storeData = (key, data) => {
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push(data);
    localStorage.setItem(key, JSON.stringify(existing));
  };

  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      storeData('contacts', {
        name: contactForm.name.value,
        email: contactForm.email.value,
        message: contactForm.message.value,
        ts: Date.now()
      });
      contactForm.reset();
      showMessage(contactForm, 'Message sent! We will be in touch soon.');
    });
  }

  const newsletterForm = document.querySelector('#newsletter form');
  if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      storeData('signups', { email: emailInput.value, ts: Date.now() });
      newsletterForm.reset();
      showMessage(newsletterForm, 'Thanks for signing up!');
    });
  }
});
