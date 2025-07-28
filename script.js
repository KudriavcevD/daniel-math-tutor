// Меню для мобильных
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.querySelector('.toggle-menu');
  const menu = document.querySelector('.menu');
  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  // Кнопка «Наверх»
  const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) scrollBtn.style.display = 'block';
    else scrollBtn.style.display = 'none';
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
