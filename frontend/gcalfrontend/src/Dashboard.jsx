import { useEffect } from 'react';

function Dashboard() {
  useEffect(() => {
    const token = localStorage.getItem('oauthToken'); // Retrieve the token from localStorage
    if (token) {
      console.log('OAuth Token:', token); // Print the token to the console
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
