# API de Gestão Financeira

API REST desenvolvida com **Node.js**, **TypeScript**, **Express** e **MongoDB** para controle de finanças pessoais. Esta aplicação permite o registro de receitas e despesas por categoria, autenticação de usuários, e fornece base para futuras integrações com investimentos e dados externos em tempo real.

## 📚 Sumário

- [Funcionalidades](#funcionalidades)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
  - [Camadas e Responsabilidades](#camadas-e-responsabilidades)
  - [Fluxos e Operações](#fluxos-e-operações)
  - [Banco de Dados](#banco-de-dados)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Contribuições](#contribuições)
- [Licença](#licença)
- [Contato](#contato)

## ✅ Funcionalidades

- Cadastro e autenticação de usuários com JWT
- Registro de transações financeiras (receitas e despesas)
- Organização por categorias customizáveis
- Suporte a diferentes formas de pagamento
- Filtros por data, categoria e tipo (entrada/saída)
- Middleware global de tratamento de erros
- Retornos padronizados com status HTTP, mensagens e payload

## 🧱 Arquitetura do Projeto

### Camadas e Responsabilidades

- **Controller**: recebe requisições e envia respostas formatadas.
- **Service**: processa a lógica de negócio e validações.
- **Repository**: acessa o banco de dados (MongoDB via Mongoose).
- **Model**: define os schemas dos dados.
- **Middleware**: trata autenticação, erros e resposta.

### Fluxos e Operações

- **Criação de Transação**
  - Validação dos dados recebidos.
  - Registro da transação e associação a usuário e categoria.
  - Retorno com status `201 Created`.

- **Autenticação**
  - Login com validação de e-mail e senha.
  - Geração e retorno de token JWT válido.

- **Consulta de Dados**
  - Filtros por `userId`, `data`, `categoria`, `tipo`.
  - Paginação e ordenação por data de forma opcional.

### Banco de Dados

Banco não-relacional (MongoDB). Estrutura simplificada:

- `users`: dados dos usuários e autenticação
- `transactions`: valores, data, tipo, categoria, forma de pagamento
- `categories`: nome e cor de categorias criadas pelo usuário

## 🛠️ Tecnologias Utilizadas

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT
- Bcrypt
- Dotenv
- TS-Node + Nodemon

## ▶️ Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- MongoDB rodando localmente ou URI da Atlas

### Instalação

```bash
git clone <repositório>
cd api-gestao-financeira
npm install
cp .env.example .env
```

Configure seu `.env` com:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/sua-base
JWT_SECRET=sua_chave_secreta
```

### Execução

```bash
npm run dev
```

A API será executada em `http://localhost:3000`

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou pull request.

## 📄 Licença

Distribuído sob a licença MIT.

## 📬 Contato

Desenvolvido por [Seu Nome Aqui]  
Email: [seu@email.com]  
LinkedIn: [https://linkedin.com/in/seu-perfil](https://linkedin.com/in/seu-perfil)
