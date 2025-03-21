/**
 * GB Connect - Script Principal
 * Este arquivo combina os scripts originais (script.js e theme.js)
 * em um único arquivo para melhor organização e desempenho.
 */

// ========== DECLARAÇÃO DE VARIÁVEIS GLOBAIS ==========
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');
const logo = document.querySelector('.logo img');

// ========== FUNÇÕES DE CARREGAMENTO INICIAL ==========

/**
 * Função executada quando o DOM estiver completamente carregado
 * Inicializa todos os componentes e funcionalidades da página
 */
document.addEventListener('DOMContentLoaded', () => {
  // Inicializa o sistema de tema (claro/escuro)
  initThemeSystem();

  // Inicializa o FAQ Accordion
  initAccordion();

  // Inicializa os sliders de depoimentos
  initTestimonialSwiper();

  // Inicializa os sliders de portfolio
  initPortfolioSwiper();

  // Inicializa as animações de scroll
  initScrollAnimations();

  // Inicializa as animações do timeline
  initTimelineAnimations();

  // Inicializa o pop-up de saída
  initExitPopup();

  // Inicializa o botão flutuante do WhatsApp
  initWhatsAppFloat();
});

// ========== NAVEGAÇÃO E MENU MOBILE ==========

/**
 * Toggle do menu mobile - exibe/oculta o menu e alterna o ícone
 */
menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

/**
 * Manipula eventos de scroll:
 * 1. Ativa/desativa links de navegação baseado na seção visível
 * 2. Fixa o header e troca logo quando necessário
 * 3. Fecha o menu mobile quando o usuário rola a página
 */
window.onscroll = () => {
  // Ativar links do menu com base na seção visível atual
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('header nav a');

  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      // Remover classe 'active' de todos os links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      // Adicionar classe 'active' ao link correspondente à seção atual
      const activeLink = document.querySelector('header nav a[href*=' + id + ']');
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });

  // Torna o header fixo após certo ponto de rolagem e troca a logo
  header.classList.toggle('sticky', window.scrollY > 100);
  logo.src = window.scrollY > 100 ? './images/logo-nav.webp' : './images/logocolor1.webp';

  // Fecha o menu mobile quando o usuário rola a página
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');

  // Atualiza a logo com base no tema atual
  updateLogo();
};

// ========== INICIALIZAÇÃO DE COMPONENTES ==========

/**
 * Inicializa o sistema de FAQ Accordion
 * Controla a abertura/fechamento das perguntas frequentes
 */
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    if (header && content) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Fecha todos os itens
        accordionItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.accordion-content');
          if (otherContent) {
            otherContent.style.maxHeight = null;
          }
        });

        // Abre o item atual se não estava ativo
        if (!isActive) {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  });
}

/**
 * Inicializa o Swiper para a seção de depoimentos
 */
function initTestimonialSwiper() {
  new Swiper(".testimonial-box.mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }
  });
}

/**
 * Inicializa o Swiper para a seção de portfólio
 * Configura múltiplos sliders de portfolio com controles e breakpoints responsivos
 */
function initPortfolioSwiper() {
  const projectSwipers = document.querySelectorAll('.portfolio-box.mySwiper');

  projectSwipers.forEach(swiperContainer => {
    const slideCount = swiperContainer.querySelectorAll('.swiper-slide').length;

    new Swiper(swiperContainer, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: slideCount > 2, // Ativa loop apenas se houver mais de 2 slides
      grabCursor: true,
      pagination: {
        el: swiperContainer.querySelector('.swiper-pagination'),
        clickable: true,
      },
      navigation: {
        nextEl: swiperContainer.querySelector('.swiper-button-next'),
        prevEl: swiperContainer.querySelector('.swiper-button-prev'),
      },
      // Diferentes configurações baseadas no tamanho da tela
      breakpoints: {
        768: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
      },
      // Carregamento lazy de imagens para melhor performance
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 2,
      }
    });
  });
}

