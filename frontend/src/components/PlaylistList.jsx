import React from 'react';

export default function Playlist({
  playlists,
  musicas,
  selectedMusicId,
  setSelectedMusicId,
  playlistName,
  setPlaylistName,
  playlistDescription,
  setPlaylistDescription,
  handleCreatePlaylist,
  handleAddToPlaylist,
  handleRemoveFromPlaylist,
}) {
  return (
    <section>
      <h3>Playlists</h3>
      <input
        type="text"
        placeholder="Nome da nova playlist"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descrição"
        value={playlistDescription}
        onChange={(e) => setPlaylistDescription(e.target.value)}
      />
      <button onClick={handleCreatePlaylist}>Criar Playlist</button>

      {playlists.map((playlist) => (
        <div key={playlist._id}>
          <h4>{playlist.nome}</h4>
          <ul>
            {playlist.musicas.map((music) => (
              <li key={music._id}>
                {music.titulo}
                <button onClick={() => handleRemoveFromPlaylist(playlist._id, music._id)}>Remover</button>
              </li>
            ))}
          </ul>
          <select onChange={(e) => setSelectedMusicId(e.target.value)}>
            <option value="">Adicionar música...</option>
            {musicas.map((music) => (
              <option key={music._id} value={music._id}>
                {music.titulo}
              </option>
            ))}
          </select>
          <button onClick={() => handleAddToPlaylist(playlist._id, selectedMusicId)}>Adicionar</button>
        </div>
      ))}
    </section>
  );
}