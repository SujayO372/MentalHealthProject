import { useState, useEffect } from 'react';
import '../styling/Home.css';
import NavBar from '../components/NavBar';

function Home() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Function to update username from localStorage
    const updateUsername = () => {
      const storedUsername = localStorage.getItem('userName');
      setUsername(storedUsername && storedUsername.trim() !== '' ? storedUsername : 'Guest');
    };

    // Initial load
    updateUsername();

    // Listen for username change events
    window.addEventListener('userNameChanged', updateUsername);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('userNameChanged', updateUsername);
    };
  }, []);

  return (
    <>
      <NavBar />
      <div style={{ width: '100%', backgroundColor: '#f7f9fc', padding: '60px 0' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 30px',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: '#2c3e50',
          }}
        >
          <p style={{ fontSize: '1.2rem', marginBottom: '20px', textAlign: 'center', color: '#34495e' }}>
            Welcome back, <strong>{username}</strong>!
          </p>

          {/* ...rest of your JSX remains unchanged */}
        </div>
      </div>
    </>
  );
}

export default Home;
