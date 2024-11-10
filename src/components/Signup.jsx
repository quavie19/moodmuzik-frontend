import { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // State for success message

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email };
      const response = await fetch('https://api.moodmuzik.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // Update the success message
        setMessage('Thank you! You’ve successfully signed up.');
        setEmail(''); // Clear the email input after successful submission
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className='signup'>
      <h1 className='mt'>Discover the Soundtrack to Your Mood</h1>
      <p className='mt-5'>
        Please sign up with your Spotify email to gain permission to the Mood
        Muzik app
      </p>
      {message && <p className='success-message'>{message}</p>}{' '}
      {/* Display the success message */}
      <form onSubmit={onSubmitForm} className='mt-5 form-container'>
        <input
          placeholder='Spotify Email'
          type='email'
          id='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Signup;
