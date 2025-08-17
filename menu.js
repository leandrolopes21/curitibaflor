document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
    });
});