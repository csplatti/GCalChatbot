import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <>
      <div className="landing-page">
        <h1>Welcome to GCal AI Assistant</h1>
        <p>Effortlessly add events to your Google Calendar through conversational AI.</p>
        <button onClick={() => navigate('/login')}>Get Started</button> {/* Navigate to Login */}
      </div>
    </>
  );
}

export default App;
