import NavBar from '../components/NavBar';

export default function Hotlines() {
  return (
    <div>
      <NavBar />
      <div style={{ padding: '40px', backgroundColor: '#f8f9fa', fontFamily: 'sans-serif' }}>
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
        <p style={{ marginTop: '30px', color: '#555' }}>
          Hotlines are dedicated phone lines designed to provide immediate assistance, support, and information for specific issues.
          Whether it’s for mental health crises, domestic violence, substance abuse, or emergency services, hotlines offer confidential, timely help to individuals in need.
          They serve as a vital resource for connecting people with the appropriate care and guidance.
        </p>
      </div>
    </div>
  );
}
