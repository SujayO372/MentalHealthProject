import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';

function Home() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const updateUsername = () => {
      const storedUsername = localStorage.getItem('userName');
      setUsername(storedUsername && storedUsername.trim() !== '' ? storedUsername : 'Guest');
    };

    updateUsername();
    window.addEventListener('userNameChanged', updateUsername);
    return () => window.removeEventListener('userNameChanged', updateUsername);
  }, []);

  return (
    <>
      <NavBar />
      
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        padding: '0 60px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
            Hi, <strong>{username}</strong>
          </p>
          
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '700',
            marginBottom: '20px'
          }}>
            SereneSpace
          </h1>
          
          <p style={{
            fontSize: '1.3rem',
            marginBottom: '30px',
            maxWidth: '600px'
          }}>
            Professional support and evidence-based tools to help you thrive emotionally and mentally.
          </p>
          
          <p style={{
            background: 'rgba(255,255,255,0.15)',
            border: '2px solid rgba(255,255,255,0.3)',
            color: 'white',
            padding: '15px 35px',
            borderRadius: '50px',
            fontSize: '1.1rem',
            display: 'inline-block',
            userSelect: 'none'
          }}>
            Start Your Journey
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '80px 60px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#1a202c',
              marginBottom: '15px'
            }}>
              Comprehensive Mental Health Support
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#4a5568' }}>
              Access professional-grade tools and resources designed to support your mental wellness
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🧠</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', color: '#1a202c' }}>
                AI-Powered Support
              </h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                Get personalized guidance through our intelligent chatbot trained on evidence-based approaches.
              </p>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📊</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', color: '#1a202c' }}>
                Wellness Tracking
              </h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                Monitor your emotional patterns and progress with comprehensive mood assessments.
              </p>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎯</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', color: '#1a202c' }}>
                Targeted Resources
              </h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                Access curated content for anxiety, depression, stress, and relationship issues.
              </p>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💬</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', color: '#1a202c' }}>
                Crisis Support
              </h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                Immediate access to crisis resources and emergency mental health support.
              </p>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🌱</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', color: '#1a202c' }}>
                Personal Growth
              </h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                Develop resilience and healthy coping mechanisms for long-term wellness.
              </p>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>👥</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', color: '#1a202c' }}>
                Community Support
              </h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                Connect with others through our safe, moderated peer support groups.
              </p>
            </div>

            {/* New sections */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🧪</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', color: '#1a202c' }}>
                Health Test
              </h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                Take scientifically-backed assessments to understand your mental health better.
              </p>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>✅</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', color: '#1a202c' }}>
                Check In
              </h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                Regularly track your moods and feelings to stay aware and proactive.
              </p>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📞</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', color: '#1a202c' }}>
                Hotlines
              </h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                Quick access to trusted mental health hotlines for immediate help.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tools */}
      <div style={{ padding: '80px 60px', background: 'white' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{
              fontSize: '2.2rem',
              fontWeight: '700',
              color: '#1a202c',
              marginBottom: '15px'
            }}>
              Quick Access Tools
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#4a5568' }}>
              Get immediate support with our most popular resources
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '25px'
          }}>
            <div style={{
              background: '#f8fafc',
              borderRadius: '16px',
              padding: '30px',
              textAlign: 'center',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>📝</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: '#1a202c' }}>
                Mood Check-in
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '20px' }}>
                Quick daily assessment
              </p>
            </div>

            <div style={{
              background: '#f8fafc',
              borderRadius: '16px',
              padding: '30px',
              textAlign: 'center',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🆘</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: '#1a202c' }}>
                Crisis Hotline
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '20px' }}>
                24/7 immediate support
              </p>
            </div>

            <div style={{
              background: '#f8fafc',
              borderRadius: '16px',
              padding: '30px',
              textAlign: 'center',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>✍️</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: '#1a202c' }}>
                Journal Entry
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '20px' }}>
                Record your thoughts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SereneSpace Mission Section */}
      <div style={{ padding: '80px 60px', background: '#e0e7ff', color: '#1a202c' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '20px' }}>
            Our Mission at SereneSpace
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '16px', lineHeight: '1.7' }}>
            At SereneSpace, we believe mental health is a fundamental right and essential for a fulfilling life. 
            Our mission is to provide accessible, compassionate, and effective mental health support to everyone, 
            regardless of where they are in their journey.
          </p>
          <p style={{ fontSize: '1.2rem', marginBottom: '16px', lineHeight: '1.7' }}>
            We harness the power of technology combined with human empathy to create a safe space where individuals 
            can feel understood, empowered, and supported. Through innovative tools and trusted resources, we aim 
            to reduce stigma and break down barriers to care.
          </p>
          <p style={{ fontSize: '1.2rem', marginBottom: '0', lineHeight: '1.7' }}>
            Our commitment is to foster mental wellness by offering personalized support, encouraging connection, 
            and inspiring growth. Together, we can create a world where no one faces mental health challenges alone.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
