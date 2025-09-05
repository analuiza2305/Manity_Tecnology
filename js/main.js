// Esperar que o DOM seja completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    // Inicializar todas as funcionalidades
    initThemeToggle();
    initMobileMenu();
    initParticles();
    initScrollAnimations();
    initContactForm();
    initLogoRotation();
    initLanguageSelector();
});

// Alternar entre modo claro e escuro
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    let savedTheme = localStorage.getItem('theme') || 'light';

    // Normaliza body: só mantém a classe correspondente
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(savedTheme + "-mode");

    // Atualiza ícone
    if (savedTheme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }

    themeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');

        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Menu mobile
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            if (nav) {
                nav.classList.toggle('active');
                const spans = this.querySelectorAll('span');
                if (this.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    }
}

// Inicializar particles.js
function initParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#00b837ff' },
                shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
                opacity: { value: 0.5 },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: '#00b837ff', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2 }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                    repulse: { distance: 200, duration: 0.4 },
                    push: { particles_nb: 4 },
                    remove: { particles_nb: 2 }
                }
            },
            retina_detect: true
        });
    }
}

// Animações ao rolar a página
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .value-card, .team-member, .faq-item, .about-image, .about-text'
    );

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0;
    }

    function handleScroll() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('animate');
            }
        });
    }

    animatedElements.forEach(element => element.classList.add('hidden'));
    handleScroll();
    window.addEventListener('scroll', handleScroll);
}

// Formulário de contato
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const formValues = {};
            for (let [key, value] of formData.entries()) formValues[key] = value;

            setTimeout(() => {
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Entraremos em contato em breve.';
                contactForm.reset();
                contactForm.appendChild(successMessage);
                setTimeout(() => successMessage.remove(), 5000);
            }, 1000);
        });
    }
}

// Partículas flutuantes decorativas
function createFloatingParticles() {
    const container = document.querySelector('main');
    if (!container) return;
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const size = Math.random() * 10 + 5;
        particle.style.cssText = `
            position: absolute;
            left: ${posX}%;
            top: ${posY}%;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(0, 184, 148, 0.2);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
        `;
        container.appendChild(particle);
    }
}

// Gradiente animado em textos
function initGradientText() {
    const gradientTexts = document.querySelectorAll('.highlight');
    gradientTexts.forEach(text => {
        text.style.background = 'linear-gradient(45deg, #00b894, #0984e3)';
        text.style.webkitBackgroundClip = 'text';
        text.style.backgroundClip = 'text';
        text.style.color = 'transparent';
        text.style.backgroundSize = '200% 200%';
        text.style.animation = 'gradientAnimation 5s ease infinite';
    });
}

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({ top: targetElement.offsetTop - 100, behavior: 'smooth' });
        }
    });
});

// Sombras modernas
function addModernEffects() {
    const cards = document.querySelectorAll('.service-card, .value-card, .team-member');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1), 0 8px 15px rgba(0, 184, 148, 0.2)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.boxShadow = '';
        });
    });
}

// Profundidade nos cards
function addDepthEffect() {
    const cards = document.querySelectorAll('.service-card, .value-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
}

window.addEventListener('load', function () {
    createFloatingParticles();
    initGradientText();
    addModernEffects();
    addDepthEffect();
});

// Rotação da logo
function initLogoRotation() {
    const logo = document.querySelector('.logo');
    const logoIcon = document.querySelector('.logo-icon img');
    if (!logo || !logoIcon) return;

    let isHovering = false;
    let currentRotation = 0;
    let spinSpeed = 0;
    let animationFrame;

    function animate() {
        if (isHovering) {
            spinSpeed = 5;
        } else {
            spinSpeed *= 0.95;
            if (Math.abs(spinSpeed) < 0.05) spinSpeed = 0;
        }
        currentRotation += spinSpeed;
        logoIcon.style.transform = `rotate(${currentRotation}deg)`;
        if (spinSpeed !== 0 || isHovering) {
            animationFrame = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(animationFrame);
        }
    }

    logo.addEventListener('mouseenter', () => {
        isHovering = true;
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(animate);
    });
    logo.addEventListener('mouseleave', () => {
        isHovering = false;
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(animate);
    });
}

// Seleção de idioma
function initLanguageSelector() {
    const toggleBtn = document.getElementById('language-toggle');
    const flag = toggleBtn.querySelector('.flag-icon');
    const menu = document.getElementById('language-menu');

    let currentLang = localStorage.getItem('lang') || 'pt';

    const langs = {
        pt: { label: 'Português', flag: 'img/bandeiras/br-flag.svg' },
        en: { label: 'English', flag: 'img/bandeiras/us-flag.svg' },
        es: { label: 'Español', flag: 'img/bandeiras/es-flag.svg' }
    };

    function updateUI(lang) {
        if (!langs[lang]) return;
        flag.src = langs[lang].flag;
    }

    updateUI(currentLang);

    toggleBtn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    menu.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', () => {
            const lang = item.getAttribute('data-lang');
            if (!lang) return;
            currentLang = lang;
            localStorage.setItem('lang', lang);
            updateUI(lang);
            menu.classList.add('hidden');
            applyTranslation(lang);
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-selector')) {
            menu.classList.add('hidden');
        }
    });

    applyTranslation(currentLang);
}

