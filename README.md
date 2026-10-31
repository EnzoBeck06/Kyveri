# KYVERI

**KYVERI** é uma landing page de apresentação para uma marca dedicada à criação de sites e Landing Pages. O projeto mostra a proposta de trabalho, capacidades do serviço e conceitos demonstrativos para pessoas e negócios que precisam apresentar sua oferta com clareza em uma experiência digital própria.

A interface reúne navegação por seções, apresentação visual, serviços, processo de criação, comparação ilustrativa de design, projetos conceituais, informações sobre a marca, perguntas frequentes e um fluxo de briefing para iniciar uma conversa. O site é uma aplicação de página única feita com React e Vite.

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
- Hero editorial com a headline principal, CTA de orçamento em destaque e mockup ilustrativo em coluna própria. A transição para Serviços usa um gradiente discreto, com movimento de até 18 px no desktop e 8 px no celular.
- Seção Serviços com cards expansíveis via `<details>`.
- Processo em seis etapas, com timeline em três colunas no desktop, duas em tablet e vertical no celular. Não há prazos ou condições comerciais fixos.
- Comparador conceitual em HTML/CSS, usando o mesmo asset existente nos dois lados, com arraste por mouse/toque e controle nativo por teclado. Não representa um resultado real de cliente.
- Quatro conceitos de projetos demonstrativos, cada um com imagem e diálogo nativo de prévia. Eles **não representam clientes reais nem sites publicados**.
- Seção Sobre e rodapé com o ano atualizado automaticamente.
- FAQ com seis perguntas, botões reais, `aria-expanded`, painéis associados e suporte a teclado.
- Briefing compartilhado pelos CTAs de orçamento, com nome, tipo de projeto, objetivo, descrição e contexto opcional. Há uma etapa de revisão da mensagem e opção de voltar para editar. Não há backend nem armazenamento permanente: as informações ficam na memória da página.
- Integração preparada para WhatsApp. O número oficial está vazio em `src/config/whatsapp.js`; portanto, nenhuma mensagem é enviada. Com número válido configurado, o formulário abre uma mensagem editável para revisão no WhatsApp.
- Animações GSAP/ScrollTrigger de entrada e revelação por elemento, com limpeza associada ao ciclo de vida React, atualização em mudanças de layout e respeito à preferência por movimento reduzido.
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
│   ├── kyveri.spec.js
│   └── experience.spec.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── assets.js
    ├── components/
    │   ├── About.jsx
    │   ├── BriefingDialog.jsx
    │   ├── Comparison.jsx
    │   ├── Contact.jsx
    │   ├── FAQ.jsx
    │   ├── Footer.jsx
    │   ├── Header.jsx
    │   ├── Hero.jsx
    │   ├── Icon.jsx
    │   ├── Projects.jsx
    │   ├── Process.jsx
    │   ├── Services.jsx
    │   └── WhatsAppLink.jsx
    ├── config/
    │   ├── navigation.js
    │   └── whatsapp.js
    ├── hooks/
    │   ├── useGsapAnimations.js
    │   └── useSiteNavigation.js
    ├── styles/
    │   ├── experience.css
    │   └── site.css
    ├── utils/
    │   └── briefing.js
    └── assets/
        └── images/
            ├── imagens de identidade, favicons e compartilhamento social
            ├── mockups Kyveri de Hero, Sobre e Contato em PNG/WebP
            ├── quatro conceitos de projeto em PNG/WebP
            ├── capturas de prévia e desenvolvimento
            └── notas Markdown sobre os recursos visuais
```

`src/App.jsx` compõe a página, conecta os hooks e controla a abertura do briefing único; `src/main.jsx` monta a aplicação React; `src/assets.js` centraliza imports de imagem. `src/components/` contém as seções e elementos reutilizáveis; `src/hooks/` reúne animações e navegação; `src/config/` guarda a navegação compartilhada e a configuração do WhatsApp. `src/styles/site.css` contém o sistema visual Carbon e importa `experience.css`, que organiza Processo, Comparador, FAQ e a revisão do briefing. `src/utils/briefing.js` monta a mensagem sem efeitos externos. `tests/` contém os testes de navegador. `index.html` define a entrada e metadados; `package.json` declara dependências e scripts; `vite.config.js` configura o servidor/build Vite; `playwright.config.js` configura o Chromium e inicia o servidor de teste.

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

O projeto usa o reporter `list` por padrão; o comando com `--reporter=html` gera o relatório HTML para que `show-report` possa abri-lo.

O teste automatizado cobre dimensões e screenshots nos viewports `320 × 700`, `390 × 844`, `768 × 1024`, `1024 × 768` e `1440 × 900`, além de overflow horizontal, fontes, imagens, navegação, menu mobile, diálogo de projeto, formulário/CTA, erros de runtime, GSAP/ScrollTrigger e `prefers-reduced-motion`. As capturas são salvas em `test-results/screenshots/`; o diretório é gerado pelos testes e ignorado pelo Git.

**Validação da experiência completa em 31/10/2026 neste ambiente:** `npm run build` concluído; `npm test -- --reporter=list,json` concluído com **25 testes aprovados**, zero falhas e zero testes ignorados. A suíte cobre as cinco resoluções, comparador por mouse e teclado, toque emulado em 320/390 px, FAQ, timeline, revisão/edição do briefing e ausência de envio com WhatsApp vazio. Também verifica foco em janela de 390 × 450, zoom de página emulado em 2× via CDP, limpeza de ScrollTriggers em StrictMode e zero gatilhos com movimento reduzido. A imagem de Contato permanece contida, com razão mínima exigida de 0,98. As capturas das cinco resoluções foram inspecionadas visualmente.

A comparação local desta etapa fica em `test-results/complete-2026-10-31/comparison.html`, com capturas em `before/` e `after/`. O resultado JSON final está em `checks-02/results.json`. As capturas e relatórios anteriores foram preservados. Esses artefatos são ignorados pelo Git. Os resultados registram uma execução pontual e não garantem execuções futuras. Não foram executados Lighthouse, testes em aparelhos físicos/Safari/leitor de tela ou em hospedagem pública.

Para isolar uma execução e preservar resultados anteriores, defina uma pasta nova antes dos testes (a configuração padrão continua sendo `test-results/`):

```powershell
$env:KYVERI_TEST_RESULTS_DIR = "test-results/minha-nova-validacao"
$env:PLAYWRIGHT_JSON_OUTPUT_FILE = "$env:KYVERI_TEST_RESULTS_DIR/results.json"
npm test -- --reporter=list,json
```

## Configuração do WhatsApp

Edite `WHATSAPP_NUMBER` em `src/config/whatsapp.js` apenas quando o número oficial estiver definido. Use código do país, DDD e telefone em algarismos, sem `+`, espaços ou pontuação. Os CTAs abrem o briefing e sua revisão local. Enquanto o número estiver vazio, a interface informa a indisponibilidade e não transmite dados. Com o número configurado, “Abrir no WhatsApp” abre a mensagem preparada para revisão e envio pelo próprio visitante no aplicativo.

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

- Validar a composição e a navegação em aparelhos físicos e Safari, além do Chromium já avaliado.
- Configurar o número oficial do WhatsApp quando definido.
- Fazer revisão final de acessibilidade, desempenho e SEO, incluindo metadados absolutos após definição de domínio/publicação.

Não há domínio, backend de formulário ou publicação de hospedagem configurados. Não foram definidos clientes, métricas comerciais ou licença pública.
