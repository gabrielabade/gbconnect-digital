// ========== Theme Toggle System - Otimizado ==========
document.addEventListener('DOMContentLoaded', () => {
  // Pré-carregamento de imagens
  function preloadImages() {
    // Cria um array com os caminhos de todas as imagens que precisam ser pré-carregadas
    const imagesToPreload = [
      './images/logo-white.webp',
      './images/logo-nav.webp',
      './images/logocolor1.webp'
    ];

    // Localiza as imagens de tema claro/escuro na seção about
    const darkImg = document.querySelector('.theme-dark-img');
    const lightImg = document.querySelector('.theme-light-img');

    // Adiciona os caminhos das imagens de tema ao array, se existirem
    if (darkImg && darkImg.getAttribute('src')) {
      imagesToPreload.push(darkImg.getAttribute('src'));
    }

    if (lightImg && lightImg.getAttribute('src')) {
      imagesToPreload.push(lightImg.getAttribute('src'));
    }

    // Pré-carrega todas as imagens
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  // Chamar o pré-carregamento assim que o DOM estiver pronto
  preloadImages();

  // Criar o botão de alternância de tema
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

  // Verificar e definir tema
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateToggleIcon(theme);
    updateAboutImages(theme); // Atualiza as imagens da seção About
  }

  // Atualizar ícone de alternância
  function updateToggleIcon(theme) {
    if (theme === 'light') {
      themeToggle.innerHTML = '<i class="bx bx-moon"></i>';
    } else {
      themeToggle.innerHTML = '<i class="bx bx-sun"></i>';
    }
  }

  // Atualizar imagens da seção About - otimizado
  function updateAboutImages(theme) {
    const darkImg = document.querySelector('.theme-dark-img');
    const lightImg = document.querySelector('.theme-light-img');

    if (!darkImg || !lightImg) return; // Sai da função se as imagens não forem encontradas

    // Aplica a mudança diretamente com CSS para melhor performance
    if (theme === 'light') {
      darkImg.style.display = 'none';
      lightImg.style.display = 'block';
    } else {
      darkImg.style.display = 'block';
      lightImg.style.display = 'none';
    }
  }

  // Atualização de logo - otimizada
  function updateLogo() {
    const logo = document.querySelector('.logo img');
    if (!logo) return; // Evita erro se não encontrar a logo

    const currentTheme = document.documentElement.getAttribute('data-theme');
    const isSticky = document.querySelector('.header').classList.contains('sticky');

    // Evita carregar a mesma imagem se já estiver carregada
    const newSrc = currentTheme === 'light'
      ? './images/logo-white.webp'
      : (isSticky ? './images/logo-nav.webp' : './images/logocolor1.webp');

    if (logo.src !== newSrc) {
      logo.src = newSrc;
    }
  }

  // Verificar preferência do usuário
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    setTheme(savedTheme);
  } else if (prefersDark) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  // Alternar tema ao clicar no botão - com feedback visual durante a mudança
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

  // Observador para mudanças no atributo data-theme - otimizado
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        requestAnimationFrame(() => {
          updateLogo();
          const currentTheme = document.documentElement.getAttribute('data-theme');
          updateAboutImages(currentTheme);
        });
      }
    });
  });

  observer.observe(document.documentElement, { attributes: true });

  // Atualizar logo também quando o header ficar sticky
  window.addEventListener('scroll', () => {
    requestAnimationFrame(updateLogo);
  });

  // Inicializar logo e imagens do About na carga da página
  updateLogo();
  const initialTheme = document.documentElement.getAttribute('data-theme');
  updateAboutImages(initialTheme);
});

// Adicionar CSS diretamente para a transição mais suave
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
  
  /* Otimiza as transições para imagens específicas */
  .theme-dark-img, .theme-light-img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    opacity: 1;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }
  
  /* Corrige o posicionamento da imagem ativa */
  .theme-dark-img[style*="display: block"],
  .theme-light-img[style*="display: block"] {
    position: relative;
    pointer-events: auto;
  }
`;
document.head.appendChild(styleElement);

// O resto do código (etapas da timeline) permanece igual
document.addEventListener('DOMContentLoaded', function () {
  const timeline = document.querySelector(".timeline");
  const etapas = document.querySelectorAll(".etapa");

  if (timeline && etapas.length > 0) {
    // Função que verifica e atualiza a cor das etapas
    function updateEtapasColors() {
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
              tituloEtapa.style.setProperty('color', '#E2FF00', 'important');
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
    updateEtapasColors();
    window.addEventListener('scroll', updateEtapasColors);
  }
});