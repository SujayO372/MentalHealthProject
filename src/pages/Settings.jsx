import React from 'react';
import { useState } from 'react';
import NavBar from '../components/NavBar';

function Settings() {
  const [name, setName] = useState(() => localStorage.getItem('userName') || 'John Doe');
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || 'user@example.com');
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    JSON.parse(localStorage.getItem('notificationsEnabled')) ?? true
  );
  const [password, setPassword] = useState('');

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
        <div style={mainContainer}>
          {/* Left Section */}
          <div style={welcomeSection}>
            <h2 style={welcomeTitle}>Your Personal Settings</h2>
            <p style={welcomeText}>
              Manage your account details, privacy preferences, and notifications
              to make the most of your experience.
            </p>

            <div style={iconContainer}>
              {/* Gear Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" width="70" height="70" style={{ marginRight: '1.5rem' }}>
                <path d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.49.49 0 00.12-.63l-1.92-3.32a.49.49 0 00-.6-.21l-2.39.96a7.05 7.05 0 00-1.63-.94l-.36-2.54a.488.488 0 00-.48-.41h-3.84c-.24 0-.44.17-.48.41l-.36 2.54c-.6.23-1.15.54-1.63.94l-2.39-.96a.49.49 0 00-.6.21L2.71 8.85a.49.49 0 00.12.63l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.49.49 0 00-.12.63l1.92 3.32c.14.24.42.32.66.21l2.39-.96c.48.4 1.03.72 1.63.94l.36 2.54c.04.24.24.41.48.41h3.84c.24 0 .44-.17.48-.41l.36-2.54c.6-.23 1.15-.54 1.63-.94l2.39.96c.24.1.52.02.66-.21l1.92-3.32a.49.49 0 00-.12-.63l-2.03-1.58zM12 15.6a3.6 3.6 0 110-7.2 3.6 3.6 0 010 7.2z"/>
              </svg>

              {/* Bell Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" width="70" height="70">
                <path d="M12 24c1.3 0 2.4-1 2.5-2.3h-5A2.5 2.5 0 0012 24zm6.4-6V11c0-3.1-2-5.7-4.8-6.7V4a1.6 1.6 0 00-3.2 0v.3C7.6 5.3 5.6 7.9 5.6 11v7L4 19.6V21h16v-1.4l-1.6-1.6z"/>
              </svg>
            </div>
          </div>

          {/* Right Form Section */}
          <div style={formWrapper}>
            <h2 style={title}>Settings</h2>

            <div style={formGroup}>
              <label htmlFor="name" style={label}>Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={input}
              />
            </div>

            <div style={formGroup}>
              <label htmlFor="email" style={label}>Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={input}
              />
            </div>

            <div style={formGroup}>
              <label htmlFor="password" style={label}>New Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                style={input}
              />
            </div>

            <div style={{ ...formGroup, display: 'flex', alignItems: 'center' }}>
              <input
                id="notifications"
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                style={{ marginRight: '8px' }}
              />
              <label htmlFor="notifications" style={checkboxLabel}>
                Enable Email Notifications
              </label>
            </div>

            <button onClick={handleSave} style={button}>Save Settings</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;

// Styles
const pageWrapper = {
  backgroundColor: '#eef2f5',
  minHeight: '100vh',
  padding: '3rem 1rem',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const mainContainer = {
  display: 'flex',
  maxWidth: '1100px',
  margin: '0 auto',
  gap: '3rem',
};

const welcomeSection = {
  flex: 1.3,
  backgroundColor: '#1b75bc',
  color: '#fff',
  borderRadius: '10px',
  padding: '3rem 2rem',
  boxShadow: '0 0 15px rgba(27, 117, 188, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const welcomeTitle = {
  fontSize: '1.9rem',
  marginBottom: '1rem',
  fontWeight: '700',
};

const welcomeText = {
  fontSize: '1.2rem',
  lineHeight: '1.5',
};

const iconContainer = {
  display: 'flex',
  marginTop: '2rem',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

const formWrapper = {
  flex: 1,
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '3rem 3.5rem',
  boxShadow: '0 0 12px rgba(0,0,0,0.1)',
};

const title = {
  marginBottom: '2rem',
  color: '#2c3e50',
  textAlign: 'center',
};

const formGroup = {
  marginBottom: '20px',
};

const label = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: '600',
  color: '#000',
};

const input = {
  width: '100%',
  padding: '0.75rem',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

const checkboxLabel = {
  fontWeight: '600',
  color: '#000',
};

const button = {
  padding: '0.75rem',
  backgroundColor: '#2c3e50',
  color: '#fff',
  fontWeight: '600',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  fontSize: '1rem',
  width: '100%',
};

