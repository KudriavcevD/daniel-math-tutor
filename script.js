// --------- Firebase Initialization ---------
const firebaseConfig = {
  apiKey: "AIzaSyBYbnj35Y4WXSj9VfkgbQkGfLz4kFpnLiM",
  authDomain: "daniel-math-tutor.firebaseapp.com",
  projectId: "daniel-math-tutor",
  storageBucket: "daniel-math-tutor.appspot.com",
  messagingSenderId: "1022128954602",
  appId: "1:1022128954602:web:86ef393aba5f7bf2310b93",
  measurementId: "G-2D28SWWS4X"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// --------- Auth UI Logic ---------
const authModal     = document.getElementById('authModal');
const loginForm     = document.getElementById('loginForm');
const registerForm  = document.getElementById('registerForm');
const loginEmail    = document.getElementById('loginEmail');
const loginPass     = document.getElementById('loginPass');
const regEmail      = document.getElementById('regEmail');
const regPass       = document.getElementById('regPass');

function openAuth() { authModal.style.display = 'block'; }
function closeAuth(){ authModal.style.display = 'none'; }
function showRegister(){ loginForm.style.display='none'; registerForm.style.display='flex'; }
function showLogin(){ registerForm.style.display='none'; loginForm.style.display='flex'; }
function signOut(){ auth.signOut(); }

loginForm.addEventListener('submit', e=>{
  e.preventDefault();
  auth.signInWithEmailAndPassword(loginEmail.value, loginPass.value)
    .then(()=>closeAuth())
    .catch(err=>alert(err.message));
});
registerForm.addEventListener('submit', e=>{
  e.preventDefault();
  auth.createUserWithEmailAndPassword(regEmail.value, regPass.value)
    .then(()=>closeAuth())
    .catch(err=>alert(err.message));
});

auth.onAuthStateChanged(user=>{
  const navLogin   = document.getElementById('nav-login');
  const navLogout  = document.getElementById('nav-logout');
  const profile    = document.getElementById('profile');
  const publicCont = document.getElementById('publicContent');
  if(user){
    navLogin.style.display='none';
    navLogout.style.display='block';
    publicCont.style.display='none';
    profile.style.display='block';
    document.getElementById('userEmail').textContent = user.email;
  } else {
    navLogin.style.display='block';
    navLogout.style.display='none';
    publicCont.style.display='block';
    profile.style.display='none';
  }
});
window.onclick = e=>{ if(e.target===authModal) closeAuth(); };

// --------- Booking Price Calc ---------
const formatSelect = document.getElementById('formatSelect');
const totalPrice   = document.getElementById('totalPrice');
function updatePrice(){
  const price = Number(formatSelect.value) * 4;
  totalPrice.textContent = price.toFixed(2);
}
formatSelect.addEventListener('change', updatePrice);
updatePrice();

// --------- Booking Form Submit ---------
document.getElementById('bookingForm').addEventListener('submit', e=>{
  e.preventDefault();
  alert('Заявка отправлена! Я скоро свяжусь с вами.');
  e.target.reset();
  updatePrice();
});

// --------- FullCalendar Init ---------
document.addEventListener('DOMContentLoaded', ()=>{
  const calendarEl = document.getElementById('calendar');
  new FullCalendar.Calendar(calendarEl,{
    initialView: 'timeGridWeek',
    locale: 'ru',
    slotMinTime: '08:00:00',
    slotMaxTime: '21:00:00',
    events: [
      // сюда можно добавить ваши расписания
    ]
  }).render();
});

// --------- Scroll to Top ---------
const scrollBtn = document.getElementById('scrollTopBtn');
window.onscroll = ()=>{ scrollBtn.style.display = window.scrollY>300 ? 'block' : 'none'; };
scrollBtn.onclick = ()=> window.scrollTo({ top:0, behavior:'smooth' });

// --------- Mobile Menu Toggle ---------
const toggleMenu = document.querySelector('.toggle-menu');
const menu       = document.querySelector('.menu');
toggleMenu.addEventListener('click', ()=> menu.classList.toggle('open'));
