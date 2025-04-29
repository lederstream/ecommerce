import supabase from './supabase.js';

// Cargar y mostrar productos
export async function loadProducts(filter = 'all') {
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
        productCard.className = `col-md-4 col-lg-3 product-card-animate`;
        productCard.style.animationDelay = `${index * 0.1}s`;
        
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
                        <button class="btn btn-sm btn-accent buy-btn" data-id="${product.id}">Comprar</button>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(productCard);
    });
    
    // Agregar event listeners a los botones de compra
    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const productId = e.target.getAttribute('data-id');
            await purchaseProduct(productId);
        });
    });
}

// Filtrar productos
export function setupFilterHandlers() {
    document.querySelectorAll('.filter-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = e.target.getAttribute('data-platform');
            loadProducts(platform);
        });
    });
}

// Comprar producto
async function purchaseProduct(productId) {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
        alert('Debes iniciar sesión para comprar');
        return;
    }
    
    const { data, error } = await supabase.rpc('purchase_service', {
        buyer_id: session.user.id,
        service_id: productId
    });
    
    if (error) {
        alert('Error al comprar: ' + error.message);
    } else {
        if (data.success) {
            alert('Compra exitosa! Credenciales: ' + data.credentials);
            loadProducts();
        } else {
            alert(data.message);
        }
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupFilterHandlers();
});