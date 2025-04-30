async function loadPartials() {
    try {
        const headerPath = 'partials/header.html';
        const footerPath = 'partials/footer.html';
        const productFormPath = 'partials/add-product-form.html';
        
        const [headerRes, footerRes, productFormRes] = await Promise.all([
            fetch(headerPath),
            fetch(footerPath),
            fetch(productFormPath)
        ]);
        
        if (!headerRes.ok || !footerRes.ok || !productFormRes.ok) {
            throw new Error('Error al cargar partials');
        }
        
        const headerHTML = await headerRes.text();
        const footerHTML = await footerRes.text();
        const productFormHTML = await productFormRes.text();
        
        document.getElementById('header-container').innerHTML = headerHTML;
        document.getElementById('footer-container').innerHTML = footerHTML;
        document.getElementById('product-form-container').innerHTML = productFormHTML;
        
    } catch (error) {
        console.error('Error cargando partials:', error);
    }
}