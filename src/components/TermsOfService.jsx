const TermsOfService = () => {
  return (
    <div className='max-w-3xl mx-auto p-6 text-gray-800'>
      <h1 className='text-3xl font-bold mb-4'>Terms of Service</h1>
      <p className='mb-4'>
        <strong>Effective Date:</strong> May 9th, 2025
      </p>

      <h2 className='text-xl font-semibold mb-2'>1. Use of the App</h2>
      <p className='mb-4'>
        Mood Muzik is a personal playlist generator that connects with your
        Spotify account. You may only use this app in compliance with all
        applicable laws and regulations.
      </p>

      <h2 className='text-xl font-semibold mb-2'>2. Spotify Integration</h2>
      <p className='mb-4'>
        By logging into Spotify through Mood Muzik, you agree to Spotify’s{' '}
        <a
          href='https://www.spotify.com/legal/end-user-agreement/'
          className='text-blue-600 underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          Terms of Use
        </a>{' '}
        and authorize us to access your Spotify data for the purpose of
        generating custom playlists.
      </p>

      <h2 className='text-xl font-semibold mb-2'>3. User Responsibilities</h2>
      <p className='mb-4'>
        You agree not to misuse Mood Muzik, alter Spotify’s visual content, or
        use the app to distribute unauthorized material.
      </p>

      <h2 className='text-xl font-semibold mb-2'>4. Termination</h2>
      <p className='mb-4'>
        We reserve the right to suspend or terminate access to Mood Muzik at any
        time for any reason, including violation of these terms.
      </p>

      <h2 className='text-xl font-semibold mb-2'>5. Disclaimer</h2>
      <p className='mb-4'>
        Mood Muzik is not affiliated with Spotify. We provide this app "as is"
        without warranties of any kind.
      </p>

      <h2 className='text-xl font-semibold mb-2'>6. Contact</h2>
      <p>
        If you have any questions, please contact us at
        jaquaviawalker@gmail.com.
      </p>
    </div>
  );
};

export default TermsOfService;
