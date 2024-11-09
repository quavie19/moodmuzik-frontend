import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LoadingBlack = () => {
  return (
    <div
      className='loading'
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '3rem',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>Fetching your Top Artists</h1>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'black',
          filter: 'grayscale(100%)', // Optional, if the animation is not monochrome
        }}
      >
        <DotLottieReact
          src='/TqwkDwGa9x.json' // Ensure this path is correct
          loop
          autoplay
          onError={(error) => console.error('Lottie loading error:', error)}
        />
      </div>
    </div>
  );
};

const LoadingWhite = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        backgroundColor: 'black', // Background for contrast
      }}
    >
      <DotLottieReact
        src='/GmfjTn4Xdp.json' // Ensure this path is correct
        loop
        autoplay
        onError={(error) => console.error('Lottie loading error:', error)}
      />
    </div>
  );
};

export { LoadingBlack, LoadingWhite };
