/*========== menu icon navbar ==========*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};


/*========== scroll sections active link ==========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });
    };
  });


  /*========== sticky navbar ==========*/
  let header = document.querySelector('.header');
  let logo = document.querySelector('.logo img');
  header.classList.toggle('sticky', window.scrollY > 100);
  // Mudar logo quando a página rolar
  if (window.scrollY > 100) {
    logo.src = './images/logo-nav.png';
    // A nova imagem para o estado sticky
  } else {
    logo.src = './images/logocolor1.png';
    // A imagem original
  }

  const scrollThreshold = 100; // Ajuste conforme necessário

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });
  /*========== remove menu icon navbar when click navbar link (scroll) ==========*/
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');

};


/*========== swiper ==========*/
var swiper = new Swiper(".mySwiper", {
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
  },
});


/*========== dark light mode ==========*/
let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle('bx-sun');
  document.body.classList.toggle('dark-mode');
};


/*========== scroll reveal ==========*/
ScrollReveal({
  // reset: true,
  distance: '80px',
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });

/* form envio dos dados para o whatsapp  */
/* Função para envio dos dados para o whatsapp */
function sendToWhatsApp() {
  // Número que vai receber as mensagens
  const phoneNumber = "5548991056014";

  // Pegar os valores do formulário
  const name = document.getElementById("name").value.trim();
  const company = document.getElementById("company").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  // Pegar serviços marcados
  const services = Array.from(document.querySelectorAll('input[name="service"]:checked'))
    .map(service => service.nextSibling.textContent.trim())
    .join(", ");

  // Verificar se preencheu tudo
  if (!name || !company || !email || !phone || !message) {
    alert("Por favor, preencha todos os campos antes de enviar.");
    return;
  }

  // Função para validar o número de telefone
  function validatePhoneNumber(phone) {
    // Regex para validar número de telefone brasileiro (com ou sem DDD e somente números)
    const phoneRegex = /^(?:\+?55)?(?:\d{2})?(?:9\d{8})$/;
    // Remove qualquer caractere não numérico e verifica se o telefone é válido
    return phoneRegex.test(phone.replace(/\D/g, ''));
  }

  // Validar formato do número de telefone
  if (!validatePhoneNumber(phone)) {
    alert("Por favor, insira um número de telefone válido.");
    return;
  }

  // Validar formato do email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, insira um email válido.");
    return;
  }

  // Montar a mensagem
  const whatsappMessage = `Olá, meu nome é *${name}*!  
───────────────  
📋 *Dados do Contato*  
• Empresa: *${company}*  
• Email: *${email}*  
• Telefone: *${phone}*  
• Serviços: *${services || "Não especificado"}*  
  
💬 *Mensagem*  
${message}  
  
Gostaria de mais informações. Aguardo seu retorno!`;

  // Preparar mensagem para o link
  const encodedMessage = encodeURIComponent(whatsappMessage);

  // Abrir WhatsApp com a mensagem
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
}

/* ==== carrossel para cada categoria de projetos ====*/
const projectSwipers = document.querySelectorAll('.portfolio-box.mySwiper');

// Inicializa os carrosséis
projectSwipers.forEach(swiperContainer => {
  const pagination = swiperContainer.querySelector('.swiper-pagination');
  const nextButton = swiperContainer.querySelector('.swiper-button-next');
  const prevButton = swiperContainer.querySelector('.swiper-button-prev');

  // Garante a configuração correta com base na quantidade de slides
  const slideCount = swiperContainer.querySelectorAll('.swiper-slide').length;

  new Swiper(swiperContainer, {
    slidesPerView: slideCount > 1 ? 1 : slideCount, // Exibe no mínimo 1 slide
    spaceBetween: 20,
    loop: slideCount > 2, // Apenas ativa o loop se houver mais de 1 slide
    grabCursor: true,
    pagination: {
      el: pagination,
      clickable: true,
    },
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 2,
    },
  });
});

// animações de entrada

const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-on-scroll');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.services-box, .about-content, .portfolio-item').forEach(el => {
  observer.observe(el);
});