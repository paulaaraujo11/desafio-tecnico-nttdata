# Desafio Técnico NTT Data

# Sobre o projeto
songs é uma aplicação full stack web que simula uma plataforma de streaming de músicas, onde os usuários podem pesquisar, ouvir faixas e criar playlists.

## Telas
![login](https://github.com/paulaaraujo11/desafio-tecnico-nttdata/assets/main/login.gif)
![register](https://github.com/paulaaraujo11/desafio-tecnico-nttdata/assets/main/register.gif)
![buscar musica](ttps://github.com/paulaaraujo11/desafio-tecnico-nttdata/assets/main/buscarmusica.gif)
![tela principal](ttps://github.com/paulaaraujo11/desafio-tecnico-nttdata/assets/main/dash.png)


## Modelo conceitual
![Modelo Conceitual](https://github.com/paulaaraujo11/desafio-tecnico-nttdata/assets/main/modelo-conceitual.png)

## Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- (Opcional) [MongoDB Compass](https://www.mongodb.com/try/download/compass)

## Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/paulaaraujo11/desafio-tecnico-nttdata.git
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
├── assets/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── tests/
│   │   └── app.js
│   ├── package.json
│   ├── package-lock.json
│   └── Dockerfile
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.js
│   ├── package.json
│   ├── package-lock.json
│   └── Dockerfile
│
├── docker-compose.yml
├── .gitignore
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


# Melhorias Futuras

- Implementar logs estruturados, categorizados por contexto, usuários e faixas, para facilitar a análise e o monitoramento do sistema.
- Adicionar gráficos interativos com estatísticas detalhadas por usuário e globais, permitindo uma melhor visualização dos dados.
- Implementar paginação na exibição de músicas dentro das playlists, melhorando a experiência do usuário em listas extensas.
- Utilizar Named Entity Recognition (NER) para aprimorar a busca de músicas, permitindo pesquisas mais precisas por artistas, álbuns e faixas.
- Explorar integrações com serviços como [Shoutcast](https://www.shoutcast.com/), Mux e Gumlet para melhorar o streaming e a entrega de mídia.

# Autor

Paula Araujo
https://www.linkedin.com/in/paulaaraujo11/
