import React from 'react';

function UserNavBar({ username = 'Guest' }) {
  return (
    <div style={styles.container}>
      <div style={styles.topSection}>
        <h3 style={styles.username}>👤 {username}</h3>
      </div>

      <nav style={styles.nav}>
        <a href="/settings" style={styles.link}>⚙️ Settings</a>
        <a href="/logout" style={styles.link}>🚪 Logout</a>
        <a href="/profile" style={styles.link}>👥 Profile</a>
        <a href="/notifications" style={styles.link}>🔔 Notifications</a>
        <a href="/help" style={styles.link}>❓ Help</a>
        <a href="/feedback" style={styles.link}>✉️ Feedback</a>
        <a href="/about" style={styles.link}>ℹ️ About</a>
      </nav>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    right: 0,
    height: '100vh',
    width: '140px',
    backgroundColor: '#e6f2ff',
    display: 'flex',
    flexDirection: 'column',
    padding: '25px 15px',
    boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#2c3e50',
  },
  topSection: {
    marginBottom: '20px',
  },
  username: {
    fontSize: '1.1rem',
    fontWeight: '600',
    margin: 0,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  link: {
    textDecoration: 'none',
    color: '#2c3e50',
    fontSize: '0.95rem',
    padding: '8px 10px',
    borderRadius: '8px',
    width: '100%',
    transition: 'background-color 0.2s',
    userSelect: 'none',
    backgroundColor: '#cce4ff',
  },
};

export default UserNavBar;
