import NavBar from '../components/NavBar';

export default function Login() {
  return (
    <div style={{ backgroundColor: '#eef2f5', minHeight: '100vh' }}>
      <NavBar />
      <div style={container}>
        <h2 style={title}>Log In to Your Account</h2>

        <form style={form}>
          <label style={label}>Email</label>
          <input type="email" placeholder="you@example.com" style={input} />

          <label style={label}>Password</label>
          <input type="password" placeholder="••••••••" style={input} />

          <button type="submit" style={button}>Log In</button>
        </form>

        <p style={footerText}>
          Don’t have an account? <a href="/signup" style={link}>Sign up</a>
        </p>
      </div>
    </div>
  );
}

// --- Inline Styles ---
const container = {
  maxWidth: '400px',
  margin: '60px auto',
  padding: '2.5rem',
  backgroundColor: '#f7f9fc',
  borderRadius: '10px',
  boxShadow: '0 0 12px rgba(0,0,0,0.1)',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  textAlign: 'center',
};

const title = {
  marginBottom: '2rem',
  color: '#2c3e50',
};

const form = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
};

const label = {
  marginBottom: '0.5rem',
  fontWeight: '600',
};

const input = {
  padding: '0.75rem',
  marginBottom: '1.25rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
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
};

const footerText = {
  marginTop: '1.5rem',
  fontSize: '0.9rem',
};

const link = {
  color: '#3498db',
  textDecoration: 'none',
  fontWeight: '600',
};
