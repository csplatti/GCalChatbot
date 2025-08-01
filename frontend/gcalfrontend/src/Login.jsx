import './Login.css';
import { useState } from 'react';

function Login() {
  const [message, setMessage] = useState('');

  const handleGoogleSignIn = () => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = 'http://127.0.0.1:5173/dashboard'; // Replace with your redirect URI
    const scope = 'https://www.googleapis.com/auth/calendar.readonly';
    const responseType = 'token';

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

    // Open a popup window for Google Sign-In
    window.open(authUrl, '_blank', 'width=500,height=600');
  };

  return (
    <div className="login">
      <h1>Login to Get Started</h1>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
