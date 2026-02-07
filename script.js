const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('in'));
}, { threshold: 0.16 });

document.querySelectorAll('.section, .card').forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});

const counters = document.querySelectorAll('[data-counter]');
const cObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const max = Number(el.dataset.counter);
    let value = 0;
    const step = Math.ceil(max / 30);
    const timer = setInterval(() => {
      value = Math.min(value + step, max);
      el.textContent = value;
      if (value >= max) clearInterval(timer);
    }, 30);
    cObs.unobserve(el);
  });
});
counters.forEach((el) => cObs.observe(el));

const leadForm = document.querySelector('#lead-form');
if (leadForm) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const response = document.querySelector('#form-response');
    response.textContent = 'Recebemos sua solicitação! Em breve entraremos em contato com o link de agendamento.';
    leadForm.reset();
  });
}
