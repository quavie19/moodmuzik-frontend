const PrivacyPolicy = () => {
  return (
    <div className='priacy max-w-3xl mx-auto p-6 text-gray-800'>
      <h1 className='text-3xl font-bold mb-4'>Privacy Policy</h1>
      <p className='mb-4'>
        <strong>Effective Date:</strong> May 9th, 2025
      </p>

      <h2 className='text-xl font-semibold mb-2'>1. What We Collect</h2>
      <p className='mb-4'>
        When you log in via Spotify, we collect your Spotify user ID, top
        artists and tracks, and your selected playlist preferences. We do not
        collect your email, password, or any personally identifiable
        information.
      </p>

      <h2 className='text-xl font-semibold mb-2'>2. How We Use Your Data</h2>
      <p className='mb-4'>
        We use this data only to personalize your experience, generate
        mood-based playlists, and display tracks in the app UI. We do not share
        or sell your data with third parties.
      </p>

      <h2 className='text-xl font-semibold mb-2'>3. Data Storage</h2>
      <p className='mb-4'>
        Your data is temporarily stored in your browser’s local storage and is
        not stored on any external server.
      </p>

      <h2 className='text-xl font-semibold mb-2'>4. How to Revoke Access</h2>
      <p className='mb-4'>
        You can disconnect Mood Muzik from Spotify by using the “Disconnect”
        button in the app or via your{' '}
        <a
          href='https://www.spotify.com/account/apps'
          className='privacy text-blue-600 underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          Spotify account settings
        </a>
        .
      </p>

      <h2 className='text-xl font-semibold mb-2'>5. Changes to This Policy</h2>
      <p className='mb-4'>
        We may occasionally update this policy. Please check this page
        periodically for changes.
      </p>

      <h2 className='text-xl font-semibold mb-2'>6. Contact</h2>
      <p>If you have any questions, contact us at jaquaviawalker@gmail.com.</p>
    </div>
  );
};

export default PrivacyPolicy;