/**
 * Inicializa animações de scroll usando a biblioteca ScrollReveal
 */
function initScrollAnimations() {
  // Configuração base do ScrollReveal
  const sr = ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
  });

  // Configuração das animações por elemento/seção
  sr.reveal('.home-content, .heading', { origin: 'top' });
  sr.reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
  sr.reveal('.home-content h1, .about-img img', { origin: 'left' });
  sr.reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });

  // Observer de interseção para animações customizadas
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-on-scroll');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Aplicar observer a elementos específicos
  document.querySelectorAll('.services-box, .about-content, .portfolio-item').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Inicializa animações do timeline e cards de confiança
 */
function initTimelineAnimations() {
  const timeline = document.querySelector(".timeline");
  const etapas = document.querySelectorAll(".etapa");
  const trustCards = document.querySelectorAll(".trust-card");

  // Configuração inicial das etapas
  if (timeline && etapas.length > 0) {
    // Definir estado inicial para animação sequencial
    etapas.forEach((etapa, index) => {
      // Configurar posição inicial para animação
      if (index % 2 === 0) {
        // Etapas ímpares vêm da esquerda
        etapa.style.opacity = "0";
        etapa.style.transform = "translateX(-50px)";
      } else {
        // Etapas pares vêm da direita
        etapa.style.opacity = "0";
        etapa.style.transform = "translateX(50px)";
      }
    });

    // Inicializar cards de confiança para animação
    trustCards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
    });
  }

  // Função para verificar se um elemento está visível na tela
  function isElementInViewport(el, offset = 0) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
      rect.bottom >= 0
    );
  }

  // Função para animar elementos quando entram na viewport
  function animateOnScroll() {
    // Animar as etapas
    etapas.forEach((etapa, index) => {
      if (isElementInViewport(etapa, 150)) {
        // Adicionar delay progressivo para cada etapa
        setTimeout(() => {
          etapa.classList.add("visible");
          etapa.style.opacity = "1";
          etapa.style.transform = "translateX(0)";
        }, 200 * index);
      }
    });

    // Animar os cards de confiança
    trustCards.forEach((card, index) => {
      if (isElementInViewport(card, 150)) {
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 200 * index);
      }
    });
  }

  // Adicionar listeners para animação ao rolar e carregar a página
  window.addEventListener("scroll", animateOnScroll);
  window.addEventListener("load", animateOnScroll);

  // Trigger inicial para garantir que os elementos já visíveis sejam animados
  animateOnScroll();

  // Verifica e atualiza a cor das etapas do timeline ao rolar
  function updateEtapasColors() {
    if (!timeline) return;

    const trigger = window.innerHeight * 0.3;

    if (timeline.getBoundingClientRect().top < trigger) {
      timeline.classList.add("scrolled");
    } else {
      timeline.classList.remove("scrolled");
    }

    etapas.forEach((etapa) => {
      const etapaRect = etapa.getBoundingClientRect();
      if (etapaRect.top < trigger) {
        // Usar !important no style para garantir que a mudança seja aplicada
        etapa.style.setProperty('background-color', 'var(--secundary-color)', 'important');

        // Ajustar cor do texto quando o fundo mudar
        const textoEtapa = etapa.querySelector('p');
        const tituloEtapa = etapa.querySelector('h3');

        if (textoEtapa) {
          textoEtapa.style.setProperty('color', 'white', 'important');
        }

        if (tituloEtapa) {
          tituloEtapa.style.setProperty('color', 'white', 'important');
        }
      } else {
        // Retornar para as cores originais
        const currentTheme = document.documentElement.getAttribute('data-theme');

        if (currentTheme === 'light') {
          etapa.style.setProperty('background-color', '#051259', 'important');

          // Ajustar de volta as cores originais para o tema claro
          const textoEtapa = etapa.querySelector('p');
          const tituloEtapa = etapa.querySelector('h3');

          if (textoEtapa) {
            textoEtapa.style.setProperty('color', 'white', 'important');
          }

          if (tituloEtapa) {
            tituloEtapa.style.setProperty('color', 'var(--main-color)', 'important');
          }
        } else {
          etapa.style.setProperty('background-color', 'var(--text-color)', 'important');

          // Ajustar de volta as cores originais para o tema escuro
          const textoEtapa = etapa.querySelector('p');
          const tituloEtapa = etapa.querySelector('h3');

          if (textoEtapa) {
            textoEtapa.style.setProperty('color', 'var(--bg-color)', 'important');
          }

          if (tituloEtapa) {
            tituloEtapa.style.setProperty('color', 'var(--main-color)', 'important');
          }
        }
      }
    });
  }

  // Executar imediatamente e adicionar ao evento de scroll
  if (timeline && etapas.length > 0) {
    updateEtapasColors();
    window.addEventListener('scroll', updateEtapasColors);
  }
}

