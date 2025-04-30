import { supabase } from './supabase-config.js';

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const { user, error } = await supabase.auth.signIn({
            email,
            password
        });
        
        if (error) throw error;
        
        alert('Inicio de sesión exitoso');
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        // Redirigir o actualizar UI
    } catch (error) {
        alert(error.message);
    }
});

document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirm = document.getElementById('registerConfirm').value;
    
    if (password !== confirm) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    try {
        const { user, error } = await supabase.auth.signUp({
            email,
            password
        });
        
        if (error) throw error;
        
        // Guardar nombre en tabla de perfiles
        const { data, error: profileError } = await supabase
            .from('profiles')
            .insert([
                { id: user.id, name, email }
            ]);
            
        if (profileError) throw profileError;
        
        alert('Registro exitoso. Por favor verifica tu correo.');
        bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
    } catch (error) {
        alert(error.message);
    }
});