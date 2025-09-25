document.addEventListener("DOMContentLoaded", () => {
  // Define o caminho base de forma dinâmica
  const basePath = window.location.pathname.includes("/pages/") ? "../" : "./";

  // Carrega o header
  fetch(`${basePath}partials/header.html`)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
    })
    .catch((err) => console.error("Erro ao carregar header:", err));

  // Carrega o footer
  fetch(`${basePath}partials/footer.html`)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;

      // Botão de acessibilidade
      const btnAcess = document.getElementById("btn-acessibilidade");
      if (btnAcess) {
        btnAcess.addEventListener("click", () => {
          document.body.classList.toggle("fonte-grande");
        });
      }
    })
    .catch((err) => console.error("Erro ao carregar footer:", err));

  // Carrega a barra de redes sociais
  fetch(`${basePath}partials/social_media.html`)
    .then((res) => res.text())
    .then((data) => {
      console.log("Conteúdo carregado:", data); // 👈 Testa aqui
      const socialMedia = document.getElementById("social-media");
      if (socialMedia) {
        socialMedia.innerHTML = data;
      } else {
        console.warn("Div #social-media não encontrada!");
      }
    })
    .catch((err) =>
      console.error("Erro ao carregar barra de redes sociais:", err)
    );
});