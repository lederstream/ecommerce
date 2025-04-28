// index.js - Lógica principal para la página de inicio

import { cargarServicios } from './cards.js';

document.addEventListener('DOMContentLoaded', () => {
  cargarServicios();
  
  const toTopButton = document.getElementById('toTop');

  if (toTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        toTopButton.classList.add('show');
      } else {
        toTopButton.classList.remove('show');
      }
    });

    toTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

import { login, logout } from './auth.js';

window.iniciarSesion = async () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  await login(email, password);
};

window.cerrarSesion = async () => {
  await logout();
};
