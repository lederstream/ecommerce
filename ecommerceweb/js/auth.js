// auth.js - Control de Login, Logout y verificación de sesión

import { supabase } from './supabaseClient.js';

// Verificar si hay sesión activa al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    console.log('Sesión activa:', user.email);
    mostrarUsuarioEnUI(user);
  } else {
    console.log('No hay sesión activa.');
    ocultarOpcionesProtegidas();
  }
});

// Función para iniciar sesión
export async function login(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  
  if (error) {
    alert('Error al iniciar sesión: ' + error.message);
  } else {
    window.location.reload();
  }
}

// Función para cerrar sesión
export async function logout() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    alert('Error al cerrar sesión: ' + error.message);
  } else {
    window.location.reload();
  }
}

// Mostrar elementos protegidos si hay usuario
function mostrarUsuarioEnUI(user) {
  const userEmailElement = document.getElementById('user-email');
  const loginSection = document.getElementById('login-section');
  const logoutSection = document.getElementById('logout-section');

  if (userEmailElement) userEmailElement.textContent = user.email;
  if (loginSection) loginSection.style.display = 'none';
  if (logoutSection) logoutSection.style.display = 'block';
}

// Ocultar elementos protegidos si no hay usuario
function ocultarOpcionesProtegidas() {
  const loginSection = document.getElementById('login-section');
  const logoutSection = document.getElementById('logout-section');

  if (loginSection) loginSection.style.display = 'block';
  if (logoutSection) logoutSection.style.display = 'none';
}
