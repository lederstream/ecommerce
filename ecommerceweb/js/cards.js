const cardsHTML = servicios.map(s => {
    const precio = rolUsuario === 'distribuidor' ? s.precio_distribuidor : s.precio_publico;
    const mostrarPrecio = usuarioActual ? `<p class="card-text fw-bold">Precio: S/ ${precio}</p>` : '';
  
    return `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm card-animate">
          <img src="${s.imagen}" class="card-img-top" alt="${s.titulo}" onerror="this.src='https://via.placeholder.com/300x200'">
          <div class="card-body">
            <h5 class="card-title">${s.titulo}</h5>
            <p class="card-text">${s.descripcion}</p>
            ${mostrarPrecio}
          </div>
        </div>
      </div>
    `;
  }).join('');
  