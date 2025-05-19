import React from 'react';

export default function PlaylistList({ playlists }) {
  if (!playlists || playlists.length === 0) {
    return <p>Nenhuma playlist encontrada.</p>;
  }

  return (
    <ul>
      {playlists.map((playlist) => (
        <li key={playlist._id || playlist.id}>
          <strong>{playlist.nome}</strong> ({playlist.musicas?.length || 0} músicas)
        </li>
      ))}
    </ul>
  );
}