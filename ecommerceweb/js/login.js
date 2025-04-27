// js/login.js

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert('Error al iniciar sesión: ' + error.message);
    return;
  }

  const user = data.user;
  if (user) {
    // Redirigir según rol
    const { data: perfil } = await supabase
      .from('perfiles')
      .select('rol')
      .eq('id', user.id)
      .single();

    if (perfil?.rol === 'proveedor') {
      window.location.href = 'panel.html';
    } else {
      window.location.href = 'index.html';
    }
  }
});
