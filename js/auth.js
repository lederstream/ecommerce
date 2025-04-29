// Verificar estado de autenticación
function checkAuthState() {
    // Verificar que supabase esté definido
    if (typeof supabase === 'undefined') {
        console.error('Supabase no está definido');
        return;
    }
    
    supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
            console.log('Usuario autenticado:', session.user.email);
            // Redirigir o actualizar UI según sea necesario
        } else {
            console.log('No hay sesión activa');
        }
    }).catch(error => {
        console.error('Error al verificar sesión:', error);
    });
}

// Manejar login
function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });
                
                if (error) throw error;
                
                alert('Inicio de sesión exitoso!');
                window.location.href = '/';
            } catch (error) {
                console.error('Error al iniciar sesión:', error.message);
                alert('Error: ' + error.message);
            }
        });
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Esperar un momento para asegurar que supabase esté cargado
    setTimeout(() => {
        checkAuthState();
        setupLoginForm();
    }, 100);
});