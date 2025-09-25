document.addEventListener("DOMContentLoaded", () => {
  // Detecta se a página atual está dentro da pasta /pages/
  const basePath = window.location.pathname.includes("/pages/") ? "../" : "./";

  // Função para inicializar acessibilidade
  function initAcessibilidade() {
    const toggleBtn = document.getElementById("acessibilidade-toggle");
    const menu = document.getElementById("acessibilidade-menu");
    if (!toggleBtn || !menu) return;

    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = menu.style.display === "flex";
      menu.style.display = isOpen ? "none" : "flex";
      toggleBtn.setAttribute("aria-expanded", !isOpen);
    });

    document.querySelectorAll(".acess-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.action;
        switch (action) {
          case "alto-contraste":
            document.body.classList.toggle("alto-contraste");
            break;
          case "aumentar-fonte":
            document.body.classList.toggle("fonte-grande");
            break;
          case "leitura":
            alert("Funcionalidade de leitura de tela ativada (exemplo).");
            break;
        }
      });
    });
  }

  // Função para inicializar carrossel
  function initCarousel() {
    const slides = document.querySelectorAll(".carousel-slide img");
    const carousel = document.querySelector(".carousel-principal");
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");
    if (!slides.length || !carousel || !prevBtn || !nextBtn) return;

    const fundos = [
      `${basePath}img/nutri.png`,
      `${basePath}img/carrousel4.jpg`,
      `${basePath}img/carrousel2.jpg`,
    ];
    let indice = 0;

    function mostrarSlide(n) {
      slides.forEach((slide, i) => slide.classList.toggle("active", i === n));
      carousel.style.backgroundImage = `url('${fundos[n]}')`;
    }

    prevBtn.addEventListener("click", () => {
      indice = (indice - 1 + slides.length) % slides.length;
      mostrarSlide(indice);
    });

    nextBtn.addEventListener("click", () => {
      indice = (indice + 1) % slides.length;
      mostrarSlide(indice);
    });

    mostrarSlide(indice);
  }

  // Carrega footer
  fetch(`${basePath}partials/footer.html`)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch((err) => console.error("Erro ao carregar footer:", err));

  // Carrega header
  fetch(`${basePath}partials/header.html`)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;

      // Inicializa acessibilidade
      initAcessibilidade();

      // Inicializa menu hambúrguer
      const hamburguer = document.getElementById("hamburguer-toggle");
      const menuSuspenso = document.querySelector(".menu-suspenso-wrapper");
      const menuPrincipal = document.getElementById("menu-principal");

      if (hamburguer && menuSuspenso && menuPrincipal) {
        hamburguer.addEventListener("click", () => {
          menuSuspenso.classList.toggle("active");
          menuPrincipal.classList.toggle("active");
        });
      }
    })
    .catch((err) => console.error("Erro ao carregar header:", err));

  // Inicializa carrossel
  initCarousel();
});

// Seleciona todos os acordeões
const accordions = document.querySelectorAll(".accordion-item");

accordions.forEach((item) => {
  const header = item.querySelector(".accordion-header");

  header.addEventListener("click", () => {
    // Fecha outros acordeões antes de abrir o atual
    accordions.forEach((i) => {
      if (i !== item) i.classList.remove("active");
    });

    // Alterna o acordeão clicado
    item.classList.toggle("active");
  });
});
