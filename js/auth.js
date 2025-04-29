// Verificar estado de autenticación
function checkAuthState() {
    supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
            // Redirigir según rol
            supabase.from('users').select('role').eq('id', session.user.id).single()
                .then(({ data: userData }) => {
                    if (userData) {
                        window.location.href = '/';
                    }
                });
        }
    });
}

// Manejar login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    
    if (error) {
        document.getElementById('login-message').innerHTML = `
            <div class="alert alert-danger">${error.message}</div>
        `;
    } else {
        checkAuthState();
    }
});

// Manejar registro
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (password !== confirmPassword) {
        document.getElementById('register-message').innerHTML = `
            <div class="alert alert-danger">Las contraseñas no coinciden</div>
        `;
        return;
    }
    
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });
    
    if (error) {
        document.getElementById('register-message').innerHTML = `
            <div class="alert alert-danger">${error.message}</div>
        `;
    } else {
        document.getElementById('register-message').innerHTML = `
            <div class="alert alert-success">Registro exitoso. Por favor espera aprobación.</div>
        `;
    }
});

// Inicializar
document.addEventListener('DOMContentLoaded', checkAuthState);