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
          background: #0a0a0f;
          z-index: -2;
        }

        .neon-overlay::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(0,245,255,0.25), transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255,0,255,0.2), transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(138,43,226,0.15), transparent 60%),
            radial-gradient(circle at 90% 20%, rgba(0,255,157,0.18), transparent 45%);
          background-size: 200% 200%;
          animation: gradientShift 15s ease infinite;
          z-index: -1;
        }

        .neon-overlay::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: 
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.03) 2px, rgba(0,245,255,0.03) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,0,255,0.03) 2px, rgba(255,0,255,0.03) 4px);
          opacity: 0.4;
        }

        .neon-card {
          border-radius: 15px;
          padding: 20px;
          transition: all 0.3s ease;
          text-align: center;
          color: white;
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .neon-card:hover {
          transform: translateY(-4px);
        }

        .neon-card h3 {
          font-size: 1.1rem;
          margin-bottom: 10px;
        }

        .neon-card p {
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .card-mood {
          background: linear-gradient(135deg, #00f5ff, #0080ff);
        }
        
        .card-guided {
          background: linear-gradient(135deg, #ff69b4, #ff1493);
        }
        
        .card-community {
          background: linear-gradient(135deg, #ffa500, #ff8c00);
        }
        
        .card-library {
          background: linear-gradient(135deg, #7fff00, #32cd32);
        }
        
        .card-wellness {
          background: linear-gradient(135deg, #32cd32, #228b22);
        }
        
        .card-progress {
          background: linear-gradient(135deg, #20b2aa, #008b8b);
        }

        .neon-text {
          color: #00f5ff;
          text-shadow: 0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 30px #00f5ff;
          animation: textGlow 2s ease-in-out infinite alternate;
        }

        .section {
          padding: 60px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section h2 {
          text-align: center;
          margin-bottom: 40px;
          font-size: 2.5rem;
          color: #ffffff;
          text-shadow: 0 0 15px #ff69b4, 0 0 30px #ff69b4;
        }

        .section h3 {
          font-size: 1.8rem;
          margin-bottom: 20px;
          color: #ffffff;
        }

        .section p {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #d0d0d0;
          margin-bottom: 15px;
        }

        .card-mood h3, .card-guided h3, .card-community h3, .card-library h3,
        .card-wellness h3, .card-progress h3 { 
          color: white; 
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin: 30px 0;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 15px;
          text-align: center;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0,245,255,0.3);
        }

        .stat-card p {
          color: #d0d0d0;
          font-weight: 500;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: bold;
          color: #00f5ff;
          display: block;
          text-shadow: 0 0 10px #00f5ff;
        }

        .privacy-note {
          background: rgba(138, 43, 226, 0.15);
          border: 1px solid rgba(138, 43, 226, 0.5);
          padding: 20px;
          border-radius: 10px;
          margin: 30px 0;
          text-align: center;
        }

        .privacy-note h3 {
          color: #ff69b4;
          text-shadow: 0 0 10px #ff69b4;
        }
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

          {/* Added 3-minute highlight */}
          <p style={{ fontSize: '1.2rem', fontWeight: '500', marginBottom: '20px', color: '#00f5ff' }}>
            Just 3 minutes a day can help you improve your wellness 🌟
          </p>

          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '700',
            marginBottom: '20px',
            color: '#ffffff',
            textShadow: '0 0 20px #ff69b4, 0 0 40px #ff69b4, 0 0 60px #ff1493'
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
      <div className="section">
        <h2 style={{ fontSize: '2rem' }}>✨ Explore Our Features ✨</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
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
          <div className="neon-card card-wellness">
            <h3>🌱 Wellness Plans</h3>
            <p>Personalized daily routines combining therapy techniques, self-care, and healthy habits.</p>
          </div>
          <div className="neon-card card-progress">
            <h3>📈 Progress Insights</h3>
            <p>Track your mental health journey with detailed analytics and milestone celebrations.</p>
          </div>
        </div>
      </div>

      {/* Mental Health Statistics */}
      <div className="section">
        <h2>🧠 Understanding Mental Health</h2>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '40px' }}>
          You're not alone in your mental health journey. These statistics show how common mental health challenges are:
        </p>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">1 in 4</span>
            <p>people experience mental health issues each year</p>
          </div>
          <div className="stat-card">
            <span className="stat-number">84%</span>
            <p>report improvement with proper treatment and support</p>
          </div>
          <div className="stat-card">
            <span className="stat-number">50%</span>
            <p>of mental health conditions start by age 14</p>
          </div>
          <div className="stat-card">
            <span className="stat-number">90%</span>
            <p>of people who seek help report feeling better</p>
          </div>
        </div>
      </div>

      {/* Privacy and Security */}
      <div className="section">
        <div className="privacy-note">
          <h3>🔒 Your Privacy Matters</h3>
          <p>
            All your data is encrypted and protected. We never share your personal information 
            without your explicit consent. Your mental health journey is private and secure with us.
          </p>
        </div> 
      </div>
    </>
  );
}

export default Home;
