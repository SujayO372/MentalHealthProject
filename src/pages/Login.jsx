import React, { useState } from 'react';
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
      alert(`Welcome back, ${user.fullName || user.email}!`);
    } else {
      setErrorMsg('Invalid email or password.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: "'Inter', sans-serif", paddingTop: '80px', position: 'relative' }}>
      <NavBar />

      {/* Neon overlay */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(circle at 20% 20%, rgba(255,0,150,0.08), transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,255,255,0.08), transparent 50%)',
        pointerEvents: 'none', zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '30px', padding: '40px 20px' }}>
        {/* Left Neon Panel */}
        <aside style={{
          flex: 1.3, minWidth: '280px', padding: '32px 24px', borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(255,0,128,0.12), rgba(0,255,255,0.05))',
          border: '1px solid rgba(0,255,255,0.08)', boxShadow: '0 10px 40px rgba(255,0,128,0.06), inset 0 0 24px rgba(0,255,255,0.02)'
        }}>
          <h2 style={{
            fontSize: '2rem', fontWeight: 800,
            background: 'linear-gradient(90deg, #ff0080, #00ffff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            textShadow: '0 0 18px rgba(255,0,128,0.08)'
          }}>Welcome Back!</h2>
          <p style={{ fontSize: '1rem', marginTop: '8px', color: 'rgba(223,249,255,0.95)' }}>
            Log in to continue your journey and explore exciting features waiting for you.
          </p>
        </aside>

        {/* Right Panel Form */}
        <main style={{
          flex: 1, minWidth: '320px', borderRadius: '16px', padding: '32px 24px',
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,255,255,0.06)',
          boxShadow: '0 8px 36px rgba(0,0,0,0.55), 0 0 24px rgba(0,255,255,0.02)'
        }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', color: '#00ffff' }}>
            Log In to Your Account
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <label style={{ fontWeight: 700, color: '#b0f0ff' }}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(0,255,255,0.1)',
                background: 'rgba(255,255,255,0.015)', color: '#e6f7ff', outline: 'none',
                boxShadow: '0 0 8px rgba(0,255,255,0.2)', transition: '0.2s'
              }}
            />
            <label style={{ fontWeight: 700, color: '#b0f0ff' }}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(0,255,255,0.1)',
                background: 'rgba(255,255,255,0.015)', color: '#e6f7ff', outline: 'none',
                boxShadow: '0 0 8px rgba(0,255,255,0.2)', transition: '0.2s'
              }}
            />
            {errorMsg && <div style={{ color: '#ff7f8a', fontWeight: 700 }}>{errorMsg}</div>}
            <button type="submit" style={{
              padding: '12px 18px', marginTop: '8px', borderRadius: '14px',
              fontWeight: 800, background: 'linear-gradient(90deg, #ff0080, #00ffff)',
              color: '#00121a', border: 'none', cursor: 'pointer',
              boxShadow: '0 12px 46px rgba(255,0,128,0.08), 0 8px 36px rgba(0,255,255,0.06)',
              transition: 'transform 0.15s, box-shadow 0.2s'
            }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 18px 60px rgba(255,0,128,0.14),0 0 60px rgba(0,255,255,0.1)'; }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 12px 46px rgba(255,0,128,0.08),0 8px 36px rgba(0,255,255,0.06)'; }}
            >Log In</button>
          </form>
          <p style={{ marginTop: '14px', fontSize: '0.95rem', color: '#b0f0ff' }}>
            Don’t have an account? <a href="/signup" style={{ color: '#00ffff', fontWeight: 700 }}>Sign up</a>
          </p>
        </main>
      </div>
    </div>
  );
}
