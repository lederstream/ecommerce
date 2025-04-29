// Función para cargar productos
async function loadProducts() {
    // Verificar que supabase esté definido
    if (typeof supabase === 'undefined') {
        console.error('Supabase no está definido');
        return;
    }

    try {
        const { data: products, error } = await supabase
            .from('services')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        
        const container = document.getElementById('products-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        products.forEach(product => {
            const productCard = `
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
                                <button class="btn btn-sm btn-accent">Comprar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += productCard;
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Esperar un momento para asegurar que supabase esté cargado
    setTimeout(loadProducts, 100);
});