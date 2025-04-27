// js/supabaseClient.js

const supabaseUrl = 'https://brzsayjqohyhpssfgqct.supabase.co'; // 👈 Reemplaza con tu URL de Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyenNheWpxb2h5aHBzc2ZncWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMTU5MzYsImV4cCI6MjA2MDU5MTkzNn0.4JNO1yeUcuSnJXOMN_bZRlugDQZFbkyqYgWyQYkUFF8'; // 👈 Reemplaza con tu anon key correcta

const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);
