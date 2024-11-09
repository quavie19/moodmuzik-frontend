import React, { useRef } from 'react';
import Connect from '../components/Connect';
import Header from '../components/Header';
import Length from '../components/Length';
import Mood from '../components/Mood';

const Home = () => {
  const moodSectionRef = useRef(null);
  const connectSectionRef = useRef(null);
  const lengthSectionRef = useRef(null);

  return (
    <>
      <Header lengthSectionRef={lengthSectionRef} />
      <Length ref={lengthSectionRef} moodSectionRef={moodSectionRef} />
      <Mood ref={moodSectionRef} connectSectionRef={connectSectionRef} />
      <Connect ref={connectSectionRef} />
    </>
  );
};

export default Home;
