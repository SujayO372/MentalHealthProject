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
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      textAlign: 'center',
      color: '#fff', // white text for contrast
    }}
  >
          {/* Heading */}
          <h1 style={{
            color: '#985498ff',
            fontSize: '3rem',
            marginBottom: '10px'
          }}>
            Benefit Your Mental Health
          </h1>

          {/* Intro paragraph */}
          <p style={{
  fontSize: '1.2rem',
  marginBottom: '30px',
  color: '#d1f0f0' // soft cyan/light teal for a fresh look
}}>
  Click on different categories above to explore helpful tools and resources that support your emotional well-being.
</p>


          <hr style={{
            margin: '40px auto',
            width: '60%',
            borderColor: '#ccc'
          }} />

          {/* Quote */}
          <blockquote style={{
            fontStyle: 'italic',
            color: '#6a4c93',
            fontSize: '1.3rem',
            maxWidth: '700px',
            margin: '40px auto'
          }}>
            “Mental health is just as important as physical health. Take time to care for your mind.”
          </blockquote>

          {/* Images */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '30px'
          }}>
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
        </div>
      </div>
    </>
  );
}

export default Home;