/**
 * Função para enviar formulário de contato para o WhatsApp
 * Valida os campos e formata a mensagem antes de enviar
 */
function sendToWhatsApp() {
  const phoneNumber = "5548991056014";
  const fields = {
    name: document.getElementById("name").value.trim(),
    company: document.getElementById("company").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    message: document.getElementById("message").value.trim()
  };

  // Validação de campos vazios
  if (Object.values(fields).some(field => !field)) {
    alert("Por favor, preencha todos os campos antes de enviar.");
    return;
  }

  // Validação de telefone
  const phoneRegex = /^(?:\+?55)?(?:\d{2})?(?:9\d{8})$/;
  if (!phoneRegex.test(fields.phone.replace(/\D/g, ''))) {
    alert("Por favor, insira um número de telefone válido.");
    return;
  }

  // Validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(fields.email)) {
    alert("Por favor, insira um email válido.");
    return;
  }

  // Serviços selecionados
  const services = Array.from(document.querySelectorAll('input[name="service"]:checked'))
    .map(service => service.nextSibling.textContent.trim())
    .join(", ");

  // Montagem da mensagem
  const whatsappMessage = `Olá, meu nome é *${fields.name}*!  
───────────────  
📋 *Dados do Contato*  
- Empresa: *${fields.company}*  
- Email: *${fields.email}*  
- Telefone: *${fields.phone}*  
- Serviços: *${services || "Não especificado"}*  
  
💬 *Mensagem*  
${fields.message}  
  
Gostaria de mais informações. Aguardo seu retorno!`;

  // Envio da mensagem
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
}

// ========== SISTEMA DE TEMAS CLARO/ESCURO ==========

/**
 * Inicializa o sistema de alternância de tema (claro/escuro)
 * Cria o botão de tema, verifica preferências e configura listeners
 */
function initThemeSystem() {
  // Pré-carregamento de imagens para evitar delay ao trocar temas
  preloadImages();

  // Criar e posicionar o botão de alternância de tema
  createThemeToggle();

  // Verificar preferência do usuário (localStorage ou preferência do sistema)
  setInitialTheme();

  // Adicionar CSS para transições suaves
  addThemeTransitionStyles();
}

/**
 * Pré-carrega imagens para evitar atrasos durante a troca de temas
 */
function preloadImages() {
  // Cria um array com os caminhos de todas as imagens que precisam ser pré-carregadas
  const imagesToPreload = [
    './images/logo-white.webp',
    './images/logo-nav.webp',
    './images/logocolor1.webp'
  ];

  // Pré-carrega todas as imagens
  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

/**
 * Cria e posiciona o botão de alternância de tema no header
 */
function createThemeToggle() {
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.setAttribute('aria-label', 'Alternar tema');
  themeToggle.innerHTML = '<i class="bx bx-moon"></i>';

  // Inserir o botão no header em vez de no body
  const header = document.querySelector('.header');
  if (header) {
    header.appendChild(themeToggle);
  } else {
    document.body.appendChild(themeToggle); // Fallback se o header não for encontrado
  }

  // Configurar evento de clique para alternância de tema
  themeToggle.addEventListener('click', () => {
    // Adiciona classe de transição ao body
    document.body.classList.add('theme-transitioning');

    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Executa a troca de tema
    setTheme(newTheme);

    // Remove a classe de transição após a conclusão
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 800); // Ajuste conforme necessário para corresponder à duração da transição
  });
}

