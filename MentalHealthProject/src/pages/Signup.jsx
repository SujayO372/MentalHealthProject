import '../styling/Home.css';
import NavBar from '../components/NavBar';

export default function Signup() {
  return (
    <div style={pageWrapper}>
      <NavBar />

      <div style={container}>
        <h2 style={title}>Create an Account</h2>

        <form style={form}>
          <label style={label}>Full Name</label>
          <input type="text" placeholder="Your name" style={input} />

          <label style={label}>Email</label>
          <input type="email" placeholder="you@example.com" style={input} />

          <label style={label}>Password</label>
          <input type="password" placeholder="••••••••" style={input} />

          <label style={label}>Confirm Password</label>
          <input type="password" placeholder="••••••••" style={input} />

          <button type="submit" style={button}>Sign Up</button>
        </form>

        <p style={footerText}>
          Already have an account? <a href="/login" style={link}>Log in</a>
        </p>
      </div>
    </div>
  );
}

// --- Styles ---
const pageWrapper = {
  backgroundColor: '#ecf0f3',
  minHeight: '100vh',
  padding: '3rem 1rem',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const container = {
  maxWidth: '600px', // wider
  margin: '0 auto',
  padding: '2.5rem',
  backgroundColor: '#f7f9fc',
  borderRadius: '10px',
  boxShadow: '0 0 12px rgba(0,0,0,0.1)',
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
