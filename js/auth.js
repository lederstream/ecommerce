function checkAuthState() {
    if (!window.supabase) {
        console.error('Supabase no está disponible en checkAuthState');
        return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
            console.log('Usuario autenticado:', session.user.email);
            // Actualizar UI según autenticación
        }
    }).catch(error => {
        console.error('Error verificando sesión:', error);
    });
}

function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = loginForm.querySelector('#login-email').value;
        const password = loginForm.querySelector('#login-password').value;
        
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            
            if (error) throw error;
            
            window.location.href = '/';
        } catch (error) {
            console.error('Error en login:', error.message);
            alert('Error: ' + error.message);
        }
    });
}

// Registrar funciones globalmente
window.checkAuthState = checkAuthState;
window.setupLoginForm = setupLoginForm;