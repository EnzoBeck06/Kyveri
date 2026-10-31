# KYVERI

**KYVERI** é uma landing page de apresentação para uma marca dedicada à criação de sites e Landing Pages. O projeto mostra a proposta de trabalho, capacidades do serviço e conceitos demonstrativos para pessoas e negócios que precisam apresentar sua oferta com clareza em uma experiência digital própria.

A interface reúne navegação por seções, apresentação visual, serviços, projetos conceituais, informações sobre a marca e um fluxo de briefing para iniciar uma conversa. O site é uma aplicação de página única feita com React e Vite.

## Identidade visual

A direção visual Carbon combina uma estética escura, editorial, premium e minimalista. A composição usa contraste entre fundos escuros, superfícies grafite e tons claros, com espaçamentos fluidos e adaptações para telas menores.

| Token CSS | Cor |
| --- | --- |
| Carbon | `#111110` |
| Grafite | `#282724` |
| Champagne | `#DDD6CA` |
| Marfim | `#F4F1EA` |
| Texto secundário | `#C7C1B7` |

Manrope é usada na identidade e nos títulos; Inter, nos textos funcionais e na interface. O CSS adapta o layout a diferentes larguras e reduz animações quando o sistema informa `prefers-reduced-motion: reduce`. A headline principal é **“Sua ideia merece uma presença digital à altura.”**

## Tecnologias

As versões abaixo vêm do lockfile do projeto. A versão de Node.js e npm é a observada no ambiente de validação indicado neste README; a faixa de Node declarada no `package.json` é `^20.0.0 || >=22.0.0`.

| Tecnologia | Versão | Uso |
| --- | --- | --- |
| React / React DOM | 19.3.1 | Interface e componentes |
| Vite | 6.4.5 | Servidor local e build |
| JavaScript / JSX | ES modules | Lógica e componentes da aplicação |
| CSS | CSS nativo | Layout, identidade visual e responsividade |
| GSAP | 3.15.0 | Animações de entrada e rolagem |
| ScrollTrigger | incluído no GSAP 3.15.0 | Disparo de animações associado à rolagem |
| Playwright Test | 1.64.1 | Testes de navegador automatizados com Chromium |
| Node.js / npm | 26.13.0 / 11.20.0 | Ambiente da validação documentada |

Manrope e Inter são carregadas pelo Google Fonts. Os recursos visuais da aplicação ficam em `src/assets/images/`; as imagens WebP são usadas como fonte preferencial e os PNGs correspondentes como fallback nos elementos `<picture>`.

## Funcionalidades implementadas

- Cabeçalho responsivo com navegação por âncoras, estado visual de rolagem, indicação da seção atual e menu mobile que fecha ao selecionar uma seção, clicar fora ou pressionar Escape.
- Hero com a headline principal e mockup ilustrativo responsivo.
- Seção Serviços com cards expansíveis via `<details>`.
- Quatro conceitos de projetos demonstrativos, cada um com imagem e diálogo nativo de prévia. Eles **não representam clientes reais nem sites publicados**.
- Seção Sobre e rodapé com o ano atualizado automaticamente.
- Formulário local de briefing em diálogo acessível. Não há backend nem armazenamento de dados.
- Integração preparada para WhatsApp. O número oficial está vazio em `src/config/whatsapp.js`; portanto, nenhuma mensagem é enviada. Com número válido configurado, o formulário abre uma mensagem editável para revisão no WhatsApp.
- Animações GSAP/ScrollTrigger com limpeza associada ao ciclo de vida React e respeito à preferência por movimento reduzido.
- Ícones, favicon SVG/PNG e Apple Touch Icon.

## Estrutura do projeto

```text
Kyveri/
├── index.html
├── package.json
├── package-lock.json
├── playwright.config.js
├── vite.config.js
├── README.md
├── .gitignore
├── tests/
│   └── kyveri.spec.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── assets.js
    ├── components/
    │   ├── About.jsx
    │   ├── Contact.jsx
    │   ├── Footer.jsx
    │   ├── Header.jsx
    │   ├── Hero.jsx
    │   ├── Icon.jsx
    │   ├── Projects.jsx
    │   ├── Services.jsx
    │   └── WhatsAppLink.jsx
    ├── config/
    │   └── whatsapp.js
    ├── hooks/
    │   ├── useGsapAnimations.js
    │   └── useSiteNavigation.js
    ├── styles/
    │   └── site.css
    └── assets/
        └── images/
            ├── imagens de identidade, favicons e compartilhamento social
            ├── mockups Kyveri de Hero, Sobre e Contato em PNG/WebP
            ├── quatro conceitos de projeto em PNG/WebP
            ├── capturas de prévia e desenvolvimento
            └── notas Markdown sobre os recursos visuais
```

`src/App.jsx` compõe a página e conecta os hooks; `src/main.jsx` monta a aplicação React; `src/assets.js` centraliza imports de imagem. `src/components/` contém as seções e elementos reutilizáveis; `src/hooks/` reúne animações e navegação; `src/config/` guarda a configuração do WhatsApp; `src/styles/site.css` contém a folha de estilos global. `tests/` contém os testes de navegador. `index.html` define a entrada e metadados; `package.json` declara dependências e scripts; `vite.config.js` configura o servidor/build Vite; `playwright.config.js` configura o Chromium e inicia o servidor de teste.

