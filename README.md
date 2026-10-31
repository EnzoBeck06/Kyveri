# KYVERI

**Status: Em desenvolvimento.**

Landing Page da Kyveri, marca dedicada à criação de Landing Pages modernas, funcionais e personalizadas. Aplicação de página única construída com React, Vite e GSAP. O projeto não tem domínio nem publicação configurados.

![Prévia atual do site Kyveri](src/assets/images/kyveri-site-preview.png)

## Identidade

Direção Carbon, editorial e minimalista, usando Manrope para títulos e marca e Inter para textos funcionais.

| Cor | Valor |
| --- | --- |
| Carbon | `#111110` |
| Grafite | `#282724` |
| Champagne | `#DDD6CA` |
| Marfim | `#F4F1EA` |
| Texto secundário | `#C7C1B7` |

O sistema de marca inclui o wordmark textual, o símbolo K geométrico, assinaturas SVG para fundos Carbon e Marfim, versões monocromáticas, favicon SVG/PNG e Apple Touch Icon. O desenho do K parte do símbolo que já existia no favicon; a referência visual independente mencionada no briefing não está entre os arquivos deste projeto e precisa ser confirmada pelo proprietário.

## Conteúdo e funcionalidades

- **Início:** apresentação da Kyveri e mockup conceitual em desktop e mobile.
- **Serviços:** Landing Pages como oferta principal, com cards que descrevem capacidades dessa entrega, sem apresentar identidade visual, sites institucionais ou otimização mobile como ofertas independentes.
- **Projetos:** quatro conceitos identificados como projetos demonstrativos, sem clientes, resultados ou sites publicados.
- **Sobre:** apresentação da marca e seus princípios de trabalho.
- **Contato:** formulário local de briefing; sem backend ou armazenamento. Com o número oficial configurado, abre o WhatsApp com uma mensagem editável. Enquanto `WHATSAPP_NUMBER` estiver vazio, informa que nada foi enviado.
- Menu responsivo, navegação por âncoras, prévias acessíveis dos projetos e atualização automática do ano do rodapé.

## Tecnologias e recursos

- React e React DOM para renderizar a interface em componentes; Vite para desenvolvimento e build.
- GSAP e ScrollTrigger instalados pelo npm. `src/hooks/useGsapAnimations.js` usa `gsap.context()` e `gsap.matchMedia()` para limitar animações ao ciclo de vida do React e respeitar `prefers-reduced-motion`.
- Manrope e Inter via Google Fonts.
- WebP para as sete imagens fotográficas carregadas na página, com os PNGs originais como fallback no `<picture>`. O conjunto otimizado ocupa cerca de 1,35 MB, contra 14,46 MB dos PNGs correspondentes, redução aproximada de 90,7%.
- Favicon SVG e PNG nos tamanhos 16 e 32 px; Apple Touch Icon PNG de 180 px.
- Arte local Open Graph em `src/assets/images/kyveri-og.png`. Metadados básicos Open Graph e Twitter estão preparados; URLs de imagem, Twitter image e canonical dependem do domínio público.

## Estrutura

```text
Kyveri/
├── index.html
├── package.json / package-lock.json
├── playwright.config.js
├── tests/ (kyveri.spec.js)
├── vite.config.js
└── src/
    ├── main.jsx / App.jsx / assets.js
    ├── styles/site.css
    ├── components/ (Header, Hero, Services, Projects, About, Contact, Footer)
    ├── config/whatsapp.js
    ├── hooks/ (useGsapAnimations, useSiteNavigation)
    └── assets/
        └── images/
            ├── identidade, favicons e arte social
            ├── mockups do Hero, Sobre e Contato em PNG/WebP
            ├── quatro projetos demonstrativos em PNG/WebP
            └── capturas de desenvolvimento, notas e assets legados
```

Imagens usadas na página permanecem em `src/assets/images` e são importadas por `src/assets.js`; o Vite emite somente esses assets no build, sem duplicá-los em `public/`. `atelier-devices.png` e as capturas antigas são assets legados mantidos como histórico visual.

## Execução local

Na raiz do projeto, instale as dependências e inicie o servidor Vite:

```bash
npm install
npm run dev
```

Acesse o endereço local informado pelo Vite (por padrão, `http://localhost:5173`). Para validar o build de produção, execute `npm run build`; `npm run preview` serve esse build localmente.

## Configurar o WhatsApp

Em `src/config/whatsapp.js`, edite `WHATSAPP_NUMBER` com apenas algarismos: código do país, DDD e telefone. O site não define um número padrão. A mensagem do formulário inclui somente os campos preenchidos e abre como rascunho editável no WhatsApp; não é enviada automaticamente. Sem número válido, o briefing permanece na página e nenhum dado é transmitido ou salvo.

## Acessibilidade e responsividade

Layout responsivo com navegação compacta até 720 px, foco visível, link para pular ao conteúdo, navegação por teclado, `<details>` nativos, diálogos nativos, imagens com texto alternativo e campos com labels. `prefers-reduced-motion` mantém o conteúdo visível e desativa as animações GSAP.

## SEO e publicação

O HTML inclui idioma `pt-BR`, title, description, viewport, headings semânticos, metadados Open Graph/Twitter básicos e ícones. Não há URL canônica, domínio, contato público, redes sociais ou imagem social com URL absoluta. Esses dados só devem ser completados após decisão do proprietário e publicação.

## Validação

Vite foi iniciado em modo de desenvolvimento e o build de produção foi concluído. Chromium foi executado nas larguras 320, 390, 768, 1024 e 1440 px; a interface React renderizou sem overflow horizontal. Menu mobile, modal de projetos, formulário sem número configurado, navegação interna, imagens do Hero, GSAP e `prefers-reduced-motion` foram verificados. Não há script de lint configurado no projeto.

O caminho de abertura do WhatsApp com número válido não foi disparado: o número oficial ainda não está configurado. Não foram executados Lighthouse, validação externa de metadados sociais ou testes em hospedagem pública.

## Decisões e próximos passos

- **Decisão do proprietário necessária:** validar o símbolo K contra a referência visual original; confirmar se deseja acrescentar Processo, Comparador ou FAQ. Essas seções não existem na fonte HTML analisada e não foram inventadas nesta migração.
- **Decisão do proprietário necessária:** configurar número oficial do WhatsApp e decidir sobre e-mail, domínio e redes sociais públicas.
- **Depende da publicação:** canonical, URL absoluta para imagem Open Graph/Twitter, metadados finais e teste de compartilhamento em plataformas.
- **Opcional:** revisar ou arquivar as capturas antigas que permanecem no repositório; avaliar Lighthouse em hospedagem real.
- **Futuro:** desenvolver projetos demonstrativos em etapa própria. Os conceitos atuais continuam identificados como demonstrações.

Nenhuma licença pública foi definida para o projeto.
