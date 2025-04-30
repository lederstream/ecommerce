async function loadProducts(filter = 'all') {
    if (!window.supabase) {
        return setTimeout(() => loadProducts(filter), 100);
    }

    try {
        // Consulta base
        let query = supabase
            .from('services')
            .select('*')
            .order('created_at', { ascending: false });
        
        // Aplicar filtro si es necesario
        if (filter !== 'all') {
            query = query.eq('platform', filter);
        }
        
        // Solo servicios activos
        query = query.eq('is_active', true);
        
        const { data: products, error } = await query;
        
        if (error) throw error;
        
        renderProducts(products || []);
        
    } catch (error) {
        console.error('Error cargando productos:', error);
        showErrorToUser('Error al cargar productos. Intenta recargar la página.');
    }
}

function renderProducts(products) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <h4>No hay productos disponibles</h4>
                <p class="text-secondary">Pronto agregaremos nuevos servicios</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="col-md-4 col-lg-3">
            <div class="card card-product h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <span class="badge bg-dark text-white">${product.platform}</span>
                        <span class="badge badge-stock">${product.stock} disponibles</span>
                    </div>
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text text-secondary small">${product.description || 'Sin descripción'}</p>
                    <div class="d-flex justify-content-between align-items-center mt-4">
                        <span class="h5 mb-0">$${product.price.toFixed(2)}</span>
                        <button class="btn btn-sm btn-accent buy-btn" data-id="${product.id}">Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function showErrorToUser(message) {
    const container = document.getElementById('products-container');
    if (container) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">${message}</div>
            </div>
        `;
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});
