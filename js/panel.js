// panel.js - Lógica para el panel de gestión de servicios del proveedor

import { supabase } from './supabaseClient.js';

async function verificarProveedor() {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = '/login.html'; // Redirigir si no hay sesión
      return;
    }

    const { data, error } = await supabase
      .from('usuarios')
      .select('rol')
      .eq('email', user.email)
      .single();

    if (error || data.rol !== 'proveedor') {
      window.location.href = '/'; // No autorizado
    }
  } catch (err) {
    console.error('Error al verificar proveedor:', err.message);
  }
}

async function cargarMisServicios() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const { data: servicios, error } = await supabase
      .from('servicios')
      .select('*')
      .eq('proveedor_email', user.email);

    if (error) {
      console.error('Error al cargar servicios:', error.message);
      return;
    }

    const contenedor = document.getElementById('mis-servicios');
    if (!contenedor) return;

    contenedor.innerHTML = servicios.map(s => `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <img src="${s.imagen}" class="card-img-top" alt="${s.titulo}" onerror="this.src='https://via.placeholder.com/300x200'">
          <div class="card-body">
            <h5 class="card-title">${s.titulo}</h5>
            <p class="card-text">${s.descripcion}</p>
            <span class="badge bg-${s.estado === 'aprobado' ? 'success' : 'warning'}">${s.estado}</span>
          </div>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('Error general al cargar servicios:', err.message);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await verificarProveedor();
  await cargarMisServicios();
});
