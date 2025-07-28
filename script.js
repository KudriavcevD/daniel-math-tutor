// ========== Firebase Auth ==========
const firebaseConfig = {
    apiKey: "AIzaSyBYbnj35Y4WXSj9VfkgbQkGfLz4kFpnLiM",
    authDomain: "daniel-math-tutor.firebaseapp.com",
    projectId: "daniel-math-tutor",
    storageBucket: "daniel-math-tutor.firebasestorage.app",
    messagingSenderId: "1022128954602",
    appId: "1:1022128954602:web:86ef393aba5f7bf2310b93",
    measurementId: "G-2D28SWWS4X"
  };
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Элементы
const authModal = document.getElementById('authModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const navLogin = document.getElementById('nav-login');
const navLogout = document.getElementById('nav-logout');
const profileSection = document.getElementById('profile');
const publicContent = document.getElementById('publicContent');
const userEmailEl = document.getElementById('userEmail');

// Открыть модалку
function openAuth(mode = 'login') {
  authModal.style.display = 'block';
  if (mode === 'login') showLogin();
  else showRegister();
}
function closeAuth() {
  authModal.style.display = 'none';
}
function showLogin() {
  loginForm.style.display = 'flex';
  registerForm.style.display = 'none';
}
function showRegister() {
  loginForm.style.display = 'none';
  registerForm.style.display = 'flex';
}

// Регистрация
registerForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('regEmail').value;
  const pass  = document.getElementById('regPass').value;
  auth.createUserWithEmailAndPassword(email, pass)
    .then(() => closeAuth())
    .catch(err => alert(err.message));
});

// Вход
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const pass  = document.getElementById('loginPass').value;
  auth.signInWithEmailAndPassword(email, pass)
    .then(() => closeAuth())
    .catch(err => alert(err.message));
});

// Выход
function signOut() {
  auth.signOut();
}

// Следим за статусом пользователя
auth.onAuthStateChanged(user => {
  if (user) {
    // залогинен
    navLogin.style.display = 'none';
    navLogout.style.display = 'block';
    publicContent.style.display = 'none';
    profileSection.style.display = 'block';
    userEmailEl.textContent = user.email;
  } else {
    // не залогинен
    navLogin.style.display = 'block';
    navLogout.style.display = 'none';
    publicContent.style.display = 'block';
    profileSection.style.display = 'none';
  }
});

// Закрываем модалку кликом на подложку
window.onclick = e => {
  if (e.target === authModal) closeAuth();
};


// ========== Ваши существующие скрипты ==========
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

  // калькулятор цены (фиксировано 4 урока в месяц)
  const formatSelect = document.getElementById('formatSelect');
  const totalPrice = document.getElementById('totalPrice');
  function updatePrice() {
    const price = +formatSelect.value;
    totalPrice.textContent = (price * 4).toFixed(2);
  }
  formatSelect.addEventListener('change', updatePrice);
  updatePrice();

  // отправка формы записи (заглушка)
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
