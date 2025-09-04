// Esperar que o DOM seja completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initThemeToggle();
    initMobileMenu();
    initParticles();
    initScrollAnimations();
    initContactForm();
    initLogoRotation();
});

// Alternar entre modo claro e escuro
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Verificar se há uma preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        // Alternar classes no body
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        
        // Alternar ícone
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
        mobileMenuToggle.addEventListener('click', function() {
            // Alternar classe ativa no botão
            this.classList.toggle('active');
            
            // Mostrar/esconder menu
            if (nav) {
                nav.classList.toggle('active');
                
                // Animar as barras do botão hamburger
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
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#00b837ff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00b837ff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Animações ao rolar a página
function initScrollAnimations() {
    // Selecionar todos os elementos que devem ser animados
    const animatedElements = document.querySelectorAll(
        '.service-card, .value-card, .team-member, .faq-item, .about-image, .about-text'
    );
    
    // Função para verificar se um elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Função para adicionar classe de animação aos elementos visíveis
    function handleScroll() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('animate');
            }
        });
    }
    
    // Adicionar classe inicial para esconder os elementos
    animatedElements.forEach(element => {
        element.classList.add('hidden');
    });
    
    // Verificar elementos visíveis no carregamento inicial
    handleScroll();
    
    // Adicionar evento de scroll
    window.addEventListener('scroll', handleScroll);
}

// Formulário de contato
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você adicionaria a lógica para enviar o formulário via AJAX
            // Por enquanto, vamos apenas simular um envio bem-sucedido
            
            // Obter os dados do formulário
            const formData = new FormData(contactForm);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Simular envio (aqui você substituiria por uma chamada AJAX real)
            setTimeout(() => {
                // Exibir mensagem de sucesso
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Entraremos em contato em breve.';
                
                // Limpar formulário e adicionar mensagem
                contactForm.reset();
                contactForm.appendChild(successMessage);
                
                // Remover mensagem após alguns segundos
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1000);
        });
    }
}

// Adicionar efeitos de partículas flutuantes decorativas
function createFloatingParticles() {
    const container = document.querySelector('main');
    if (!container) return;
    
    // Criar partículas decorativas
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Posição aleatória
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Tamanho aleatório
        const size = Math.random() * 10 + 5;
        
        // Estilo
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

// Adicionar efeito de gradiente animado nos textos principais
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

// Adicionar efeito de scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Adicionar efeitos de sombra e blur modernos
function addModernEffects() {
    // Adicionar efeito de sombra nos cards ao passar o mouse
    const cards = document.querySelectorAll('.service-card, .value-card, .team-member');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1), 0 8px 15px rgba(0, 184, 148, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Adicionar efeito de profundidade aos cards
function addDepthEffect() {
    const cards = document.querySelectorAll('.service-card, .value-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Chamar funções adicionais após o carregamento do DOM
window.addEventListener('load', function() {
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
    let currentRotation = 0;
    let spinSpeed = 0;
    let animationFrame;

    function animate() {
        if (isHovering) {
            spinSpeed = 5;
        } else {
            spinSpeed *= 0.92;
            if (Math.abs(spinSpeed) < 0.05) {
                const remainder = currentRotation % 360;
                if (remainder !== 0) {
                    currentRotation -= remainder;
                }
                spinSpeed = 0;
            }
        }

        if (spinSpeed !== 0) {
            currentRotation += spinSpeed;
            logoIcon.style.transform = `rotate(${currentRotation}deg)`;
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