## Instalação e execução

No PowerShell:

```powershell
cd "C:\Users\Dev\Downloads\Kyveri"
npm install
npm run dev
```

O Vite está configurado para a porta `5173`, com `strictPort`; abra `http://localhost:5173`. Para gerar e servir localmente a versão de produção:

```powershell
npm run build
npm run preview
```

## Testes automatizados

Os scripts disponíveis executam Playwright com Chromium em modo headless, usando Vite em `127.0.0.1:5173`:

```powershell
npm test
npm run test:headed
npx playwright test --reporter=html
npx playwright show-report
```

O projeto usa o reporter `list` por padrão; o primeiro comando acima gera o relatório HTML para que `show-report` possa abri-lo.

O teste automatizado cobre dimensões e screenshots nos viewports `320 × 700`, `390 × 844`, `768 × 1024`, `1024 × 768` e `1440 × 900`, além de overflow horizontal, fontes, imagens, navegação, menu mobile, diálogo de projeto, formulário/CTA, erros de runtime, GSAP/ScrollTrigger e `prefers-reduced-motion`. As capturas são salvas em `test-results/screenshots/`; o diretório é gerado pelos testes e ignorado pelo Git.

**Validação executada em 31/10/2026 neste ambiente:** `npm run build` concluído; `npm test` concluído com **10 testes aprovados** (cinco viewports e cinco testes funcionais). O teste reportou enquadramento parcial da imagem decorativa de Contato em `320 × 700` e `390 × 844`, com razão de visibilidade de 0,45. É um aviso visual conhecido, não uma falha de teste. Esses resultados registram uma execução pontual e não garantem execuções futuras. Não foram executados Lighthouse nem testes em hospedagem pública.

## Configuração do WhatsApp

Edite `WHATSAPP_NUMBER` em `src/config/whatsapp.js` apenas quando o número oficial estiver definido. Use código do país, DDD e telefone em algarismos, sem `+`, espaços ou pontuação. Enquanto estiver vazio, os botões informam que o canal não está configurado e o formulário não transmite nem armazena os dados. Com o número configurado, os dados preenchidos compõem uma mensagem que o visitante pode revisar antes de enviá-la pelo WhatsApp.

## Git e GitHub

O fluxo usa duas branches no repositório `https://github.com/EnzoBeck06/Kyveri.git`:

- **`main`**: versão estável; recebe alterações aprovadas por Pull Request.
- **`develop`**: branch de trabalho para melhorias, correções e refinamentos; build e testes devem passar antes de propor integração.

Comandos de consulta e sincronização:

```powershell
git status
git branch -a
git remote -v
git switch develop
git pull --ff-only origin develop
```

Somente ao iniciar um repositório novo e confirmar que o remoto não tem commits, inicialize e crie a estrutura de branches:

```powershell
git init
git branch -M main
git remote add origin https://github.com/EnzoBeck06/Kyveri.git
git switch -c develop
```

Em um clone existente, não rode `git init` nem adicione outro `origin`. Se a branch remota já existir, atualize referências e acompanhe-a em vez de recriá-la:

```powershell
git fetch origin
git switch --track origin/develop
```

Para preparar e enviar alterações em `develop`:

```powershell
git add README.md .gitignore
git status
git commit -m "docs: update project documentation"
git push -u origin develop
```

Inclua no `git add` apenas os arquivos revisados que fazem parte da alteração. Para criar uma branch local a partir da versão remota quando ela ainda não existir localmente:

```powershell
git fetch origin
git switch --track origin/develop
```

Se estiver configurando um clone sem remoto, confira a URL antes de adicioná-la:

```powershell
git remote add origin https://github.com/EnzoBeck06/Kyveri.git
```

Não reinicialize um repositório existente nem substitua histórico remoto. Se uma branch divergir, inspecione os commits antes de integrar; não use force push. Depois que um PR for revisado e integrado em `main`, atualize `develop` preservando o histórico:

```powershell
git switch main
git pull --ff-only origin main
git switch develop
git pull --ff-only origin develop
git merge main
git push origin develop
```

Para abrir o PR, envie `develop` e, na página do repositório no GitHub, selecione **Compare & pull request**, usando `main` como base e `develop` como compare. Revise o diff e os checks antes da aprovação e do merge. Não faça merge automático.

## Próximos passos conhecidos

- Refinar visualmente o site sem descaracterizar a direção atual.
- Rever o enquadramento da imagem decorativa de Contato em telas de `320` e `390` px.
- Configurar o número oficial do WhatsApp quando definido.
- Fazer revisão final de acessibilidade, desempenho e SEO, incluindo metadados absolutos após definição de domínio/publicação.

Não há domínio, backend de formulário ou publicação de hospedagem configurados. Não foram definidos clientes, métricas comerciais ou licença pública.
