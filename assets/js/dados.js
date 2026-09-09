/* ============================================================
   rootpage - ARQUIVO DE CONFIGURAÇÃO
   Este é o único arquivo que você precisa editar no dia a dia.
   Salve e recarregue a página para ver o resultado.
   ============================================================ */

window.ROOTPAGE = {

  /* ----------------------------------------------------------
     1. SEUS CONTATOS
     - whatsapp: só números, com 55 na frente (55 + DDD + número)
     - instagram: só o usuário, sem @ e sem link
     ---------------------------------------------------------- */
  contato: {
    whatsapp: "5561981638974",              // 55 + DDD + numero, so digitos
    whatsappRotulo: "(61) 98163-8974",      // como aparece escrito na tela
    email: "rootpage.01@gmail.com",
    instagram: "rootpagewebsitesoficial",   // so o usuario, sem @ e sem link
    cnpj: ""                                // coloque o CNPJ aqui, ou deixe "" para esconder
  },

  /* ----------------------------------------------------------
     2. PORTFÓLIO DE SITES ENTREGUES

     Enquanto a lista estiver vazia, a seção "Projetos publicados"
     mostra um aviso elegante em vez de ficar em branco.

     Para adicionar um projeto, copie o bloco de exemplo abaixo
     para dentro dos colchetes e preencha:

       {
         cliente: "Padaria Vila Nova",
         resumo: "Site institucional com cardápio e pedido pelo WhatsApp.",
         imagem: "assets/img/projetos/padaria-vila-nova.jpg",
         link: "https://padariavilanova.com.br",
         tags: ["Site institucional", "Catálogo"]
       },

     Sobre cada campo:
       cliente  = nome do cliente (aparece como título do cartão)
       resumo   = uma frase curta sobre o que foi feito
       imagem   = coloque o print em assets/img/projetos/ (use 1600x1000)
                  se deixar "" o cartão aparece sem foto
       link     = endereço do site publicado. Deixe "" se estiver fora do ar
       tags     = etiquetas curtas. Pode deixar [] se não quiser nenhuma
     ---------------------------------------------------------- */
  projetos: [

    // Apague este comentário e cole seus projetos aqui.

  ],

  /* ----------------------------------------------------------
     3. TEXTOS DA SEÇÃO DE PROJETOS QUANDO ELA ESTÁ VAZIA
     ---------------------------------------------------------- */
  projetosVazio: {
    titulo: "Os primeiros sites entram aqui em breve",
    texto: "Cada projeto entregue vira um cartão nesta seção, com o nome do cliente, " +
           "o que foi feito e o link para visitar o site no ar.",
    botao: "Pedir orçamento"
  }
};
