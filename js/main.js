// Animaciones al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    // Activar animaciones cuando los elementos son visibles
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('[class*="animate__"]');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                const animationClass = Array.from(element.classList).find(cls => cls.startsWith('animate__'));
                if (animationClass && !element.classList.contains('animate__animated')) {
                    element.classList.add('animate__animated', animationClass);
                }
            }
        });
    };
    
    // Ejecutar al cargar y al hacer scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Manejar el formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí podrías agregar el código para enviar el formulario
            // Por ejemplo, usando Supabase o Fetch API
            
            // Mostrar mensaje de éxito
            const successAlert = `
                <div class="alert alert-success alert-dismissible fade show mt-3">
                    Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
            
            contactForm.insertAdjacentHTML('afterend', successAlert);
            contactForm.reset();
            
            // Desplazarse al mensaje de éxito
            setTimeout(() => {
                document.querySelector('.alert').scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });
    }
    
    // Inicializar tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Inicializar popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});