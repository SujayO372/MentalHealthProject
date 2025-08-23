import React from 'react';
import { useState } from 'react';
import NavBar from '../components/NavBar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      setErrorMsg('');
      localStorage.setItem('username', user.fullName || user.email);
      alert(`Welcome back, ${user.fullName || user.email}! You are logged in.`);
    } else {
      setErrorMsg('Invalid email or password.');
    }
  };

  return (
    <div style={pageWrapper}>
      <NavBar />

      <div style={mainContainer}>
        {/* Left Welcome Section */}
        <div style={welcomeSection}>
          <h2 style={welcomeTitle}>Welcome Back!</h2>
          <p style={welcomeText}>
            We're glad to see you again. Log in to continue your journey with us and
            explore all the features waiting for you.
          </p>
          <div style={iconContainer}>
            {/* Brain Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#a78bfa"
              viewBox="0 0 24 24"
              width="80"
              height="80"
              style={{ marginRight: '1.5rem' }}
            >
              <path d="M12 2a7 7 0 00-7 7v3a7 7 0 0014 0v-3a7 7 0 00-7-7zm5 10a5 5 0 01-10 0v-3a5 5 0 0110 0v3z" />
              <path d="M10 14h4v2h-4z" />
            </svg>

            {/* Heart Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#a78bfa"
              viewBox="0 0 24 24"
              width="80"
              height="80"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4c1.54 0 3.04.99 3.57 2.36h1.87C14.46 4.99 15.96 4 17.5 4 20.01 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>

        {/* Right Login Form Section */}
        <div style={formWrapper}>
          <h2 style={title}>Log In to Your Account</h2>

          <form style={form} onSubmit={handleSubmit}>
            <label style={label}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              style={input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label style={label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              style={input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {errorMsg && <p style={{ color: 'red', marginBottom: '1rem' }}>{errorMsg}</p>}

            <button type="submit" style={button}>Log In</button>
          </form>

          <p style={footerText}>
            Don’t have an account? <a href="/signup" style={link}>Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

// --- Styles ---
const pageWrapper = {
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  padding: '3rem 1rem',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const mainContainer = {
  display: 'flex',
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '2rem',
  gap: '3rem',
};

const welcomeSection = {
  flex: 1.3,
  background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
  color: '#fff',
  borderRadius: '10px',
  padding: '3rem 2rem',
  boxShadow: '0 0 15px rgba(79, 70, 229, 0.4)',
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
  backgroundColor: '#1e1b4b',
  borderRadius: '10px',
  padding: '3rem 3.5rem',
  boxShadow: '0 0 12px rgba(0,0,0,0.1)',
  textAlign: 'center',
};

const title = {
  marginBottom: '2rem',
  color: '#c4b5fd',
};

const form = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
};

const label = {
  marginBottom: '0.5rem',
  fontWeight: '600',
  color: '#fff',
};

const input = {
  padding: '0.75rem',
  marginBottom: '1.25rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '1rem',
};

const button = {
  padding: '0.75rem',
  backgroundColor: '#4f46e5',
  color: '#fff',
  fontWeight: '600',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  fontSize: '1rem',
};

const footerText = {
  marginTop: '1.5rem',
  fontSize: '0.9rem',
  color: '#c4b5fd',
};

const link = {
  color: '#a78bfa',
  textDecoration: 'none',
  fontWeight: '600',
};
