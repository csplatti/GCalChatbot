import { useEffect, useState } from 'react';
import './Dashboard.css'; // Import the CSS file for styling

function Dashboard() {
  const [events, setEvents] = useState([]); // State to store calendar events
  const [messages, setMessages] = useState([]); // State to store chatbot messages
  const [input, setInput] = useState(''); // State for chatbot input

  useEffect(() => {
    const token = localStorage.getItem('oauthToken'); // Retrieve the token from localStorage
    if (token) {
      console.log('OAuth Token:', token); // Print the token to the console

      // Calculate timeMin (current date) and timeMax (one month from now) in RFC3339 format
      const now = new Date();
      const timeMin = now.toISOString();

      const oneMonthLater = new Date();
      oneMonthLater.setMonth(now.getMonth() + 1);
      const timeMax = oneMonthLater.toISOString();

      // Fetch events within the next month from Google Calendar API
      fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&singleEvents=true&orderBy=startTime`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Calendar Events (Next Month):', data.items); // Log the events to the console
          setEvents(data.items); // Update the state with the fetched events
        })
        .catch(error => {
          console.error('Error fetching calendar events:', error);
        });
    } else {
      console.log('No OAuth Token found');
    }
  }, []); // Run once when the component mounts

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');
      // Simulate chatbot response
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'This is a simulated response.' }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-content">
        <table className="events-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>{event.summary || 'No Title'}</td>
                <td>{event.start?.dateTime || event.start?.date}</td>
                <td>{event.end?.dateTime || event.end?.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="chatbot">
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbot-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress} // Handle "Enter" key press
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
