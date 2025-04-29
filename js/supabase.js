// Configuración de Supabase - Versión corregida
const supabaseUrl = 'https://brzsayjqohyhpssfgqct.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyenNheWpxb2h5aHBzc2ZncWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMTU5MzYsImV4cCI6MjA2MDU5MTkzNn0.4JNO1yeUcuSnJXOMN_bZRlugDQZFbkyqYgWyQYkUFF8';

// Crear cliente Supabase global
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Hacer disponible globalmente (solución temporal)
window.supabase = supabase;