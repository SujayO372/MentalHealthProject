import React, { useState } from 'react';
import NavBar from '../components/NavBar';

function Settings() {
  const [name, setName] = useState(() => localStorage.getItem('userName') || 'John Doe');
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || 'user@example.com');
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    JSON.parse(localStorage.getItem('notificationsEnabled')) ?? true
  );
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNotificationsChange = (e) => setNotificationsEnabled(e.target.checked);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSave = () => {
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
    window.dispatchEvent(new Event('userNameChanged'));

    if (password.trim()) {
      console.log('Password changed (send to API securely)');
    }

    alert('Settings saved!');
    setPassword('');
  };

  return (
    <>
      <NavBar />

      <div style={pageWrapper}>
        {/* Container with two columns: Fun Fact left, Settings right */}
        <div style={flexContainer}>
          <section style={funFactSection}>
            <h2 style={funFactTitle}>💡 Fun Fact About Mental Health</h2>
            <p style={funFactText}>
              Did you know? Regular physical activity can boost your mood and reduce symptoms of anxiety and depression. Even a 10-minute walk can help!
            </p>
          </section>

          <div style={container}>
            <h1>Settings</h1>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="name" style={label}>Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={handleNameChange}
                style={input}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="email" style={label}>Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                style={input}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="password" style={label}>New Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                style={input}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="notifications" style={checkboxLabel}>
                <input
                  id="notifications"
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={handleNotificationsChange}
                  style={{ marginRight: '8px' }}
                />
                Enable Email Notifications
              </label>
            </div>

            <button onClick={handleSave} style={saveButton}>Save Settings</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;

// Styles
const pageWrapper = {
  maxWidth: '1100px',
  margin: '40px auto',
  padding: '20px',
  fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
};

const flexContainer = {
  display: 'flex',
  gap: '40px',
  alignItems: 'flex-start',
};

const funFactSection = {
  flex: 2,
  backgroundColor: '#d1e7dd',
  borderRadius: '12px',
  padding: '40px 30px',
  boxShadow: '0 4px 12px rgba(212, 190, 190, 0.1)',
  color: '#14532d',
};

const funFactTitle = {
  fontSize: '2rem',
  marginBottom: '15px',
};

const funFactText = {
  fontSize: '1.2rem',
  lineHeight: 1.5,
};

const container = {
  flex: 3,
  backgroundColor: '#8898a9ff',
  borderRadius: '12px',
  padding: '40px 35px',
  boxShadow: '0 4px 12px rgba(78, 60, 60, 0.1)',
};

const label = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: 'bold',
  color: '#2c3e50',
};

const input = {
  width: '100%',
  padding: '10px',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

const checkboxLabel = {
  fontWeight: 'bold',
  color: '#2c3e50',
  display: 'flex',
  alignItems: 'center',
};

const saveButton = {
  padding: '12px 24px',
  fontSize: '1.1rem',
  borderRadius: '8px',
  backgroundColor: '#2c3e50',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 'bold',
  marginTop: '10px',
  transition: 'background-color 0.3s ease',
};

