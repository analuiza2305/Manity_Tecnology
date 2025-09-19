document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initMobileMenu();
    initParticles();
    initScrollAnimations();
    initContactForm();
    initLogoRotation();
    initLanguageSelector();
    initAccessibility();
});

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    let savedTheme = localStorage.getItem('theme') || 'light';

    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(savedTheme + "-mode");

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

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = {};
            for (let [key, value] of formData.entries()) data[key] = value;

            const msg =
                `*Nome*: ${data.name}
                 *Sobrenome*: ${data.lastname}   
                 *Email*: ${data.email}
                 *Empresa*: ${data.company || "-"}
                 *Assunto*: ${data.subject}
                 *Mensagem*: ${data.message}`;
            const sendOption = formData.get("sendOption");

            if (sendOption === "email") {
                const destinatario = "Zuccaalmeida@gmail.com";
                const subject = encodeURIComponent(data.subject);
                const body = encodeURIComponent(msg);
                window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${destinatario}&su=${subject}&body=${body}`, "_blank");
            } else if (sendOption === "whatsapp") {
                const phone = "5511981590183";
                const text = encodeURIComponent(msg);
                window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
            }
        });
    }
}

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

function initLogoRotation() {
    const logo = document.querySelector('.logo');
    const logoIcon = document.querySelector('.logo-icon img');
    if (!logo || !logoIcon) return;

    let isHovering = false;
    let spinSpeed = 0;
    let animationFrame;

    let currentRotation = parseFloat(localStorage.getItem("logoRotation")) || 0;
    logoIcon.style.transform = `rotate(${currentRotation}deg)`;

    let loadTargetRotation = currentRotation + 180;
    let inLoadAnimation = true;

    function animate() {
        if (isHovering) {
            spinSpeed = 5;
            inLoadAnimation = false;
        } else if (inLoadAnimation) {
            const diff = loadTargetRotation - currentRotation;
            if (Math.abs(diff) > 0.5) {
                spinSpeed = diff * 0.08;
            } else {
                spinSpeed *= 0.9;
                if (Math.abs(spinSpeed) < 0.05) {
                    spinSpeed = 0;
                    inLoadAnimation = false;
                }
            }
        } else {
            spinSpeed *= 0.95;
            if (Math.abs(spinSpeed) < 0.05) spinSpeed = 0;
        }

        currentRotation += spinSpeed;
        logoIcon.style.transform = `rotate(${currentRotation}deg)`;

        localStorage.setItem("logoRotation", currentRotation);

        if (spinSpeed !== 0 || isHovering || inLoadAnimation) {
            animationFrame = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(animationFrame);
        }
    }

    animationFrame = requestAnimationFrame(animate);

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

const activeTypeWriters = new WeakMap();

function typeWriter(element, newText, speed = 25) {
    if (!element) return;

    if (activeTypeWriters.has(element)) {
        activeTypeWriters.get(element).forEach(id => clearTimeout(id));
    }
    activeTypeWriters.set(element, []);

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

    element.textContent = "";
    [...newText].forEach((char, index) => {
        const id = setTimeout(() => {
            element.textContent += char;
        }, index * speed);
        activeTypeWriters.get(element).push(id);
    });
}

async function applyTranslation(lang) {
    try {
        const basePath = window.location.pathname.includes("Manity_Tecnology")
            ? "/Manity_Tecnology"
            : "";

        const res = await fetch(`${basePath}/linguagens/${lang}.json`);
        const t = await res.json();

        typeWriter(document.querySelector('nav ul li a[href="index.html"]'), t.header.nav_home);
        typeWriter(document.querySelector('nav ul li a[href="sobre.html"]'), t.header.nav_about);
        typeWriter(document.querySelector('nav ul li a[href="projetos.html"]'), t.header.nav_projects);
        typeWriter(document.querySelector('nav ul li a[href="contato.html"]'), t.header.nav_contact);
        typeWriter(document.querySelector('.btn-primary[href="contato.html"]'), t.header.btn_contact);

        typeWriter(document.querySelectorAll('.footer-column h4')[0], t.footer.nav);
        typeWriter(document.querySelectorAll('.footer-column h4')[1], t.footer.contact);
        typeWriter(document.querySelectorAll('.footer-column h4')[2], t.footer.social);
        typeWriter(document.querySelector('.footer-bottom p'), t.footer.rights);

        const path = window.location.pathname;

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

function initAccessibility() {
    const accToggle = document.getElementById("accessibility-toggle");
    const accMenu = document.getElementById("accessibility-menu");
    if (!accToggle || !accMenu) return;

    accToggle.addEventListener("click", () => accMenu.classList.toggle("hidden"));

    let settings = {
        fontSize: parseFloat(localStorage.getItem("fontSize")) || parseFloat(getComputedStyle(document.body).fontSize),
        colorblind: localStorage.getItem("colorblind") || "Filtros Daltonismo",
        screenReader: localStorage.getItem("screenReader") === "true"
    };

    const increaseBtn = document.getElementById("increase-font");
    const decreaseBtn = document.getElementById("decrease-font");
    const defaultFontSize = parseFloat(getComputedStyle(document.body).fontSize);
    let currentFontSize = settings.fontSize;

    function applyFontSize(delta) {
        document.querySelectorAll("p, span, a, li, h1, h2, h3, h4, h5, h6, button, label, input, textarea")
            .forEach(el => {
                const baseSize = parseFloat(getComputedStyle(el).getPropertyValue("font-size"));
                el.style.fontSize = (baseSize + delta) + "px";
            });
    }

    function changeFontSize(delta) {
        currentFontSize += delta;
        applyFontSize(delta);
    }

    function updateFontButtons() {
        if (!increaseBtn || !decreaseBtn) return;
        increaseBtn.classList.remove("active");
        decreaseBtn.classList.remove("active");
        if (currentFontSize > defaultFontSize) increaseBtn.classList.add("active");
        else if (currentFontSize < defaultFontSize) decreaseBtn.classList.add("active");
    }

    if (currentFontSize !== defaultFontSize) {
        applyFontSize(currentFontSize - defaultFontSize);
        updateFontButtons();
    }

    if (increaseBtn) increaseBtn.addEventListener("click", () => { changeFontSize(2); updateFontButtons(); localStorage.setItem("fontSize", currentFontSize); });
    if (decreaseBtn) decreaseBtn.addEventListener("click", () => { changeFontSize(-2); updateFontButtons(); localStorage.setItem("fontSize", currentFontSize); });

    //FILTROS DALTONISMO
    const modes = [
        { name: "Filtros Daltonismo", className: "" },
        { name: "Protanopia", className: "colorblind-protanopia" },
        { name: "Deuteranopia", className: "colorblind-deuteranopia" },
        { name: "Tritanopia", className: "colorblind-tritanopia" },
        { name: "Acromatopsia", className: "colorblind-Acromatopsia" }
    ];
    const colorblindBtn = document.getElementById("colorblind-filter");
    let savedMode = localStorage.getItem("colorblindMode") || "Filtros Daltonismo";
    let currentModeIndex = modes.findIndex(m => m.name === savedMode);
    if (currentModeIndex === -1) currentModeIndex = 0;

    function applyColorblindMode(index) {
        const classesToRemove = modes.map(m => m.className).filter(Boolean);
        if (classesToRemove.length) document.body.classList.remove(...classesToRemove);

        const mode = modes[index];
        if (mode.className) {
            document.body.classList.add(mode.className);
            if (colorblindBtn) colorblindBtn.classList.add("active");
        } else {
            if (colorblindBtn) colorblindBtn.classList.remove("active");
        }

        if (colorblindBtn) {
            colorblindBtn.innerHTML = `<i class="fa fa-low-vision" aria-hidden="true"></i> ${mode.name}`;
        }
        localStorage.setItem("colorblindMode", mode.name);
    }

    applyColorblindMode(currentModeIndex);
    if (colorblindBtn) colorblindBtn.addEventListener("click", () => { currentModeIndex = (currentModeIndex + 1) % modes.length; applyColorblindMode(currentModeIndex); });

    //LEITURA VOZ 
    const screenReaderBtn = document.getElementById("screen-reader");
    let speechEnabled = settings.screenReader;
    let navigationMode = "mouse";
    let lastSpokenElement = null;

    function enableSpeech() {
        document.body.addEventListener("mouseover", handleSpeechMouse);
        document.body.addEventListener("focusin", handleSpeechTab);
        lastSpokenElement = null;
    }
    function disableSpeech() {
        document.body.removeEventListener("mouseover", handleSpeechMouse);
        document.body.removeEventListener("focusin", handleSpeechTab);
        window.speechSynthesis.cancel();
        lastSpokenElement = null;
    }
    function handleSpeechMouse(e) {
        if (!speechEnabled || navigationMode !== "mouse") return;
        if (e.target === lastSpokenElement) return;
        lastSpokenElement = e.target;
        speakTextFromElement(e.target);
    }
    function handleSpeechTab(e) {
        if (!speechEnabled || navigationMode !== "tab") return;
        if (e.target === lastSpokenElement) return;
        lastSpokenElement = e.target;
        speakTextFromElement(e.target);
    }
    function speakTextFromElement(el) {
        if (!el) return;
        const ariaLabel = el.getAttribute && el.getAttribute("aria-label");
        const alt = el.alt || (el.getAttribute && el.getAttribute("alt"));
        const title = el.title || (el.getAttribute && el.getAttribute("title"));
        const value = el.value || "";
        const text = (ariaLabel || alt || title || value || el.innerText || "").trim();
        if (!text) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }

    if (speechEnabled) enableSpeech();
    if (speechEnabled && screenReaderBtn) screenReaderBtn.classList.add("active");
    if (screenReaderBtn) screenReaderBtn.addEventListener("click", () => {
        speechEnabled = !speechEnabled;
        if (speechEnabled) { enableSpeech(); screenReaderBtn.classList.add("active"); }
        else { disableSpeech(); screenReaderBtn.classList.remove("active"); }
        localStorage.setItem("screenReader", speechEnabled);
    });

    window.addEventListener("keydown", (e) => { if (e.key === "Tab") navigationMode = "tab"; });
    window.addEventListener("mousemove", () => { navigationMode = "mouse"; });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".accessibility-selector")) accMenu.classList.add("hidden");
    });

    //MENU 
    const readingMaskBtn = document.getElementById("reading-mask");
    const boldTextBtn = document.getElementById("bold-text");
    const highContrastBtn = document.getElementById("high-contrast");
    const increaseLineBtn = document.getElementById("increase-line");
    const decreaseLineBtn = document.getElementById("decrease-line");
    const readingModeBtn = document.getElementById("reading-mode");
    const resetBtn = document.getElementById("reset-accessibility");
    const exitReadingModeBtn = document.getElementById("exit-reading-mode");
    const readingMaskOverlay = document.getElementById("reading-mask-overlay");

    let savedAccessibility = JSON.parse(localStorage.getItem("accessibilitySettings")) || {
        readingMask: false,
        boldText: false,
        highContrast: false,
        lineSpacing: "normal",
        readingMode: false
    };

    function saveAccessibility() {
        localStorage.setItem("accessibilitySettings", JSON.stringify(savedAccessibility));
    }

    //redefinir
    if (readingMaskOverlay) readingMaskOverlay.style.display = savedAccessibility.readingMask ? "block" : "none";
    document.body.classList.toggle("bold-text-active", !!savedAccessibility.boldText);
    document.body.classList.toggle("high-contrast-active", !!savedAccessibility.highContrast);
    document.body.classList.toggle("line-spacing-lg", savedAccessibility.lineSpacing === "large");
    document.body.classList.toggle("line-spacing-sm", savedAccessibility.lineSpacing === "small");
    document.body.classList.toggle("reading-mode-active", !!savedAccessibility.readingMode);

    function toggleActive(liEl, cond) { if (!liEl) return; liEl.classList.toggle("active", !!cond); }

    toggleActive(boldTextBtn, savedAccessibility.boldText);
    toggleActive(highContrastBtn, savedAccessibility.highContrast);
    toggleActive(readingMaskBtn, savedAccessibility.readingMask);
    toggleActive(increaseLineBtn, savedAccessibility.lineSpacing === "large");
    toggleActive(decreaseLineBtn, savedAccessibility.lineSpacing === "small");

    //MÁSCARA LEITURA 
    if (readingMaskBtn && readingMaskOverlay) {
        readingMaskBtn.addEventListener("click", () => {
            const currently = readingMaskOverlay.style.display === "block";
            readingMaskOverlay.style.display = currently ? "none" : "block";
            document.body.classList.toggle("reading-mask-active", !currently);
            savedAccessibility.readingMask = !currently;
            toggleActive(readingMaskBtn, savedAccessibility.readingMask);
            saveAccessibility();
        });

        document.addEventListener("mousemove", (e) => {
            if (readingMaskOverlay.style.display === "block") {
                const highlight = readingMaskOverlay.querySelector(".highlight-window");
                if (highlight) {
                    const height = highlight.offsetHeight;
                    const top = e.clientY - height / 2;
                    highlight.style.top = `${top}px`;
                }
            }
        });
    }


    //lETRAS DESTACADAS
    if (boldTextBtn) {
        boldTextBtn.addEventListener("click", () => {
            const now = !document.body.classList.contains("bold-text-active");
            document.body.classList.toggle("bold-text-active", now);
            savedAccessibility.boldText = now;
            toggleActive(boldTextBtn, savedAccessibility.boldText);
            saveAccessibility();
        });
    }

    //ALTO CONTRASTE
    if (highContrastBtn) {
        highContrastBtn.addEventListener("click", () => {
            const now = !document.body.classList.contains("high-contrast-active");
            document.body.classList.toggle("high-contrast-active", now);
            savedAccessibility.highContrast = now;
            toggleActive(highContrastBtn, savedAccessibility.highContrast);
            saveAccessibility();
        });
    }

    //ESPAÇAMENTO
    function applyLineSpacing(state) {
        document.body.classList.remove("line-spacing-sm", "line-spacing-normal", "line-spacing-lg");
        if (state === "small") document.body.classList.add("line-spacing-sm");
        else if (state === "normal") document.body.classList.add("line-spacing-normal");
        else if (state === "large") document.body.classList.add("line-spacing-lg");
        savedAccessibility.lineSpacing = state;
        toggleActive(increaseLineBtn, state === "large");
        toggleActive(decreaseLineBtn, state === "small");
        saveAccessibility();
    }
    if (increaseLineBtn) increaseLineBtn.addEventListener("click", () => {
        if (savedAccessibility.lineSpacing === "small") applyLineSpacing("normal");
        else if (savedAccessibility.lineSpacing === "normal") applyLineSpacing("large");
    });
    if (decreaseLineBtn) decreaseLineBtn.addEventListener("click", () => {
        if (savedAccessibility.lineSpacing === "large") applyLineSpacing("normal");
        else if (savedAccessibility.lineSpacing === "normal") applyLineSpacing("small");
    });
    applyLineSpacing(savedAccessibility.lineSpacing || "normal");

    //MODO LEITURA
    function applyReadingMode(state) {
        document.body.classList.toggle("reading-mode-active", !!state);
        if (exitReadingModeBtn) exitReadingModeBtn.style.display = state ? "flex" : "none";
        savedAccessibility.readingMode = !!state;
        saveAccessibility();
    }
    if (readingModeBtn) readingModeBtn.addEventListener("click", () => applyReadingMode(!document.body.classList.contains("reading-mode-active")));
    if (exitReadingModeBtn) exitReadingModeBtn.addEventListener("click", () => applyReadingMode(false));
    if (savedAccessibility.readingMode) applyReadingMode(true);

    //RESET
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            const removeClasses = [
                "reading-mask-active", "bold-text-active", "high-contrast-active",
                "line-spacing-lg", "line-spacing-sm", "line-spacing-normal", "reading-mode-active",
                "colorblind-protanopia", "colorblind-deuteranopia", "colorblind-tritanopia",
                "colorblind-Acromatopsia", "fallback"
            ];
            document.body.classList.remove(...removeClasses);
            if (readingMaskOverlay) readingMaskOverlay.style.display = "none";
            if (exitReadingModeBtn) exitReadingModeBtn.style.display = "none";

            document.querySelectorAll("#accessibility-menu li").forEach(li => li.classList.remove("active"));
            document.querySelectorAll("p, span, a, li, h1, h2, h3, h4, h5, h6, button, label, input, textarea")
                .forEach(el => el.style.fontSize = "");

            savedAccessibility = { readingMask: false, boldText: false, highContrast: false, lineSpacing: "normal", readingMode: false };
            saveAccessibility();
            localStorage.removeItem("fontSize");
            localStorage.removeItem("colorblindMode");
            localStorage.removeItem("screenReader");

            if (speechEnabled) { disableSpeech(); speechEnabled = false; }
        });
    }
}

function initHotspots() {
    const containers = document.querySelectorAll(".image-container");

    containers.forEach(container => {
        const hotspots = container.querySelectorAll(".hotspot");
        if (!hotspots || hotspots.length === 0) return;

        let tooltip = container.querySelector(".tooltip");
        if (!tooltip) {
            tooltip = document.createElement("div");
            tooltip.className = "tooltip";
            container.appendChild(tooltip);
        }

        function positionTooltip(hotspot) {
            const hRect = hotspot.getBoundingClientRect();
            const cRect = container.getBoundingClientRect();
            tooltip.textContent = hotspot.dataset.name || "";

            const centerX = hRect.left + hRect.width / 2;
            const left = centerX - cRect.left;
            const top = hRect.top - cRect.top;

            tooltip.style.left = left + "px";
            tooltip.style.top = top + "px";

            const tipRect = tooltip.getBoundingClientRect();
            const overflowLeft = tipRect.left < 8;
            const overflowRight = tipRect.right > (window.innerWidth - 8);
            if (overflowLeft) {
                tooltip.style.left = (left + (8 - tipRect.left)) + "px";
            } else if (overflowRight) {
                tooltip.style.left = (left - (tipRect.right - (window.innerWidth - 8))) + "px";
            }
        }

        hotspots.forEach(h => {
            if (!h.hasAttribute("tabindex")) h.setAttribute("tabindex", "0");

            h.addEventListener("mouseenter", () => {
                positionTooltip(h);
                tooltip.classList.add("show");
            });
            h.addEventListener("mousemove", () => {
                positionTooltip(h);
            });
            h.addEventListener("mouseleave", () => {
                tooltip.classList.remove("show");
            });

            h.addEventListener("focus", () => {
                positionTooltip(h);
                tooltip.classList.add("show");
            });
            h.addEventListener("blur", () => {
                tooltip.classList.remove("show");
            });
        });

        window.addEventListener("resize", () => {
            const visible = tooltip.classList.contains("show");
            if (visible) {
                const activeHot = Array.from(hotspots).find(hs => hs.matches(":hover") || hs === document.activeElement);
                if (activeHot) positionTooltip(activeHot);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    if (typeof initHotspots === "function") initHotspots();
});

function initSmoothScrollTransform() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const isTouch = (('ontouchstart' in window) || navigator.maxTouchPoints > 1);
  if (isTouch) return;

  const wrapper = document.querySelector('.page-wrapper');
  if (!wrapper) return;

  if (window._smoothScrollRaf) cancelAnimationFrame(window._smoothScrollRaf);

  wrapper.style.position = 'fixed';
  wrapper.style.width = '100%';
  wrapper.style.top = '0';
  wrapper.style.left = '0';
  wrapper.style.willChange = 'transform';
  wrapper.style.transform = 'translate3d(0,0,0)';

  function setBodyHeight() {
    const h = wrapper.scrollHeight || wrapper.getBoundingClientRect().height;
    document.body.style.height = Math.ceil(h) + 'px';
  }

  setBodyHeight();
  window.addEventListener('resize', setBodyHeight);
  window.addEventListener('orientationchange', setBodyHeight);
  window.addEventListener('load', setBodyHeight);

  let current = window.scrollY;
  let target = window.scrollY;
  const ease = 0.12; 

  function raf() {
    target = window.scrollY;
    current += (target - current) * ease;
    if (Math.abs(target - current) < 0.1) current = target;
    wrapper.style.transform = `translate3d(0, ${-current}px, 0)`;
    window._smoothScrollRaf = requestAnimationFrame(raf);
  }

  raf();
}

window.addEventListener('load', initSmoothScrollTransform);
