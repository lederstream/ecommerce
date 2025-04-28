// cards.js - Construcción dinámica de tarjetas de servicios

import { supabase } from './supabaseClient.js';

const serviciosContainer = document.getElementById('mis-servicios');

export async function cargarServicios() {
  try {
    const { data: servicios, error } = await supabase
      .from('servicios')
      .select('*')
      .eq('estado', 'aprobado');

    if (error) {
      throw new Error('Error cargando servicios: ' + error.message);
    }

    if (servicios.length === 0) {
      serviciosContainer.innerHTML = '<p class="text-center fs-5 text-muted">No hay servicios disponibles.</p>';
      return;
    }

    serviciosContainer.innerHTML = servicios.map(servicio => {
      return `
        <div class="col-md-6 col-lg-4 d-flex align-items-stretch">
          <div class="card shadow-sm animate__animated animate__fadeInUp" style="transition: all 0.3s;">
            <img src="${servicio.imagen || 'https://via.placeholder.com/400x300?text=Imagen+no+disponible'}" class="card-img-top" alt="${servicio.titulo}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${servicio.titulo}</h5>
              <p class="card-text">${servicio.descripcion}</p>
              <div class="mt-auto">
                <a href="#" class="btn btn-primary w-100">Ver Más</a>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
    
  } catch (err) {
    console.error(err);
    serviciosContainer.innerHTML = `<p class="text-danger text-center">Hubo un error al cargar los servicios.</p>`;
  }
}

// Carga automática de servicios al iniciar
document.addEventListener('DOMContentLoaded', cargarServicios);
