# API de Gestão Financeira

API REST desenvolvida com **Node.js**, **TypeScript**, **Express** e **MongoDB** para controle de finanças pessoais. Esta aplicação permite o registro de receitas e despesas por categoria, autenticação de usuários, e fornece base para futuras integrações com investimentos e dados externos em tempo real. Com uma arquitetura totalmente modular e escalável, é um projeto com um grande potencial de crescimento.

## ✅ Funcionalidades

- Cadastro e autenticação de usuários com JWT
- Registro de transações financeiras (receitas e despesas)
- Organização por categorias de transações customizáveis
- Filtros por data, categoria e tipo (entrada/saída)  *// Ainda não implementado*
- Middleware global de tratamento de erros
- Retornos padronizados com status HTTP, mensagens e payload

## 🧱 Arquitetura do Projeto

### Camadas e Responsabilidades

- **Controller**: recebe requisições e envia respostas formatadas.
- **Service**: processa a lógica de negócio e validações.
- **Repository**: acessa o banco de dados (MongoDB via Mongoose).
- **Model**: define os schemas dos dados.
- **Middleware**: trata autenticação, erros e resposta.

### Banco de Dados

Banco não-relacional (MongoDB). Estrutura simplificada:

- `users`: dados dos usuários e autenticação
- `transactions`: valores, data, tipo, categoria, forma de pagamento, descrição e destinatário
- `categories`: nome e cor de categorias criadas pelo usuário

## 🛠️ Tecnologias Utilizadas

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT
- Bcrypt
- Clean Architecture: Arquitetura em Camadas (Controller, Service, Repository, Model)
- TS-Node

## ▶️ Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- MongoDB rodando localmente ou URI da Atlas

### Instalação

```bash
git clone 'https://github.com/defreitassl/API-Gestao-Financeira-TS-Express-MongoDB'
cd API-Gestao-Financeira-TS-Express-MongoDB
npm install
```

Configure seu `.env` com:

```.env
PORT=3333
DB_URI=<sua URI do mongoDB>
SECRET_KEY=<sua_chave_secreta>
```

### Execução

```bash
npm run start:watch
```

A API será executada em `http://localhost:3333`

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou pull request.

## 📄 Licença

Distribuído sob a licença MIT.

## 📬 Contato

 - Desenvolvido por Douglas Freitas  
 - Email: [douglasamf14@gmail.com](mailto:douglasamf14@gmail.com)
 - LinkedIn: [www.linkedin.com/in/douglas-freitas-236947257](www.linkedin.com/in/douglas-freitas-236947257)
