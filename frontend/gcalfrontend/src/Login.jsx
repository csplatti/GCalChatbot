import './Login.css';
import { useState } from 'react';

function Login() {
  const [message, setMessage] = useState('');

  const handleGoogleSignIn = async () => {
    try {
        const response = await fetch('http://localhost:5067/api/hello', {
            method: "GET",
        });
        const data = await response.json();
        console.log(data);
        setMessage(data.message); // Update the message state with the API response
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Failed to fetch data from the server.');
    }
  };

  return (
    <div className="login">
      <h1>Login to Get Started</h1>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button> {/* Call API on click */}
      {message && <p>{message}</p>} {/* Display the API response */}
    </div>
  );
}

export default Login;
