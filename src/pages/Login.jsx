import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import NavBar from '../components/NavBar.jsx';
import { useNavigate } from 'react-router-dom';

/*
  Neon-themed UI variants for Signup and Login.
  - UI only changes (no auth logic altered)
  - Two named exports: SignupNeon and LoginNeon
  Copy whichever component you need into your project file.
*/

const sharedStyles = {
  page: {
    paddingTop: '90px',
    minHeight: '100vh',
    background: "radial-gradient(circle at 10% 10%, rgba(255,0,128,0.06), transparent 15%), radial-gradient(circle at 90% 90%, rgba(0,255,255,0.06), transparent 15%), linear-gradient(180deg, #020014 0%, #080018 100%)",
    color: '#e6f7ff',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  mainWrap: {
    maxWidth: '520px',
    margin: '40px auto',
    padding: '28px',
    borderRadius: '16px',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
    border: '1px solid rgba(0,255,255,0.04)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.6), 0 0 30px rgba(255,0,128,0.02)',
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    textAlign: 'center',
    marginBottom: '18px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 800,
    background: 'linear-gradient(90deg, #00ffff, #b58bff)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    letterSpacing: '-0.5px',
  },
  accentBar: {
    height: '6px',
    width: '90px',
    margin: '12px auto 0',
    borderRadius: '999px',
    background: 'linear-gradient(90deg,#00ffff,#ff9ad0)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '12px 14px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.06)',
    background: 'rgba(255,255,255,0.02)',
    color: '#e6f7ff',
    outline: 'none',
    fontSize: '15px',
    boxShadow: '0 6px 20px rgba(0,255,255,0.02)',
    transition: 'box-shadow 0.15s ease, transform 0.12s ease'
  },
  inputFocus: {
    boxShadow: '0 8px 30px rgba(0,255,255,0.06)',
    transform: 'translateY(-1px)'
  },
  error: {
    color: '#ff6b7a',
    background: 'linear-gradient(0deg, rgba(0,0,0,0), rgba(0,0,0,0.03))',
    padding: '8px',
    borderRadius: '8px',
  },
  success: {
    color: '#6ef2bf',
    background: 'linear-gradient(0deg, rgba(0,0,0,0), rgba(0,0,0,0.03))',
    padding: '8px',
    borderRadius: '8px',
  },
  submitBtn: {
    padding: '12px 16px',
    borderRadius: '12px',
    border: 'none',
    fontWeight: 800,
    cursor: 'pointer',
    background: 'linear-gradient(45deg, #ff0080, #00ffff)',
    color: '#00121a',
    boxShadow: '0 8px 30px rgba(255,0,128,0.08), 0 8px 30px rgba(0,255,255,0.08)'
  },
  footer: {
    marginTop: '12px',
    textAlign: 'center',
    color: '#9fe8ff',
    fontSize: '14px',
  },
  neonOverlay: {
    position: 'fixed',
    top: '90px',
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 0,
    background: 'radial-gradient(circle at 15% 10%, rgba(255,0,128,0.05) 0%, transparent 20%), radial-gradient(circle at 85% 90%, rgba(0,255,255,0.05) 0%, transparent 20%)',
    mixBlendMode: 'screen',
  }
};

