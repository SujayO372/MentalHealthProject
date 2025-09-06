import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import useAuth from '../context/AuthContext'

function Settings() {
  const { session, user, loading, signOut } = useAuth();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    JSON.parse(localStorage.getItem('notificationsEnabled')) ?? true
  );
  const [password, setPassword] = useState('');

  const newUser = {
    username: name,
    email: email
  };
  const handleSave = async () => {
      //this specific line, because you don't have a database table for users (we use the authentication
      //table instead), might be different - but the key idea here is we want to change
      //the user's username and email by replacing the existing user row in the database
      //with a new row that has the updated username and email
      const { data, error } = await supabase.from("users").update(newUser).eq('username', username)
  };

  return (
    <>
      <NavBar />
      <div style={pageWrapper}>
        <div style={neonOverlay}></div>
        <div style={container}>
          {/* Left Neon Panel */}
          <aside style={leftPanel}>
            <h2 style={leftTitle}>Your Personal Settings</h2>
            <p style={leftText}>
              Manage your account, privacy preferences, and notifications to make the most of your neon experience.
            </p>
            <div style={iconContainer}>
              <svg viewBox="0 0 24 24" width="70" height="70" style={iconPink}>
                <path d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.49.49 0 00.12-.63l-1.92-3.32a.49.49 0 00-.6-.21l-2.39.96a7.05 7.05 0 00-1.63-.94l-.36-2.54a.488.488 0 00-.48-.41h-3.84c-.24 0-.44.17-.48.41l-.36 2.54c-.6.23-1.15.54-1.63.94l-2.39-.96a.49.49 0 00-.6.21L2.71 8.85a.49.49 0 00.12.63l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.49.49 0 00-.12.63l1.92 3.32c.14.24.42.32.66.21l2.39-.96c.48.4 1.03.72 1.63.94l.36 2.54c.04.24.24.41.48.41h3.84c.24 0 .44-.17.48-.41l.36-2.54c.6-.23 1.15-.54 1.63-.94l2.39.96c.24.1.52.02.66-.21l1.92-3.32a.49.49 0 00-.12-.63l-2.03-1.58zM12 15.6a3.6 3.6 0 110-7.2 3.6 3.6 0 010 7.2z"/>
              </svg>
              <svg viewBox="0 0 24 24" width="70" height="70" style={iconCyan}>
                <path d="M12 24c1.3 0 2.4-1 2.5-2.3h-5A2.5 2.5 0 0012 24zm6.4-6V11c0-3.1-2-5.7-4.8-6.7V4a1.6 1.6 0 00-3.2 0v.3C7.6 5.3 5.6 7.9 5.6 11v7L4 19.6V21h16v-1.4l-1.6-1.6z"/>
              </svg>
            </div>
          </aside>

          {/* Right Neon Form */}
          <main style={rightPanel}>
            <h3 style={formTitle}>Settings</h3>
            <form style={form}>
              <label style={label}>Name</label>
              {/*make sure setname and setemail are updating name, email properly 
              with the hooks, use print statements to debug*/}
              <input style={input} type="text" value={name} onChange={e => setName(e.target.value)} />

              <label style={label}>Email Address</label>
              <input style={input} type="email" value={email} onChange={e => setEmail(e.target.value)} />

              <label style={label}>New Password</label>
              <input style={input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter new password" />

              {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <input type="checkbox" checked={notificationsEnabled} onChange={e => setNotificationsEnabled(e.target.checked)} style={{ marginRight: '8px' }} />
                <label style={checkboxLabel}>Enable Email Notifications</label>
              </div> */}

              <button type="button" onClick={handleSave} style={button}>Save Settings</button>
            </form>
          </main>
        </div>
      </div>

      <style>{`
        @keyframes floatY {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export default Settings;

// --- Styles ---
const pageWrapper = {
  minHeight: '100vh',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#e6f7ff',
  background: '#0a0a0a',
  position: 'relative',
  paddingTop: '88px',
};

const neonOverlay = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  background: 'radial-gradient(circle at 15% 20%, rgba(255,0,150,0.08), transparent 50%), radial-gradient(circle at 85% 85%, rgba(0,255,255,0.08), transparent 50%)',
  pointerEvents: 'none',
  zIndex: 0,
};

const container = {
  display: 'flex',
  maxWidth: '1100px',
  margin: '0 auto',
  gap: '28px',
  flexWrap: 'wrap',
  zIndex: 2,
  position: 'relative',
  padding: '40px 20px'
};

const leftPanel = {
  flex: 1.3,
  minWidth: '280px',
  borderRadius: '16px',
  padding: '32px 24px',
  background: 'linear-gradient(135deg, rgba(255,0,128,0.12), rgba(0,255,255,0.05))',
  border: '1px solid rgba(0,255,255,0.08)',
  boxShadow: '0 10px 40px rgba(255,0,128,0.06), inset 0 0 24px rgba(0,255,255,0.02)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const leftTitle = {
  fontSize: '2rem',
  fontWeight: 800,
  marginBottom: '1rem',
  background: 'linear-gradient(90deg, #ff0080, #00ffff)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 0 18px rgba(255,0,128,0.08)',
};

const leftText = { fontSize: '1rem', color: 'rgba(223,249,255,0.95)' };
const iconContainer = { display: 'flex', marginTop: '2rem', gap: '16px' };
const iconPink = { filter: 'drop-shadow(0 10px 30px rgba(255,0,128,0.18))', animation: 'floatY 4s ease-in-out infinite' };
const iconCyan = { filter: 'drop-shadow(0 10px 30px rgba(0,255,255,0.12))', animation: 'floatY 4s ease-in-out infinite' };

const rightPanel = {
  flex: 1,
  minWidth: '320px',
  borderRadius: '16px',
  padding: '32px 24px',
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(0,255,255,0.06)',
  boxShadow: '0 8px 36px rgba(0,0,0,0.55), 0 0 24px rgba(0,255,255,0.02)'
};

const formTitle = { fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', color: '#00ffff', textAlign: 'center' };
const form = { display: 'flex', flexDirection: 'column', gap: '14px' };
const label = { fontWeight: 700, color: '#b0f0ff' };
const input = {
  padding: '12px 14px',
  borderRadius: '12px',
  border: '1px solid rgba(0,255,255,0.1)',
  background: 'rgba(255,255,255,0.015)',
  color: '#e6f7ff',
  outline: 'none',
  fontSize: '1rem',
};
const checkboxLabel = { fontWeight: 600, color: '#b0f0ff' };
const button = {
  padding: '12px',
  borderRadius: '14px',
  background: 'linear-gradient(90deg, #ff0080, #00ffff)',
  color: '#00121a',
  fontWeight: 800,
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  marginTop: '8px',
  transition: 'transform 0.15s, box-shadow 0.2s',
};
