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
  { label: '🤩 Ecstatic', value: 5, color: '#ffeaa7' },
  { label: '😊 Happy', value: 4, color: '#a8e6cf' },
  { label: '😐 Neutral', value: 3, color: '#dcedc1' },
  { label: '😔 Sad', value: 2, color: '#ffd3b6' },
  { label: '😞 Depressed', value: 1, color: '#ff8b94' },
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
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Mood Selector Panel */}
        <div style={{ flex: 1, padding: '40px', backgroundColor: '#f4f8fb' }}>
          <h2 style={{ marginBottom: '20px' }}>How are you feeling today?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {moods.map((mood) => (
              <button
                key={mood.value}
                style={{
                  padding: '12px 20px',
                  fontSize: '1.1rem',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: mood.color,
                  cursor: selectedMood ? 'not-allowed' : 'pointer',
                  opacity: selectedMood && selectedMood !== mood.value ? 0.5 : 1,
                  textAlign: 'left',
                }}
                onClick={() => handleSelectMood(mood)}
                disabled={!!selectedMood}
              >
                {mood.label}
              </button>
            ))}
            {selectedMood && (
              <p style={{ marginTop: '20px', fontSize: '1rem' }}>
                You already checked in today!
              </p>
            )}
          </div>
        </div>

        {/* Mood Graph Panel */}
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
              padding: '20px',
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis
                  domain={[1, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  tickFormatter={(value) =>
                    moods.find((m) => m.value === value)?.label.split(' - ')[0]
                  }
                />
                <Tooltip
                  formatter={(value) =>
                    moods.find((m) => m.value === value)?.label
                  }
                />
                <Line
                  type="monotone"
                  dataKey="moodValue"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