export function SignupNeon() {
  const { signUp, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(''); setSuccessMsg('');
    if (password !== confirmPassword) { setErrorMsg("Passwords don't match"); return; }
    if (password.length < 6) { setErrorMsg("Password must be at least 6 characters"); return; }
    const result = await signUp(email, password);
    if (result.success) {
      setSuccessMsg('Account created! Please check your email if confirmation is enabled.');
      setEmail(''); setPassword(''); setConfirmPassword('');
      setTimeout(() => navigate('/login'), 2000);
    } else setErrorMsg(result.error);
  };

  const styles = sharedStyles;

  return (
    <>
      <NavBar />
      <div style={styles.page}>
        <div style={styles.neonOverlay} />
        <main style={styles.mainWrap}>
    
          <header style={styles.header}>
            <h1 style={styles.title}>Create account</h1>
            <div style={styles.accentBar} />
          </header>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="email"
              placeholder="you@domain.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
              onFocus={(e) => e.currentTarget.style.boxShadow = styles.inputFocus.boxShadow}
              onBlur={(e) => e.currentTarget.style.boxShadow = styles.input.boxShadow}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
              onFocus={(e) => e.currentTarget.style.boxShadow = styles.inputFocus.boxShadow}
              onBlur={(e) => e.currentTarget.style.boxShadow = styles.input.boxShadow}
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
              onFocus={(e) => e.currentTarget.style.boxShadow = styles.inputFocus.boxShadow}
              onBlur={(e) => e.currentTarget.style.boxShadow = styles.input.boxShadow}
            />

            {errorMsg && <div style={styles.error}>{errorMsg}</div>}
            {successMsg && <div style={styles.success}>{successMsg}</div>}

            <button type="submit" disabled={loading} style={styles.submitBtn}>{loading ? 'Signing Up...' : 'Sign up'}</button>
          </form>

          <div style={styles.footer}>Already have an account? <a href="/login" style={{ color: '#b7faff', textDecoration: 'underline' }}>Log in</a></div>

        </main>
      </div>

      <style>{`@keyframes neonPulse { 0%,100% { filter: drop-shadow(0 0 6px rgba(0,255,255,0.08)) drop-shadow(0 0 10px rgba(255,0,128,0.04)); } 50% { transform: translateY(-2px); filter: drop-shadow(0 0 12px rgba(0,255,255,0.12)) drop-shadow(0 0 18px rgba(255,0,128,0.08)); } }`}</style>
    </>
  );
}

export function LoginNeon() {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const result = await signIn(email, password);
    if (result.success) {
      navigate('/'); // go to home/dashboard
    } else {
      setErrorMsg(result.error);
    }
  };

  const styles = sharedStyles;

  return (
    <>
      <NavBar />
      <div style={styles.page}>
        <div style={styles.neonOverlay} />
        <main style={styles.mainWrap}>
          <div style={{ position: 'absolute', bottom: -60, right: -60, width: 260, height: 260, borderRadius: '50%', filter: 'blur(50px)', background: 'linear-gradient(135deg, rgba(255,0,128,0.12), rgba(255,184,107,0.08))', opacity: 0.75, pointerEvents: 'none' }} />

          <header style={styles.header}>
            <h1 style={styles.title}>Welcome back</h1>
            <div style={styles.accentBar} />
          </header>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="email"
              placeholder="you@domain.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
              onFocus={(e) => e.currentTarget.style.boxShadow = styles.inputFocus.boxShadow}
              onBlur={(e) => e.currentTarget.style.boxShadow = styles.input.boxShadow}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
              onFocus={(e) => e.currentTarget.style.boxShadow = styles.inputFocus.boxShadow}
              onBlur={(e) => e.currentTarget.style.boxShadow = styles.input.boxShadow}
            />

            {errorMsg && <div style={styles.error}>{errorMsg}</div>}

            <button type="submit" disabled={loading} style={styles.submitBtn}>{loading ? 'Logging In...' : 'Log in'}</button>
          </form>

          <div style={styles.footer}>Don't have an account? <a href="/signup" style={{ color: '#b7faff', textDecoration: 'underline' }}>Sign up</a></div>

        </main>
      </div>

      <style>{`@keyframes neonPulse { 0%,100% { filter: drop-shadow(0 0 6px rgba(0,255,255,0.08)) drop-shadow(0 0 10px rgba(255,0,128,0.04)); } 50% { transform: translateY(-2px); filter: drop-shadow(0 0 12px rgba(0,255,255,0.12)) drop-shadow(0 0 18px rgba(255,0,128,0.08)); } }`}</style>
    </>
  );
}

export default LoginNeon;