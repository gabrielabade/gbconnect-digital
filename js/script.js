// ========== CONFIGURAÇÕES GLOBAIS ==========
const CONFIG = {
  // Contato
  phoneNumber: "5548991056014", // Número de WhatsApp para contato

  // Caminhos das imagens do logo
  logoPath: {
    light: './images/logo-white.webp',
    dark: './images/logocolor1.webp',
    sticky: './images/logo-nav.webp',
    footerLight: './images/logo-nav.webp',
    footerDark: './images/logocolor1.webp'
  },

  // Configurações de animação
  animation: {
    scrollDuration: 2000,
    scrollDistance: '80px',
    scrollDelay: 200
  },

  // Duração das transições de tema
  themeTransition: {
    duration: 800, // ms
    elementsDuration: 500 // ms
  }
};

// ========== DECLARAÇÃO DE VARIÁVEIS GLOBAIS ==========
// Elementos principais da navegação
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');
const logo = document.querySelector('.logo img');

// ========== INICIALIZAÇÃO ==========

/**
 * Função principal de inicialização executada quando o DOM estiver carregado
 */
function initializeApp() {
  // Inicializa o sistema de tema (claro/escuro)
  initThemeSystem();

  // Garante que o logo esteja correto desde o início
  updateLogo();

  // Inicializa os componentes da UI
  initUIComponents();

  // Inicializa as animações
  initAnimations();

  // Inicializa os recursos adicionais
  initAdditionalFeatures();
}

/**
 * Inicializa os componentes principais da interface
 */
function initUIComponents() {
  // Inicializa o FAQ Accordion
  initAccordion();

  // Inicializa o formulário de contato
  initContactForm();

  // Inicializa os sliders de depoimentos
  initTestimonialSwiper();

  // Inicializa os sliders de portfolio
  initPortfolioSwiper();
}

/**
 * Inicializa todas as animações do site
 */
function initAnimations() {
  // Inicializa as animações de scroll
  initScrollAnimations();

  // Inicializa as animações do timeline
  initTimelineAnimations();

  // Inicializa animações específicas da seção About
  initAboutAnimations();
}

/**
 * Inicializa recursos adicionais
 */
function initAdditionalFeatures() {
  // Inicializa o pop-up de saída
  initExitPopup();

  // Inicializa o botão flutuante do WhatsApp
  initWhatsAppFloat();
}

// Executa a inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initializeApp);

// ========== NAVEGAÇÃO E MENU MOBILE ==========

/**
 * Manipula o clique no ícone do menu mobile
 * Toggle do menu mobile - exibe/oculta o menu e alterna o ícone
 */
