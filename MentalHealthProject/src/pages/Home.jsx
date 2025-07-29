import { useState } from 'react';
import '../styling/Home.css';
import NavBar from '../components/NavBar';
import UserNavBar from '../components/UserNavBar';

function Home() {
  const [count, setCount] = useState(0);

  // Example username — in a real app you'd get this from props, context, or authentication state
  const username = "JohnDoe";

  return (
    <>
      <NavBar />
      <UserNavBar username={username} />

      <div
        style={{
          width: '100%',
          backgroundColor: '#f7f9fc',
          padding: '60px 0',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 30px',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: '#2c3e50',
          }}
        >
          <h1
            style={{
              fontSize: '3rem',
              marginBottom: '10px',
              color: '#2c3e50',
              textAlign: 'center',
            }}
          >
            Benefit Your Mental Health
          </h1>

          <p
            style={{
              fontSize: '1.2rem',
              marginBottom: '30px',
              color: '#4a6072',
              textAlign: 'center',
            }}
          >
            Click on different categories above to explore helpful tools and resources that support your emotional well-being.
          </p>

          <hr style={{ margin: '40px auto', width: '60%', borderColor: '#ccc' }} />

          <blockquote
            style={{
              fontStyle: 'italic',
              color: '#4a6072',
              fontSize: '1.3rem',
              maxWidth: '700px',
              margin: '40px auto',
              textAlign: 'center',
            }}
          >
            “Mental health is just as important as physical health. Take time to care for your mind.”
          </blockquote>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '20px',
              marginTop: '30px',
            }}
          >
            <img
              src="https://c1.wallpaperflare.com/preview/391/732/863/mental-health-wellness-psychology-mind.jpg"
              alt="Mental Health Brain"
              style={{ width: '100%', maxWidth: '300px', borderRadius: '12px' }}
            />
            <img
              src="https://media.gettyimages.com/id/1494341356/video/brain-emerging-from-a-complex-network-artificial-intelligence-learning-mental-health.jpg?s=640x640&k=20&c=xBnWqDjs1cxxZtyvaAmfkWf20QBkNhBO4Zj__4Jxu1w="
              alt="Mindfulness and Meditation"
              style={{ width: '100%', maxWidth: '400px', borderRadius: '12px' }}
            />
          </div>

          <section
            style={{
              maxWidth: '900px',
              margin: '60px auto',
              padding: '40px 30px',
              backgroundColor: '#ffffff',
              borderRadius: '15px',
              color: '#2c3e50',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
              fontSize: '1.1rem',
              lineHeight: 1.7,
            }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Our Mission</h2>
            <p style={{ marginBottom: '30px' }}>
              We aim to empower every visitor with reliable mental health tools and resources to nurture emotional well-being and resilience.
            </p>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Why Trust Us?</h3>
            <ul
              style={{
                listStyleType: 'disc',
                paddingLeft: '20px',
                marginBottom: '30px',
              }}
            >
              <li>Certified mental health professionals contribute to our content.</li>
              <li>Affiliated with leading health organizations.</li>
              <li>Regularly updated with evidence-based information.</li>
            </ul>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Privacy You Can Count On</h3>
            <p style={{ marginBottom: '30px' }}>
              Your privacy matters. This website is a safe, confidential space where your data and interactions are protected and never shared.
            </p>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>What You’ll Find Here</h3>
            <p>
              Explore curated tools, expert articles, interactive resources, and community support to guide you on your mental health journey.
            </p>
          </section>

          <section
            style={{
              maxWidth: '900px',
              margin: '60px auto 100px',
              padding: '40px 30px',
              backgroundColor: '#ffffff',
              borderRadius: '15px',
              color: '#2c3e50',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
              fontSize: '1.1rem',
              lineHeight: 1.7,
            }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>
              Understanding Mental Health and Its Impact
            </h2>
            <p>
              Every year, millions of people around the world suffer from mental health challenges such as anxiety, depression, and other disorders that impact their daily lives and overall well-being.
              Despite its prevalence, mental health remains a widely misunderstood and often stigmatized issue, causing many individuals to suffer in silence without access to proper care or support.
              These struggles affect not only individuals but also families and communities, making mental health a critical public health concern. This website is committed to being a reliable and compassionate
              resource, offering tools, information, and support to help you or your loved ones navigate these challenges with hope and confidence—reminding you that you are never alone on this journey.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
