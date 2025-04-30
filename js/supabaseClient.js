// js/supabaseClient.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://nvpmosrzmegcjoackltw.supabase.co'  // Reemplaza si usas otro proyecto
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52cG1vc3J6bWVnY2pvYWNrbHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NjU0NTcsImV4cCI6MjA2MTU0MTQ1N30.SUtjtmJ96r6zQm-GAJHNy6jj5lbu56DiPvVfZk9ffbI' // ← Usa tu clave pública de Supabase (anon/public key)

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