function handleMenuToggle() {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

// Adiciona evento de clique ao ícone do menu
if (menuIcon) {
  menuIcon.onclick = handleMenuToggle;
}

/**
 * Fecha o menu mobile
 */
function closeMenu() {
  if (menuIcon) {
    menuIcon.classList.remove('bx-x');
  }
  if (navbar) {
    navbar.classList.remove('active');
  }
}

/**
 * Atualiza a navegação com base na seção atual
 * @param {number} scrollPosition - Posição atual do scroll
 */
function updateNavigation(scrollPosition) {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('header nav a');

  sections.forEach(sec => {
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (scrollPosition >= offset && scrollPosition < offset + height) {
      // Remove a classe 'active' de todos os links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });

      // Adiciona classe 'active' ao link correspondente à seção atual
      const activeLink = document.querySelector(`header nav a[href*=${id}]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}

/**
 * Atualiza o estado do header ao rolar a página
 * @param {number} scrollPosition - Posição atual do scroll
 * @returns {boolean} - Se o estado "sticky" mudou
 */
function updateHeaderState(scrollPosition) {
  if (!header) return false;

  const wasSticky = header.classList.contains('sticky');
  const shouldBeSticky = scrollPosition > 100;

  if (wasSticky !== shouldBeSticky) {
    header.classList.toggle('sticky', shouldBeSticky);
    return true; // Estado mudou
  }

  return false; // Estado não mudou
}

/**
 * Função de debounce para otimizar eventos frequentes
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} - Função com debounce
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Manipulador otimizado para eventos de scroll
 */
function handleScroll() {
  const scrollPosition = window.scrollY;

  // Atualiza a navegação
  updateNavigation(scrollPosition);

  // Atualiza o estado do header e o logo se necessário
  const headerStateChanged = updateHeaderState(scrollPosition);
  if (headerStateChanged) {
    updateLogo();
  }

  // Fecha o menu mobile ao rolar
  closeMenu();
}

// Adiciona o manipulador de scroll com debounce para melhor performance
window.onscroll = debounce(handleScroll, 10);

// ========== COMPONENTES DE INTERFACE ==========

/**
 * Inicializa o sistema de FAQ Accordion
 * Controla a abertura/fechamento das perguntas frequentes com animações suaves
 */
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  // Se não encontrar itens de acordeão, encerra a função
  if (accordionItems.length === 0) {
    console.log('Nenhum item de acordeão encontrado');
    return;
  }

  // Função para fechar todos os itens do acordeão
  function closeAllItems() {
    accordionItems.forEach(item => {
      const content = item.querySelector('.accordion-content');
      item.classList.remove('active');
      if (content) {
        content.style.maxHeight = null;
      }
    });
  }

  // Função para abrir um item específico
  function openAccordionItem(item) {
    const content = item.querySelector('.accordion-content');

    // Fecha todos os itens primeiro
    closeAllItems();

    // Abre o item selecionado
    item.classList.add('active');
    if (content) {
      content.style.maxHeight = content.scrollHeight + "px";
    }

    // Scroll suave até o item (com atraso para permitir a animação)
    setTimeout(() => {
      const yOffset = -120; // Offset para considerar o header fixo
      const y = item.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 300);
  }

  // Adicionar evento de clique a cada cabeçalho do accordion
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');

    if (header) {
      header.addEventListener('click', () => {
        // Verifica se este item já está ativo
        const isActive = item.classList.contains('active');

        // Se já estiver ativo, fecha. Senão, abre
        if (isActive) {
          closeAllItems();
        } else {
          openAccordionItem(item);
        }
      });

      // Suporte para navegação com teclado (acessibilidade)
      header.addEventListener('keydown', (e) => {
        // Enter ou Space ativa o item
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          header.click();
        }
      });

      // Adiciona atributos ARIA para acessibilidade
      setupAccordionAccessibility(item, header);
    }
  });

  // Verifica se há um hash na URL para abrir um item específico
  checkUrlHashForAccordion();
}

/**
 * Configura atributos de acessibilidade para um item de acordeão
 * @param {HTMLElement} item - O item do acordeão
 * @param {HTMLElement} header - O cabeçalho do item
 */
function setupAccordionAccessibility(item, header) {
  const content = item.querySelector('.accordion-content');
  if (!content) return;

  // Gera um ID único para o conteúdo
  const contentId = `accordion-content-${Math.random().toString(36).substring(2, 9)}`;
  content.id = contentId;

  // Configura os atributos ARIA
  header.setAttribute('aria-expanded', 'false');
  header.setAttribute('aria-controls', contentId);
  header.setAttribute('role', 'button');
  header.setAttribute('tabindex', '0');

  // Observa mudanças de classe para atualizar aria-expanded
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const isActive = item.classList.contains('active');
        header.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      }
    });
  });

  observer.observe(item, { attributes: true });
}

/**
 * Verifica se há um hash na URL para abrir um item específico do acordeão
 */
function checkUrlHashForAccordion() {
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetItem = document.getElementById(targetId);

    if (targetItem && targetItem.classList.contains('accordion-item')) {
      setTimeout(() => {
        const header = targetItem.querySelector('.accordion-header');
        if (header) {
          header.click();
        }
      }, 500);
    }
  }
}

/**
 * Inicializa o Swiper para a seção de depoimentos
 */
function initTestimonialSwiper() {
  const testimonialContainer = document.querySelector(".testimonial-box.mySwiper");

  if (!testimonialContainer) return;

  new Swiper(testimonialContainer, {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
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
    const slides = swiperContainer.querySelectorAll('.swiper-slide');
    const slideCount = slides.length;

    // Não inicializa o Swiper se não houver slides suficientes
    if (slideCount < 1) return;

    // Configuração do Swiper
    const swiperInstance = new Swiper(swiperContainer, {
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
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
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
      },
      // Acessibilidade aprimorada
      a11y: {
        prevSlideMessage: 'Slide anterior',
        nextSlideMessage: 'Próximo slide',
        firstSlideMessage: 'Este é o primeiro slide',
        lastSlideMessage: 'Este é o último slide',
      }
    });

    // Garantir que imagens sejam carregadas corretamente
    swiperInstance.on('imagesReady', function () {
      swiperInstance.update();
    });
  });
}

// ========== ANIMAÇÕES E EFEITOS ==========

/**
 * Inicializa animações de scroll usando a biblioteca ScrollReveal
 */
function initScrollAnimations() {
  // Verifica se a biblioteca ScrollReveal está disponível
  if (typeof ScrollReveal === 'undefined') {
    console.warn('ScrollReveal não está disponível. As animações de scroll não serão inicializadas.');
    return;
  }

  // Configuração base do ScrollReveal
  const sr = ScrollReveal({
    distance: CONFIG.animation.scrollDistance,
    duration: CONFIG.animation.scrollDuration,
    delay: CONFIG.animation.scrollDelay,
    reset: false
  });

  // Configuração das animações por elemento/seção
  sr.reveal('.home-content, .heading', { origin: 'top' });
  sr.reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
  sr.reveal('.home-content h1, .about-img img', { origin: 'left' });
  sr.reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });

  // Inicializa o Observer de Interseção para animações customizadas
  initIntersectionObserver();
}

/**
 * Inicializa o Observer de Interseção para animações customizadas
 */
function initIntersectionObserver() {
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
 * Verifica se um elemento está visível na viewport
 * @param {HTMLElement} el - Elemento a ser verificado
 * @param {number} offset - Offset opcional para a detecção
 * @returns {boolean} - Se o elemento está visível
 */
function isElementInViewport(el, offset = 0) {
  if (!el) return false;

  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
    rect.bottom >= 0
  );
}

/**
 * Inicializa animações do timeline e cards de confiança
 */
function initTimelineAnimations() {
  const timeline = document.querySelector(".timeline");
  const etapas = document.querySelectorAll(".etapa");
  const trustCards = document.querySelectorAll(".trust-card");

  // Se não houver elementos para animar, encerra a função
  if (!timeline && (!etapas || etapas.length === 0) && (!trustCards || trustCards.length === 0)) {
    return;
  }

  // Configura posições iniciais para animação sequencial
  setupInitialAnimationStates(etapas, trustCards);

  // Função para animar elementos quando entram na viewport
  function animateOnScroll() {
    // Animar as etapas do timeline
    animateTimelineSteps(etapas);

    // Animar os cards de confiança
    animateTrustCards(trustCards);
  }

  // Adicionar listeners para animação ao rolar e carregar a página
  window.addEventListener("scroll", debounce(animateOnScroll, 50));
  window.addEventListener("load", animateOnScroll);

  // Trigger inicial para garantir que os elementos já visíveis sejam animados
  animateOnScroll();

  // Verifica e atualiza a cor das etapas do timeline ao rolar, se existirem
  if (timeline && etapas.length > 0) {
    updateEtapasColors();
    window.addEventListener('scroll', debounce(updateEtapasColors, 50));
  }
}

/**
 * Configura os estados iniciais para as animações
 * @param {NodeList} etapas - Lista de etapas do timeline
 * @param {NodeList} trustCards - Lista de cards de confiança
 */
function setupInitialAnimationStates(etapas, trustCards) {
  // Configurar posição inicial para etapas
  if (etapas && etapas.length > 0) {
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
  }

  // Inicializar cards de confiança para animação
  if (trustCards && trustCards.length > 0) {
    trustCards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
    });
  }
}

/**
 * Anima as etapas do timeline quando visíveis
 * @param {NodeList} etapas - Lista de etapas do timeline
 */
function animateTimelineSteps(etapas) {
  if (!etapas || etapas.length === 0) return;

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
}

/**
 * Anima os cards de confiança quando visíveis
 * @param {NodeList} trustCards - Lista de cards de confiança
 */
function animateTrustCards(trustCards) {
  if (!trustCards || trustCards.length === 0) return;

  trustCards.forEach((card, index) => {
    if (isElementInViewport(card, 150)) {
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 200 * index);
    }
  });
}

/**
 * Atualiza as cores das etapas do timeline com base na posição de scroll
 */
function updateEtapasColors() {
  const timeline = document.querySelector(".timeline");
  const etapas = document.querySelectorAll(".etapa");

  if (!timeline || !etapas || etapas.length === 0) return;

  const trigger = window.innerHeight * 0.3;

  // Atualiza classe do timeline
  if (timeline.getBoundingClientRect().top < trigger) {
    timeline.classList.add("scrolled");
  } else {
    timeline.classList.remove("scrolled");
  }

  // Atualiza cores de cada etapa
  etapas.forEach((etapa) => {
    updateEtapaColor(etapa, trigger);
  });
}

/**
 * Atualiza a cor de uma etapa específica
 * @param {HTMLElement} etapa - Etapa a ser atualizada
 * @param {number} trigger - Ponto de gatilho para mudança de cor
 */
function updateEtapaColor(etapa, trigger) {
  const etapaRect = etapa.getBoundingClientRect();
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const isLight = currentTheme === 'light';

  // Elementos de texto dentro da etapa
  const textoEtapa = etapa.querySelector('p');
  const tituloEtapa = etapa.querySelector('h3');

  if (etapaRect.top < trigger) {
    // Quando a etapa ultrapassa o ponto de gatilho
    etapa.style.setProperty('background-color', 'var(--secundary-color)', 'important');

    // Ajustar cor do texto quando o fundo mudar
    if (textoEtapa) {
      textoEtapa.style.setProperty('color', 'white', 'important');
    }
    if (tituloEtapa) {
      tituloEtapa.style.setProperty('color', 'white', 'important');
    }
  } else {
    // Cores padrão para cada tema
    if (isLight) {
      etapa.style.setProperty('background-color', '#051259', 'important');

      if (textoEtapa) {
        textoEtapa.style.setProperty('color', 'white', 'important');
      }
      if (tituloEtapa) {
        tituloEtapa.style.setProperty('color', 'var(--main-color)', 'important');
      }
    } else {
      etapa.style.setProperty('background-color', 'var(--text-color)', 'important');

      if (textoEtapa) {
        textoEtapa.style.setProperty('color', 'var(--bg-color)', 'important');
      }
      if (tituloEtapa) {
        tituloEtapa.style.setProperty('color', 'var(--main-color)', 'important');
      }
    }
  }
}

/**
 * Animações específicas para a seção About
 */
function initAboutAnimations() {
  // Seleciona os elementos da seção About
  const aboutSection = document.querySelector('.about');

  if (!aboutSection) return;

  const aboutTitle = document.querySelector('.about .section-title');
  const aboutImg = document.querySelector('.about-img');
  const aboutIntro = document.querySelector('.about-intro');
  const benefitsItems = document.querySelectorAll('.benefits-list li');
  const aboutCta = document.querySelector('.about .cta-container');

  // Se ScrollReveal estiver disponível, usa-o para animações
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      distance: '50px',
      duration: 1000,
      easing: 'ease-in-out',
      origin: 'bottom',
      reset: false
    });

    // Anima cada elemento com um delay sequencial
    if (aboutTitle) sr.reveal(aboutTitle, { delay: 100 });
    if (aboutImg) sr.reveal(aboutImg, { delay: 200, origin: 'top' });
    if (aboutIntro) sr.reveal(aboutIntro, { delay: 300 });

    // Anima cada item da lista sequencialmente
    if (benefitsItems && benefitsItems.length > 0) {
      benefitsItems.forEach((item, index) => {
        sr.reveal(item, { delay: 400 + (index * 100) });
      });
    }

    const aboutCtaText = document.querySelector('.about-cta-text');
    if (aboutCtaText) sr.reveal(aboutCtaText, { delay: 800 });
    if (aboutCta) sr.reveal(aboutCta, { delay: 900 });
  } else {
    // Fallback para animações CSS se o ScrollReveal não estiver disponível
    implementCSSFallbackAnimations(aboutSection, aboutTitle, aboutImg, aboutIntro, benefitsItems, aboutCta);
  }
}

/**
 * Implementa animações CSS como fallback quando ScrollReveal não está disponível
 */
function implementCSSFallbackAnimations(aboutSection, aboutTitle, aboutImg, aboutIntro, benefitsItems, aboutCta) {
  // Adiciona classe para animação em cada elemento
  const addAnimationClass = (el, className, delay) => {
    if (!el) return;
    setTimeout(() => {
      el.classList.add(className);
    }, delay);
  };

  // Função para animar quando o elemento está visível
  const animateAboutSection = () => {
    if (isElementInViewport(aboutSection)) {
      if (aboutTitle) addAnimationClass(aboutTitle, 'animate-fade-in-down', 100);
      if (aboutImg) addAnimationClass(aboutImg, 'animate-fade-in-left', 200);
      if (aboutIntro) addAnimationClass(aboutIntro, 'animate-fade-in-up', 300);

      if (benefitsItems && benefitsItems.length > 0) {
        benefitsItems.forEach((item, index) => {
          addAnimationClass(item, 'animate-fade-in-right', 400 + (index * 100));
        });
      }

      const aboutCtaText = document.querySelector('.about-cta-text');
      if (aboutCtaText) addAnimationClass(aboutCtaText, 'animate-fade-in-up', 800);
      if (aboutCta) addAnimationClass(aboutCta, 'animate-fade-in-up', 900);

      // Remove o listener após animar
      window.removeEventListener('scroll', animateAboutSection);
    }
  };

  // Adiciona evento de scroll e verifica inicialmente
  window.addEventListener('scroll', animateAboutSection);
  animateAboutSection(); // Verificação inicial
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
  const imagesToPreload = Object.values(CONFIG.logoPath);

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
  themeToggle.setAttribute('title', 'Alternar entre tema claro e escuro');

  // Inserir o botão no header em vez de no body
  const header = document.querySelector('.header');
  if (header) {
    header.appendChild(themeToggle);
  } else {
    document.body.appendChild(themeToggle); // Fallback se o header não for encontrado
  }

  // Configurar evento de clique para alternância de tema
  themeToggle.addEventListener('click', toggleTheme);
}

/**
 * Alterna entre os temas claro e escuro
 */
function toggleTheme() {
  // Adiciona classe de transição ao body
  document.body.classList.add('theme-transitioning');

  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  // Executa a troca de tema
  setTheme(newTheme);

  // Remove a classe de transição após a conclusão
  setTimeout(() => {
    document.body.classList.remove('theme-transitioning');
  }, CONFIG.themeTransition.duration);
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
  observeThemeChanges();

  // Também observar mudanças na preferência do sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      // Só muda automaticamente se o usuário não tiver uma preferência salva
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

/**
 * Observa mudanças no atributo data-theme e atualiza a UI
 */
function observeThemeChanges() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        requestAnimationFrame(() => {
          updateLogo();
          updateFooterLogo();
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

  // Atualiza elementos visuais que dependem do tema
  updateLogo();
  updateFooterLogo();

  // Opcional: Dispara um evento customizado para que outros scripts possam reagir
  document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
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
    themeToggle.setAttribute('title', 'Mudar para tema escuro');
  } else {
    themeToggle.innerHTML = '<i class="bx bx-sun"></i>';
    themeToggle.setAttribute('title', 'Mudar para tema claro');
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

  // Define qual imagem usar em cada cenário
  let newSrc;

  if (currentTheme === 'light') {
    // No tema light, sempre usa logo-white.webp
    newSrc = CONFIG.logoPath.light;
  } else {
    // No tema dark, alterna conforme rolagem
    newSrc = isSticky ? CONFIG.logoPath.sticky : CONFIG.logoPath.dark;
  }

  // Atualiza só se necessário (comparando apenas o nome do arquivo)
  const currentLogoName = logo.src.split('/').pop();
  const newLogoName = newSrc.split('/').pop();

  if (currentLogoName !== newLogoName) {
    logo.src = newSrc;
  }
}

/**
 * Atualiza o logo do footer com base no tema atual
 */
function updateFooterLogo() {
  const footerLogo = document.querySelector('.footer-logo img');
  if (!footerLogo) return;

  const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';

  footerLogo.src = isDarkTheme
    ? CONFIG.logoPath.footerLight
    : CONFIG.logoPath.footerDark;
}

/**
 * Adiciona estilos CSS para transições suaves de tema
 */
function addThemeTransitionStyles() {
  // Verifica se os estilos já existem
  if (document.querySelector('#theme-transition-styles')) return;

  const styleElement = document.createElement('style');
  styleElement.id = 'theme-transition-styles';
  styleElement.textContent = `
    /* Estilo para transição de tema suave */
    *, *::before, *::after {
      transition: background-color ${CONFIG.themeTransition.elementsDuration}ms ease, 
                 color ${CONFIG.themeTransition.elementsDuration}ms ease, 
                 border-color ${CONFIG.themeTransition.elementsDuration}ms ease, 
                 box-shadow ${CONFIG.themeTransition.elementsDuration}ms ease;
    }
    
    /* Classe específica para quando o tema está mudando */
    body.theme-transitioning {
      transition: background-color ${CONFIG.themeTransition.duration}ms ease;
    }
    
    /* Exceções para elementos que não devem ter transição */
    .no-transition {
      transition: none !important;
    }
  `;
  document.head.appendChild(styleElement);
}

// ========== FORMULÁRIO DE CONTATO ==========

/**
 * Inicializa o formulário de contato com validações e feedback visual
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return; // Verifica se o formulário existe

  const inputs = form.querySelectorAll('input, textarea');

  // Adiciona efeitos de animação aos inputs quando focados
  setupInputAnimations(inputs);

  // Inicializa os checkboxes personalizados
  initServiceCheckboxes();

  // Adiciona máscara ao campo de telefone
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', formatPhoneNumber);
  }

  // Adiciona estilos para notificações
  addNotificationStyles();
}

/**
 * Configura animações para campos de entrada
 * @param {NodeList} inputs - Lista de inputs do formulário
 */
function setupInputAnimations(inputs) {
  if (!inputs || inputs.length === 0) return;

  inputs.forEach(input => {
    // Animação ao focar no input
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('input-focused');
    });

    // Remove animação ao tirar o foco
    input.addEventListener('blur', () => {
      if (!input.value.trim()) {
        input.parentElement.classList.remove('input-focused');
      }
    });

    // Mantém o efeito se já tiver valor
    if (input.value.trim()) {
      input.parentElement.classList.add('input-focused');
    }
  });
}

/**
 * Inicializa os checkboxes de serviços
 */
function initServiceCheckboxes() {
  const serviceOptions = document.querySelectorAll('.service-option');

  if (!serviceOptions || serviceOptions.length === 0) return;

  serviceOptions.forEach(option => {
    const checkbox = option.querySelector('input[type="checkbox"]');

    if (!checkbox) return;

    // Verifica estado inicial
    if (checkbox.checked) {
      option.classList.add('selected');
    }

    // Adiciona evento de mudança
    checkbox.addEventListener('change', function () {
      toggleServiceOptionSelection(option, this.checked);
    });

    // Garantia de clicabilidade (solução para problema em alguns navegadores)
    option.addEventListener('click', function (e) {
      if (e.target !== checkbox) {
        e.preventDefault();
        checkbox.checked = !checkbox.checked;

        // Atualiza estilo visual
        toggleServiceOptionSelection(option, checkbox.checked);

        // Dispara evento de mudança
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  });
}

/**
 * Alterna a seleção visual de uma opção de serviço
 * @param {HTMLElement} option - Elemento da opção
 * @param {boolean} isSelected - Estado de seleção
 */
function toggleServiceOptionSelection(option, isSelected) {
  if (isSelected) {
    option.classList.add('selected');
  } else {
    option.classList.remove('selected');
  }
}

/**
 * Formata o número de telefone no padrão xx xxxxx-xxxx enquanto o usuário digita
 * @param {Event} event - Evento de input
 */
function formatPhoneNumber(event) {
  const input = event.target;
  let value = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

  if (value.length > 11) {
    value = value.substring(0, 11); // Limita a 11 dígitos (com DDD)
  }

  // Aplica a formatação conforme o usuário digita
  if (value.length > 0) {
    if (value.length <= 2) {
      input.value = value;
    } else if (value.length <= 7) {
      input.value = `${value.substring(0, 2)} ${value.substring(2)}`;
    } else {
      input.value = `${value.substring(0, 2)} ${value.substring(2, 7)}-${value.substring(7)}`;
    }
  }
}

/**
 * Valida as entradas do formulário antes do envio
 * @returns {Object} - Objeto com campos validados ou erro
 */
function validateForm() {
  // Obtenção dos valores dos campos
  const fields = {
    name: document.getElementById("name")?.value?.trim() || '',
    company: document.getElementById("company")?.value?.trim() || '',
    email: document.getElementById("email")?.value?.trim() || '',
    phone: document.getElementById("phone")?.value?.trim() || '',
    message: document.getElementById("message")?.value?.trim() || ''
  };

  // Verifica campos obrigatórios
  const requiredFields = ["name", "email", "phone"];
  const missingFields = [];

  // Validação de campos vazios com feedback visual
  let hasError = false;

  requiredFields.forEach(fieldName => {
    const field = document.getElementById(fieldName);
    if (!fields[fieldName]) {
      if (field) {
        field.classList.add('error');
        // Animação de shake para campos vazios
        field.classList.add('shake');
        setTimeout(() => field.classList.remove('shake'), 500);
      }
      missingFields.push(fieldName);
      hasError = true;
    } else if (field) {
      field.classList.remove('error');
    }
  });

  if (hasError) {
    return { success: false, error: 'missingFields', missingFields };
  }

  // Validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(fields.email)) {
    const emailField = document.getElementById("email");
    if (emailField) {
      emailField.classList.add('error');
      emailField.classList.add('shake');
      setTimeout(() => emailField.classList.remove('shake'), 500);
    }
    return { success: false, error: 'invalidEmail' };
  }

  // Validação de telefone
  const phoneClean = fields.phone.replace(/\D/g, '');
  const phoneRegex = /^(?:\+?55)?(?:\d{2})?\d{8,9}$/;
  if (!phoneRegex.test(phoneClean)) {
    const phoneField = document.getElementById("phone");
    if (phoneField) {
      phoneField.classList.add('error');
      phoneField.classList.add('shake');
      setTimeout(() => phoneField.classList.remove('shake'), 500);
    }
    return { success: false, error: 'invalidPhone' };
  }

  // Retorna campos validados se tudo estiver ok
  return {
    success: true,
    fields
  };
}

/**
 * Envia formulário de contato para o WhatsApp
 */
function sendToWhatsApp() {
  // Validação do formulário
  const validation = validateForm();

  if (!validation.success) {
    // Exibe mensagem de erro apropriada
    switch (validation.error) {
      case 'missingFields':
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        break;
      case 'invalidEmail':
        showNotification('Por favor, insira um email válido.', 'error');
        break;
      case 'invalidPhone':
        showNotification('Por favor, insira um número de telefone válido.', 'error');
        break;
      default:
        showNotification('Ocorreu um erro na validação do formulário.', 'error');
    }
    return;
  }

  const { fields } = validation;

  // Serviços selecionados
  const services = Array.from(document.querySelectorAll('.service-option input[type="checkbox"]:checked'))
    .map(checkbox => {
      const textElement = checkbox.closest('.service-option')?.querySelector('.checkbox-text');
      return textElement ? textElement.textContent.trim() : "";
    })
    .filter(text => text) // Remove textos vazios
    .join(", ");

  // Montagem da mensagem formatada
  const whatsappMessage = `Olá, meu nome é *${fields.name}*!  
───────────────  
📋 *Dados do Contato*  
- Empresa: *${fields.company || "Não informada"}*  
- Email: *${fields.email}*  
- Telefone: *${fields.phone}*  
- Serviços: *${services || "Não especificado"}*  
  
💬 *Mensagem*  
${fields.message || "Sem mensagem adicional."}  
  
Gostaria de mais informações. Aguardo seu retorno!`;

  // Mostrar uma notificação de sucesso antes de redirecionar
  showNotification('Redirecionando para o WhatsApp...', 'success');

  // Pequeno atraso antes de abrir o WhatsApp
  setTimeout(() => {
    window.open(`https://wa.me/${CONFIG.phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
  }, 1000);
}

/**
 * Exibe uma notificação estilizada para feedback do usuário
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo de notificação ('success', 'error', 'info')
 */
function showNotification(message, type = 'info') {
  // Verifica se já existe uma notificação e remove
  const existingNotification = document.querySelector('.form-notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Cria o elemento de notificação
  const notification = document.createElement('div');
  notification.className = `form-notification ${type}`;
  notification.setAttribute('role', 'alert');

  // Ícone baseado no tipo
  let icon = '';
  switch (type) {
    case 'success':
      icon = '<i class="bx bx-check-circle"></i>';
      break;
    case 'error':
      icon = '<i class="bx bx-error-circle"></i>';
      break;
    default:
      icon = '<i class="bx bx-info-circle"></i>';
  }

  // Define o conteúdo
  notification.innerHTML = `
    ${icon}
    <span>${message}</span>
  `;

  // Adiciona ao DOM
  document.body.appendChild(notification);

  // Adiciona a classe de animação após um pequeno delay
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  // Remove a notificação após alguns segundos
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/**
 * Adiciona estilos CSS para as notificações do formulário
 */
function addNotificationStyles() {
  // Verifica se os estilos já existem
  if (document.querySelector('#notification-styles')) return;

  const styleElement = document.createElement('style');
  styleElement.id = 'notification-styles';
  styleElement.textContent = `
    /* Estilos para as notificações do formulário */
    .form-notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 1000;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      transform: translateY(100px);
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
      max-width: 90%;
    }
    
    .form-notification.show {
      transform: translateY(0);
      opacity: 1;
    }
    
    .form-notification i {
      font-size: 1.8rem;
    }
    
    .form-notification.success {
      background: rgba(46, 204, 113, 0.9);
    }
    
    .form-notification.error {
      background: rgba(231, 76, 60, 0.9);
    }
    
    /* Estilos para feedback visual nos campos */
    #contactForm input.error,
    #contactForm textarea.error {
      border-color: rgba(231, 76, 60, 0.6) !important;
      box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.3) !important;
      background: rgba(231, 76, 60, 0.05) !important;
    }
    
    @keyframes shake {
      0%, 100% {transform: translateX(0);}
      20%, 60% {transform: translateX(-5px);}
      40%, 80% {transform: translateX(5px);}
    }
    
    .shake {
      animation: shake 0.5s ease;
    }
    
    /* Estilo para checkbox selecionado */
    .service-option.selected {
      background: rgba(242, 48, 120, 0.2) !important;
      border-color: var(--secundary-color) !important;
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(242, 48, 120, 0.2);
    }
    
    /* Ajuste para tema claro */
    [data-theme="light"] .form-notification {
      background: rgba(255, 255, 255, 0.9);
      color: #051259;
      box-shadow: 0 5px 15px rgba(5, 18, 89, 0.1);
      border: 1px solid rgba(5, 18, 89, 0.1);
    }
    
    [data-theme="light"] .form-notification.success {
      background: rgba(46, 204, 113, 0.9);
      color: white;
    }
    
    [data-theme="light"] .form-notification.error {
      background: rgba(231, 76, 60, 0.9);
      color: white;
    }
  `;
  document.head.appendChild(styleElement);
}

// ========== RECURSOS ADICIONAIS ==========

/**
 * Inicializa o pop-up de saída que aparece quando o usuário tenta deixar a página
 * Este pop-up oferece uma oferta especial para incentivar a conversão
 */
function initExitPopup() {
  const exitPopup = document.getElementById('exitPopup');
  if (!exitPopup) return;

  const closePopupButton = document.querySelector('.close-popup');
  const btnSecondary = document.querySelector('.exit-popup .btn-secondary');
  const btnPrimary = document.querySelector('.exit-popup .btn-primary');
  const contactForm = document.querySelector('#contact form');

  // Fechar o pop-up ao clicar no botão de fechar
  if (closePopupButton) {
    closePopupButton.addEventListener('click', () => {
      closeExitPopup(exitPopup);
    });
  }

  // Fechar o pop-up ao clicar no botão "Agora não"
  if (btnSecondary) {
    btnSecondary.addEventListener('click', () => {
      closeExitPopup(exitPopup);
    });
  }

  // Fechar o pop-up ao clicar no botão "Quero Aproveitar" e mostrar o balão informativo
  if (btnPrimary) {
    btnPrimary.addEventListener('click', (e) => {
      closeExitPopup(exitPopup);

      // Pequeno atraso para garantir que o scroll termine antes de mostrar o balão
      setTimeout(() => {
        showFormTooltip();
      }, 500);
    });
  }

  // Fechar o popup ao clicar fora dele
  exitPopup.addEventListener('click', (e) => {
    if (e.target === exitPopup) {
      closeExitPopup(exitPopup);
    }
  });

  // Detectar quando o mouse sai da página (intenção de sair)
  setupExitIntent(exitPopup);

  // Adicionar acessibilidade
  setupExitPopupAccessibility(exitPopup);
}

/**
 * Cria e exibe um balão informativo acima do formulário
 */
function showFormTooltip() {
  // Verificar se o balão já existe para não criar duplicados
  if (document.getElementById('formTooltip')) return;

  // Criar o elemento do balão
  const tooltip = document.createElement('div');
  tooltip.id = 'formTooltip';
  tooltip.className = 'form-tooltip';
  tooltip.innerHTML = `
    <div class="tooltip-content">
      <p>Para aproveitar sua oferta exclusiva de 15% de desconto, preencha o formulário abaixo! 🚀</p>
      <button class="tooltip-close"><i class='bx bx-x'></i></button>
    </div>
  `;

  // Adicionar estilos inline (você pode mover isso para seu CSS)
  tooltip.style.cssText = `
    position: relative;
    margin-bottom: 20px;
    animation: fadeIn 0.5s ease-in-out;
  `;

  tooltip.querySelector('.tooltip-content').style.cssText = `
    background-color: #f8f9fa;
    border-left: 4px solid #0d6efd;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  `;

  tooltip.querySelector('p').style.cssText = `
    margin: 0;
    font-weight: bold;
    color: #333;
  `;

  tooltip.querySelector('.tooltip-close').style.cssText = `
    position: absolute;
    top: 5px;
    right: 5px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
  `;

  // Adicionar animação ao CSS (você pode mover isso para seu CSS)
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  // Inserir o balão antes do formulário de contato
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.parentNode.insertBefore(tooltip, contactForm);

    // Adicionar event listener para fechar o balão
    tooltip.querySelector('.tooltip-close').addEventListener('click', () => {
      tooltip.remove();
    });

    // Remover o balão automaticamente após 10 segundos
    setTimeout(() => {
      if (tooltip.parentNode) {
        tooltip.remove();
      }
    }, 10000);
  }
}

/**
 * Configura a detecção de intenção de saída
 * @param {HTMLElement} exitPopup - O elemento do popup
 */
function setupExitIntent(exitPopup) {
  let showOnce = false;
  let sessionShown = sessionStorage.getItem('exitPopupShown') === 'true';

  // Só mostra uma vez por sessão
  if (sessionShown) return;

  // Timer para mostrar o popup depois de um tempo
  const exitTimer = setTimeout(() => {
    if (!showOnce && document.visibilityState === 'visible') {
      showExitPopup(exitPopup);
    }
  }, 60000); // 60 segundos

  // Evento de mouse leave
  document.addEventListener('mouseleave', (e) => {
    // Verificar se o mouse está saindo pelo topo da página
    if (e.clientY < 5 && !showOnce && document.visibilityState === 'visible'
      && window.scrollY > 100) {
      clearTimeout(exitTimer);
      showExitPopup(exitPopup);
    }
  });

  // Limpar timer se o usuário navegar para outra página
  window.addEventListener('beforeunload', () => {
    clearTimeout(exitTimer);
  });
}

/**
 * Exibe o popup de saída
 * @param {HTMLElement} exitPopup - O elemento do popup
 */
function showExitPopup(exitPopup) {
  exitPopup.classList.add('show');
  // Marcar como já exibido
  sessionStorage.setItem('exitPopupShown', 'true');
  showOnce = true;

  // Focar no primeiro elemento focável para acessibilidade
  const firstFocusable = exitPopup.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (firstFocusable) {
    firstFocusable.focus();
  }
}

/**
 * Fecha o popup de saída
 * @param {HTMLElement} exitPopup - O elemento do popup
 */
function closeExitPopup(exitPopup) {
  exitPopup.classList.remove('show');
}

/**
 * Configura recursos de acessibilidade para o popup
 * @param {HTMLElement} exitPopup - O elemento do popup
 */
function setupExitPopupAccessibility(exitPopup) {
  // Trap de foco para manter o foco dentro do modal quando aberto
  exitPopup.addEventListener('keydown', (e) => {
    // Se não estiver visível, não precisamos fazer nada
    if (!exitPopup.classList.contains('show')) return;

    // Se a tecla ESC for pressionada, fecha o popup
    if (e.key === 'Escape') {
      closeExitPopup(exitPopup);
      return;
    }

    // Se não for tab, não precisamos fazer nada
    if (e.key !== 'Tab') return;

    // Pega todos os elementos focáveis dentro do popup
    const focusableElements = exitPopup.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Se segurar shift + tab e estiver no primeiro elemento, vai para o último
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    }
    // Se pressionar tab e estiver no último elemento, vai para o primeiro
    else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  });
}

// Inicializar o popup quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  initExitPopup();
});

/**
 * Inicializa as funcionalidades do botão flutuante do WhatsApp
 */
function initWhatsAppFloat() {
  const whatsappFloat = document.querySelector('.whatsapp-float');
  if (!whatsappFloat) return;

  // Adiciona atributos de acessibilidade
  whatsappFloat.setAttribute('aria-label', 'Enviar mensagem pelo WhatsApp');
  whatsappFloat.setAttribute('title', 'Fale conosco pelo WhatsApp');

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
  setupPulseAnimation(whatsappFloat);

  // Adiciona o número de telefone diretamente no link
  const phoneNumber = CONFIG.phoneNumber;
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  whatsappFloat.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(whatsappLink, '_blank');
  });
}

