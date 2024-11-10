import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Ensure the Home component is imported
import PickArtists from './components/PickArtists'; // Import PickArtists
import Embed from './components/Embed';
import Signup from './components/Signup';

function App() {
  const [moodColor, setMoodColor] = useState(
    localStorage.getItem('selectedMoodColor') || 'white'
  );

  useEffect(() => {
    document.body.style.backgroundColor = moodColor;
  }, [moodColor]);

  const resetAppState = () => {
    setMoodColor('white'); // reset color
    localStorage.removeItem('selectedMoodColor'); // clear local storage
    // Reset any other state you might have
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signup />} />

        <Route path='/home' element={<Home />} />
        <Route
          path='/artists'
          element={<PickArtists setMoodColor={setMoodColor} />}
        />
        <Route
          path='/embed/:playlistId'
          element={
            <Embed setMoodColor={setMoodColor} resetAppState={resetAppState} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
