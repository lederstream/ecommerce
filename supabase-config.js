// Configuración de Supabase
const supabaseUrl = 'https://nvpmosrzmegcjoackltw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52cG1vc3J6bWVnY2pvYWNrbHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NjU0NTcsImV4cCI6MjA2MTU0MTQ1N30.SUtjtmJ96r6zQm-GAJHNy6jj5lbu56DiPvVfZk9ffbI';

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Exportar para usar en otros archivos
export { supabase };
