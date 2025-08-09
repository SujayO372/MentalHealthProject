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
    // Save to localStorage
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));

    // Notify Home.jsx to update username instantly
    window.dispatchEvent(new Event('userNameChanged'));

    // Optional: Handle password change securely with backend
    if (password.trim()) {
      console.log('Password changed (send to API securely)');
    }

    alert('Settings saved!');
    setPassword('');
  };

  return (
    <>
      <NavBar />
      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
        <h1>Settings</h1>

        {/* Name */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            style={{ width: '100%', padding: '8px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            style={{ width: '100%', padding: '8px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            New Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter new password"
            style={{ width: '100%', padding: '8px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Notifications */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="notifications" style={{ fontWeight: 'bold' }}>
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

        {/* Save Button */}
        <button
          onClick={handleSave}
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            borderRadius: '5px',
            backgroundColor: '#50e3c2',
            border: 'none',
            cursor: 'pointer',
            color: '#2c3e50',
            fontWeight: 'bold',
          }}
        >
          Save Settings
        </button>
      </div>
    </>
  );
}

export default Settings;
