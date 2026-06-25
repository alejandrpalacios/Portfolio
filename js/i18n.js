/* ============================================================
   I18N.JS — Sistema de internacionalización del portafolio
   Idiomas disponibles: English (en) | Español (es) | Français (fr)

   Funcionamiento:
   - Cada elemento traducible en el HTML tiene data-i18n="clave"
   - applyLanguage(lang) recorre esos elementos y actualiza el texto
   - El idioma elegido se guarda en localStorage para persistir
   - Expone window.currentLang para que main.js lo pueda leer
============================================================ */


/* ============================================================
   OBJETO DE TRADUCCIONES
   Estructura plana (clave: valor) para fácil acceso.
   Agrega aquí cualquier nuevo texto que necesite traducción.
============================================================ */
const translations = {

    /* ── INGLÉS (idioma por defecto) ── */
    en: {
        // Navegación
        nav_about:    'About',
        nav_skills:   'Skills',
        nav_projects: 'Projects',
        nav_contact:  'Contact',

        // Hero
        hero_greeting:     "Hi, I'm",
        hero_role_static:  "I'm a ",
        hero_description:  'Passionate about creating modern, functional digital experiences with great design.',
        hero_cta_projects: 'View projects',
        hero_cta_contact:  'Contact me',
        // Array de roles para el efecto typewriter
        hero_roles: ['Developer', 'Frontend Developer', 'Problem Solver', 'Tech Enthusiast'],

        // Sobre mí
        about_title_main:   'About',
        about_title_accent: 'me',
        about_subtitle:     'Get to know me',
        about_p1: 'I am a developer passionate about building modern, efficient web solutions. I focus on writing clean code, learning constantly, and collaborating on projects that create real impact.',
        about_p2: "When I'm not coding, I enjoy working out daily to maintain good mental health while working.",
        about_stat_projects: 'Projects',
        about_stat_years:    'Years exp.',
        about_stat_learning: 'Learning',
        about_cv:  'View CV',
        cv_url:    'cv-design-en.html',

        // Skills
        skills_title_main:   'My',
        skills_title_accent: 'Skills',
        skills_subtitle:  'Technologies I work with',
        skills_frontend:  'Frontend',
        skills_backend:   'Backend',
        skills_tools:     'Tools',

        // Proyectos
        projects_title_main:   'My',
        projects_title_accent: 'Projects',
        projects_subtitle: "Some work I've done",
        filter_all:     'All',
        filter_web:     'Web',
        filter_backend: 'Backend',
        project1_title: 'Landing Page',
        project1_desc:  'Modern landing page built with Astro. Modular components: Hero, Features, Pricing and Footer.',
        project2_title: 'Fashion Store',
        project2_desc:  'E-commerce fashion store with product catalog, new arrivals, newsletter and multilingual support.',
        project3_title: 'Admin Dashboard',
        project3_desc:  'Admin panel with KPI stats, monthly sales chart and recent orders management table.',
        project4_title: 'NidoHomes',
        project4_desc:  'Real estate platform with property listings, search, type filters and multilingual support.',

        // Contacto
        contact_title:    "Let's talk!",
        contact_subtitle: "I'm available for projects and opportunities",
        contact_email_label:        'Email',
        contact_location_label:     'Location',
        contact_location_value:     'Meudon, France',
        contact_avail_label:        'Availability',
        contact_avail_value:        'Available for projects',
        contact_form_name:    'Name',
        contact_form_email:   'Email',
        contact_form_subject: 'Subject',
        contact_form_message: 'Message',
        contact_ph_name:    'Your name',
        contact_ph_email:   'your@email.com',
        contact_ph_subject: 'How can I help you?',
        contact_ph_message: 'Tell me about your project...',
        contact_submit:   'Send message',
        contact_sending:  'Sending...',
        contact_success:  'Message sent successfully!',
        contact_error:    'Something went wrong. Please try again.',

        // Footer
        footer_made_by: 'Designed and developed by',
        footer_rights:  'All rights reserved',

        // Mensajes de error del formulario
        error_name:    'Name must be at least 2 characters.',
        error_email:   'Please enter a valid email.',
        error_message: 'Message must be at least 10 characters.',
    },


    /* ── ESPAÑOL ── */
    es: {
        nav_about:    'Sobre mí',
        nav_skills:   'Skills',
        nav_projects: 'Proyectos',
        nav_contact:  'Contacto',

        hero_greeting:     'Hola, soy',
        hero_role_static:  'Soy ',
        hero_description:  'Apasionado por crear experiencias digitales modernas, funcionales y con buen diseño.',
        hero_cta_projects: 'Ver proyectos',
        hero_cta_contact:  'Contactarme',
        hero_roles: ['Developer', 'Frontend Developer', 'Problem Solver', 'Tech Enthusiast'],

        about_title_main:   'Sobre',
        about_title_accent: 'mí',
        about_subtitle:     'Conóceme un poco más',
        about_p1: 'Soy un desarrollador con pasión por construir soluciones web modernas y eficientes. Me enfoco en escribir código limpio, aprender constantemente y colaborar en proyectos que generen impacto real.',
        about_p2: 'Cuando no estoy programando, disfruto hacer ejercicio diariamente para mantener una buena salud mental al momento de trabajar.',
        about_stat_projects: 'Proyectos',
        about_stat_years:    'Años exp.',
        about_stat_learning: 'Aprendizaje',
        about_cv:  'Ver CV',
        cv_url:    'cv-design-es.html',

        skills_title_main:   'Mis',
        skills_title_accent: 'Skills',
        skills_subtitle:  'Tecnologías con las que trabajo',
        skills_frontend:  'Frontend',
        skills_backend:   'Backend',
        skills_tools:     'Herramientas',

        projects_title_main:   'Mis',
        projects_title_accent: 'Proyectos',
        projects_subtitle: 'Algunos trabajos que he desarrollado',
        filter_all:     'Todos',
        filter_web:     'Web',
        filter_backend: 'Backend',
        project1_title: 'Landing Page',
        project1_desc:  'Landing page moderna construida con Astro. Componentes modulares: Hero, Features, Pricing y Footer.',
        project2_title: 'Fashion Store',
        project2_desc:  'E-commerce de moda con catálogo de productos, novedades, newsletter y soporte multilingüe.',
        project3_title: 'Admin Dashboard',
        project3_desc:  'Panel de administración con estadísticas KPI, gráfico de ventas mensuales y tabla de pedidos recientes.',
        project4_title: 'NidoHomes',
        project4_desc:  'Plataforma inmobiliaria con listado de propiedades, buscador, filtros por tipo y soporte multilingüe.',

        contact_title:    '¿Hablamos?',
        contact_subtitle: 'Estoy disponible para proyectos y oportunidades',
        contact_email_label:        'Email',
        contact_location_label:     'Ubicación',
        contact_location_value:     'Meudon, Francia',
        contact_avail_label:        'Disponibilidad',
        contact_avail_value:        'Disponible para proyectos',
        contact_form_name:    'Nombre',
        contact_form_email:   'Email',
        contact_form_subject: 'Asunto',
        contact_form_message: 'Mensaje',
        contact_ph_name:    'Tu nombre',
        contact_ph_email:   'tu@email.com',
        contact_ph_subject: '¿En qué te puedo ayudar?',
        contact_ph_message: 'Cuéntame sobre tu proyecto...',
        contact_submit:   'Enviar mensaje',
        contact_sending:  'Enviando...',
        contact_success:  '¡Mensaje enviado correctamente!',
        contact_error:    'Algo salió mal. Por favor intenta de nuevo.',

        footer_made_by: 'Diseñado y desarrollado por',
        footer_rights:  'Todos los derechos reservados',

        error_name:    'El nombre debe tener al menos 2 caracteres.',
        error_email:   'Ingresa un email válido.',
        error_message: 'El mensaje debe tener al menos 10 caracteres.',
    },


    /* ── FRANÇAIS ── */
    fr: {
        nav_about:    'À propos',
        nav_skills:   'Compétences',
        nav_projects: 'Projets',
        nav_contact:  'Contact',

        hero_greeting:     'Salut, je suis',
        hero_role_static:  'Je suis ',
        hero_description:  "Passionné par la création d'expériences numériques modernes, fonctionnelles et bien conçues.",
        hero_cta_projects: 'Voir les projets',
        hero_cta_contact:  'Me contacter',
        hero_roles: ['Développeur', 'Développeur Frontend', 'Problem Solver', 'Tech Enthusiast'],

        about_title_main:   'À propos de',
        about_title_accent: 'moi',
        about_subtitle:     'Apprenez à me connaître',
        about_p1: "Je suis un développeur passionné par la création de solutions web modernes et efficaces. Je me concentre sur l'écriture de code propre, l'apprentissage constant et la collaboration sur des projets à impact réel.",
        about_p2: "Quand je ne code pas, j'aime faire de l'exercice quotidiennement pour maintenir une bonne santé mentale au travail.",
        about_stat_projects: 'Projets',
        about_stat_years:    "Ans d'exp.",
        about_stat_learning: 'Apprentissage',
        about_cv:  'Voir CV',
        cv_url:    'cv-design.html',

        skills_title_main:   'Mes',
        skills_title_accent: 'compétences',
        skills_subtitle:  'Technologies avec lesquelles je travaille',
        skills_frontend:  'Frontend',
        skills_backend:   'Backend',
        skills_tools:     'Outils',

        projects_title_main:   'Mes',
        projects_title_accent: 'Projets',
        projects_subtitle: "Quelques travaux que j'ai réalisés",
        filter_all:     'Tous',
        filter_web:     'Web',
        filter_backend: 'Backend',
        project1_title: 'Landing Page',
        project1_desc:  "Landing page moderne construite avec Astro. Composants modulaires : Hero, Features, Pricing et Footer.",
        project2_title: 'Fashion Store',
        project2_desc:  'E-commerce de mode avec catalogue produits, nouveautés, newsletter et support multilingue.',
        project3_title: 'Admin Dashboard',
        project3_desc:  "Panneau d'administration avec statistiques KPI, graphique des ventes mensuelles et tableau des commandes récentes.",
        project4_title: 'NidoHomes',
        project4_desc:  'Plateforme immobilière avec annonces de propriétés, recherche, filtres par type et support multilingue.',

        contact_title:    'Discutons !',
        contact_subtitle: 'Je suis disponible pour des projets et des opportunités',
        contact_email_label:        'Email',
        contact_location_label:     'Localisation',
        contact_location_value:     'Meudon, France',
        contact_avail_label:        'Disponibilité',
        contact_avail_value:        'Disponible pour des projets',
        contact_form_name:    'Nom',
        contact_form_email:   'Email',
        contact_form_subject: 'Sujet',
        contact_form_message: 'Message',
        contact_ph_name:    'Votre nom',
        contact_ph_email:   'votre@email.com',
        contact_ph_subject: 'Comment puis-je vous aider ?',
        contact_ph_message: 'Parlez-moi de votre projet...',
        contact_submit:   'Envoyer le message',
        contact_sending:  'Envoi en cours...',
        contact_success:  'Message envoyé avec succès !',
        contact_error:    "Une erreur s'est produite. Veuillez réessayer.",

        footer_made_by: 'Conçu et développé par',
        footer_rights:  'Tous droits réservés',

        error_name:    'Le nom doit comporter au moins 2 caractères.',
        error_email:   'Veuillez entrer un email valide.',
        error_message: 'Le message doit comporter au moins 10 caractères.',
    },
};


