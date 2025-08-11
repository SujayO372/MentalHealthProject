import NavBar from '../components/NavBar';

export default function Hotlines() {
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: '#212529', minHeight: '100vh', background: 'linear-gradient(135deg, #e9f0ff 0%, #f7faff 50%, #ffffff 100%)' }}>
      <NavBar />
      <div style={{ overflowX: 'auto', paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ display: 'flex', minWidth: 1600, maxWidth: 1800, margin: '0 auto', gap: 40, padding: '0 24px', boxSizing: 'border-box' }}>
          
          {/* Left Panel: Hotline Sections */}
          <div style={{ flex: 1, backgroundColor: '#f0f4ff', borderRadius: 14, padding: 32, boxShadow: '0 8px 20px rgba(0, 64, 133, 0.1)' }}>
            <h1 style={{
              fontSize: 32,
              fontWeight: '700',
              marginBottom: 30,
              color: '#004085',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              textAlign: 'center',
              textShadow: '1px 1px 2px rgba(0,64,133,0.15)',
              userSelect: 'none'
            }}>
              Emergency Hotlines for Support
            </h1>

            {/* Crisis Support */}
            <section style={{ backgroundColor: '#e3f2fd', padding: 24, borderRadius: 14, marginBottom: 24, boxShadow: 'inset 0 0 10px rgba(0, 64, 133, 0.1)' }}>
              <h2 style={{ color: '#0d47a1', fontWeight: '700', marginBottom: 16 }}>Crisis Support</h2>
              <ul style={{ paddingLeft: 20, fontSize: 16, color: '#212529', lineHeight: 1.5 }}>
                <li><strong>Emergency Services:</strong> 911</li>
                <li><strong>National Suicide Prevention Lifeline:</strong> 1-800-273-TALK (8255)</li>
                <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
                <li><strong>Veterans Crisis Line:</strong> 1-800-273-8255 (Press 1)</li>
                <li><strong>Disaster Distress Helpline:</strong> 1-800-985-5990</li>
              </ul>
            </section>

            {/* Abuse & Assault */}
            <section style={{ backgroundColor: '#fce4ec', padding: 24, borderRadius: 14, marginBottom: 24, boxShadow: 'inset 0 0 10px rgba(173, 20, 87, 0.1)' }}>
              <h2 style={{ color: '#ad1457', fontWeight: '700', marginBottom: 16 }}>Abuse & Assault</h2>
              <ul style={{ paddingLeft: 20, fontSize: 16, color: '#212529', lineHeight: 1.5 }}>
                <li><strong>Domestic Violence Hotline:</strong> 1-800-799-SAFE (7233)</li>
                <li><strong>Childhelp National Child Abuse Hotline:</strong> 1-800-4-A-CHILD (422-4453)</li>
                <li><strong>National Sexual Assault Hotline (RAINN):</strong> 1-800-656-HOPE (4673)</li>
                <li><strong>National Human Trafficking Hotline:</strong> 1-888-373-7888</li>
              </ul>
            </section>

            {/* Mental Health & Substance Use */}
            <section style={{ backgroundColor: '#e8f5e9', padding: 24, borderRadius: 14, marginBottom: 24, boxShadow: 'inset 0 0 10px rgba(46, 125, 50, 0.1)' }}>
              <h2 style={{ color: '#2e7d32', fontWeight: '700', marginBottom: 16 }}>Mental Health & Substance Use</h2>
              <ul style={{ paddingLeft: 20, fontSize: 16, color: '#212529', lineHeight: 1.5 }}>
                <li><strong>National Alliance on Mental Illness (NAMI) Helpline:</strong> 1-800-950-NAMI (6264)</li>
                <li><strong>National Eating Disorders Association (NEDA):</strong> 1-800-931-2237</li>
                <li><strong>SAMHSA Treatment Locator:</strong> 1-800-662-HELP (4357)</li>
              </ul>
            </section>

            {/* Other Hotlines */}
            <section style={{ backgroundColor: '#fff8e1', padding: 24, borderRadius: 14, boxShadow: 'inset 0 0 10px rgba(255, 111, 0, 0.1)' }}>
              <h2 style={{ color: '#ff6f00', fontWeight: '700', marginBottom: 16 }}>Other Resources</h2>
              <ul style={{ paddingLeft: 20, fontSize: 16, color: '#212529', lineHeight: 1.5 }}>
                <li><strong>LGBT National Hotline:</strong> 1-888-843-4564</li>
                <li><strong>Elder Care Locator:</strong> 1-800-677-1116</li>
                <li><strong>Poison Control:</strong> 1-800-222-1222</li>
                <li><strong>National Runaway Safeline:</strong> 1-800-RUNAWAY (786-2929)</li>
              </ul>
            </section>
          </div>

          {/* Right Panel: Description */}
          <div style={{
            flex: 1,
            backgroundColor: '#e0f7fa',
            borderRadius: 14,
            padding: 32,
            boxShadow: '0 8px 20px rgba(0, 77, 64, 0.15)',
            color: '#004d40',
            fontSize: 18,
            lineHeight: 1.6,
            userSelect: 'text',
            maxHeight: 'calc(100vh - 160px)',
            overflowY: 'auto',
          }}>
            <h2 style={{
              marginBottom: 20,
              fontWeight: '700',
              color: '#00796b',
              letterSpacing: '0.03em',
              userSelect: 'none',
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
    </div>
  );
}
