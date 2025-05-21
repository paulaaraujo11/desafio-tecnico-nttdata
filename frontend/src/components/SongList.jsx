import React from 'react';

export default function SongList({ musicas, searchQuery, setSearchQuery, handleSaveMusic }) {
  return (
    <section>
      <h3>Buscar no Deezer</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Digite o nome da música"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button>Buscar</button>
        <button onClick={() => setSearchQuery('')}>Limpar</button>
      </div>
      <ul>
        {musicas.map((music) => (
          <li key={music.id}>
            <span>{music.titulo} - {music.artista}</span>
            <button onClick={() => handleSaveMusic(music)}>Salvar</button>
          </li>
        ))}
      </ul>
    </section>
  );
}