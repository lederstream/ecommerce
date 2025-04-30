document.addEventListener('DOMContentLoaded', function() {
    // Configuración de Supabase
    const supabaseUrl = 'https://nvpmosrzmegcjoackltw.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52cG1vc3J6bWVnY2pvYWNrbHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NjU0NTcsImV4cCI6MjA2MTU0MTQ1N30.SUtjtmJ96r6zQm-GAJHNy6jj5lbu56DiPvVfZk9ffbI';
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);
    
    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const searchQuery = urlParams.get('search');
    
    // Cargar productos
    async function loadProducts() {
        try {
            let query = supabase
                .from('products')
                .select('*')
                .eq('status', 'active')
                .order('created_at', { ascending: false });
            
            // Filtrar por categoría si existe
            if (category) {
                query = query.eq('category', category);
            }
            
            // Filtrar por búsqueda si existe
            if (searchQuery) {
                query = query.ilike('name', `%${searchQuery}%`);
                document.getElementById('searchInput').value = searchQuery;
            }
            
            const { data: products, error } = await query;
            
            if (error) throw error;
            
            displayProducts(products);
            
        } catch (error) {
            console.error('Error loading products:', error);
            displayError();
        }
    }
    
    // Mostrar productos en el DOM
    function displayProducts(products) {
        const container = document.getElementById('productsContainer');
        
        if (!products || products.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-box-open fa-3x text-muted mb-3"></i>
                    <h4 class="fw-bold">No se encontraron productos</h4>
                    <p class="text-muted">Prueba con otra categoría o término de búsqueda.</p>
                    <a href="productos.html" class="btn btn-primary mt-3">
                        <i class="fas fa-arrow-left me-2"></i>Ver todos los productos
                    </a>
                </div>
            `;
            return;
        }
        
        container.innerHTML = '';
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'col-md-6 col-lg-4 mb-4 animate__animated animate__fadeInUp';
            productCard.style.setProperty('--animate-duration', '0.5s');
            
            productCard.innerHTML = `
                <div class="card product-card h-100">
                    ${product.featured ? '<span class="badge bg-warning position-absolute top-0 end-0 m-2">Destacado</span>' : ''}
                    <img src="${product.image_url || 'https://via.placeholder.com/300x200'}" 
                         class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <span class="badge bg-primary">${product.category}</span>
                            <h5 class="card-title fw-bold mb-0">$${product.price.toFixed(2)}</h5>
                        </div>
                        <h4 class="card-title fw-bold">${product.name}</h4>
                        <p class="card-text text-muted">${product.description.substring(0, 100)}${product.description.length > 100 ? '...' : ''}</p>
                        
                        <ul class="list-unstyled mb-3">
                            ${product.features.slice(0, 3).map(feature => `
                                <li class="mb-1"><i class="fas fa-check-circle text-success me-2"></i>${feature}</li>
                            `).join('')}
                            ${product.features.length > 3 ? '<li class="mb-1"><small>+ ' + (product.features.length - 3) + ' más</small></li>' : ''}
                        </ul>
                    </div>
                    <div class="card-footer bg-white border-0">
                        <button class="btn btn-primary w-100 view-product" data-id="${product.id}">
                            <i class="fas fa-eye me-2"></i>Ver Detalles
                        </button>
                    </div>
                </div>
            `;
            
            container.appendChild(productCard);
        });
        
        // Agregar event listeners a los botones
        document.querySelectorAll('.view-product').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                viewProductDetails(productId);
            });
        });
    }
    
    // Mostrar detalles del producto en el modal
    async function viewProductDetails(productId) {
        try {
            const { data: product, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', productId)
                .single();
            
            if (error) throw error;
            
            // Actualizar el modal con los datos del producto
            document.getElementById('productModalTitle').textContent = product.name;
            document.getElementById('productModalImage').src = product.image_url || 'https://via.placeholder.com/500x500';
            document.getElementById('productModalCategory').textContent = product.category;
            document.getElementById('productModalDescription').textContent = product.description;
            document.getElementById('productModalPrice').textContent = `$${product.price.toFixed(2)}`;
            
            // Actualizar características
            const featuresList = document.getElementById('productModalFeatures');
            featuresList.innerHTML = '';
            product.features.forEach(feature => {
                const li = document.createElement('li');
                li.className = 'mb-2';
                li.innerHTML = `<i class="fas fa-check-circle text-success me-2"></i>${feature}`;
                featuresList.appendChild(li);
            });
            
            // Mostrar el modal
            const productModal = new bootstrap.Modal(document.getElementById('productModal'));
            productModal.show();
            
        } catch (error) {
            console.error('Error loading product details:', error);
            alert('Error al cargar los detalles del producto. Intenta nuevamente.');
        }
    }
    
    // Mostrar mensaje de error
    function displayError() {
        const container = document.getElementById('productsContainer');
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-exclamation-triangle fa-3x text-danger mb-3"></i>
                <h4 class="fw-bold">Error al cargar los productos</h4>
                <p class="text-muted">Por favor, intenta nuevamente más tarde.</p>
                <button class="btn btn-primary mt-3" onclick="window.location.reload()">
                    <i class="fas fa-sync-alt me-2"></i>Recargar
                </button>
            </div>
        `;
    }
    
    // Manejar búsqueda
    document.getElementById('searchForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = document.getElementById('searchInput').value.trim();
        if (searchTerm) {
            window.location.href = `productos.html?search=${encodeURIComponent(searchTerm)}`;
        }
    });
    
    // Inicializar
    loadProducts();
});