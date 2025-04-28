// registro.js - Lógica para registro de usuarios nuevos (clientes o proveedores)

import { supabase } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('form-registro');
  
  if (!formulario) return;

  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const rol = document.getElementById('rol').value;

    if (!nombre || !email || !password || !rol) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert('Error en el registro: ' + error.message);
        return;
      }

      const { error: insertError } = await supabase
        .from('usuarios')
        .insert([{ nombre, email, rol }]);

      if (insertError) {
        alert('Error al guardar información adicional: ' + insertError.message);
        return;
      }

      alert('Registro exitoso, revisa tu correo para confirmar la cuenta.');
      formulario.reset();
      window.location.href = '/login.html';

    } catch (err) {
      console.error('Error general en el registro:', err.message);
      alert('Ocurrió un error inesperado.');
    }
  });
});
