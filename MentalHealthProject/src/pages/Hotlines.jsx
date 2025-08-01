import NavBar from '../components/NavBar';

export default function Hotlines() {
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <NavBar />
      <div style={{ padding: '40px', backgroundColor: '#f8f9fa' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '30px', color: '#333' }}>
          Emergency Hotlines for Support
        </h1>

        {/* Crisis Support */}
        <section style={{ backgroundColor: '#e3f2fd', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h2 style={{ color: '#0d47a1' }}>Crisis Support</h2>
          <ul>
            <li><strong>Emergency Services:</strong> 911</li>
            <li><strong>National Suicide Prevention Lifeline:</strong> 1-800-273-TALK (8255)</li>
            <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
            <li><strong>Veterans Crisis Line:</strong> 1-800-273-8255 (Press 1)</li>
            <li><strong>Disaster Distress Helpline:</strong> 1-800-985-5990</li>
          </ul>
        </section>

        {/* Abuse & Assault */}
        <section style={{ backgroundColor: '#fce4ec', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h2 style={{ color: '#ad1457' }}>Abuse & Assault</h2>
          <ul>
            <li><strong>Domestic Violence Hotline:</strong> 1-800-799-SAFE (7233)</li>
            <li><strong>Childhelp National Child Abuse Hotline:</strong> 1-800-4-A-CHILD (422-4453)</li>
            <li><strong>National Sexual Assault Hotline (RAINN):</strong> 1-800-656-HOPE (4673)</li>
            <li><strong>National Human Trafficking Hotline:</strong> 1-888-373-7888</li>
          </ul>
        </section>

        {/* Mental Health & Substance Use */}
        <section style={{ backgroundColor: '#e8f5e9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h2 style={{ color: '#2e7d32' }}>Mental Health & Substance Use</h2>
          <ul>
            <li><strong>National Alliance on Mental Illness (NAMI) Helpline:</strong> 1-800-950-NAMI (6264)</li>
            <li><strong>National Eating Disorders Association (NEDA):</strong> 1-800-931-2237</li>
            <li><strong>SAMHSA Treatment Locator:</strong> 1-800-662-HELP (4357)</li>
          </ul>
        </section>

        {/* Other Hotlines */}
        <section style={{ backgroundColor: '#fff8e1', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: '#ff6f00' }}>Other Resources</h2>
          <ul>
            <li><strong>LGBT National Hotline:</strong> 1-888-843-4564</li>
            <li><strong>Elder Care Locator:</strong> 1-800-677-1116</li>
            <li><strong>Poison Control:</strong> 1-800-222-1222</li>
            <li><strong>National Runaway Safeline:</strong> 1-800-RUNAWAY (786-2929)</li>
          </ul>
        </section>

        {/* Description */}
        <div style={{
          marginTop: '40px',
          maxWidth: '800px',
          backgroundColor: '#e0f7fa',
          borderRadius: '12px',
          padding: '25px 30px',
          boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
          color: '#004d40',
          fontSize: '1.15rem',
          lineHeight: '1.6',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <h2 style={{
            marginBottom: '15px',
            fontWeight: '700',
            color: '#00796b'
          }}>
            What Are Hotlines?
          </h2>
          <p>
            Hotlines are dedicated phone lines designed to provide immediate assistance, support, and information for specific issues.
            Whether it’s for mental health crises, domestic violence, substance abuse, or emergency services, hotlines offer confidential, timely help to individuals in need.
            They serve as a vital resource for connecting people with the appropriate care and guidance.
          </p>
        </div>
      </div>
    </div>
  );
}
