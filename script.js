document.addEventListener('DOMContentLoaded', function() {
  // Мобильное меню
  const toggle = document.querySelector('.toggle-menu');
  const menu = document.querySelector('.menu');
  toggle.addEventListener('click', () => menu.classList.toggle('open'));

  // Кнопка "Наверх"
  const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) scrollBtn.style.display = 'block';
    else scrollBtn.style.display = 'none';
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // FullCalendar: расписание
  const calendarEl = document.getElementById('calendar');
  if (calendarEl) {
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'timeGridWeek',
      locale: 'ru',
      allDaySlot: false,
      slotMinTime: '08:00:00',
      slotMaxTime: '20:00:00',
      height: 'auto',
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
    });
    calendar.render();
  }
});
