import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlaylist } from './PlaylistContext';

const PickArtists = ({ setMoodColor }) => {
  const navigate = useNavigate();
  const { mood, length, user, setPlaylistId, resetPlaylistSelections } =
    usePlaylist();

  const [artists, setArtists] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [error, setError] = useState(null);
  const [creationInProgress, setCreationInProgress] = useState(false);
  const [fetchedTracks, setFetchedTracks] = useState([]);
  const [loadingTracks, setLoadingTracks] = useState(false);
  const [loadingArtists, setLoadingArtists] = useState(true);

  const moodSettings = {
    happy: {
      valence: [0.6, 1], // was [0.7, 1]
      energy: [0.6, 1], // was [0.7, 1]
      danceability: [0.6, 1], // was [0.7, 1]
      acousticness: [0, 0.3], // was [0, 0.2]
      tempo: [100, 180], // was [120, 180]
    },
    sad: {
      valence: [0, 0.4], // was [0, 0.3]
      energy: [0, 0.4], // was [0, 0.3]
      danceability: [0, 0.5], // was [0, 0.4]
      acousticness: [0.4, 1], // was [0.5, 1]
      tempo: [50, 110], // was [60, 100]
    },
    energetic: {
      valence: [0.2, 0.6], // was [0.3, 0.5]
      energy: [0.7, 1], // was [0.8, 1]
      danceability: [0.5, 1], // was [0.6, 1]
      acousticness: [0, 0.2], // was [0, 0.1]
      tempo: [120, 180], // was [130, 170]
    },
    chill: {
      valence: [0.4, 0.8], // was [0.5, 0.7]
      energy: [0.1, 0.7], // was [0.2, 0.6]
      danceability: [0.4, 0.9], // was [0.5, 0.8]
      acousticness: [0.3, 0.9], // was [0.4, 0.8]
      tempo: [80, 130], // was [90, 120]
    },
  };

  useEffect(() => {
    const fetchTopArtists = async () => {
      setLoadingArtists(true);
      try {
        const response = await fetch(
          'https://moodmuzik-server.onrender.com/artists?type=artists&time_range=long_term&limit=50',
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (!response.ok) {
          // Log the response error to debug
          const errorData = await response.json();
          console.error('Error fetching top artists:', errorData);
          throw new Error(errorData.error || 'Failed to fetch artists');
        }

        const data = await response.json();
        setArtists(data.items || []);
      } catch (error) {
        setError('Error fetching top artists');
        console.error(error);
      } finally {
        setLoadingArtists(false);
      }
    };

    fetchTopArtists();
  }, []);

  const handleArtistClick = (artist) => {
    if (selectedArtists.find((a) => a.id === artist.id)) {
      setSelectedArtists((prev) => prev.filter((a) => a.id !== artist.id));
    } else if (selectedArtists.length < 5) {
      setSelectedArtists((prev) => [...prev, artist]);
    }
  };

  const fetchTracks = async () => {
    if (selectedArtists.length < 5) {
      setError('Please select 5 artists');
      return [];
    }

    setLoadingTracks(true);
    setError(null);

    // Ensure the selected mood is valid
    const { valence, energy, danceability, acousticness, tempo } =
      moodSettings[mood] || moodSettings.default;

    try {
      const limit = length || 20;
      const artistIds = selectedArtists.map((artist) => artist.id).join(',');
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        artistsId: artistIds,
        valence: valence.join(','),
        energy: energy.join(','),
        ...(danceability && { danceability: danceability.join(',') }),
        ...(acousticness && { acousticness: acousticness.join(',') }),
        ...(tempo && { tempo: tempo.join(',') }),
      });

      const response = await fetch(
        `https://moodmuzik-server.onrender.com/tracks?${queryParams}`,
        { method: 'GET', credentials: 'include' }
      );

      if (!response.ok) throw new Error('Failed to fetch tracks');

      const data = await response.json();
      setFetchedTracks(data.tracks || []);
      return data.tracks || [];
    } catch (error) {
      setError('Error fetching tracks');
      console.error(error);
      return [];
    } finally {
      setLoadingTracks(false);
    }
  };

  const resetSelections = () => {
    setSelectedArtists([]);
    setFetchedTracks([]);
    resetPlaylistSelections();
    setMood(null);
    setLength(null);
  };

  const createPlaylist = async (tracks) => {
    if (creationInProgress || !user?.id || tracks.length === 0) return;

    setCreationInProgress(true);
    try {
      const body = {
        description: `Mood Music Playlist (${mood})`,
        name: `Mood Music featuring artists like ${selectedArtists
          .map((artist) => artist.name)
          .join(', ')}`,
        user_id: user.id,
      };

      const response = await fetch(
        'https://moodmuzik-server.onrender.com/create_playlist',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPlaylistId(data.id);
        await addTracksToPlaylist(data.id, tracks);
        navigate(`/embed/${data.id}`);
      } else {
        setError('Failed to create playlist');
        console.error('Error:', await response.json());
      }
    } catch (err) {
      setError('Error creating playlist');
      console.error(err);
    } finally {
      setCreationInProgress(false);
    }
  };

  const addTracksToPlaylist = async (playlistId, tracks) => {
    const trackUris = tracks.map((track) => track.uri);
    try {
      const response = await fetch(
        'https://moodmuzik-server.onrender.com/add',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ playlist_id: playlistId, uris: trackUris }),
        }
      );

      if (!response.ok) throw new Error('Failed to add tracks to playlist');
      console.log('Tracks successfully added to playlist');
    } catch (err) {
      setError('Error adding tracks to playlist');
      console.error(err);
    }
  };

  const initiatePlaylistCreation = async () => {
    if (creationInProgress) return;

    const tracks = await fetchTracks();
    if (tracks.length > 0) {
      await createPlaylist(tracks);
    }
  };

  console.log(mood);
  console.log(length);
  console.log(selectedArtists);

  return (
    <section id='choose-artist'>
      <div>
        <h1>Choose 5 artists to match your MOOD</h1>
      </div>
      <div className='grid-container'>
        {artists.map((artist) => (
          <div key={artist.id}>
            <img
              className={`artist ${
                selectedArtists.find((a) => a.id === artist.id)
                  ? 'selected'
                  : ''
              }`}
              onClick={() => handleArtistClick(artist)}
              style={{
                cursor: 'pointer',
                border: selectedArtists.find((a) => a.id === artist.id)
                  ? '5px solid green'
                  : 'none',
                transition: 'border-color 0.3s ease',
              }}
              src={artist.images[0]?.url || 'fallback-image-url.jpg'}
              alt={artist.name}
              aria-label={`Select artist ${artist.name}`}
            />
            <p>{artist.name}</p>
          </div>
        ))}
      </div>
      <div>
        {selectedArtists.length === 5 &&
          !loadingTracks &&
          !creationInProgress && (
            <button
              className='create-btn'
              onClick={initiatePlaylistCreation}
              disabled={creationInProgress}
            >
              {creationInProgress ? 'Creating...' : 'Create playlist'}
            </button>
          )}
      </div>

      {error && <p className='error'>{error}</p>}
    </section>
  );
};

export default PickArtists;
