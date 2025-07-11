import NavBar from '../components/NavBar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Checkin() {
  const moods = [
    { label: '🤩 Ecstatic - 5', color: '#ffeaa7' },
    { label: '😊 Happy - 4', color: '#a8e6cf' },
    { label: '😐 Neutral - 3', color: '#dcedc1' },
    { label: '😔 Sad - 2', color: '#ffd3b6' },
    { label: '😞 Depressed - 1', color: '#ff8b94' }
  ];

  // Dummy mood progression data
  const moodData = [
    { date: 'Jul 1', moodValue: 5 },
    { date: 'Jul 2', moodValue: 4 },
    { date: 'Jul 3', moodValue: 3 },
    { date: 'Jul 4', moodValue: 4 },
    { date: 'Jul 5', moodValue: 2 },
    { date: 'Jul 6', moodValue: 1 }
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
          <h2>Your Mood Progression</h2>
          <div
            style={{
              width: '100%',
              height: '300px',
              backgroundColor: '#fff',
              borderRadius: '10px',
              border: '1px solid #ccc',
              marginTop: '20px',
              padding: '20px'
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="moodValue" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
