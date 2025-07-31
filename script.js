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
      const data = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        message: contactForm.message.value,
      };
      storeData('contacts', { ...data, ts: Date.now() });
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(res => (res.ok ? res.json() : Promise.reject()))
        .then(() => {
          contactForm.reset();
          showMessage(contactForm, 'Message sent! We will be in touch soon.');
        })
        .catch(() => {
          showMessage(contactForm, 'Error sending message. Please try again later.');
        });
    });
  }

  const newsletterForm = document.querySelector('#newsletter form');
  if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const data = { email: emailInput.value };
      storeData('signups', { ...data, ts: Date.now() });
      fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(res => (res.ok ? res.json() : Promise.reject()))
        .then(() => {
          newsletterForm.reset();
          showMessage(newsletterForm, 'Thanks for signing up!');
        })
        .catch(() => {
          showMessage(newsletterForm, 'Error signing up. Please try again later.');
        });
    });
  }

  const testimonialScroller = document.querySelector('.testimonial-scroller');
  const btnPrev = document.querySelector('.scroll-btn.left');
  const btnNext = document.querySelector('.scroll-btn.right');
  if (testimonialScroller && btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => {
      testimonialScroller.scrollBy({ left: -testimonialScroller.clientWidth, behavior: 'smooth' });
    });
    btnNext.addEventListener('click', () => {
      testimonialScroller.scrollBy({ left: testimonialScroller.clientWidth, behavior: 'smooth' });
    });
  }
});
