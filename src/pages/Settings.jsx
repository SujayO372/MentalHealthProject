import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

function Settings() {
  const { user, loading, signOut } = useAuth();

  // form state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [saving, setSaving] = useState(false);

  // Initialize form with user data from auth context
  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setUsername(user.email.split('@')[0]|| '');
      setNotificationsEnabled(user.user_metadata?.notifications_enabled ?? true);
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    try {
      // 1) Update Auth (email/password) using Supabase v2 API
      const { data: authData, error: authError } = await supabase.auth.updateUser({
        email: email || undefined,
        password: password || undefined,
        data: {
          username,
          notifications_enabled: notificationsEnabled,
        }
      });
      if (authError) {
        console.error('supabase.auth.updateUser error:', authError);
        throw authError;
      }

      // 2) Update profile in users table
      const { error: profileError } = await supabase
        .from('users')
        .update({
          username,
          notifications_enabled: notificationsEnabled,
        })
        .eq('auth_id', user.id);

      if (profileError) {
        console.error('supabase.from(users).update error:', profileError);
        throw profileError;
      }

      // 3) Update localStorage & dispatch event (so Home updates instantly)
      try {
        localStorage.setItem('userName', username);
        window.dispatchEvent(new CustomEvent('userNameChanged', { detail: username }));
      } catch (e) {
        console.warn('localStorage update failed (non-fatal):', e);
      }

      alert('Profile updated successfully!');
      setPassword('');
    } catch (err) {
      console.error('Update failed:', err);
      const message = (err && (err.message || err.error_description || err.msg)) || 'Unknown error';
      alert(`Update failed: ${message}`);
    } finally {
      setSaving(false);
    }
  };

  // Enhanced Loading State
  if (loading) return (
    <>
      <NavBar />
      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at 10% 10%, rgba(255,0,128,0.06), transparent 15%), radial-gradient(circle at 90% 90%, rgba(0,255,255,0.06), transparent 15%), linear-gradient(180deg, #020014 0%, #080018 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#e6f7ff",
        fontFamily: "'Space Grotesk', 'Roboto', sans-serif",
        paddingTop: "88px"
      }}>
        <div style={{
          textAlign: "center",
          padding: "40px",
          background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
          borderRadius: "20px",
          border: "1px solid rgba(0,255,255,0.1)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.6), 0 0 30px rgba(255,0,128,0.02)"
        }}>
          <div style={{
            width: "60px",
            height: "60px",
            border: "3px solid rgba(0,255,255,0.3)",
            borderTop: "3px solid #00ffff",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 20px"
          }}></div>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "10px", color: "#00ffff" }}>Loading Settings...</h2>
          <p style={{ color: "#9fe8ff" }}>Preparing your account settings</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </>
  );

  // Enhanced Login Required State
  if (!user) return (
    <>
      <NavBar />
      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at 10% 10%, rgba(255,0,128,0.06), transparent 15%), radial-gradient(circle at 90% 90%, rgba(0,255,255,0.06), transparent 15%), linear-gradient(180deg, #020014 0%, #080018 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        color: "#e6f7ff",
        fontFamily: "'Space Grotesk', 'Roboto', sans-serif",
        position: "relative",
        paddingTop: "88px"
      }}>
        {/* Background Effects */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 25% 40%, rgba(255,0,128,0.08) 0%, transparent 35%), radial-gradient(circle at 75% 60%, rgba(0,255,255,0.08) 0%, transparent 35%)",
          animation: "pulse 4s ease-in-out infinite alternate"
        }} />
        
        <div style={{
          maxWidth: "480px",
          width: "100%",
          textAlign: "center",
          position: "relative",
          zIndex: 1
        }}>
          {/* Main Card */}
          <div style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            borderRadius: "24px",
            padding: "50px 40px",
            border: "1px solid rgba(0,255,255,0.15)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(255,0,128,0.05)",
            backdropFilter: "blur(20px)"
          }}>
            {/* Settings Icon */}
            <div style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #ff0080, #00ffff)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 30px",
              fontSize: "40px",
              animation: "glow 2s ease-in-out infinite alternate"
            }}>
              ⚙️
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              margin: "0 0 15px",
              background: "linear-gradient(135deg, #00ffff, #ff0080)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Account Settings
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: "1.2rem",
              color: "#9fe8ff",
              marginBottom: "35px",
              lineHeight: "1.5"
            }}>
              Please log in to manage your account settings, privacy preferences, and notifications.
            </p>

            {/* Features List */}
            <div style={{
              marginBottom: "40px",
              textAlign: "left"
            }}>
              {[
                { icon: "👤", text: "Update your profile information" },
                { icon: "🔐", text: "Change password and security settings" },
                { icon: "🔔", text: "Manage notification preferences" },
                { icon: "🎨", text: "Customize your experience" }
              ].map((feature, index) => (
                <div key={index} style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                  padding: "12px 16px",
                  background: "rgba(0,255,255,0.05)",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,255,255,0.08)"
                }}>
                  <span style={{ fontSize: "24px", marginRight: "15px" }}>{feature.icon}</span>
                  <span style={{ color: "#dff8ff", fontSize: "1rem" }}>{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
              <button
                onClick={() => window.location.href = '/login'}
                style={{
                  padding: "16px 35px",
                  fontSize: "1.1rem",
                  fontWeight: "800",
                  border: "none",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #ff0080, #00ffff)",
                  color: "#001a2e",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontFamily: "'Space Grotesk', 'Roboto', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  boxShadow: "0 8px 25px rgba(255,0,128,0.3)"
                }}
                onMouseEnter={e => {
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow = "0 12px 35px rgba(255,0,128,0.4)";
                }}
                onMouseLeave={e => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 8px 25px rgba(255,0,128,0.3)";
                }}
              >
                Sign In
              </button>

              <button
                onClick={() => window.location.href = '/signup'}
                style={{
                  padding: "16px 35px",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  border: "2px solid rgba(0,255,255,0.3)",
                  borderRadius: "16px",
                  background: "transparent",
                  color: "#00ffff",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontFamily: "'Space Grotesk', 'Roboto', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "1px"
                }}
                onMouseEnter={e => {
                  e.target.style.background = "rgba(0,255,255,0.1)";
                  e.target.style.borderColor = "#00ffff";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.target.style.background = "transparent";
                  e.target.style.borderColor = "rgba(0,255,255,0.3)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Create Account
              </button>
            </div>

            {/* Help Text */}
            <p style={{
              marginTop: "25px",
              color: "#7dd3fc",
              fontSize: "0.9rem"
            }}>
            </p>
          </div>
        </div>

        <style jsx>{`
          @keyframes pulse {
            0% { opacity: 0.3; }
            100% { opacity: 0.6; }
          }
          
          @keyframes glow {
            0% { box-shadow: 0 0 20px rgba(255,0,128,0.3); }
            100% { box-shadow: 0 0 30px rgba(0,255,255,0.4); }
          }
        `}</style>
      </div>
    </>
  );

  // --- Main Settings UI (unchanged neon look) ---
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
                <path d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.49.49 0 00.12-.63l-1.92-3.32a.49.49 0 00-.6-.21l-2.39.96a7.05 7.05 0 00-1.63-.94l-.36-2.54a.488.488 0 00-.48-.41h-3.84c-.24 0-.44.17-.48.41l-.36 2.54c-.6.23-1.15.54-1.63.94l-2.39-.96a.49.49 0 00-.6.21L2.71 8.85a.49.49 0 00.12.63l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.49.49 0 00-.12.63l1.92 3.32c.14.24.42.32.66.21l2.39-.96c.48.4 1.03.72 1.63.94l.36 2.54c.04.24.24.41.48.41h3.84c.24 0 .44-.17.48.41l.36 2.54c.6.23 1.15.54 1.63.94l2.39.96c.24.1.52.02.66-.21l1.92-3.32a.49.49 0 00-.12-.63l-2.03-1.58zM12 15.6a3.6 3.6 0 110-7.2 3.6 3.6 0 010 7.2z" />
              </svg>
              <svg viewBox="0 0 24 24" width="70" height="70" style={iconCyan}>
                <path d="M12 24c1.3 0 2.4-1 2.5-2.3h-5A2.5 2.5 0 0012 24zm6.4-6V11c0-3.1-2-5.7-4.8-6.7V4a1.6 1.6 0 00-3.2 0v.3C7.6 5.3 5.6 7.9 5.6 11v7L4 19.6V21h16v-1.4l-1.6-1.6z" />
              </svg>
            </div>
          </aside>

          {/* Right Neon Form */}
          <main style={rightPanel}>
            <h3 style={formTitle}>Settings</h3>

            <form style={form} onSubmit={(e) => e.preventDefault()}>
              <label style={label}>Username</label>
              <input
                style={input}
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />

              <label style={label}>Email Address</label>
              <input
                style={input}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <label style={label}>New Password</label>
              <input
                style={input}
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Leave blank to keep current"
              />

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={e => setNotificationsEnabled(e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                <label style={checkboxLabel}>Enable Email Notifications</label>
              </div>

              <button type="button" onClick={handleSave} style={button} disabled={saving}>
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
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

// --- Styles (unchanged neon UI) ---
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