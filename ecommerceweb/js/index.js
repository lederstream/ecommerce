// js/index.js

async function cargarServicios() {
  const { data, error } = await supabase
    .from('servicios')
    .select('*')
    .eq('estado', 'aprobado');

  if (error) {
    console.error('Error al cargar servicios:', error);
    return;
  }

  const container = document.getElementById('servicios-container');
  container.innerHTML = '';

  data.forEach(servicio => {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="card h-100 shadow">
        <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.titulo}">
        <div class="card-body">
          <h5 class="card-title">${servicio.titulo}</h5>
          <p class="card-text">${servicio.descripcion}</p>
          <p class="text-primary fw-bold">S/. ${servicio.precio_publico}</p>
          <button class="btn btn-success w-100">Contratar</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

cargarServicios();

document.getElementById('login-btn')?.addEventListener('click', () => {
  window.location.href = 'login.html';
});

// Ocultar pantalla de carga cuando todo esté listo
window.addEventListener('load', () => {
  const loader = document.getElementById('pantalla-carga');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
  }
});

// Cargar datos del usuario en perfil.html
async function cargarPerfil() {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data, error } = await supabase.from('usuarios').select('rol').eq('email', user.email).single();
    if (!error) {
      document.getElementById('nombreUsuario').value = user.user_metadata.nombre || 'No definido';
      document.getElementById('correoUsuario').value = user.email;
      document.getElementById('rolUsuario').value = data.rol;
    }
  }
}

if (window.location.pathname.includes('perfil.html')) {
  cargarPerfil();
}

async function cerrarSesion() {
  await supabase.auth.signOut();
  window.location.href = 'login.html'; // O donde quieras mandarlo
}

document.getElementById('servicios-skeleton').style.display = 'none';
document.getElementById('servicios-container').innerHTML = cardsHTML;

