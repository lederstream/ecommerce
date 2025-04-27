document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
  
    if (currentTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  
    toggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-theme');
      if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        localStorage.setItem('theme', 'light');
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
    });
  });
  