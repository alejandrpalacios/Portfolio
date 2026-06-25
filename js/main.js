/* ============================================================
   MAIN.JS — Lógica del portafolio de Alejandro Palacios
   Módulos:
     1. Navbar         → fondo al hacer scroll
     2. Menú móvil     → toggle hamburguesa
     3. Nav activo     → resalta link de sección visible
     4. Typewriter     → efecto de escritura en el hero
     5. Scroll Reveal  → anima elementos al entrar al viewport
     6. Filtro proyectos → muestra/oculta cards por categoría
     7. Formulario     → validación del lado del cliente
     8. Back to top    → botón de regreso al inicio
     9. Footer year    → año dinámico en el footer
    10. Init           → arranque y agrupación de listeners
============================================================ */


/* ============================================================
   1. NAVBAR — Agrega fondo semiopaco al hacer scroll
============================================================ */
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}


/* ============================================================
   2. MENÚ MÓVIL — Abre y cierra el menú hamburguesa
============================================================ */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

function toggleMenu() {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    // Bloquea el scroll del body mientras el menú está abierto
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', toggleMenu);

// Cierra el menú al tocar cualquier link de navegación
navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
});


/* ============================================================
   3. NAV ACTIVO — Resalta el link de la sección en pantalla
============================================================ */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const top    = section.offsetTop - 100;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');
        const link   = document.querySelector(`.nav-link[href="#${id}"]`);

        if (link && scrollY >= top && scrollY < top + height) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
}


/* ============================================================
   4. TYPEWRITER — Efecto de escritura/borrado en el hero
   Cicla por el array 'roles' escribiendo y borrando cada texto.
============================================================ */
const dynamicRole = document.getElementById('dynamicRole');

// Edita este array con tus roles o títulos reales
const roles = [
    'Developer',
    'Frontend Developer',
    'Problem Solver',
    'Tech Enthusiast',
];

let roleIndex  = 0;     // Índice del rol actual en el array
let charIndex  = 0;     // Posición del carácter actual
let isDeleting = false; // true cuando está borrando, false cuando escribe

function typeWriter() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        // Borrando: reduce un carácter
        dynamicRole.textContent = currentRole.slice(0, charIndex - 1);
        charIndex--;
    } else {
        // Escribiendo: agrega un carácter
        dynamicRole.textContent = currentRole.slice(0, charIndex + 1);
        charIndex++;
    }

    // Velocidades distintas para escribir (más lento) y borrar (más rápido)
    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        // Terminó de escribir → pausa antes de empezar a borrar
        delay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Terminó de borrar → pasa al siguiente rol
        isDeleting = false;
        roleIndex  = (roleIndex + 1) % roles.length;
        delay = 400;
    }

    setTimeout(typeWriter, delay);
}


/* ============================================================
   5. SCROLL REVEAL — Anima elementos con clase .reveal
   Agrega .visible cuando el elemento entra al 90% del viewport.
============================================================ */
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const triggerPoint = window.innerHeight * 0.9;

    revealElements.forEach(el => {
        if (el.getBoundingClientRect().top < triggerPoint) {
            el.classList.add('visible');
        }
    });
}


/* ============================================================
   6. FILTRO DE PROYECTOS
   Al hacer click en un botón de filtro, muestra solo las cards
   cuyo data-category coincide (o 'all' para mostrar todas).
============================================================ */
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Marca el botón activo
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            const matches = filter === 'all' || card.dataset.category === filter;

            // Primero desvanece la card, luego muestra/oculta
            card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            card.style.opacity    = '0';
            card.style.transform  = 'scale(0.95)';

            setTimeout(() => {
                card.style.display = matches ? '' : 'none';
                if (matches) {
                    // Un frame de retraso para que la transición se aplique
                    requestAnimationFrame(() => {
                        card.style.opacity   = '1';
                        card.style.transform = 'scale(1)';
                    });
                }
            }, 250);
        });
    });
});


/* ============================================================
   7. FORMULARIO DE CONTACTO — Validación del lado del cliente
   Los errores se muestran bajo cada campo inválido.
   TODO: conectar con EmailJS, Formspree u otro servicio de email.
============================================================ */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

/* Valida formato básico de email con regex */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* Marca un input como inválido y muestra el mensaje de error */
function showError(inputId, errorId, message) {
    document.getElementById(inputId).style.borderColor = '#ff6b6b';
    document.getElementById(errorId).textContent = message;
}

/* Limpia el estado de error de un input */
function clearError(inputId, errorId) {
    document.getElementById(inputId).style.borderColor = '';
    document.getElementById(errorId).textContent = '';
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita recarga de página

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    let isValid   = true;

    // Limpia errores anteriores
    clearError('name',    'nameError');
    clearError('email',   'emailError');
    clearError('message', 'messageError');

    // Validaciones
    if (name.length < 2) {
        showError('name', 'nameError', 'El nombre debe tener al menos 2 caracteres.');
        isValid = false;
    }
    if (!isValidEmail(email)) {
        showError('email', 'emailError', 'Ingresa un email válido.');
        isValid = false;
    }
    if (message.length < 10) {
        showError('message', 'messageError', 'El mensaje debe tener al menos 10 caracteres.');
        isValid = false;
    }

    if (isValid) {
        // Aquí se conectaría con el servicio de email real
        contactForm.reset();
        formSuccess.hidden = false;
        // Oculta el mensaje de éxito tras 5 segundos
        setTimeout(() => { formSuccess.hidden = true; }, 5000);
    }
});


/* ============================================================
   8. BACK TO TOP — Muestra el botón al bajar 400px
============================================================ */
const backToTop = document.getElementById('backToTop');

function handleBackToTop() {
    backToTop.classList.toggle('visible', window.scrollY > 400);
}

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ============================================================
   9. AÑO DINÁMICO EN EL FOOTER
   Evita tener que actualizar el año manualmente cada año.
============================================================ */
document.getElementById('year').textContent = new Date().getFullYear();


/* ============================================================
   10. LISTENER DE SCROLL UNIFICADO
   Agrupa todas las funciones que dependen del scroll en un solo
   listener para minimizar el número de callbacks registrados.
============================================================ */
function handleScroll() {
    handleNavbarScroll();
    updateActiveNavLink();
    revealOnScroll();
    handleBackToTop();
}

// { passive: true } mejora el rendimiento del scroll en móvil
window.addEventListener('scroll', handleScroll, { passive: true });


/* ============================================================
   INICIALIZACIÓN — Se ejecuta al cargar la página
============================================================ */
(function init() {
    // Ejecuta el estado inicial de scroll (por si la página carga a la mitad)
    handleNavbarScroll();
    revealOnScroll();
    handleBackToTop();

    // Inicia el efecto typewriter con un pequeño delay inicial
    setTimeout(typeWriter, 800);
})();
