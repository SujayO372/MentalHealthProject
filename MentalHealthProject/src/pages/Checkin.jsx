import NavBar from '../components/NavBar';

export default function Checkin() {
  const moods = [
    { label: '😊 Happy', color: '#a8e6cf' },
    { label: '😐 Neutral', color: '#dcedc1' },
    { label: '😔 Sad', color: '#ffd3b6' },
    { label: '😡 Angry', color: '#ffaaa5' },
    { label: '😰 Anxious', color: '#ff8b94' }
  ];

  return (
    <>
      <NavBar />
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Left Panel */}
        <div style={{ flex: 1, padding: '40px', backgroundColor: '#f4f8fb' }}>
          <h2 style={{ marginBottom: '20px' }}>How are you feeling today?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {moods.map((mood, index) => (
              <button
                key={index}
                style={{
                  padding: '12px 20px',
                  fontSize: '1.1rem',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: mood.color,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {mood.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ flex: 2, padding: '40px', backgroundColor: '#e2f0ec' }}>
          <h2> Your Mood Progression </h2>
          <div
            style={{
              width: '100%',
              height: '300px',
              backgroundColor: '#fff',
              borderRadius: '10px',
              border: '1px dashed #999',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '20px',
              color: '#666',
              fontSize: '1.2rem'
            }}
          >
          </div>
        </div>
      </div>
    </>
  );
}
