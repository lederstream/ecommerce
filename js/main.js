document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Modal togglers
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));

    loginBtn.addEventListener('click', () => loginModal.show());
    registerBtn.addEventListener('click', () => registerModal.show());
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.hide();
        registerModal.show();
    });
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.hide();
        loginModal.show();
    });

    // Load content from Supabase
    loadFeaturedContent();
    loadMovies();
    loadSeries();

    // Video modal
    const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('play-btn') || e.target.closest('.play-btn')) {
            const videoId = e.target.closest('.content-card').getAttribute('data-video-id');
            document.getElementById('videoPlayer').src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            videoModal.show();
        }
    });

    // Close video when modal is hidden
    document.getElementById('videoModal').addEventListener('hidden.bs.modal', function() {
        document.getElementById('videoPlayer').src = '';
    });
});

async function loadFeaturedContent() {
    // This will be replaced with Supabase calls
    const featuredContainer = document.getElementById('featuredContent');
    
    // Mock data - replace with Supabase data
    const featuredData = [
        { id: 1, title: 'El Último Deseo', image: 'images/featured1.jpg', videoId: 'abc123', type: 'movie' },
        { id: 2, title: 'La Casa del Dragón', image: 'images/featured2.jpg', videoId: 'def456', type: 'series' },
        { id: 3, title: 'Avatar 2', image: 'images/featured3.jpg', videoId: 'ghi789', type: 'movie' },
        { id: 4, title: 'Stranger Things', image: 'images/featured4.jpg', videoId: 'jkl012', type: 'series' }
    ];

    featuredData.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col-md-3 col-6 mb-4';
        col.innerHTML = `
            <div class="content-card" data-video-id="${item.videoId}">
                <img src="${item.image}" alt="${item.title}" class="img-fluid">
                <div class="card-overlay">
                    <h5>${item.title}</h5>
                    <span class="badge ${item.type === 'movie' ? 'bg-danger' : 'bg-primary'}">${item.type === 'movie' ? 'Película' : 'Serie'}</span>
                </div>
                <div class="play-btn">
                    <i class="fas fa-play"></i>
                </div>
            </div>
        `;
        featuredContainer.appendChild(col);
    });
}

async function loadMovies() {
    // Similar to loadFeaturedContent but for movies
    // Will be implemented with Supabase
}

async function loadSeries() {
    // Similar to loadFeaturedContent but for series
    // Will be implemented with Supabase
}