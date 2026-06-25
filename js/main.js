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
   Lee los roles desde window.translations[window.currentLang]
   para respetar el idioma activo en todo momento.
   Expone window.restartTypewriter para que i18n.js lo llame
   cuando el usuario cambia de idioma.
============================================================ */
const dynamicRole = document.getElementById('dynamicRole');

let roleIndex      = 0;
let charIndex      = 0;
let isDeleting     = false;
let typewriterTimeout = null; // Referencia al setTimeout activo

/* Devuelve el array de roles del idioma activo */
function getRoles() {
    const lang = window.currentLang || 'en';
    return (window.translations && window.translations[lang])
        ? window.translations[lang].hero_roles
        : ['Developer', 'Frontend Developer', 'Problem Solver', 'Tech Enthusiast'];
}

function typeWriter() {
    const roles       = getRoles();
    const currentRole = roles[roleIndex % roles.length];

    if (isDeleting) {
        dynamicRole.textContent = currentRole.slice(0, charIndex - 1);
        charIndex--;
    } else {
        dynamicRole.textContent = currentRole.slice(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        delay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex  = (roleIndex + 1) % roles.length;
        delay = 400;
    }

    typewriterTimeout = setTimeout(typeWriter, delay);
}

/* Reinicia el typewriter desde cero — llamado por i18n.js al cambiar idioma */
window.restartTypewriter = function () {
    if (typewriterTimeout) clearTimeout(typewriterTimeout);
    dynamicRole.textContent = '';
    roleIndex  = 0;
    charIndex  = 0;
    isDeleting = false;
    typewriterTimeout = setTimeout(typeWriter, 400);
};


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
const formError   = document.getElementById('formError');

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

    // Lee los mensajes de error en el idioma activo
    const t   = (window.translations && window.translations[window.currentLang]) || {};
    const err = {
        name:    t.error_name    || 'Name must be at least 2 characters.',
        email:   t.error_email   || 'Please enter a valid email.',
        message: t.error_message || 'Message must be at least 10 characters.',
    };

    // Validaciones
    if (name.length < 2) {
        showError('name', 'nameError', err.name);
        isValid = false;
    }
    if (!isValidEmail(email)) {
        showError('email', 'emailError', err.email);
        isValid = false;
    }
    if (message.length < 10) {
        showError('message', 'messageError', err.message);
        isValid = false;
    }

    if (isValid) {
        const submitBtn = contactForm.querySelector('[type="submit"]');
        const btnSpan   = submitBtn.querySelector('span');
        const t2 = (window.translations && window.translations[window.currentLang]) || {};

        submitBtn.disabled  = true;
        btnSpan.textContent = t2.contact_sending || 'Sending...';

        fetch('https://formspree.io/f/REPLACE_WITH_YOUR_ID', {
            method:  'POST',
            body:    new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        })
        .then(res => {
            if (res.ok) {
                contactForm.reset();
                formSuccess.hidden = false;
                formError.hidden   = true;
                setTimeout(() => { formSuccess.hidden = true; }, 5000);
            } else {
                formError.hidden   = false;
                formSuccess.hidden = true;
            }
        })
        .catch(() => {
            formError.hidden   = false;
            formSuccess.hidden = true;
        })
        .finally(() => {
            submitBtn.disabled  = false;
            btnSpan.textContent = t2.contact_submit || 'Send message';
        });
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
   11. SCROLL MEMORY — Guarda y restaura la posición de scroll
   Al hacer click en el botón del CV se guarda window.scrollY
   en localStorage. Al volver a index.html se restaura y se borra
   la clave para que no afecte recargas normales.
============================================================ */
const cvBtn = document.querySelector('[data-i18n-href="cv_url"]');

if (cvBtn) {
    // Guarda el scroll justo antes de navegar al CV
    cvBtn.addEventListener('click', () => {
        localStorage.setItem('portfolio_scroll', window.scrollY);
    });
}

function restoreScroll() {
    const saved = localStorage.getItem('portfolio_scroll');
    if (saved === null) return;

    // Borra la clave antes de scrollear para que solo se aplique una vez
    localStorage.removeItem('portfolio_scroll');

    // 'instant' evita la animación suave al restaurar (se vería raro)
    window.scrollTo({ top: parseInt(saved, 10), behavior: 'instant' });
}


/* ============================================================
   INICIALIZACIÓN — Se ejecuta al cargar la página
============================================================ */
(function init() {
    // Restaura posición de scroll si venimos del CV
    restoreScroll();

    // Ejecuta el estado inicial de scroll (navbar, reveal, back-to-top)
    handleNavbarScroll();
    revealOnScroll();
    handleBackToTop();

    // Inicia el efecto typewriter con un pequeño delay inicial
    // (i18n.js puede llamar window.restartTypewriter si carga antes)
    if (!dynamicRole.textContent) {
        typewriterTimeout = setTimeout(typeWriter, 800);
    }
})();
