import React, { forwardRef, useState } from 'react';
import { usePlaylist } from './PlaylistContext';

const Length = forwardRef(({ moodSectionRef }, ref) => {
  const { setLength } = usePlaylist();
  const [selectedLength, setSelectedLength] = useState(null);

  const handleLengthChange = (newLength) => {
    setLength(newLength);
    setSelectedLength(newLength);

    // Ensure moodSectionRef is available and scroll to it
    if (moodSectionRef.current) {
      moodSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id='playlist-length' className='bg--light' ref={ref}>
      <div>
        <p>Choose playlist length</p>
      </div>
      <div id='buttons'>
        {[10, 15, 20].map((length) => (
          <button
            key={length}
            onClick={() => handleLengthChange(length)}
            className={selectedLength === length ? 'selected' : ''}
          >
            {length}
          </button>
        ))}
      </div>
    </section>
  );
});

export default Length;
