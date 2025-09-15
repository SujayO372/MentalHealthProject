import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth(); 
  const [username, setUsername] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.email.split('@')[0] || '');
    }

    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, [user]);

  return (
    <>
      <style jsx>{`
        @keyframes neonGlow {
          0%, 100% { box-shadow: 0 0 20px #00f5ff, 0 0 40px #00f5ff; }
          50% { box-shadow: 0 0 30px #00f5ff, 0 0 50px #00f5ff; }
        }

        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 10px #ff69b4, 0 0 20px #ff69b4; }
          50% { text-shadow: 0 0 15px #ff69b4, 0 0 25px #ff69b4; }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .neon-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 20% 30%, rgba(0,245,255,0.15), transparent 70%),
                      radial-gradient(circle at 80% 70%, rgba(255,0,110,0.15), transparent 70%),
                      radial-gradient(circle at 50% 90%, rgba(131,56,236,0.15), transparent 70%);
          background-size: 200% 200%;
          animation: gradientShift 12s ease infinite;
          z-index: -1;
        }

        .neon-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          padding: 25px;
          transition: all 0.3s ease;
          text-align: center;
          color: white;
        }

        .neon-card:hover {
          transform: translateY(-6px);
        }

        .neon-text {
          color: #000000;
          text-shadow: 0 0 10px #00f5ff, 0 0 20px #00f5ff;
          animation: textGlow 2s ease-in-out infinite alternate;
        }

        .features {
          padding: 60px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .features h2 {
          text-align: center;
          margin-bottom: 40px;
          font-size: 2.5rem;
          color: #000;
          text-shadow: 0 0 15px #ff69b4;
        }

        /* Color accents for each card */
        .card-mood h3 { color: #00f5ff; }
        .card-guided h3 { color: #ff69b4; }
        .card-community h3 { color: #ffa500; }
        .card-library h3 { color: #7fff00; }
      `}</style>

      <NavBar />
      <div className="neon-overlay"></div>

      {/* Hero Section */}
      <div style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0 60px',
        position: 'relative',
        color: 'white'
      }}>
        <div style={{ maxWidth: '2000px', margin: '0 auto', width: '100%', zIndex: 1 }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
            {greeting}, <strong className="neon-text">{username || 'Guest'}!</strong>
          </p>

          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '700',
            marginBottom: '20px',
            color: '#000000',
            textShadow: '0 0 20px #ff69b4'
          }}>
            Welcome to SereneSpace
          </h1>

          <p style={{ fontSize: '1.3rem', marginBottom: '30px', maxWidth: '600px' }}>
            Support and evidence-based tools to help you thrive emotionally and mentally.
          </p>

          <p style={{ fontSize: '1.1rem', fontStyle: 'italic', opacity: 0.85, maxWidth: '500px' }}>
            Begin your path to wellness with reliable resources and compassionate care.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <h2>✨ Explore Our Features ✨</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '25px'
        }}>
          <div className="neon-card card-mood">
            <h3>📊 Mood Tracking</h3>
            <p>Log and visualize your emotions to spot patterns and improve self-awareness.</p>
          </div>
          <div className="neon-card card-guided">
            <h3>🧘 Guided Exercises</h3>
            <p>Follow breathing, journaling, and mindfulness practices designed for calm and clarity.</p>
          </div>
          <div className="neon-card card-community">
            <h3>🤝 Community Support</h3>
            <p>Connect with a safe, supportive group of peers and professionals on the same journey.</p>
          </div>
          <div className="neon-card card-library">
            <h3>📚 Resource Library</h3>
            <p>Access curated articles, tips, and expert knowledge to stay informed and empowered.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
