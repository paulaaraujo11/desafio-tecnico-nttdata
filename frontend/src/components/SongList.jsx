import React from 'react';

export default function SongList({ musicas }) {
  if (!musicas || musicas.length === 0) {
    return <p>Nenhuma música encontrada.</p>;
  }

  return (
    <ul>
      {musicas.map((musica) => (
        <li key={musica._id || musica.id}>
          <strong>{musica.titulo || musica.nome}</strong> — {musica.artista}
        </li>
      ))}
    </ul>
  );
}