/* ============================================================
   IDIOMA ACTIVO
   Se expone como window.currentLang para que main.js lo lea.
============================================================ */
window.currentLang = 'en';

/* Expone el objeto de traducciones para que main.js lo use */
window.translations = translations;


/* ============================================================
   applyLanguage(lang)
   Aplica un idioma recorriendo todos los elementos con
   data-i18n (textContent) y data-i18n-placeholder (placeholder).
   Luego actualiza el HTML lang, los botones activos y localStorage.
============================================================ */
function applyLanguage(lang) {
    const t = translations[lang];
    if (!t) return; // Ignora idiomas no registrados

    window.currentLang = lang;

    // Actualiza el atributo lang del <html> para accesibilidad y SEO
    document.documentElement.lang = lang;

    // Actualiza todos los elementos con data-i18n → textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key] !== undefined) {
            el.textContent = t[key];
        }
    });

    // Actualiza placeholders de inputs/textarea con data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (t[key] !== undefined) {
            el.placeholder = t[key];
        }
    });

    // Actualiza atributos href con data-i18n-href (ej: botón de CV)
    document.querySelectorAll('[data-i18n-href]').forEach(el => {
        const key = el.dataset.i18nHref;
        if (t[key] !== undefined) {
            el.href = t[key];
        }
    });

    // Marca el botón del idioma activo en el switcher
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Reinicia el typewriter con los roles del nuevo idioma
    if (typeof window.restartTypewriter === 'function') {
        window.restartTypewriter();
    }

    // Persiste la elección en localStorage
    localStorage.setItem('portfolio_lang', lang);
}


/* ============================================================
   INICIALIZACIÓN DEL SWITCHER
   Se ejecuta cuando el DOM está listo.
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    // Conecta los botones de idioma del navbar
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
    });

    // Recupera el idioma guardado; si no hay ninguno, usa 'en'
    const saved = localStorage.getItem('portfolio_lang') || 'en';
    applyLanguage(saved);
});
