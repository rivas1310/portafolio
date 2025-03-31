'use strict';

/**
 * Añadir eventos a múltiples elementos de forma optimizada
 */
const addEventOnElements = function (elements, eventType, callback) {
  Array.from(elements).forEach(element => {
    element.addEventListener(eventType, callback);
  });
}

/**
 * NAVBAR TOGGLE PARA MÓVILES
 * Implementación mejorada con animaciones suaves
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
  
  // Añadir animación a los elementos del menú
  const navItems = navbar.querySelectorAll('.navbar-link');
  if (navbar.classList.contains("active")) {
    navItems.forEach((item, index) => {
      item.style.animation = `slideIn 0.3s ease forwards ${index * 0.1}s`;
    });
  } else {
    navItems.forEach(item => {
      item.style.animation = '';
    });
  }
}

addEventOnElements(navTogglers, "click", toggleNavbar);

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.navbar-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 992) {
      toggleNavbar();
    }
  });
});

/**
 * HEADER
 * Activar header con efecto de fundido cuando la ventana se desplaza
 */
const header = document.querySelector("[data-header]");
let lastScrollPosition = 0;

window.addEventListener("scroll", function () {
  const currentScrollPosition = window.scrollY;
  
  // Efecto de aparición/desaparición según dirección del scroll
  if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 150) {
    // Scrolling down - hide header
    header.classList.add("hide");
    header.classList.remove("active");
  } else {
    // Scrolling up - show header
    header.classList.remove("hide");
    if (currentScrollPosition > 100) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  }
  
  lastScrollPosition = currentScrollPosition;
});

/**
 * SCROLL REVEAL
 * Mejora con detección de visibilidad y diferentes tipos de animaciones
 */
const revealElements = document.querySelectorAll("[data-reveal]");
const revealDelayElements = document.querySelectorAll("[data-reveal-delay]");

const reveal = function () {
  revealElements.forEach(element => {
    // Usar IntersectionObserver para mejor rendimiento
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("revealed");
    } else {
      // Opcional: desactivar animación al salir del viewport
      // element.classList.remove("revealed");
    }
  });
}

// Aplicar delays a elementos que lo necesiten
revealDelayElements.forEach(element => {
  element.style.transitionDelay = element.dataset.revealDelay;
});

// Agregar un efecto de paralaje suave en secciones
const parallaxElements = document.querySelectorAll("[data-parallax]");
window.addEventListener("scroll", function() {
  parallaxElements.forEach(element => {
    const speed = element.dataset.parallax || 0.1;
    const offset = window.scrollY * speed;
    element.style.transform = `translateY(${offset}px)`;
  });
});

// Escuchar eventos de scroll y carga
window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

/**
 * Modo oscuro (Dark mode)
 */
const themeToggle = document.querySelector('[data-theme-toggle]');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
  });
  
  // Comprobar preferencia guardada
  if (localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark-theme');
  }
}

/**
 * Mejora para el formulario de contacto
 */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Aquí podrías implementar la lógica para enviar el formulario
    const formData = new FormData(this);
    const submitButton = this.querySelector('button[type="submit"]');
    
    // Cambiar texto del botón durante el envío
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simulación de envío (reemplazar con tu lógica real)
    setTimeout(() => {
      submitButton.textContent = '¡Enviado!';
      this.reset();
      
      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 2000);
    }, 1500);
  });
}