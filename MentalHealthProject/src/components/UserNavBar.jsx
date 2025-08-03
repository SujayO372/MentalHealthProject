import React from 'react';

export default function UserNavBar({ username = 'Guest' }) {
  const links = [
    { name: '⚙️ Settings', href: '/settings' },
    { name: '🚪 Logout', href: '/logout' },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      height: '100vh',
      width: '180px',
      backgroundColor: '#e6f2ff',
      display: 'flex',
      flexDirection: 'column',
      padding: '25px 15px',
      boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#2c3e50',
    }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{
          fontSize: '1.1rem',
          fontWeight: '600',
          margin: 0,
        }}>
          👤 {username}
        </h3>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {links.map(({ name, href }) => (
          <a
            key={name}
            href={href}
            style={{
              textDecoration: 'none',
              color: '#2c3e50',
              fontSize: '0.95rem',
              padding: '8px 10px',
              borderRadius: '8px',
              backgroundColor: '#cce4ff',
              transition: 'background-color 0.2s, color 0.2s',
              userSelect: 'none',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#99ccff';
              e.target.style.color = '#1a1a1a';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#cce4ff';
              e.target.style.color = '#2c3e50';
            }}
          >
        {name}
          </a>
        ))}
      </nav>
    </div>
  );
}
