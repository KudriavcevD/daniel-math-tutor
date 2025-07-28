document.addEventListener('DOMContentLoaded', () => {
  // мобильное меню
  document.querySelector('.toggle-menu').addEventListener('click', () =>
    document.querySelector('.menu').classList.toggle('open')
  );

  // кнопка Наверх
  const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // FullCalendar расписание
  const calendarEl = document.getElementById('calendar');
  if (calendarEl) {
    new FullCalendar.Calendar(calendarEl, {
      initialView: 'timeGridWeek',
      locale: 'ru',
      allDaySlot: false,
      slotMinTime: '08:00',
      slotMaxTime: '20:00',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,timeGridDay'
      },
      events: [
        { title: 'Группа 3 чел.', daysOfWeek: [1,3], startTime: '16:00', endTime: '17:00' },
        { title: 'Индивидуалка', daysOfWeek: [2,4], startTime: '17:00', endTime: '18:00' },
        { title: 'Группа 2 чел.', daysOfWeek: [5], startTime: '15:00', endTime: '16:00' }
      ]
    }).render();
  }

  // калькулятор цены в форме
  const formatSelect = document.getElementById('formatSelect');
  const lessonsInput = document.getElementById('lessonsCount');
  const totalPrice = document.getElementById('totalPrice');
  function updatePrice() {
    const price = +formatSelect.value;
    totalPrice.textContent = (price * +lessonsInput.value).toFixed(2);
  }
  formatSelect.addEventListener('change', updatePrice);
  lessonsInput.addEventListener('input', updatePrice);
  updatePrice();

  // обработка формы записи (заглушка)
  document.getElementById('bookingForm').addEventListener('submit', e => {
    e.preventDefault();
    alert('Заявка отправлена! Спасибо, я скоро свяжусь.');
    e.target.reset();
    updatePrice();
  });

  // подписка на рассылку (заглушка)
  document.getElementById('subscribeForm').addEventListener('submit', e => {
    e.preventDefault();
    alert('Вы успешно подписались на рассылку!');
    e.target.reset();
  });
});
