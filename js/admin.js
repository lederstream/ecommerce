import { supabase } from '../supabase-config.js';

document.addEventListener('DOMContentLoaded', function() {
    // Verificar sesión
    checkSession();
    
    // Cargar contenido
    loadContent();
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', async function() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert(error.message);
        } else {
            window.location.href = '../index.html';
        }
    });
    
    // Formulario de contenido
    document.getElementById('contentForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const contentData = Object.fromEntries(formData.entries());
        
        try {
            if (contentData.id) {
                // Actualizar contenido existente
                const { data, error } = await supabase
                    .from('contents')
                    .update(contentData)
                    .eq('id', contentData.id);
                    
                if (error) throw error;
                alert('Contenido actualizado correctamente');
            } else {
                // Crear nuevo contenido
                const { data, error } = await supabase
                    .from('contents')
                    .insert([contentData]);
                    
                if (error) throw error;
                alert('Contenido creado correctamente');
            }
            
            bootstrap.Modal.getInstance(document.getElementById('addContentModal')).hide();
            loadContent();
            this.reset();
        } catch (error) {
            alert(error.message);
        }
    });
});

async function checkSession() {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
        window.location.href = '../index.html';
    }
}

async function loadContent() {
    try {
        const { data, error } = await supabase
            .from('contents')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        
        const tableBody = document.querySelector('#contentTable tbody');
        tableBody.innerHTML = '';
        
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.title}</td>
                <td><span class="badge ${item.type === 'movie' ? 'bg-danger' : 'bg-primary'}">${item.type === 'movie' ? 'Película' : 'Serie'}</span></td>
                <td>${item.genre}</td>
                <td>${new Date(item.created_at).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${item.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
        
        // Agregar eventos a los botones
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => editContent(btn.dataset.id));
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteContent(btn.dataset.id));
        });
    } catch (error) {
        alert(error.message);
    }
}

async function editContent(id) {
    try {
        const { data, error } = await supabase
            .from('contents')
            .select('*')
            .eq('id', id)
            .single();
            
        if (error) throw error;
        
        const form = document.getElementById('contentForm');
        form.elements['id'].value = data.id;
        form.elements['title'].value = data.title;
        form.elements['type'].value = data.type;
        form.elements['genre'].value = data.genre;
        form.elements['video_url'].value = data.video_url;
        form.elements['image_url'].value = data.image_url;
        form.elements['description'].value = data.description;
        form.elements['featured'].checked = data.featured;
        
        const modal = new bootstrap.Modal(document.getElementById('addContentModal'));
        modal.show();
    } catch (error) {
        alert(error.message);
    }
}

async function deleteContent(id) {
    if (!confirm('¿Estás seguro de eliminar este contenido?')) return;
    
    try {
        const { error } = await supabase
            .from('contents')
            .delete()
            .eq('id', id);
            
        if (error) throw error;
        
        alert('Contenido eliminado correctamente');
        loadContent();
    } catch (error) {
        alert(error.message);
    }
}