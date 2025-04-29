// Importar supabase correctamente
const { supabase } = window;

async function loadProducts(filter = 'all') {
    let query = supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
        
    if (filter !== 'all') {
        query = query.eq('platform', filter);
    }
    
    const { data: products, error } = await query;
    
    if (error) {
        console.error('Error loading products:', error);
        return;
    }
    
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = `col-md-4 col-lg-3`;
        
        productCard.innerHTML = `
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
        `;
        
        container.appendChild(productCard);
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});