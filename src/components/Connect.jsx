import React, { forwardRef } from 'react';

const Connect = forwardRef((props, ref) => {
  const handleLogin = () => {
    // Redirect the browser to your backend's /login route, which handles the Spotify auth flow
    window.location.href = 'https://api.moodmuzik.com/login';
  };

  return (
    <section id='connect-spotify' className='bg--light' ref={ref}>
      <div>
        <h1>
          <span>
            <i className='fa-brands fa-spotify'></i>
          </span>{' '}
          Spotify
        </h1>
      </div>
      <div>
        <h2>
          Connect your Spotify account so MOOD MUZIK can discover your music
          taste.
        </h2>
      </div>
      <div>
        <p>
          By connecting, you confirm that you have read and understood the
          Privacy & Cookie Policy and agree to the processing of your data and
          the use of cookies in accordance with it.
        </p>
      </div>
      <div id='spotify'>
        <button id='spotify-btn' onClick={handleLogin}>
          Connect with Spotify
        </button>
      </div>
    </section>
  );
});

export default Connect;
