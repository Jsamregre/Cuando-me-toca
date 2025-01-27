// Definir las credenciales del administrador
const adminEmail = "jsamregre@gmail.com";
const adminPassword = "M@teo.1709";

// Variable para almacenar las participaciones
let participations = [];

// Manejo del cambio de tema (diurno/nocturno)
document.getElementById('themeToggleBtn').addEventListener('click', () => {
  document.body.classList.toggle('night-mode');
});

// Función para manejar el inicio de sesión del administrador
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email === adminEmail && password === adminPassword) {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('appContainer').style.display = 'block';
  } else {
    alert('Correo o contraseña incorrectos');
  }
});

// Función para agregar una nueva participación
document.getElementById('ministerForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const ministerName = document.getElementById('ministerName').value;
  const supportMinisters = document.getElementById('supportMinisters').value;
  const serviceDate = document.getElementById('serviceDate').value;

  const participation = { ministerName, supportMinisters, serviceDate };
  participations.push(participation);
  localStorage.setItem('participations', JSON.stringify(participations));

  alert('Participación agregada exitosamente');
  document.getElementById('ministerForm').reset();
  renderParticipations();
});

// Función para mostrar la lista de participaciones
function renderParticipations() {
  const adminList = document.getElementById('ministriesListAdmin');
  adminList.innerHTML = participations
    .map(p => `<p>${p.serviceDate}: ${p.ministerName} (Apoyo: ${p.supportMinisters || 'Ninguno'})</p>`)
    .join('');
}

// Función para buscar participaciones como invitado
function searchParticipationGuest() {
  const searchDate = document.getElementById('searchDateGuest').value;
  const guestList = document.getElementById('ministriesListGuest');
  const results = participations.filter(p => p.serviceDate === searchDate);

  guestList.innerHTML = results.length
    ? results.map(p => `<p>${p.serviceDate}: ${p.ministerName} (Apoyo: ${p.supportMinisters || 'Ninguno'})</p>`).join('')
    : '<p>No se encontraron participaciones para esta fecha.</p>';
}

// Función para manejar el cierre de sesión
document.getElementById('logoutBtn').addEventListener('click', () => {
  document.getElementById('adminLogin').style.display = 'block';
  document.getElementById('appContainer').style.display = 'none';
});

// Inicializar los datos almacenados al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  const storedParticipations = localStorage.getItem('participations');
  participations = storedParticipations ? JSON.parse(storedParticipations) : [];
  renderParticipations();
});

