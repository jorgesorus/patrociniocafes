

## Plano: Nova Home Promocional + Mover LP Atual para /lp

### Resumo
Mover a landing page institucional atual para a rota `/lp` e criar uma nova pagina principal (`/`) focada exclusivamente na promocao de venda direta da fabrica com ate 40% de desconto para empresas.

### O que muda

**1. Reorganizar rotas**
- Renomear `Index.tsx` para `LandingPage.tsx` e mover para rota `/lp`
- Criar nova `Index.tsx` como pagina promocional na rota `/`
- Atualizar `App.tsx` com as novas rotas

**2. Nova pagina promocional (`/`)**

Pagina single-screen, impactante, com foco total em conversao. Estrutura:

- **Hero promocional fullscreen**: Fundo escuro (verde-escuro da marca) com overlay, simulando o estilo da imagem de referencia
- **Headline B2B**: Texto grande e direto, ex: "Cafe Premium Direto da Fabrica para Sua Empresa" com destaque em ouro para "Direto da Fabrica"
- **Badge de desconto**: Circulo verde com "ATE 40% DE DESCONTO" em amarelo/ouro, estilo similar a imagem
- **Subheadline**: Copy clara como "Compre cafe 100% Arabica com precos exclusivos de fabrica. Promocao por tempo limitado para empresas."
- **CTA principal**: Botao "Chame no WhatsApp" em verde, redirecionando para `/obrigado`
- **Diferenciais rapidos**: Linha com icones - "100% Arabica", "Direto da Fabrica", "Entrega para Empresas", "Graos ou Moido"
- **Footer compacto**: Dados da empresa

**3. Estilo visual**
- Fundo escuro (verde-escuro) na hero, contrastando com textos brancos e destaques em ouro-alaranjado
- Tipografia bold e grande para impacto
- Animacoes com Framer Motion (fade-in, scale)
- Totalmente responsivo

### Detalhes Tecnicos

**Arquivos modificados:**
- `src/App.tsx` - Adicionar rota `/lp` e importar novo componente
- `src/pages/Index.tsx` - Substituir conteudo pela pagina promocional

**Arquivos criados:**
- `src/pages/LandingPage.tsx` - Conteudo atual do Index movido para ca

**Componentes reutilizados:**
- `Footer.tsx` - Usado em ambas as paginas
- Logo existente em `src/assets/logo-patrocinio-cafe.png`
- Imagem promocional `KV_-_01_-_1080x1350.jpg` copiada para `src/assets/` como background

