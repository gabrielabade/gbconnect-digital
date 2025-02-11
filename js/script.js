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
    logo.src = './images/logocolor1.png';  // A nova imagem para o estado sticky
  } else {
    logo.src = './images/logo-nav.png';  // A imagem original
  }

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
function sendToWhatsApp() {
  const phoneNumber = "5548991056014";

  // Obter os valores do formulário
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Construir a mensagem
  const whatsappMessage = `Olá! Meu nome é ${name}.
Email: ${email}
Telefone: ${phone}
Assunto: ${subject}
Mensagem: ${message}`;

  // Codificar a mensagem para uso no link
  const encodedMessage = encodeURIComponent(whatsappMessage);

  // Redirecionar para o WhatsApp com a mensagem
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
