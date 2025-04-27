// js/registro.js

const registroForm = document.getElementById('registro-form');

registroForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const rol = document.getElementById('rol').value.trim();

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert('Error al registrar: ' + error.message);
    return;
  }

  if (data.user) {
    // Crear perfil
    await supabase.from('perfiles').insert([{
      id: data.user.id,
      nombre,
      rol
    }]);
    alert('Registro exitoso, ahora inicia sesión.');
    window.location.href = 'login.html';
  }
});
