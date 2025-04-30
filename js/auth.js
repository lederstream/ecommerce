// js/auth.js
import { supabase } from './supabaseClient.js'

export async function checkAuthState() {
  const { data: { user } } = await supabase.auth.getUser()

  // Verifica si el usuario está logueado
  if (!user) {
    alert('Debes iniciar sesión para acceder a esta página.')
    window.location.href = 'login.html'
  }

  // Verifica si el correo es el tuyo o el de tu hermana
  const allowedEmails = ['yanamarco017@gmail.com', 'correohermana@gmail.com'] // <-- CAMBIA ESTO
  if (!allowedEmails.includes(user.email)) {
    alert('No tienes permiso para administrar productos.')
    await supabase.auth.signOut()
    window.location.href = 'login.html'
  }
}

export async function logout() {
  await supabase.auth.signOut()
  window.location.href = 'login.html'
}
