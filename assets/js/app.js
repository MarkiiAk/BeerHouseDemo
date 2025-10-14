/**
 * BeerHouse - Bar & Terraza Tropical
 * Funcionalidades principales
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar todas las funcionalidades
  initNavigation();
  initScrollAnimations();
  initProgressBar();
  initRailNavigation();
  initRevealAnimations();
  initFloatingButtons();
});

/**
 * Navegación y menú móvil
 */
function initNavigation() {
  const burger = document.querySelector('.burger');
  const menuOverlay = document.querySelector('.menu-overlay');
  const overlayLinks = document.querySelectorAll('.overlay-list a, .overlay-meta a');
  
  // Toggle menú móvil
  if (burger) {
    burger.addEventListener('click', () => {
      const isExpanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', !isExpanded);
      
      // Animar las líneas del botón hamburguesa
      const spans = burger.querySelectorAll('span');
      spans.forEach((span, index) => {
        if (!isExpanded) {
          if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
          if (index === 1) span.style.opacity = '0';
          if (index === 2) span.style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          span.style.transform = 'none';
          span.style.opacity = '1';
        }
      });
      
      // Mostrar/ocultar overlay
      if (menuOverlay) {
        menuOverlay.style.opacity = isExpanded ? '0' : '1';
        menuOverlay.style.visibility = isExpanded ? 'hidden' : 'visible';
        menuOverlay.setAttribute('aria-hidden', isExpanded);
      }
    });
  }
  
  // Cerrar menú al hacer clic en un enlace
  if (overlayLinks.length) {
    overlayLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (burger && menuOverlay) {
          burger.setAttribute('aria-expanded', 'false');
          
          const spans = burger.querySelectorAll('span');
          spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
          });
          
          menuOverlay.style.opacity = '0';
          menuOverlay.style.visibility = 'hidden';
          menuOverlay.setAttribute('aria-hidden', 'true');
        }
      });
    });
  }
  
  // Scroll suave para enlaces de navegación
  const navLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Animaciones al hacer scroll
 */
function initScrollAnimations() {
  // Cambiar header al hacer scroll
  const header = document.querySelector('.hdr');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Añadir sombra y fondo más opaco al hacer scroll
    if (scrollTop > 50) {
      header.style.boxShadow = 'var(--shadow-lg)';
      header.style.backgroundColor = 'rgba(30, 39, 46, 0.95)';
    } else {
      header.style.boxShadow = 'var(--shadow-md)';
      header.style.backgroundColor = 'rgba(30, 39, 46, 0.9)';
    }
    
    lastScrollTop = scrollTop;
  });
}

/**
 * Barra de progreso de scroll
 */
function initProgressBar() {
  const progressBar = document.querySelector('.progress span');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    
    if (progressBar) {
      progressBar.style.width = `${scrollPercentage}%`;
    }
  });
}

/**
 * Navegación del carril horizontal
 */
function initRailNavigation() {
  const rail = document.querySelector('.rail');
  const prevBtn = document.querySelector('.rail-prev');
  const nextBtn = document.querySelector('.rail-next');
  
  if (rail && prevBtn && nextBtn) {
    // Botón anterior
    prevBtn.addEventListener('click', () => {
      rail.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    });
    
    // Botón siguiente
    nextBtn.addEventListener('click', () => {
      rail.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    });
    
    // Navegación con teclado
    rail.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        rail.scrollBy({
          left: -300,
          behavior: 'smooth'
        });
      } else if (e.key === 'ArrowRight') {
        rail.scrollBy({
          left: 300,
          behavior: 'smooth'
        });
      }
    });
  }
}

/**
 * Animaciones de aparición al hacer scroll
 */
function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  };
  
  // Ejecutar al cargar la página
  revealOnScroll();
  
  // Ejecutar al hacer scroll
  window.addEventListener('scroll', revealOnScroll);
}

/**
 * Botones flotantes (volver arriba y WhatsApp)
 */
function initFloatingButtons() {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  // Mostrar/ocultar botón de volver arriba según la posición de scroll
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (backToTopBtn) {
      if (scrollTop > 600) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });
  
  // Funcionalidad de volver arriba al hacer clic
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}
