import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlaylist } from './PlaylistContext'; // Assuming you have this hook

const Embed = () => {
  const { playlistId } = useParams();
  const [playlistUrl, setPlaylistUrl] = useState('');
  const navigate = useNavigate();
  const { resetPlaylistSelections } = usePlaylist();

  useEffect(() => {
    if (playlistId) {
      setPlaylistUrl(`https://open.spotify.com/embed/playlist/${playlistId}`);
      console.log('Playlist ID:', playlistId);
    }
  }, [playlistId]);

  const handleShare = () => {
    navigator.clipboard
      .writeText(`https://open.spotify.com/playlist/${playlistId}`)
      .then(() => alert('Playlist link copied to clipboard!'))
      .catch(() => alert('Failed to copy link. Please try again.'));
  };

  const handleCreateAnother = () => {
    resetPlaylistSelections(); // Reset all settings
    navigate('/'); // Navigate to home page
  };

  return (
    <div className='embed'>
      <h1>Your Mood Muzik Playlist was created</h1>
      {playlistUrl ? (
        <iframe
          src={playlistUrl}
          width='300'
          height='380'
          frameBorder='0'
          allow='encrypted-media'
          title='Spotify Playlist Embed'
        ></iframe>
      ) : (
        <p>Loading your playlist...</p>
      )}
      <div>
        <button className='embed' onClick={handleShare}>
          Share
        </button>
        <button
          className='embed'
          onClick={() =>
            window.open(
              `https://open.spotify.com/playlist/${playlistId}`,
              '_blank'
            )
          }
        >
          Listen on Spotify
        </button>
        <button className='embed' onClick={handleCreateAnother}>
          Create Another
        </button>
      </div>
    </div>
  );
};

export default Embed;
