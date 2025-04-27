// theme.js
document.addEventListener('DOMContentLoaded', function() {
  const botonDarkmode = document.getElementById('boton-darkmode');
  if (botonDarkmode) {
    botonDarkmode.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  }
});
