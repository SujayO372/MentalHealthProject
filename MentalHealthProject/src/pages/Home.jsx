import { useState } from 'react';
import '../styling/Home.css';
import NavBar from '../components/NavBar';

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />

      {/* Page Container */}
      <div
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, #4a90e2, #50e3c2)', // vibrant blue to teal gradient
          padding: '60px 0',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',      // Increased width for wider layout
            margin: '0 auto',
            padding: '0 40px',       // Increased horizontal padding for balance
            textAlign: 'center',
            color: '#fff',           // white text for contrast
          }}
        >
          {/* Heading */}
          <h1
            style={{
              color: '#000000ff',
              fontSize: '3rem',
              marginBottom: '10px',
            }}
          >
            Benefit Your Mental Health
          </h1>

          {/* Intro paragraph */}
          <p
            style={{
              fontSize: '1.2rem',
              marginBottom: '30px',
              color: '#d1f0f0', // soft cyan/light teal for a fresh look
            }}
          >
            Click on different categories above to explore helpful tools and
            resources that support your emotional well-being.
          </p>

          <hr
            style={{
              margin: '40px auto',
              width: '60%',
              borderColor: '#ccc',
            }}
          />

          {/* Quote */}
          <blockquote
            style={{
              fontStyle: 'italic',
              color: '#6a4c93',
              fontSize: '1.3rem',
              maxWidth: '700px',
              margin: '40px auto',
            }}
          >
            “Mental health is just as important as physical health. Take time
            to care for your mind.”
          </blockquote>

          {/* Images */}
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
              src="https://wallpapers.com/images/hd/mental-health-ztj03tqovu8bdai6.jpg"
              alt="Mental Health Brain"
              style={{ width: '100%', maxWidth: '300px', borderRadius: '12px' }}
            />
            <img
              src="https://media.gettyimages.com/id/1494341356/video/brain-emerging-from-a-complex-network-artificial-intelligence-learning-mental-health.jpg?s=640x640&k=20&c=xBnWqDjs1cxxZtyvaAmfkWf20QBkNhBO4Zj__4Jxu1w="
              alt="Mindfulness and Meditation"
              style={{ width: '100%', maxWidth: '400px', borderRadius: '12px' }}
            />
          </div>

          {/* Mission & Info Section */}
          <section
            style={{
              maxWidth: '900px',
              margin: '60px auto',
              padding: '40px 20px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              color: '#d1f0f0',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            <h2
              style={{
                fontSize: '2.5rem',
                marginBottom: '25px',
                color: '#040404ff',
              }}
            >
              Our Mission
            </h2>
            <p
              style={{
                fontSize: '1.3rem',
                lineHeight: 1.6,
                marginBottom: '35px',
              }}
            >
              We aim to empower every visitor with reliable mental health tools
              and resources to nurture emotional well-being and resilience.
            </p>

            <h3
              style={{
                fontSize: '1.8rem',
                marginBottom: '15px',
                color: '#121515ff',
              }}
            >
              Why Trust Us?
            </h3>
            <ul
              style={{
                fontSize: '1.1rem',
                marginBottom: '35px',
                listStyleType: 'disc',
                paddingLeft: '20px',
                color: '#eef0efff',
              }}
            >
              <li>Certified mental health professionals contribute to our content.</li>
              <li>Affiliated with leading health organizations.</li>
              <li>Regularly updated with evidence-based information.</li>
            </ul>

            <h3
              style={{
                fontSize: '1.8rem',
                marginBottom: '15px',
                color: '#161717ff',
              }}
            >
              Privacy You Can Count On
            </h3>
            <p
              style={{
                fontSize: '1.2rem',
                marginBottom: '35px',
              }}
            >
              Your privacy matters. This website is a safe, confidential space
              where your data and interactions are protected and never shared.
            </p>

            <h3
              style={{
                fontSize: '1.8rem',
                marginBottom: '15px',
                color: '#060707ff',
              }}
            >
              What You’ll Find Here
            </h3>
            <p style={{ fontSize: '1.2rem' }}>
              Explore curated tools, expert articles, interactive resources, and
              community support to guide you on your mental health journey.
            </p>
          </section>

          <section
  style={{
    maxWidth: '900px',
    margin: '60px auto 100px',
    padding: '40px 30px',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: '15px',
    color: '#e0f7f7',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: '1.25rem',
    lineHeight: 1.7,
  }}
>
  <h2 style={{ fontSize: '2.5rem', marginBottom: '25px', color: '#0e0f0fff' }}>
    Understanding Mental Health and Its Impact
  </h2>
  <p>
    Every year, millions of people around the world suffer from mental health challenges such as anxiety, depression, and other disorders that impact their daily lives and overall well-being. Despite its prevalence, mental health remains a widely misunderstood and often stigmatized issue, causing many individuals to suffer in silence without access to proper care or support. These struggles affect not only individuals but also families and communities, making mental health a critical public health concern. This website is committed to being a reliable and compassionate resource, offering tools, information, and support to help you or your loved ones navigate these challenges with hope and confidence—reminding you that you are never alone on this journey.
  </p>
</section>

        </div>
      </div>
    </>
  );
}

export default Home;
