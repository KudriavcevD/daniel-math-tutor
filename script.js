// Открытие/закрытие мобильного меню
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.querySelector('.toggle-menu');
  const menu = document.querySelector('.menu');
  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
});
