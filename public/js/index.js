function toggleMenu(header) {
      const content = header.nextElementSibling;
      const isOpen = content.classList.contains('open');

      // Cerrar todos
      document.querySelectorAll('.menu-content').forEach(menu => menu.classList.remove('open'));
      document.querySelectorAll('.section-header').forEach(h => {
        h.classList.remove('active');
        h.querySelector('.arrow')?.classList.replace('fa-chevron-up', 'fa-chevron-down');
      });

      // Abrir si no estaba
      if (!isOpen) {
        content.classList.add('open');
        header.classList.add('active');
        header.querySelector('.arrow')?.classList.replace('fa-chevron-down', 'fa-chevron-up');
      }
    }

    
    // Inicializar menú Clientes abierto
    document.addEventListener("DOMContentLoaded", () => {
      const clientes = document.querySelectorAll('.section-header')[1];
      if (clientes) {
        clientes.classList.add('active');
        clientes.nextElementSibling.classList.add('open');
        clientes.querySelector('.arrow').classList.replace('fa-chevron-down', 'fa-chevron-up');
      }
    });