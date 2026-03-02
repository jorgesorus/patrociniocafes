

## Plano: Melhorar Pagina Promocional com Logo Visivel e Secao de Beneficios

### Problemas Identificados
1. **Logo invisivel**: A logo esta no codigo mas nao aparece - provavelmente escura demais contra o fundo verde-escuro
2. **Subtitulo e botao CTA sumiram**: O texto descritivo e o botao "Solicitar Orcamento no WhatsApp" nao estao visiveis na tela
3. **Faltam os beneficios detalhados**: Os diferenciais que ja existem na `/lp` (Cafe Padrao 14 Acima, 100% Arabica & Bebida Dura, Laudo de Pureza, Graos ou Moido) nao foram incluidos na pagina promocional
4. **Pagina muito simples**: Precisa de mais corpo e conteudo de conversao

### O que sera feito

**1. Corrigir visibilidade da logo**
- Adicionar filtro CSS `brightness` ou `invert` para garantir que a logo apareca clara sobre o fundo escuro
- Alternativa: usar fundo branco arredondado atras da logo

**2. Garantir que subtitulo e CTA estejam visiveis**
- Verificar se os elementos estao renderizando corretamente
- Ajustar contraste se necessario

**3. Adicionar secao de beneficios/diferenciais**
- Reutilizar os 4 diferenciais da landing page institucional, adaptados para o contexto promocional:
  - Cafe Padrao 14 Acima
  - 100% Arabica & Bebida Dura
  - Laudo de Pureza Garantido
  - Em Graos ou Moido
- Exibir em cards com icones coloridos (ouro/verde), com descricoes curtas
- Secao com fundo claro (branco ou muted) para contraste com a hero escura

**4. Estrutura final da pagina**
- Hero escura com logo visivel + badge de desconto + headline + subtitulo + CTA
- Secao de beneficios/diferenciais (cards com icones)
- Barra de destaques rapidos (100% Arabica, Direto da Fabrica, etc.)
- Footer compacto

### Detalhes Tecnicos

**Arquivo modificado:** `src/pages/Index.tsx`

Alteracoes:
- Adicionar `className="brightness-0 invert"` na tag `<img>` da logo para torna-la branca
- Importar icones `Award` e `ShieldCheck` do lucide-react
- Adicionar array `features` com os 4 diferenciais (titulo, descricao, icone)
- Criar nova `<section>` entre a hero e a barra de highlights com os cards de beneficios animados com Framer Motion
- Manter CTA duplicado apos a secao de beneficios para reforcar conversao

