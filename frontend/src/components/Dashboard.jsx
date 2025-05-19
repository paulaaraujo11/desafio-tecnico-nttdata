import React, { useEffect, useState } from 'react';
import axios from '../services/api';

export default function Dashboard({ token }) {
  const [musicas, setMusicas] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [musicasRes, playlistsRes] = await Promise.all([
          axios.get('/musicas', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/playlists', { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setMusicas(musicasRes.data);
        setPlaylists(playlistsRes.data);
      } catch (err) {
        setMusicas([]);
        setPlaylists([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [token]);

  if (loading) return <div>Carregando...</div>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <h2>Dashboard</h2>
      <section>
        <h3>Minhas Músicas</h3>
        {musicas.length === 0 ? (
          <p>Nenhuma música encontrada.</p>
        ) : (
          <ul>
            {musicas.map((musica) => (
              <li key={musica._id || musica.id}>
                <strong>{musica.titulo || musica.nome}</strong> — {musica.artista}
              </li>
            ))}
          </ul>
        )}
      </section>
      <section style={{ marginTop: 32 }}>
        <h3>Minhas Playlists</h3>
        {playlists.length === 0 ? (
          <p>Nenhuma playlist encontrada.</p>
        ) : (
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist._id || playlist.id}>
                <strong>{playlist.nome}</strong> ({playlist.musicas?.length || 0} músicas)
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}