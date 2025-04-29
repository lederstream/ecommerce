// Función para verificar estado de autenticación
function checkAuthState() {
    supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
            // Usuario logueado
            document.getElementById('login-btn').style.display = 'none';
            document.getElementById('profile-btn').style.display = 'block';
        } else {
            // Usuario no logueado
            document.getElementById('login-btn').style.display = 'block';
            document.getElementById('profile-btn').style.display = 'none';
        }
    });
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
    checkAuthState();
    
    // Configurar formulario de login si existe
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            
            if (error) {
                alert('Error al iniciar sesión: ' + error.message);
            } else {
                alert('Bienvenido!');
                window.location.href = '/';
            }
        });
    }
});

// Hacer disponible globalmente
window.checkAuthState = checkAuthState;