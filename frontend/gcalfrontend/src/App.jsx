import { useState } from 'react';
import './App.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return <Login />;
  }

  return (
    <>
      <div className="landing-page">
        <h1>Welcome to GCal AI Assistant</h1>
        <p>Effortlessly add events to your Google Calendar through conversational AI.</p>
        <button onClick={() => setShowLogin(true)}>Get Started</button>
      </div>
    </>
  );
}

export default App;
