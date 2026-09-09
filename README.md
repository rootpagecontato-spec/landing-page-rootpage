# rootpage

Site institucional da rootpage. HTML, CSS e JavaScript puros, sem instalação e sem
etapa de build: dá para abrir o `index.html` com dois cliques e ver funcionando.

```
rootpage/
  index.html          página principal
  404.html            página de erro
  assets/
    css/estilo.css    todo o visual (cores, espaçamentos, animações)
    js/dados.js       <-- É AQUI QUE VOCÊ EDITA O CONTEÚDO
    js/site.js        comportamento (menu, tema, formulário, portfólio)
    img/logo.svg      símbolo da marca, usado também como favicon
    img/og.svg        base da imagem de compartilhamento
    img/projetos/     prints dos sites entregues
```

## 1. Antes de publicar

Abra `assets/js/dados.js` e troque os quatro valores do bloco `contato`:

| Campo | O que colocar |
|---|---|
| `whatsapp` | Só números, com o 55 na frente. Ex: `5519998877665` |
| `whatsappRotulo` | Como o número aparece escrito na tela |
| `email` | Seu e-mail de contato |
| `instagram` | Seu usuário, sem o @ |
| `cnpj` | Texto do rodapé. Deixe `""` para esconder |

Enquanto o WhatsApp estiver com o número de exemplo, o formulário cai automaticamente
para o e-mail e um aviso aparece no console do navegador.

Depois, no `index.html`, procure pelos comentários com `TROQUE` e ajuste:

- o endereço do site nas tags `canonical` e `og:url`;
- os preços dos planos (busque por `plano__preco`);
- a foto do hero e a foto da seção de serviços (busque por `picsum.photos`).

## 2. Adicionar um site ao portfólio

1. Salve o print do site em `assets/img/projetos/`. Tamanho recomendado: 1600 x 1000.
2. Abra `assets/js/dados.js` e coloque um bloco assim dentro de `projetos: [ ]`:

```js
{
  cliente: "Padaria Vila Nova",
  resumo: "Site institucional com cardápio e pedido pelo WhatsApp.",
  imagem: "assets/img/projetos/padaria-vila-nova.jpg",
  link: "https://padariavilanova.com.br",
  tags: ["Site institucional", "Catálogo"]
},
```

3. Salve e recarregue a página.

Cada bloco vira um cartão na seção "Projetos publicados". Pode colocar quantos quiser,
sempre separados por vírgula. Enquanto a lista estiver vazia, a seção mostra um aviso
em vez de ficar em branco, então o site nunca fica com um buraco no meio.

Os campos `imagem`, `link` e `tags` são opcionais: se ficarem vazios, o cartão se
ajusta sozinho.

## 3. Trocar cores ou fontes

Tudo fica no topo do `assets/css/estilo.css`, no bloco `:root`:

- `--marca` é o verde do logotipo. Trocando essa variável, o site inteiro acompanha.
- `--r-cartao`, `--r-campo` e `--r-pilula` controlam o arredondamento.
- As fontes são Outfit (títulos) e Manrope (texto), carregadas do Google Fonts
  na primeira linha `<link>` do `index.html`.

O site tem tema claro e escuro. O escuro é o padrão, o botão no topo alterna e a
escolha fica salva no navegador de quem visita.

## 4. Publicar

**Netlify (mais simples):** entre em netlify.com, arraste a pasta `rootpage` para a
área de deploy. O `404.html` é reconhecido automaticamente.

**Vercel:** `vercel deploy` na pasta, ou conecte um repositório do GitHub.

**GitHub Pages:** suba a pasta para um repositório e ative o Pages na branch principal.

**Hospedagem comum com cPanel:** envie o conteúdo da pasta para dentro de `public_html`.
No Apache, crie um arquivo `.htaccess` com a linha `ErrorDocument 404 /404.html`.

Depois de publicar, aponte seu domínio para o serviço escolhido e ative o HTTPS
(é gratuito e automático em todos os três primeiros).

## 5. Imagem de compartilhamento

O `og.svg` é a base do card que aparece quando o link é enviado no WhatsApp.
Exporte esse arquivo como PNG de 1200 x 630, salve como `assets/img/og.png`
e o `index.html` já aponta para ele.

## Observações técnicas

- O `404.html` usa caminhos absolutos (`/assets/...`) para funcionar em qualquer
  endereço do domínio. Por isso ele só renderiza com estilo quando servido por um
  servidor, não abrindo direto do disco.
- As animações respeitam `prefers-reduced-motion`, então quem configurou o sistema
  para reduzir movimento recebe a versão estática.
- O formulário não precisa de servidor: ele monta a mensagem e abre o WhatsApp.
