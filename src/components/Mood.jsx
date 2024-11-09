import React, { forwardRef, useState, useEffect } from 'react';
import { usePlaylist } from './PlaylistContext';

const Mood = forwardRef(({ connectSectionRef }, ref) => {
  const { setMood } = usePlaylist();
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodColor, setMoodColor] = useState(null);

  // Define a default mood colors mapping
  const moodColors = {
    happy: '#ff7400',
    sad: '#0071b6',
    chill: '#FFEA00',
    energetic: '#f31c1c',
  };

  // Set the background color on mount if stored in localStorage
  useEffect(() => {
    const storedColor = localStorage.getItem('selectedMoodColor');
    if (storedColor) {
      document.body.style.backgroundColor = storedColor;
      setMoodColor(storedColor); // Set the stored color to state
    }
  }, []);

  const handleMoodChange = (mood) => {
    setMood(mood);
    setSelectedMood(mood); // Update the selected mood state

    // Set the background color based on the selected mood
    const color = moodColors[mood];
    setMoodColor(color);
    localStorage.setItem('selectedMoodColor', color); // Persist color
    document.body.style.backgroundColor = color; // Apply background color

    // Scroll to the next section after mood selection
    if (connectSectionRef.current) {
      connectSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id='mood-selector' className='bg--dark' ref={ref}>
      <div>
        <p>What mood are you in?</p>
      </div>
      <div id='buttons'>
        {['happy', 'sad', 'chill', 'energetic'].map((mood) => (
          <button
            key={mood}
            onClick={() => handleMoodChange(mood)}
            className={`mood-btn ${mood} ${
              selectedMood === mood ? 'selected' : ''
            }`}
          >
            {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </button>
        ))}
      </div>
    </section>
  );
});

export default Mood;
