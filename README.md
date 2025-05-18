# Desafio Técnico NTT Data

## Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- (Opcional) [MongoDB Compass](https://www.mongodb.com/try/download/compass)

## Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/paula/desafio-tecnico-nttdata.git
   cd desafio-tecnico-nttdata
   ```

2. **Suba os containers com Docker Compose:**
   ```bash
   docker-compose up --build
   ```

3. **Acesse o frontend:**
   - [http://localhost:3000](http://localhost:3000)

4. **Teste o backend:**
   - [http://localhost:5000/ping](http://localhost:5000)

5. **Acesse o banco de dados (opcional):**
   - Conecte no MongoDB com: `mongodb://localhost:27017/streaming`

## Estrutura do Projeto

```
desafio-tecnico-nttdata/
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   └── app.js
│   ├── package.json
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

## Gitflow

Este projeto utiliza [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow):

- Branch principal: `main`
- Branch de desenvolvimento: `develop`
- Para novas features: crie branches a partir de `develop` com o prefixo `feature/`
- Para correções de bugs: use o prefixo `bugfix/`
- Para releases: use o prefixo `release/`
- Para hotfixes: use o prefixo `hotfix/`

## .gitignore

Veja o arquivo `.gitignore` para evitar versionar arquivos desnecessários.

---