/**
 * Configura animação de pulso para o botão WhatsApp
 * @param {HTMLElement} element - Elemento a ser animado
 */
function setupPulseAnimation(element) {
  // Inicial pulse depois de 3 segundos
  setTimeout(() => {
    startPulseAnimation(element);
  }, 3000);

  // Continua pulsando a cada 10 segundos
  setInterval(() => {
    startPulseAnimation(element);
  }, 10000);
}

/**
 * Inicia uma única animação de pulso
 * @param {HTMLElement} element - Elemento a ser animado
 */
function startPulseAnimation(element) {
  element.classList.add('pulse-animation');
  setTimeout(() => {
    element.classList.remove('pulse-animation');
  }, 1000);
}

/**
 * Adiciona o CSS para a animação de pulso
 */
function addPulseAnimationStyle() {
  // Verifica se os estilos já existem
  if (document.querySelector('#pulse-animation-style')) return;

  const styleElement = document.createElement('style');
  styleElement.id = 'pulse-animation-style';
  styleElement.textContent = `
    @keyframes pulse {
      0% {
        transform: scale(1);
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
      }
      50% {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(37, 211, 102, 0.5);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
      }
    }
    
    .pulse-animation {
      animation: pulse 1s ease-in-out;
    }
  `;
  document.head.appendChild(styleElement);
}

// Inicializa os estilos de animação ao carregar o documento
document.addEventListener('DOMContentLoaded', addPulseAnimationStyle);

// ========== EXPORTAÇÕES GLOBAIS ==========

// Expõe funções necessárias para uso em atributos HTML
window.sendToWhatsApp = sendToWhatsApp;
window.toggleTheme = toggleTheme;

// Evento disparado quando o documento está pronto
document.addEventListener('DOMContentLoaded', () => {
  console.log('GB Connect initialized successfully');
});

// Log para depuração
console.log('GB Connect script loaded');