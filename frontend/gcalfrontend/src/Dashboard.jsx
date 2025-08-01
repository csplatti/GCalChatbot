import { useEffect } from 'react';

function Dashboard() {
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
      fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`, {
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
        })
        .catch(error => {
          console.error('Error fetching calendar events:', error);
        });
    } else {
      console.log('No OAuth Token found');
    }
  }, []); // Run once when the component mounts

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
