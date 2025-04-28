// supabaseClient.js - Configuración limpia y segura del cliente Supabase

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://brzsayjqohyhpssfgqct.supabase.co';  // <--- Reemplaza esto
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyenNheWpxb2h5aHBzc2ZncWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMTU5MzYsImV4cCI6MjA2MDU5MTkzNn0.4JNO1yeUcuSnJXOMN_bZRlugDQZFbkyqYgWyQYkUFF8';                      // <--- Reemplaza esto

export const supabase = createClient(supabaseUrl, supabaseKey);
