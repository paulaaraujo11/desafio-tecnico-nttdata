1. Definição do CRUD
Usuário
Criar: Cadastro de novo usuário (nome, email, senha).
Ler: Login/autenticação (retorna token JWT).
Atualizar: Atualizar dados do usuário (opcional).
Deletar: Remover conta (opcional).
Playlist
Criar: Criar nova playlist (nome, descrição, usuário dono).
Ler: Listar playlists do usuário, detalhes de uma playlist.
Atualizar: Editar nome/descrição, adicionar/remover músicas.
Deletar: Excluir playlist.
Música
Criar: Adicionar música à playlist (título, artista, capa, link).
Ler: Listar músicas de uma playlist.
Atualizar: Editar dados da música (opcional).
Deletar: Remover música da playlist.

{
  "_id": "ObjectId",
  "nome": "string",
  "email": "string",
  "senha": "string (hash)"
}

{
  "_id": "ObjectId",
  "nome": "string",
  "descricao": "string",
  "usuarioId": "ObjectId (referência ao usuário)",
  "musicas": ["ObjectId", ...] // referências a músicas
}

{
  "_id": "ObjectId",
  "titulo": "string",
  "artista": "string",
  "capaUrl": "string",
  "link": "string"
}

desafio-tecnico-nttdata/
│
├── backend/
│   ├── src/
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