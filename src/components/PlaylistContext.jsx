import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [mood, setMood] = useState(() => localStorage.getItem('mood') || null);
  const [length, setLength] = useState(
    () => parseInt(localStorage.getItem('length'), 10) || 20
  );
  const [playlistId, setPlaylistId] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userError, setUserError] = useState(null);

  const [selectedArtists, setSelectedArtists] = useState([]);

  useEffect(() => {
    localStorage.setItem('mood', mood);
  }, [mood]);

  useEffect(() => {
    localStorage.setItem('length', length);
  }, [length]);

  const fetchUserData = async () => {
    setLoadingUser(true);
    setUserError(null);
    try {
      const response = await fetch('https://api.moodmuzik.com/user', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserError('Error fetching user data');
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const resetPlaylistSelections = () => {
    setMood(null); // Reset mood
    setLength(20); // Reset length to default
    setSelectedArtists([]); // Reset selected artists
    setPlaylistId(null); // Reset playlist ID

    // Clear stored values in localStorage
    localStorage.removeItem('mood');
    localStorage.setItem('length', 20); // Reset length to 20 in storage
  };

  const contextValue = useMemo(
    () => ({
      mood,
      setMood,
      length,
      setLength,
      user,
      loadingUser,
      userError,
      playlistId,
      setPlaylistId,
      selectedArtists,
      setSelectedArtists,
      resetPlaylistSelections, // Provide the reset function
    }),
    [mood, length, user, loadingUser, userError, playlistId, selectedArtists]
  );

  return (
    <PlaylistContext.Provider value={contextValue}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  return useContext(PlaylistContext);
};
