// js/supabaseClient.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://brzsayjqohyhpssfgqct.supabase.co'  // Reemplaza si usas otro proyecto
const SUPABASE_KEY = 'public-anon-key-aquí' // ← Usa tu clave pública de Supabase (anon/public key)

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
