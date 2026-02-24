<div align="center">
  <img src="./frontend/src/assets/logo.svg" width="96" height="96" alt="Financy" />
  <p>Gerenciador de finanças pessoais para acompanhar receitas, despesas e categorias — tudo em um só lugar.</p>
</div>

---

## Funcionalidades

- **Autenticação** — Cadastro e login com autenticação via JWT
- **Dashboard** — Visão geral da sua atividade financeira
- **Transações** — Criar, editar e excluir registros de receita ou despesa com data, descrição e categoria
- **Categorias** — Organize suas transações com ícones e cores personalizados
- **Perfil** — Atualize as informações da sua conta

## Tecnologias

| Camada   | Tecnologia                                  |
|----------|---------------------------------------------|
| Backend  | Node.js, Apollo Server, TypeGraphQL         |
| Banco    | SQLite via Prisma ORM                       |
| Frontend | React 19, Vite, TailwindCSS, Apollo Client  |

## Rodando localmente

### Pré-requisitos

- Node.js 18+
- npm

### Backend

```bash
cd backend
npm install
npm run dev
```

API GraphQL disponível em `http://localhost:4000/graphql`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App disponível em `http://localhost:5173`.
