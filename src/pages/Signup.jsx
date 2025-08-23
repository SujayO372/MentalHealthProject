import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import NavBar from '../components/NavBar';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { signUp, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (password !== confirmPassword) {
      setErrorMsg("Passwords don't match.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    try {
      const result = await signUp(email, password, {
        userData: { full_name: fullName, name: fullName }
      });

      if (result.success) {
        setSuccessMsg(result.needsVerification 
          ? 'Account created! Please check your email for verification.' 
          : 'Account created successfully!'
        );
        setFullName(''); setEmail(''); setPassword(''); setConfirmPassword('');
        if (!result.needsVerification) {
          setTimeout(() => { window.location.href = '/dashboard'; }, 2000);
        }
      } else {
        setErrorMsg(result.error.includes('already registered')
          ? 'An account with this email already exists.'
          : result.error
        );
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('An unexpected error occurred.');
    }
  };

  return (
    <div style={pageWrapper}>
      <NavBar />

      {/* Neon Overlay */}
      <div style={neonOverlay} />

      <div style={container}>
        {/* Left Neon Panel */}
        <aside style={leftPanel}>
          <h2 style={leftTitle}>Welcome to Neural Wellness!</h2>
          <p style={leftText}>Join our community and start your journey to better mental wellness. Your neon experience awaits.</p>
          <div style={iconContainer}>
            <svg viewBox="0 0 24 24" width="80" height="80" style={iconPink}>
              <path d="M12 2a7 7 0 00-7 7v3a7 7 0 0014 0v-3a7 7 0 00-7-7zm5 10a5 5 0 01-10 0v-3a5 5 0 0110 0v3z" />
              <path d="M10 14h4v2h-4z" />
            </svg>
            <svg viewBox="0 0 24 24" width="80" height="80" style={iconCyan}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4c1.54 0 3.04.99 3.57 2.36h1.87C14.46 4.99 15.96 4 17.5 4 20.01 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </aside>

        {/* Right Form Panel */}
        <main style={rightPanel}>
          <h3 style={formTitle}>Create Your Account</h3>
          <form style={form} onSubmit={handleSubmit}>
            <label style={label}>Full Name</label>
            <input style={input} type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your name" required disabled={loading} />

            <label style={label}>Email</label>
            <input style={input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required disabled={loading} />

            <label style={label}>Password</label>
            <input style={input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required disabled={loading} />

            <label style={label}>Confirm Password</label>
            <input style={input} type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" required disabled={loading} />

            {errorMsg && <p style={error}>{errorMsg}</p>}
            {successMsg && <p style={success}>{successMsg}</p>}

            <button type="submit" style={{...button, opacity: loading ? 0.7 : 1}} disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          <p style={footer}>Already have an account? <a href="/login" style={link}>Log in</a></p>
        </main>
      </div>
    </div>
  );
}

// --- Styles ---
const pageWrapper = {
  minHeight: '100vh',
  fontFamily: "'Inter', sans-serif",
  color: '#fff',
  position: 'relative',
  paddingTop: '80px',
  background: '#0a0a0a',
};

const neonOverlay = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  background: 'radial-gradient(circle at 20% 20%, rgba(255,0,150,0.08), transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,255,255,0.08), transparent 50%)',
  pointerEvents: 'none',
  zIndex: 0,
};

const container = {
  display: 'flex',
  maxWidth: '1100px',
  margin: '0 auto',
  gap: '30px',
  flexWrap: 'wrap',
  zIndex: 2,
  position: 'relative',
  padding: '40px 20px'
};

const leftPanel = {
  flex: 1.3,
  minWidth: '280px',
  padding: '32px 24px',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, rgba(255,0,128,0.12), rgba(0,255,255,0.05))',
  border: '1px solid rgba(0,255,255,0.08)',
  boxShadow: '0 10px 40px rgba(255,0,128,0.06), inset 0 0 24px rgba(0,255,255,0.02)',
  display: 'flex', flexDirection: 'column', justifyContent: 'center',
};

const leftTitle = {
  fontSize: '2rem', fontWeight: 800, marginBottom: '1rem',
  background: 'linear-gradient(90deg, #ff0080, #00ffff)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  textShadow: '0 0 18px rgba(255,0,128,0.08)'
};

const leftText = { fontSize: '1rem', color: 'rgba(223,249,255,0.95)' };

const iconContainer = { display: 'flex', marginTop: '2rem', gap: '16px' };

const iconPink = { filter: 'drop-shadow(0 10px 30px rgba(255,0,128,0.18))', animation: 'floatY 4s ease-in-out infinite' };
const iconCyan = { filter: 'drop-shadow(0 10px 30px rgba(0,255,255,0.12))', animation: 'floatY 4s ease-in-out infinite' };

const rightPanel = {
  flex: 1, minWidth: '320px', borderRadius: '16px',
  padding: '32px 24px', background: 'rgba(255,255,255,0.02)',
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
  transition: '0.2s',
  fontSize: '1rem'
};
const button = {
  padding: '12px', borderRadius: '14px',
  background: 'linear-gradient(90deg, #ff0080, #00ffff)',
  color: '#00121a', fontWeight: 800, border: 'none',
  cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.2s',
  fontSize: '1rem', marginTop: '8px'
};
const error = { color: '#ff4d6d', fontSize: '0.9rem' };
const success = { color: '#4cffb0', fontSize: '0.9rem' };
const footer = { marginTop: '1.5rem', fontSize: '0.9rem', textAlign: 'center', color: '#b0f0ff' };
const link = { color: '#00ffff', textDecoration: 'none', fontWeight: '600' };

// --- Keyframes for floating animation ---
const style = document.createElement('style');
style.innerHTML = `
@keyframes floatY {
  0% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0); }
}
`;
document.head.appendChild(style);
