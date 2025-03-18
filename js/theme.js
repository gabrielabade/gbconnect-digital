// ========== Theme Toggle System ==========
document.addEventListener('DOMContentLoaded', () => {
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
    updateAboutImages(theme); // Adicionado: atualiza as imagens da seção About
  }

  // Atualizar ícone de alternância
  function updateToggleIcon(theme) {
    if (theme === 'light') {
      themeToggle.innerHTML = '<i class="bx bx-moon"></i>';
    } else {
      themeToggle.innerHTML = '<i class="bx bx-sun"></i>';
    }
  }

  // Atualizar imagens da seção About - nova função
  function updateAboutImages(theme) {
    const darkImg = document.querySelector('.theme-dark-img');
    const lightImg = document.querySelector('.theme-light-img');

    if (!darkImg || !lightImg) return; // Sai da função se as imagens não forem encontradas

    if (theme === 'light') {
      darkImg.style.display = 'none';
      lightImg.style.display = 'block';
    } else {
      darkImg.style.display = 'block';
      lightImg.style.display = 'none';
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

  // Alternar tema ao clicar no botão
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  // Atualização de logo baseada no tema
  function updateLogo() {
    const logo = document.querySelector('.logo img');
    if (!logo) return; // Evita erro se não encontrar a logo

    const currentTheme = document.documentElement.getAttribute('data-theme');
    const isSticky = document.querySelector('.header').classList.contains('sticky');

    // Use apenas os arquivos de logo que você já tem certeza que existem
    if (currentTheme === 'light') {
      logo.src = isSticky ? './images/logo-white.webp' : './images/logo-white.webp';
    } else {
      logo.src = isSticky ? './images/logo-nav.webp' : './images/logocolor1.webp';
    }
  }

  // Observador para mudanças no atributo data-theme
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        updateLogo();
        // Adicionado: atualiza as imagens quando o tema muda
        const currentTheme = document.documentElement.getAttribute('data-theme');
        updateAboutImages(currentTheme);
      }
    });
  });

  observer.observe(document.documentElement, { attributes: true });

  // Atualizar logo também quando o header ficar sticky
  window.addEventListener('scroll', () => {
    updateLogo();
  });

  // Inicializar logo e imagens do About na carga da página
  updateLogo();
  const initialTheme = document.documentElement.getAttribute('data-theme');
  updateAboutImages(initialTheme);
});


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