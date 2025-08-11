import { useState } from 'react';
import NavBar from '../components/NavBar';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      setErrorMsg("Passwords don't match.");
      return;
    }

    // Retrieve existing users or empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    if (users.find(u => u.email === email)) {
      setErrorMsg('An account with this email already exists.');
      return;
    }

    // Save new user
    const newUser = { fullName, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Save username to localStorage for display (optional)
    localStorage.setItem('username', fullName);

    setErrorMsg('');
    alert('Account created successfully! You can now log in.');
    window.location.href = '/login';
  };

  return (
    <div style={pageWrapper}>
      <NavBar />

      <div style={mainContainer}>
        {/* Left Welcome Section */}
        <div style={welcomeSection}>
          <h2 style={welcomeTitle}>We're excited for you to create an account!</h2>
          <p style={welcomeText}>
            Join our community and gain access to exclusive features, personalized
            content, and much more. Your journey to better mental wellness starts here.
          </p>

          <div style={iconContainer}>
            {/* Brain Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#1b75bc"
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
              fill="#1b75bc"
              viewBox="0 0 24 24"
              width="80"
              height="80"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4c1.54 0 3.04.99 3.57 2.36h1.87C14.46 4.99 15.96 4 17.5 4 20.01 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>

        {/* Right Signup Form Section */}
        <div style={formWrapper}>
          <h2 style={title}>Create an Account</h2>

          <form style={form} onSubmit={handleSubmit}>
            <label style={label}>Full Name</label>
            <input
              type="text"
              placeholder="Your name"
              style={input}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

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

            <label style={label}>Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              style={input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {errorMsg && (
              <p style={{ color: 'red', marginBottom: '1rem' }}>{errorMsg}</p>
            )}

            <button type="submit" style={button}>Sign Up</button>
          </form>

          <p style={footerText}>
            Already have an account? <a href="/login" style={link}>Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}

// --- Styles ---
const pageWrapper = {
  backgroundColor: '#0f1113ff',
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
  flex: 1.3, // bigger left side
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
  backgroundColor: '#132238ff',
  borderRadius: '10px',
  padding: '3rem 3.5rem',
  boxShadow: '0 0 12px rgba(0,0,0,0.1)',
};

const title = {
  marginBottom: '2rem',
  color: '#2c3e50',
  textAlign: 'center',
};

const form = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
};

const label = {
  marginBottom: '0.5rem',
  fontWeight: '600',
  color: '#000', // black label text
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
  backgroundColor: '#2c3e50',
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
  textAlign: 'center',
};

const link = {
  color: '#3498db',
  textDecoration: 'none',
  fontWeight: '600',
};