// ===== Corrigido: Função de animação de máquina de escrever =====
const activeTypeWriters = new WeakMap();

function typeWriter(element, newText, speed = 25) {
    if (!element) return;

    // Cancela animações anteriores deste elemento
    if (activeTypeWriters.has(element)) {
        activeTypeWriters.get(element).forEach(id => clearTimeout(id));
    }
    activeTypeWriters.set(element, []);

    // Se for input/textarea com placeholder
    if ((element.tagName === "INPUT" || element.tagName === "TEXTAREA") && element.placeholder !== undefined) {
        let placeholder = "";
        element.placeholder = "";
        [...newText].forEach((char, index) => {
            const id = setTimeout(() => {
                placeholder += char;
                element.placeholder = placeholder;
            }, index * speed);
            activeTypeWriters.get(element).push(id);
        });
        return;
    }

    // Para textos normais
    element.textContent = "";
    [...newText].forEach((char, index) => {
        const id = setTimeout(() => {
            element.textContent += char;
        }, index * speed);
        activeTypeWriters.get(element).push(id);
    });
}

// Carregar traduções externas
async function applyTranslation(lang) {
    try {
        // Detectar se está rodando em subpasta (GitHub Pages) ou na raiz (Netlify)
        const basePath = window.location.pathname.includes("Manity_Tecnology")
            ? "/Manity_Tecnology"
            : "";

        const res = await fetch(`${basePath}/linguagens/${lang}.json`);
        const t = await res.json();

        // Header
        typeWriter(document.querySelector('nav ul li a[href="index.html"]'), t.header.nav_home);
        typeWriter(document.querySelector('nav ul li a[href="sobre.html"]'), t.header.nav_about);
        typeWriter(document.querySelector('nav ul li a[href="projetos.html"]'), t.header.nav_projects);
        typeWriter(document.querySelector('nav ul li a[href="contato.html"]'), t.header.nav_contact);
        typeWriter(document.querySelector('.btn-primary[href="contato.html"]'), t.header.btn_contact);

        // Footer
        typeWriter(document.querySelectorAll('.footer-column h4')[0], t.footer.nav);
        typeWriter(document.querySelectorAll('.footer-column h4')[1], t.footer.contact);
        typeWriter(document.querySelectorAll('.footer-column h4')[2], t.footer.social);
        typeWriter(document.querySelector('.footer-bottom p'), t.footer.rights);

        // 🔎 Verificar qual página está aberta
        const path = window.location.pathname;

        // Página inicial (index.html ou /)
        if (path.includes("index.html") || path.endsWith("/") || path.endsWith("/index")) {
            typeWriter(document.querySelector('.hero h1'), t.hero.title, 35);
            typeWriter(document.querySelector('.hero p'), t.hero.desc, 20);
            typeWriter(document.querySelector('.hero-buttons a.btn-primary'), t.hero.btn_project);
            typeWriter(document.querySelector('.hero-buttons a.btn-secondary'), t.hero.btn_about);

            typeWriter(document.querySelector('.services .section-title'), t.services.title);
            const serviceTitles = document.querySelectorAll('.service-card h3');
            const serviceDescs = document.querySelectorAll('.service-card p');
            t.services.items.forEach((item, i) => {
                if (serviceTitles[i]) typeWriter(serviceTitles[i], item.title);
                if (serviceDescs[i]) typeWriter(serviceDescs[i], item.desc, 15);
            });
        }

        // Página sobre
        if (path.includes("sobre.html") || path.endsWith("/sobre")) {
            typeWriter(document.querySelector('.about-hero h1'), t.about.hero_title, 35);
            typeWriter(document.querySelector('.about-hero p'), t.about.hero_desc, 20);

            typeWriter(document.querySelector('.about-text h2'), t.about.mission_title);
            const missionParas = document.querySelectorAll('.about-text p');
            if (missionParas[0]) typeWriter(missionParas[0], t.about.mission_paragraph1, 15);
            if (missionParas[1]) typeWriter(missionParas[1], t.about.mission_paragraph2, 15);

            typeWriter(document.querySelector('.values .section-title'), t.about.values_title);
            const valueTitles = document.querySelectorAll('.value-card h3');
            const valueDescs = document.querySelectorAll('.value-card p');
            t.about.values.forEach((item, i) => {
                if (valueTitles[i]) typeWriter(valueTitles[i], item.title);
                if (valueDescs[i]) typeWriter(valueDescs[i], item.desc, 15);
            });

            typeWriter(document.querySelector('.ods-section h2'), t.about.ods_title);
            typeWriter(document.querySelector('.ods-section p'), t.about.ods_desc, 15);

            typeWriter(document.querySelector('.team .section-title'), t.about.team_title);
        }

        // Página projetos
        if (path.includes("projetos.html") || path.endsWith("/projetos")) {
            typeWriter(document.querySelector('.projects-hero h1'), t.projects.hero_title, 35);
            typeWriter(document.querySelector('.projects-hero p'), t.projects.hero_desc, 20);

            typeWriter(document.querySelector('.main-project-card h2'), t.projects.main_project_title);
            typeWriter(document.querySelector('.main-project-card .project-tag'), t.projects.main_project_status);
            const projectDesc = document.querySelector('.main-project-card p');
            if (projectDesc) projectDesc.textContent = t.projects.main_project_desc;
            typeWriter(document.querySelector('.main-project-card a.btn-secondary'), t.projects.main_project_btn);

            typeWriter(document.querySelector('.cta h2'), t.projects.cta_title);
            typeWriter(document.querySelector('.cta p'), t.projects.cta_desc, 15);
            typeWriter(document.querySelector('.cta a.btn-primary'), t.projects.cta_btn);
        }

        // Página contato
        if (path.includes("contato.html") || path.endsWith("/contato")) {
            typeWriter(document.querySelector('.contact-hero h1'), t.contact.hero_title, 35);
            typeWriter(document.querySelector('.contact-hero p'), t.contact.hero_desc, 20);

            typeWriter(document.querySelector('.contact-form-container h2'), t.contact.form_title);
            typeWriter(document.querySelector('label[for="name"]'), t.contact.form_name);
            typeWriter(document.querySelector('label[for="lastname"]'), t.contact.form_lastname);
            typeWriter(document.querySelector('label[for="email"]'), t.contact.form_email);
            typeWriter(document.querySelector('label[for="company"]'), t.contact.form_company);
            typeWriter(document.querySelector('label[for="message"]'), t.contact.form_message);

            typeWriter(document.querySelector('.contact-form button'), t.contact.form_btn);
            typeWriter(document.querySelector('.form-disclaimer'), t.contact.form_disclaimer, 15);

            typeWriter(document.querySelector('.contact-info h2'), t.contact.info_title);
            typeWriter(document.querySelector('.contact-info p'), t.contact.info_desc, 15);

            const methods = document.querySelectorAll('.contact-method');
            if (methods[0]) {
                typeWriter(methods[0].querySelector('h3'), t.contact.method_email);
                typeWriter(methods[0].querySelector('span'), t.contact.method_email_note, 15);
            }
            if (methods[1]) {
                typeWriter(methods[1].querySelector('h3'), t.contact.method_phone);
                typeWriter(methods[1].querySelector('span'), t.contact.method_phone_note, 15);
            }
            if (methods[2]) {
                typeWriter(methods[2].querySelector('h3'), t.contact.method_location);
                typeWriter(methods[2].querySelector('span'), t.contact.method_location_note, 15);
            }
            if (methods[3]) {
                typeWriter(methods[3].querySelector('h3'), t.contact.method_whatsapp);
                typeWriter(methods[3].querySelector('span'), t.contact.method_whatsapp_note, 15);
            }

            typeWriter(document.querySelector('.faq .section-title'), t.contact.faq_title);
            const faqItems = document.querySelectorAll('.faq-item');
            if (faqItems[0]) {
                typeWriter(faqItems[0].querySelector('h3'), t.contact.faq_q1);
                typeWriter(faqItems[0].querySelector('p'), t.contact.faq_a1, 15);
            }
            if (faqItems[1]) {
                typeWriter(faqItems[1].querySelector('h3'), t.contact.faq_q2);
                typeWriter(faqItems[1].querySelector('p'), t.contact.faq_a2, 15);
            }
            if (faqItems[2]) {
                typeWriter(faqItems[2].querySelector('h3'), t.contact.faq_q3);
                typeWriter(faqItems[2].querySelector('p'), t.contact.faq_a3, 15);
            }
            if (faqItems[3]) {
                typeWriter(faqItems[3].querySelector('h3'), t.contact.faq_q4);
                typeWriter(faqItems[3].querySelector('p'), t.contact.faq_a4, 15);
            }
        }

    } catch (err) {
        console.error(`Erro ao carregar traduções para ${lang}:`, err);
    }
}
