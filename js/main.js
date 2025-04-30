// Función para inicializar la aplicación
function initApp() {
    // Verificar que Supabase esté cargado
    if (!window.supabase) {
        console.error('Supabase no está disponible');
        return;
    }

    // Cargar partials
    loadPartials();
    
    // Inicializar componentes
    if (typeof checkAuthState === 'function') {
        checkAuthState();
    }
    
    // Inicializar productos si está en la página correcta
    if (document.getElementById('products-container')) {
        loadProducts();
    }
}

// Esperar a que todo esté listo
document.addEventListener('DOMContentLoaded', initApp);