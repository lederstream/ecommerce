// Verificar autenticación en páginas de admin
async function checkAuth() {
    const supabaseUrl = 'https://nvpmosrzmegcjoackltw.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52cG1vc3J6bWVnY2pvYWNrbHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NjU0NTcsImV4cCI6MjA2MTU0MTQ1N30.SUtjtmJ96r6zQm-GAJHNy6jj5lbu56DiPvVfZk9ffbI';
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);
    
    // Verificar si estamos en una página de admin
    if (!window.location.pathname.includes('/admin/')) return;
    
    // Verificar sesión
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
        // Redirigir a login si no está autenticado
        if (!window.location.pathname.endsWith('login.html')) {
            window.location.href = 'login.html';
        }
        return;
    }
    
    // Verificar si el usuario es admin
    const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();
    
    if (userError || !userData?.is_admin) {
        // Redirigir a login si no es admin
        await supabase.auth.signOut();
        window.location.href = 'login.html';
    }
    
    // Si estamos en la página de login y ya está autenticado, redirigir al dashboard
    if (window.location.pathname.endsWith('login.html')) {
        window.location.href = 'index.html';
    }
}

// Inicializar verificación de autenticación
document.addEventListener('DOMContentLoaded', checkAuth);