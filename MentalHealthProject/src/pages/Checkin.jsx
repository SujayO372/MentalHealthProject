import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const moods = [
  { label: '🤩 Ecstatic', value: 5, color: '#5c6bc0' },  // deeper blue/purple
  { label: '😊 Happy', value: 4, color: '#7986cb' },
  { label: '😐 Neutral', value: 3, color: '#9fa8da' },
  { label: '😔 Sad', value: 2, color: '#b39ddb' },
  { label: '😞 Depressed', value: 1, color: '#9575cd' },
];

const getTodayDate = () => new Date().toISOString().split('T')[0];

export default function Checkin() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const today = getTodayDate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('moodHistory')) || [];
    setMoodHistory(saved);

    const todayMood = saved.find((entry) => entry.date === today);
    if (todayMood) {
      setSelectedMood(todayMood.value);
    }
  }, []);

  const handleSelectMood = (mood) => {
    if (selectedMood) return;

    const newEntry = { date: today, value: mood.value };
    const updated = [...moodHistory, newEntry];

    localStorage.setItem('moodHistory', JSON.stringify(updated));
    setMoodHistory(updated);
    setSelectedMood(mood.value);
  };

  const chartData = moodHistory.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    moodValue: entry.value,
  }));

  return (
    <>
      <NavBar />
      <div
        style={{
          overflowX: 'auto',
          backgroundColor: '#1c2247',
          minHeight: '100vh',
          padding: '40px',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '30px',
            maxWidth: '1200px',
            margin: '0 auto',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {/* Mood Selector Panel */}
          <div
            style={{
              flex: '0 1 500px', // wider panel
              padding: '40px',
              backgroundColor: '#252b71',
              color: '#c5cafc',
              borderRadius: '16px',
              boxShadow: '0 10px 25px rgba(75, 75, 135, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minWidth: '320px',
            }}
          >
            <h2
              style={{
                marginBottom: '20px',
                color: '#c5cafc',
                backgroundColor: '#3f51b5',
                padding: '10px 15px',
                borderRadius: '6px',
                textAlign: 'center',
                fontWeight: '700',
                textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
              }}
            >
              How are you feeling today?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  style={{
                    padding: '14px 22px',
                    fontSize: '1.1rem',
                    border:
                      selectedMood === mood.value
                        ? '3px solid #7986cb'
                        : '2px solid #5c6bc0',
                    borderRadius: '12px',
                    backgroundColor: mood.color,
                    cursor: selectedMood ? 'not-allowed' : 'pointer',
                    opacity: selectedMood && selectedMood !== mood.value ? 0.6 : 1,
                    textAlign: 'left',
                    color: '#fff',
                    fontWeight: '600',
                    boxShadow:
                      selectedMood === mood.value
                        ? '0 0 12px 3px rgba(121, 134, 203, 0.7)'
                        : 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => handleSelectMood(mood)}
                  disabled={!!selectedMood}
                >
                  {mood.label}
                </button>
              ))}
              {selectedMood && (
                <p
                  style={{
                    marginTop: '20px',
                    fontSize: '1rem',
                    color: '#c5cafc',
                    textAlign: 'center',
                    fontWeight: '600',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
                  }}
                >
                  You already checked in today!
                </p>
              )}
            </div>
          </div>

          {/* Mood Graph Panel */}
          <div
            style={{
              flex: '1 1 600px',
              backgroundColor: '#252b71',
              color: '#c5cafc',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: '0 10px 25px rgba(75, 75, 135, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: '320px',
              maxWidth: '700px',
            }}
          >
            <h2
              style={{
                color: '#c5cafc',
                backgroundColor: '#3f51b5',
                padding: '10px 15px',
                borderRadius: '6px',
                width: '100%',
                textAlign: 'center',
                marginBottom: '20px',
                fontWeight: '700',
                textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
              }}
            >
              Your Mood Progression
            </h2>
            <div
              style={{
                width: '100%',
                height: '300px',
                backgroundColor: '#1c2247',
                borderRadius: '10px',
                border: '1px solid #7986cb',
                padding: '20px',
                color: '#c5cafc',
                boxShadow: 'inset 0 0 10px #3f51b5',
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#7986cb" />
                  <XAxis dataKey="date" stroke="#c5cafc" />
                  <YAxis
                    domain={[1, 5]}
                    ticks={[1, 2, 3, 4, 5]}
                    stroke="#c5cafc"
                    tickFormatter={(value) =>
                      moods.find((m) => m.value === value)?.label.split(' ')[1]
                    }
                  />
                  <Tooltip
                    formatter={(value) => moods.find((m) => m.value === value)?.label}
                    contentStyle={{ color: '#000' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="moodValue"
                    stroke="#7986cb"
                    strokeWidth={3}
                    dot={{ r: 5, stroke: '#3f51b5', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* New section below the graph */}
            <div
              style={{
                marginTop: '40px',
                backgroundColor: '#252b71',
                borderRadius: '12px',
                padding: '20px',
                width: '100%',
                color: '#9fa8da',
                fontWeight: '600',
                textAlign: 'center',
                boxShadow: '0 0 12px rgba(121, 134, 203, 0.3)',
              }}
            >
              Keep tracking your mood daily for better self-awareness and well-being!
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
