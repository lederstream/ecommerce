// Configuración de Supabase
const supabaseUrl = 'TU_URL_SUPABASE';
const supabaseKey = 'TU_KEY_SUPABASE';

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Exportar para usar en otros archivos
export { supabase };