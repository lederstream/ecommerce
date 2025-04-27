// js/panel.js

async function verificarProveedor() {
    const { data: { user } } = await supabase.auth.getUser();
  
    if (!user) {
      window.location.href = 'login.html';
      return;
    }
  
    const { data: perfil } = await supabase
      .from('perfiles')
      .select('rol')
      .eq('id', user.id)
      .single();
  
    if (perfil?.rol !== 'proveedor') {
      alert('Acceso restringido.');
      window.location.href = 'index.html';
    }
  }
  
  verificarProveedor();
  
  async function cargarMisServicios() {
    const { data: { user } } = await supabase.auth.getUser();
  
    const { data, error } = await supabase
      .from('servicios')
      .select('*')
      .eq('proveedor_id', user.id);
  
    if (error) {
      console.error('Error cargando servicios:', error);
      return;
    }
  
    const container = document.getElementById('servicios-proveedor');
    container.innerHTML = '';
  
    data.forEach(servicio => {
      const card = document.createElement('div');
      card.className = 'col-md-4';
      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.titulo}">
          <div class="card-body">
            <h5 class="card-title">${servicio.titulo}</h5>
            <p class="card-text">${servicio.descripcion}</p>
            <p class="text-success fw-bold">S/. ${servicio.precio_publico}</p>
            <p class="text-muted small">Estado: ${servicio.estado}</p>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }
  
  cargarMisServicios();
  
  document.getElementById('nuevo-servicio-btn').addEventListener('click', () => {
    const form = document.getElementById('formulario-nuevo-servicio');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
  });
  
  document.getElementById('nuevo-servicio-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const { data: { user } } = await supabase.auth.getUser();
  
    const titulo = document.getElementById('titulo').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const imagen = document.getElementById('imagen').value.trim();
    const precio_publico = parseFloat(document.getElementById('precio_publico').value.trim());
    const precio_distribuidor = parseFloat(document.getElementById('precio_distribuidor').value.trim());
  
    const { error } = await supabase.from('servicios').insert([{
      titulo,
      descripcion,
      imagen,
      precio_publico,
      precio_distribuidor,
      estado: 'pendiente', // Nuevo servicio se registra como pendiente
      proveedor_id: user.id
    }]);
  
    if (error) {
      alert('Error al agregar servicio: ' + error.message);
      return;
    }
  
    alert('Servicio enviado para aprobación.');
    window.location.reload();
  });
  
  document.getElementById('logout-btn').addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = 'index.html';
  });
  