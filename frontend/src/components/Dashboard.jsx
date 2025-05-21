import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ token }) {
  const [musicas, setMusicas] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
  const [selectedMusicId, setSelectedMusicId] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Feedback state
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showFeedback, setShowFeedback] = useState(false); 
  const [showFeedbackError, setShowFeedbackError] = useState(false); 


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchAll();
  }, []);

  {user && (
    <div style={{ marginBottom: '20px' }}>
      <p>Bem-vindo, <strong>{user.name}</strong>!</p>
      <p>Email: {user.email}</p>
    </div>
  )}

  const showMessage = (message) => {
    setFeedbackMessage(message);
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      setFeedbackMessage("");
    }, 3000);
  };

  const showMessageError = (message) => {
    setFeedbackMessage(message);
    setShowFeedbackError(true);
    setTimeout(() => {
      setShowFeedbackError(false);
      setFeedbackMessage("");
    }, 3000);
  };

  const fetchAll = async () => {
    try {
      const [musicasRes, playlistsRes] = await Promise.all([
        axios.get('/api/musics', authHeader()),
        axios.get('/api/playlists', authHeader())
      ]);
      setMusicas(musicasRes.data);
      setPlaylists(playlistsRes.data);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    }
  };

  const authHeader = () => ({
    headers: { Authorization: `Bearer ${token}` }
  });

  const handleSearch = async () => {
    try {
      const res = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${encodeURIComponent(searchQuery)}&response_type=token`);
      setSearchResults(res.data.data || []);
    } catch (err) {
      console.error('Erro na busca:', err);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSaveMusic = async (music) => {
    try {
      await axios.post('/api/musics', {
        titulo: music.title,
        artista: music.artist.name,
        capaUrl: music.album.cover_small,
        link: music.link
      }, authHeader());
      await fetchAll();
      showMessage("🎶 Música salva com sucesso!");
    } catch (err) {
      console.error('Erro ao salvar música:', err);
    }
  };

  const handleCreatePlaylist = async () => {
    if (!playlistName) return;
    try {
      await axios.post(
        "/api/playlists",
        {
          nome: playlistName,
          descricao: playlistDescription,
        },
        authHeader()
      );
      setPlaylistName("");
      setPlaylistDescription("");
      await fetchAll();
      showMessage("🎶 Playlist criada com sucesso!");
    } catch (err) {
      console.error("Erro ao criar playlist:", err);
      showMessageError("Erro ao criar playlist.");
    }
  };

  const handleAddToPlaylist = async (selectedPlaylistId, selectedMusicId) => {
    if (!selectedPlaylistId || !selectedMusicId) return;
    try {
      await axios.post(
        `/api/playlists/${selectedPlaylistId}/add-music`,
        { musicId: selectedMusicId },
        authHeader()
      );
      await fetchAll();
      setSelectedMusicId("");
      showMessage("✅ Música adicionada à playlist!");
    } catch (err) {
      console.error("Erro ao adicionar música:", err);
      showMessage("Erro ao adicionar música.");
    }
  };

  const handleRemoveFromPlaylist = async (playlistId, musicId) => {
    try {
      await axios.post(
        `/api/playlists/${playlistId}/remove-music`,
        { musicId },
        authHeader()
      );
      await fetchAll();
      showMessage("🗑️ Música removida da playlist.");
    } catch (err) {
      console.error("Erro ao remover música:", err);
      showMessage("Erro ao remover música.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>

    {showFeedback && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 9999,
            transition: "opacity 0.5s ease-in-out",
            opacity: showFeedback ? 1 : 0,
          }}
        >
          {feedbackMessage}
        </div>
      )}

    {showFeedbackError && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#dc3545", // Alterado para vermelho
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(209, 7, 7, 0.44)",
            zIndex: 9999,
            transition: "opacity 0.5s ease-in-out",
            opacity: showFeedbackError ? 1 : 0,
          }}
        >
          {feedbackMessage}
        </div>
      )}

<div style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
  <div style={{ flex: 4 }}>
    <h2 style={{ color: '#2563EB', fontSize: '1.5rem' }}>Songs 🎵
    </h2>
    <p>Bem-vindo, <strong>teste</strong>!</p>
    <p>Email: teste@teste.com</p>
  </div>

  <div style={{ flex: 5 }}></div>

  <div style={{ flex: 1 }}>
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: 'red',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '5px',
        width: '100%',
      }}
    >
      Sair
    </button>
  </div>
</div>




      <section>
        <h3>Buscar no Deezer</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="text"
            placeholder="Digite o nome da música"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar</button>
          <button onClick={handleClearSearch}>Limpar</button>
        </div>
        <ul className="list-group">
          {searchResults.map((music) => (
            <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img 
                src={music.album.cover_small} 
                alt={music.title} 
                className="me-3" 
                style={{ width: 50, height: 50, objectFit: 'cover' }} 
              />
              <div>
                <div className="fw-bold">{music.title}</div>
                <div className="text-muted" style={{ fontSize: '0.9em' }}>— {music.artist.name}</div>
              </div>
            </div>
          
            <button 
              className="btn btn-success btn-sm ms-2" 
              style={{ minWidth: '32px', padding: '2px 8px' }} 
              onClick={() => handleSaveMusic(music)}
            >
              +
            </button>
          </li>
          
          
          ))}
        </ul>
      </section>

      <section>
        <h3>Minhas Músicas</h3>
        {musicas.length === 0 ? <p>Nenhuma música salva.</p> : (
          <ul>
            {musicas.map(m => (
              <li key={m._id || m.id}>
               <img src={m.capaUrl} style={{ width: 50, height: 50 }}/> {m.titulo} — {m.artista}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3>Playlists</h3>
          <input
            type="text"
            placeholder="Nome da nova playlist"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
            <input
              type='text'
              placeholder="Digite uma descrição para a playlist"
              value={playlistDescription}
              onChange={(e) => setPlaylistDescription(e.target.value)}
              style={{ width: '100%', height: '100px', marginTop: '10px' }}
            />
          <button onClick={handleCreatePlaylist}>Criar</button>
        {playlists.map(playlist => (
          <div key={playlist._id || playlist.id} style={{ marginTop: 10, padding: 10, border: '1px solid #ccc' }}>
            <strong>{playlist.nome}</strong>
            <p>{playlist.descricao}</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
  {(playlist.musicas || []).map(m => (
    <li
      key={m._id || m.id}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 12px',
        borderBottom: '1px solid #ddd'
      }}
    >
      {/* Parte 1: Capa da música - 1/10 */}
        <div style={{ flex: 1 }}>
          <img src={m.capaUrl} alt={m.titulo} style={{ width: 50, height: 50, objectFit: 'cover' }} />
        </div>

        {/* Parte 2: Título da música - 2/10 */}
        <div style={{ flex: 2, fontWeight: 'bold' }}>
          {m.titulo}
        </div>

        {/* Parte 3: Espaço vazio - 7/10 */}
      <div style={{ flex: 7 }} />

      {/* Parte 3: Botão - 1/10 */}
      <button
        onClick={() => handleRemoveFromPlaylist(playlist._id, m._id)}
        style={{
          flex: 1,
          padding: '4px 8px',
          fontSize: '12px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Remover
      </button>
    </li>
  ))}
</ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <select
            style={{
              width: '250px',         // largura mais confortável
              padding: '6px 12px',    // espaçamento interno
              fontSize: '14px',       // tamanho da fonte
              borderRadius: '4px',    // cantos arredondados
              border: '1px solid #ccc'
            }}
              onChange={(e) => {
                setSelectedMusicId(e.target.value); 
                console.log('selectedMusicId:', selectedMusicId);
// Atualiza o ID da música selecionada
              }}
            >
              <option value="">Adicionar música salva...</option>
              {musicas.map(m => (
                <option key={m._id || m.id} value={m._id}>
                  {m.titulo}
                </option>
              ))}


              
            </select>
            <button
              disabled={!selectedMusicId || !playlist?._id}
              onClick={() => {
                console.log('Adicionando', selectedMusicId, 'à playlist', playlist._id);
                handleAddToPlaylist(playlist._id, selectedMusicId);
              }}
            >
              Adicionar a playlist
            </button>
          </div>
        </div>
        ))}
      </section>

     
    </div>
  );
}