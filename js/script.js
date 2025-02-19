// ========== Variáveis Globais ==========
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');
const logo = document.querySelector('.logo img');

// ========== Menu e Navegação ==========
menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

// ========== Scroll e Navegação Ativa ==========
window.onscroll = () => {
  // Ativar links do menu
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('header nav a');

  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
    }
  });

  // Navbar fixa e troca de logo
  header.classList.toggle('sticky', window.scrollY > 100);
  logo.src = window.scrollY > 100 ? './images/logo-nav.png' : './images/logocolor1.png';

  // Fechar menu mobile ao rolar
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
};

// ========== FAQ Accordion ==========
document.addEventListener('DOMContentLoaded', () => {
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
});

// ========== Swiper Initialization ==========
document.addEventListener('DOMContentLoaded', () => {
  // Inicialização do Swiper para testimonials
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

  // Inicialização do Swiper para portfolio
  const projectSwipers = document.querySelectorAll('.portfolio-box.mySwiper');
  projectSwipers.forEach(swiperContainer => {
    const slideCount = swiperContainer.querySelectorAll('.swiper-slide').length;

    new Swiper(swiperContainer, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: slideCount > 2,
      grabCursor: true,
      pagination: {
        el: swiperContainer.querySelector('.swiper-pagination'),
        clickable: true,
      },
      navigation: {
        nextEl: swiperContainer.querySelector('.swiper-button-next'),
        prevEl: swiperContainer.querySelector('.swiper-button-prev'),
      },
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
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 2,
      }
    });
  });
});

// ========== ScrollReveal Animations ==========
ScrollReveal({
  distance: '80px',
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });

// ========== Formulário WhatsApp ==========
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
• Empresa: *${fields.company}*  
• Email: *${fields.email}*  
• Telefone: *${fields.phone}*  
• Serviços: *${services || "Não especificado"}*  
  
💬 *Mensagem*  
${fields.message}  
  
Gostaria de mais informações. Aguardo seu retorno!`;

  // Envio da mensagem
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
}

// ========== Animações de Entrada ==========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-on-scroll');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.services-box, .about-content, .portfolio-item').forEach(el => {
  observer.observe(el);
});