/* ============================================================
   rootpage - comportamento do site
   Nada aqui precisa ser editado no dia a dia.
   O conteúdo que muda fica em assets/js/dados.js
   ============================================================ */

(function () {
  "use strict";

  var dados = window.ROOTPAGE || {};
  var contato = dados.contato || {};
  var semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. TEMA CLARO E ESCURO ---------- */
  var botaoTema = document.getElementById("botao-tema");
  if (botaoTema) {
    botaoTema.addEventListener("click", function () {
      var atual = document.documentElement.getAttribute("data-tema");
      var novo = atual === "claro" ? "escuro" : "claro";
      document.documentElement.setAttribute("data-tema", novo);
      var cor = document.querySelector('meta[name="theme-color"]');
      if (cor) cor.setAttribute("content", novo === "claro" ? "#F6F8F7" : "#070A09");
      try { localStorage.setItem("rootpage-tema", novo); } catch (e) {}
    });
  }

  /* ---------- 2. MENU NO CELULAR ---------- */
  var botaoMenu = document.getElementById("botao-menu");
  var menu = document.getElementById("menu");
  if (botaoMenu && menu) {
    var alternarMenu = function (abrir) {
      menu.classList.toggle("aberto", abrir);
      botaoMenu.setAttribute("aria-expanded", String(abrir));
      botaoMenu.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
      botaoMenu.innerHTML = abrir
        ? '<i class="ph ph-x" aria-hidden="true"></i>'
        : '<i class="ph ph-list" aria-hidden="true"></i>';
    };
    botaoMenu.addEventListener("click", function () {
      alternarMenu(!menu.classList.contains("aberto"));
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") alternarMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("aberto")) {
        alternarMenu(false);
        botaoMenu.focus();
      }
    });
  }

  /* ---------- 3. BORDA DO CABEÇALHO AO ROLAR ----------
     Usa IntersectionObserver em um ponto no topo da página,
     em vez de escutar o evento de scroll. */
  var sentinela = document.getElementById("sentinela-topo");
  var cabecalho = document.getElementById("cabecalho");
  if (sentinela && cabecalho && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entradas) {
      cabecalho.classList.toggle("rolando", !entradas[0].isIntersecting);
    }).observe(sentinela);
  }

  /* ---------- 4. REVELAÇÃO DOS BLOCOS AO ENTRAR NA TELA ---------- */
  function revelar() {
    var alvos = document.querySelectorAll(".revela, .trilho");
    if (semMovimento || !("IntersectionObserver" in window)) {
      alvos.forEach(function (el) { el.classList.add("visivel"); });
      return;
    }
    var observador = new IntersectionObserver(function (entradas, obs) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add("visivel");
        obs.unobserve(entrada.target);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -60px 0px" });
    alvos.forEach(function (el) { observador.observe(el); });
  }

  /* ---------- 5. PERGUNTAS FREQUENTES ---------- */
  var faq = document.getElementById("faq");
  if (faq) {
    faq.addEventListener("click", function (e) {
      var gatilho = e.target.closest(".faq__gatilho");
      if (!gatilho) return;
      var item = gatilho.closest(".faq__item");
      var abrindo = !item.classList.contains("aberto");

      faq.querySelectorAll(".faq__item.aberto").forEach(function (outro) {
        outro.classList.remove("aberto");
        outro.querySelector(".faq__gatilho").setAttribute("aria-expanded", "false");
      });

      item.classList.toggle("aberto", abrindo);
      gatilho.setAttribute("aria-expanded", String(abrindo));
    });
  }

  /* ---------- 6. CANAIS DE CONTATO ---------- */
  var numeroLimpo = String(contato.whatsapp || "").replace(/\D/g, "");
  var whatsappConfigurado = numeroLimpo.length >= 12 && numeroLimpo !== "5599999999999";

  function linkWhatsapp(texto) {
    if (!whatsappConfigurado) return "";
    return "https://wa.me/" + numeroLimpo + (texto ? "?text=" + encodeURIComponent(texto) : "");
  }

  document.querySelectorAll("[data-canal]").forEach(function (el) {
    var tipo = el.getAttribute("data-canal");
    if (tipo === "whatsapp") {
      var url = linkWhatsapp("Olá! Vim pelo site da rootpage e quero um orçamento.");
      el.setAttribute("href", url || ("mailto:" + (contato.email || "")));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    } else if (tipo === "email" && contato.email) {
      el.setAttribute("href", "mailto:" + contato.email);
    } else if (tipo === "instagram" && contato.instagram) {
      el.setAttribute("href", "https://www.instagram.com/" + contato.instagram + "/");
    }
  });

  document.querySelectorAll("[data-canal-texto]").forEach(function (el) {
    var tipo = el.getAttribute("data-canal-texto");
    if (tipo === "whatsapp" && contato.whatsappRotulo) el.textContent = contato.whatsappRotulo;
    if (tipo === "email" && contato.email) el.textContent = contato.email;
    if (tipo === "instagram" && contato.instagram) el.textContent = "@" + contato.instagram;
    if (tipo === "cnpj") {
      if (contato.cnpj) el.textContent = contato.cnpj;
      else el.remove();
    }
  });

  if (!whatsappConfigurado) {
    console.warn(
      "[rootpage] O número de WhatsApp ainda é o de exemplo. " +
      "Edite assets/js/dados.js antes de publicar o site."
    );
  }

  /* ---------- 7. PORTFÓLIO ---------- */
  function escapar(texto) {
    var div = document.createElement("div");
    div.textContent = texto == null ? "" : String(texto);
    return div.innerHTML;
  }

  function montarProjetos() {
    var alvo = document.getElementById("lista-projetos");
    if (!alvo) return;

    var lista = Array.isArray(dados.projetos) ? dados.projetos : [];

    if (lista.length === 0) {
      var vazio = dados.projetosVazio || {};
      alvo.innerHTML =
        '<div class="vazio">' +
          '<i class="ph ph-folder-open vazio__icone" aria-hidden="true"></i>' +
          '<h3 class="vazio__titulo">' + escapar(vazio.titulo || "Portfólio em construção") + "</h3>" +
          '<p class="vazio__texto">' + escapar(vazio.texto || "") + "</p>" +
          '<a class="botao botao--primario" href="#contato">' +
            escapar(vazio.botao || "Pedir orçamento") +
          "</a>" +
        "</div>";
      return;
    }

    alvo.className = "projetos revela visivel";
    alvo.innerHTML = lista.map(function (p, i) {
      var capa = p.imagem
        ? '<div class="projeto__capa"><img src="' + escapar(p.imagem) + '" alt="Site criado para ' +
          escapar(p.cliente) + '" loading="lazy" decoding="async"></div>'
        : "";
      var tags = (p.tags || []).map(function (t) {
        return '<span class="marca-tag">' + escapar(t) + "</span>";
      }).join("");
      var link = p.link
        ? '<div class="projeto__link"><a class="link-seta" href="' + escapar(p.link) +
          '" target="_blank" rel="noopener">Visitar o site ' +
          '<i class="ph ph-arrow-up-right" aria-hidden="true"></i></a></div>'
        : "";

      return '<article class="projeto revela" style="--atraso: ' + (i % 3) * 80 + 'ms">' +
        capa +
        '<div class="projeto__corpo">' +
          '<h3 class="projeto__cliente">' + escapar(p.cliente) + "</h3>" +
          '<p class="projeto__resumo">' + escapar(p.resumo) + "</p>" +
          (tags ? '<div class="projeto__marcas">' + tags + "</div>" : "") +
          link +
        "</div>" +
      "</article>";
    }).join("");
  }

  /* ---------- 8. FORMULÁRIO ---------- */
  var form = document.getElementById("form-contato");
  if (form) {
    var aviso = document.getElementById("aviso-form");
    var avisoTexto = document.getElementById("aviso-texto");
    var botaoEnviar = document.getElementById("enviar");

    var regras = {
      nome: function (v) {
        if (v.trim().length < 2) return "Escreva seu nome para a gente saber com quem falar.";
        return "";
      },
      telefone: function (v) {
        if (v.replace(/\D/g, "").length < 10) return "Informe o DDD e o número completo.";
        return "";
      },
      mensagem: function (v) {
        if (v.trim().length < 10) return "Conte em uma frase o que sua empresa faz.";
        return "";
      }
    };

    function validarCampo(nome) {
      var entrada = form.elements[nome];
      var caixa = entrada.closest(".campo");
      var saida = form.querySelector('[data-erro="' + nome + '"]');
      var erro = regras[nome](entrada.value);
      caixa.classList.toggle("invalido", Boolean(erro));
      entrada.setAttribute("aria-invalid", erro ? "true" : "false");
      if (saida) saida.textContent = erro;
      return !erro;
    }

    Object.keys(regras).forEach(function (nome) {
      var entrada = form.elements[nome];
      entrada.addEventListener("blur", function () { validarCampo(nome); });
      entrada.addEventListener("input", function () {
        if (entrada.closest(".campo").classList.contains("invalido")) validarCampo(nome);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var valido = Object.keys(regras).map(validarCampo).every(Boolean);
      if (!valido) {
        aviso.classList.remove("visivel");
        form.querySelector(".campo.invalido input, .campo.invalido textarea").focus();
        return;
      }

      var texto =
        "Olá! Vim pelo site da rootpage.\n\n" +
        "Nome: " + form.elements.nome.value.trim() + "\n" +
        "WhatsApp: " + form.elements.telefone.value.trim() + "\n" +
        "Projeto: " + form.elements.tipo.value + "\n\n" +
        form.elements.mensagem.value.trim();

      botaoEnviar.setAttribute("data-carregando", "true");

      window.setTimeout(function () {
        botaoEnviar.removeAttribute("data-carregando");
        var url = linkWhatsapp(texto);

        if (url) {
          window.open(url, "_blank", "noopener");
          avisoTexto.textContent = "Abrimos o WhatsApp com sua mensagem pronta. É só enviar.";
        } else {
          window.location.href =
            "mailto:" + (contato.email || "") +
            "?subject=" + encodeURIComponent("Orçamento de site") +
            "&body=" + encodeURIComponent(texto);
          avisoTexto.textContent = "Abrimos seu programa de e-mail com a mensagem pronta.";
        }

        aviso.classList.add("visivel");
        form.reset();
      }, semMovimento ? 0 : 450);
    });
  }

  /* ---------- 9. ANO NO RODAPÉ ---------- */
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- 10. INICIAR ---------- */
  montarProjetos();
  revelar();
})();
