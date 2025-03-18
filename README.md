# machine-baby

Uma página de links elegante e minimalista para uma loja de produtos infantis, desenvolvida com React, TypeScript e Tailwind CSS.

![Baby Dreams Preview](https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=300)

## 🚀 Tecnologias

Este projeto foi construído com as seguintes tecnologias:

- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Lucide React](https://lucide.dev/) para ícones

## 📋 Características

- Design minimalista inspirado na Apple
- Interface responsiva
- Animações suaves
- Paleta de cores em tons pastéis
- Links personalizados para cada seção
- Integração com redes sociais
- Botão de WhatsApp flutuante
- Otimizado para SEO e performance

## 🎨 Design

O design segue princípios modernos e minimalistas:

- Paleta de cores suaves (rosa claro, azul bebê)
- Tipografia clean e legível
- Espaçamento generoso entre elementos
- Cards com cantos arredondados
- Sombras sutis para profundidade
- Transições suaves nos estados hover
- Layout centrado com largura máxima responsiva

## 🛠 Estrutura do Projeto

```
baby-dreams/
├── src/
│   ├── App.tsx           # Componente principal
│   ├── main.tsx         # Ponto de entrada
│   └── index.css        # Estilos globais
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## 💻 Como Executar

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse `http://localhost:5173`

## 🔧 Configuração

Para personalizar os links e informações:

1. Edite o array `links` em `App.tsx` para suas categorias
2. Atualize `socialLinks` com suas redes sociais
3. Modifique o número do WhatsApp em `href="https://wa.me/SEU_NUMERO"`
4. Personalize as cores no arquivo `tailwind.config.js`

## 📱 Responsividade

O projeto é totalmente responsivo e otimizado para:
- Desktop
- Tablet
- Dispositivos móveis

## ⚡ Performance

- Carregamento otimizado de imagens
- Bundle size minimizado
- Code splitting automático
- Prefetch de recursos críticos

## 🔒 Segurança

- Links externos com `rel="noopener noreferrer"`
- TypeScript para type safety
- ESLint para análise de código

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuição

1. Faça o fork do projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