/**
 * Verifica e define o tema inicial com base em preferências salvas ou do sistema
 */
function setInitialTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    setTheme(savedTheme);
  } else if (prefersDark) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  // Configurar observador para mudanças no atributo data-theme
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        requestAnimationFrame(() => {
          updateLogo();
        });
      }
    });
  });

  observer.observe(document.documentElement, { attributes: true });
}

/**
 * Define o tema do site e salva a preferência
 * @param {string} theme - 'light' ou 'dark'
 */
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateToggleIcon(theme);
}

/**
 * Atualiza o ícone do botão de tema conforme o tema atual
 * @param {string} theme - 'light' ou 'dark'
 */
function updateToggleIcon(theme) {
  const themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) return;

  if (theme === 'light') {
    themeToggle.innerHTML = '<i class="bx bx-moon"></i>';
  } else {
    themeToggle.innerHTML = '<i class="bx bx-sun"></i>';
  }
}

/**
 * Atualiza a logo com base no tema atual e estado do header
 */
function updateLogo() {
  const logo = document.querySelector('.logo img');
  if (!logo) return; // Evita erro se não encontrar a logo

  const currentTheme = document.documentElement.getAttribute('data-theme');
  const isSticky = document.querySelector('.header')?.classList.contains('sticky');

  // Evita carregar a mesma imagem se já estiver carregada
  const newSrc = currentTheme === 'light'
    ? './images/logo-white.webp'
    : (isSticky ? './images/logo-nav.webp' : './images/logocolor1.webp');

  if (logo.src !== newSrc) {
    logo.src = newSrc;
  }
}

/**
 * Adiciona estilos CSS para transições suaves de tema
 */
function addThemeTransitionStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    /* Estilo para transição de tema suave */
    *, *::before, *::after {
      transition: background-color 0.5s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    /* Classe específica para quando o tema está mudando */
    body.theme-transitioning {
      transition: background-color 0.8s ease;
    }
  `;
  document.head.appendChild(styleElement);
}

// ========== FUNCIONALIDADES ADICIONAIS ==========

/**
 * Inicializa o pop-up de saída que aparece quando o usuário tenta deixar a página
 * Este pop-up oferece uma oferta especial para incentivar a conversão
 */
function initExitPopup() {
  const exitPopup = document.getElementById('exitPopup');
  const closePopupButton = document.querySelector('.close-popup');
  const btnSecondary = document.querySelector('.exit-popup .btn-secondary');

  if (!exitPopup) return;

  // Fechar o pop-up ao clicar no botão de fechar
  if (closePopupButton) {
    closePopupButton.addEventListener('click', () => {
      exitPopup.classList.remove('show');
    });
  }

  // Fechar o pop-up ao clicar no botão "Agora não"
  if (btnSecondary) {
    btnSecondary.addEventListener('click', () => {
      exitPopup.classList.remove('show');
    });
  }

  // Detectar quando o mouse sai da página (intenção de sair)
  let showOnce = false;
  document.addEventListener('mouseleave', (e) => {
    // Verificar se o mouse está saindo pelo topo da página
    if (e.clientY < 5 && !showOnce) {
      // Mostrar o pop-up após 2 segundos na página
      if (document.visibilityState === 'visible' && window.scrollY > 100) {
        exitPopup.classList.add('show');
        showOnce = true; // Garantir que só aparece uma vez por sessão
      }
    }
  });

  // Fechar o popup ao clicar fora dele
  exitPopup.addEventListener('click', (e) => {
    if (e.target === exitPopup) {
      exitPopup.classList.remove('show');
    }
  });
}

/**
 * Inicializa as funcionalidades do botão flutuante do WhatsApp
 */
function initWhatsAppFloat() {
  const whatsappFloat = document.querySelector('.whatsapp-float');

  if (!whatsappFloat) return;

  // Animação ao passar o mouse
  whatsappFloat.addEventListener('mouseenter', () => {
    whatsappFloat.style.transform = 'scale(1.1)';
    whatsappFloat.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)';
  });

  whatsappFloat.addEventListener('mouseleave', () => {
    whatsappFloat.style.transform = 'scale(1)';
    whatsappFloat.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.3)';
  });

  // Pulse animation a cada 5 segundos para chamar atenção
  setInterval(() => {
    whatsappFloat.classList.add('pulse-animation');
    setTimeout(() => {
      whatsappFloat.classList.remove('pulse-animation');
    }, 1000);
  }, 5000);
}

// Tornar funções necessárias globalmente acessíveis para o HTML
window.sendToWhatsApp = sendToWhatsApp;

/**
 * Animações específicas para a seção About
 * Adicionar este código no seu arquivo script.js
 */

// Função para inicializar animações da seção About
function initAboutAnimations() {
  // Seleciona os elementos da seção About
  const aboutSection = document.querySelector('.about');
  const aboutTitle = document.querySelector('.about .section-title');
  const aboutImg = document.querySelector('.about-img');
  const aboutIntro = document.querySelector('.about-intro');
  const benefitsItems = document.querySelectorAll('.benefits-list li');
  const aboutCta = document.querySelector('.about .cta-container');

  // Configura o ScrollReveal para esta seção se a biblioteca estiver disponível
  if (typeof ScrollReveal !== 'undefined') {
    // Configurações base do ScrollReveal
    const sr = ScrollReveal({
      distance: '50px',
      duration: 1000,
      easing: 'ease-in-out',
      origin: 'bottom',
      reset: false
    });

    // Anima cada elemento com um delay sequencial
    sr.reveal(aboutTitle, { delay: 100 });
    sr.reveal(aboutImg, { delay: 200, origin: 'top' });
    sr.reveal(aboutIntro, { delay: 300 });

    // Anima cada item da lista sequencialmente
    benefitsItems.forEach((item, index) => {
      sr.reveal(item, { delay: 400 + (index * 100) });
    });

    sr.reveal('.about-cta-text', { delay: 800 });
    sr.reveal(aboutCta, { delay: 900 });
  } else {
    // Fallback para animações CSS se o ScrollReveal não estiver disponível

    // Adiciona classe para animação em cada elemento
    const addAnimationClass = (el, className, delay) => {
      if (!el) return;
      setTimeout(() => {
        el.classList.add(className);
      }, delay);
    };

    // Função para verificar se elemento está visível na viewport
    const isElementVisible = (el) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    };

    // Função para animar quando o elemento está visível
    const animateOnScroll = () => {
      if (isElementVisible(aboutSection)) {
        addAnimationClass(aboutTitle, 'animate-fade-in-down', 100);
        addAnimationClass(aboutImg, 'animate-fade-in-left', 200);
        addAnimationClass(aboutIntro, 'animate-fade-in-up', 300);

        benefitsItems.forEach((item, index) => {
          addAnimationClass(item, 'animate-fade-in-right', 400 + (index * 100));
        });

        addAnimationClass(document.querySelector('.about-cta-text'), 'animate-fade-in-up', 800);
        addAnimationClass(aboutCta, 'animate-fade-in-up', 900);

        // Remove o listener após animar
        window.removeEventListener('scroll', animateOnScroll);
      }
    };

    // Adiciona evento de scroll para animar quando a seção estiver visível
    window.addEventListener('scroll', animateOnScroll);
    // Verifica imediatamente ao carregar a página
    animateOnScroll();
  }
}

// Adicionar a chamada para esta função na inicialização do site
document.addEventListener('DOMContentLoaded', () => {
  // Outras inicializações...
  initAboutAnimations();
});