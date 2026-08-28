/* ============================================================
   MAIN.JS — Lógica del portafolio de Alejandro Palacios
   Módulos:
     1. Navbar         → fondo al hacer scroll
     2. Menú móvil     → toggle hamburguesa
     3. Nav activo     → resalta link de sección visible
     4. Scroll Reveal  → anima elementos al entrar al viewport
     5. Filtro proyectos → muestra/oculta cards por categoría
     6. Formulario     → validación del lado del cliente
     7. Back to top    → botón de regreso al inicio
     8. Footer year    → año dinámico en el footer
     9. Memoria local  → recuerda la última posición y el borrador
                          del formulario para que no se pierdan al
                          cerrar la pestaña
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
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', toggleMenu);

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
   4. SCROLL REVEAL — Anima elementos con clase .reveal
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
   5. FILTRO DE PROYECTOS
============================================================ */
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            const matches = filter === 'all' || card.dataset.category === filter;

            card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            card.style.opacity    = '0';
            card.style.transform  = 'scale(0.95)';

            setTimeout(() => {
                card.style.display = matches ? '' : 'none';
                if (matches) {
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
   6. FORMULARIO DE CONTACTO — Validación del lado del cliente
   Envía a Web3Forms. Los errores se muestran bajo cada campo.
============================================================ */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formError   = document.getElementById('formError');

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(inputId, errorId, message) {
    document.getElementById(inputId).style.borderColor = '#b3392f';
    document.getElementById(errorId).textContent = message;
}

function clearError(inputId, errorId) {
    document.getElementById(inputId).style.borderColor = '';
    document.getElementById(errorId).textContent = '';
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    let isValid   = true;

    clearError('name',    'nameError');
    clearError('email',   'emailError');
    clearError('message', 'messageError');

    if (name.length < 2) {
        showError('name', 'nameError', 'Name must be at least 2 characters.');
        isValid = false;
    }
    if (!isValidEmail(email)) {
        showError('email', 'emailError', 'Please enter a valid email.');
        isValid = false;
    }
    if (message.length < 10) {
        showError('message', 'messageError', 'Message must be at least 10 characters.');
        isValid = false;
    }

    if (isValid) {
        const submitBtn = contactForm.querySelector('[type="submit"]');
        const btnSpan   = submitBtn.querySelector('span');

        submitBtn.disabled  = true;
        btnSpan.textContent = 'Sending...';

        fetch('https://api.web3forms.com/submit', {
            method:  'POST',
            body:    new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        })
        .then(res => {
            if (res.ok) {
                contactForm.reset();
                clearDraft(); // Ya se envió: el borrador guardado ya no sirve
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
            btnSpan.textContent = 'Send message';
        });
    }
});


/* ============================================================
   7. BACK TO TOP — Muestra el botón al bajar 400px
============================================================ */
const backToTop = document.getElementById('backToTop');

function handleBackToTop() {
    backToTop.classList.toggle('visible', window.scrollY > 400);
}

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ============================================================
   8. AÑO DINÁMICO EN EL FOOTER
============================================================ */
document.getElementById('year').textContent = new Date().getFullYear();


/* ============================================================
   9. LISTENER DE SCROLL UNIFICADO
============================================================ */
function handleScroll() {
    handleNavbarScroll();
    updateActiveNavLink();
    revealOnScroll();
    handleBackToTop();
}

window.addEventListener('scroll', handleScroll, { passive: true });


/* ============================================================
   9. MEMORIA LOCAL — Recuerda dónde estabas y lo que escribiste
   Todo vive en localStorage del navegador (nunca sale de tu equipo).

   a) Posición de scroll: se guarda cada vez que sales o escondes la
      pestaña, y se restaura (sin animación) al volver a cargar la
      página — cubre cerrar la pestaña, navegar al CV y volver, etc.
   b) Borrador del formulario de contacto: se guarda mientras escribes
      (con un pequeño debounce) y se restaura al volver. Se borra solo
      cuando el mensaje se envía con éxito.
============================================================ */
const SCROLL_KEY = 'portfolio_last_scroll';
const DRAFT_KEY  = 'portfolio_form_draft';

/* Envuelve localStorage por si está deshabilitado (modo privado, etc.) */
function safeStorage(fn) {
    try { return fn(); } catch (e) { return undefined; }
}

// --- Posición de scroll ---
function saveScrollPosition() {
    safeStorage(() => localStorage.setItem(SCROLL_KEY, String(window.scrollY)));
}

function restoreScrollPosition() {
    safeStorage(() => {
        const saved = localStorage.getItem(SCROLL_KEY);
        if (saved === null) return;
        const y = parseInt(saved, 10);
        if (!Number.isNaN(y) && y > 0) {
            window.scrollTo({ top: y, behavior: 'instant' });
        }
    });
}

// Se guarda al salir de la página o esconder la pestaña (cubre cierre,
// navegación y minimizado en móvil — no hay un único evento fiable
// en todos los navegadores, así que se usan los tres).
window.addEventListener('pagehide', saveScrollPosition);
window.addEventListener('beforeunload', saveScrollPosition);
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') saveScrollPosition();
});

// --- Borrador del formulario de contacto ---
const draftFieldIds = ['name', 'email', 'subject', 'message'];

function saveDraft() {
    safeStorage(() => {
        const draft = {};
        draftFieldIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) draft[id] = el.value;
        });
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    });
}

function restoreDraft() {
    safeStorage(() => {
        const saved = localStorage.getItem(DRAFT_KEY);
        if (!saved) return;
        const draft = JSON.parse(saved);
        draftFieldIds.forEach(id => {
            const el = document.getElementById(id);
            if (el && draft[id]) el.value = draft[id];
        });
    });
}

function clearDraft() {
    safeStorage(() => localStorage.removeItem(DRAFT_KEY));
}

// Guarda mientras se escribe, con un pequeño debounce para no saturar
// localStorage en cada tecla.
let draftSaveTimeout = null;
draftFieldIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
        clearTimeout(draftSaveTimeout);
        draftSaveTimeout = setTimeout(saveDraft, 400);
    });
});


/* ============================================================
   INICIALIZACIÓN — Se ejecuta al cargar la página
============================================================ */
(function init() {
    restoreScrollPosition();
    restoreDraft();
    handleNavbarScroll();
    revealOnScroll();
    handleBackToTop();
})();
