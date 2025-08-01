import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function Login() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate hook

  const handleGoogleSignIn = () => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = 'http://127.0.0.1:5173/dashboard'; // Replace with your redirect URI
    const scope = 'https://www.googleapis.com/auth/calendar';
    const responseType = 'token';

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

    // Open a popup window for Google Sign-In
    const popup = window.open(authUrl, '_blank', 'width=500,height=600');

    // Monitor the popup
    const interval = setInterval(() => {
      try {
        if (popup && popup.location.href.startsWith(redirectUri)) {
          const url = new URL(popup.location.href);
          const token = url.hash.split('&').find(param => param.startsWith('#access_token')).split('=')[1];

          console.log('OAuth Token:', token); // Log the token for debugging
          localStorage.setItem('oauthToken', token); // Store the token in localStorage
          popup.close(); // Close the popup
          clearInterval(interval); // Stop monitoring
          navigate('/dashboard'); // Redirect to the dashboard
        }
      } catch (error) {
        // Ignore cross-origin errors until the popup redirects to the same origin
      }
    }, 500);
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
