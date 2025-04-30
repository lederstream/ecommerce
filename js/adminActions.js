import { supabase, logout } from './auth.js';

document.getElementById('logoutBtn').addEventListener('click', async () => {
  await logout();
});

// Obtener productos
async function fetchProducts() {
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  const container = document.getElementById('productList');
  container.innerHTML = '';

  if (error) {
    container.innerHTML = `<p class="text-danger">Error al cargar productos.</p>`;
    return;
  }

  data.forEach(p => {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4';
    card.innerHTML = `
      <div class="card h-100" data-aos="zoom-in">
        <img src="${p.image_url}" class="card-img-top" alt="${p.name}">
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">${p.description}</p>
          <p class="text-primary fw-bold">S/ ${p.price}</p>
          <button class="btn btn-warning btn-sm me-2" onclick='editProduct(${JSON.stringify(p)})'>Editar</button>
          <button class="btn btn-danger btn-sm" onclick='deleteProduct("${p.id}")'>Eliminar</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Guardar producto
document.getElementById('productForm').addEventListener('submit', async e => {
  e.preventDefault();

  const product = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    image_url: document.getElementById('image_url').value,
    price: parseFloat(document.getElementById('price').value)
  };

  const productId = document.getElementById('productId').value;

  let result;
  if (productId) {
    // Actualizar
    result = await supabase.from('products').update(product).eq('id', productId);
  } else {
    // Crear
    result = await supabase.from('products').insert([product]);
  }

  if (result.error) {
    alert('Error guardando producto.');
  } else {
    e.target.reset();
    document.getElementById('productId').value = '';
    fetchProducts();
  }
});

window.editProduct = function (product) {
  document.getElementById('name').value = product.name;
  document.getElementById('description').value = product.description;
  document.getElementById('image_url').value = product.image_url;
  document.getElementById('price').value = product.price;
  document.getElementById('productId').value = product.id;
};

window.deleteProduct = async function (id) {
  if (!confirm('¿Eliminar este producto?')) return;
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) alert('Error eliminando producto');
  else fetchProducts();
};

// Cargar productos al inicio
fetchProducts();
