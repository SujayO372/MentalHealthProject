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
  { label: '🤩 Ecstatic', value: 5, color: '#4a567d' },  // muted blue-purple
  { label: '😊 Happy', value: 4, color: '#67789a' },
  { label: '😐 Neutral', value: 3, color: '#8a99b5' },
  { label: '😔 Sad', value: 2, color: '#a199b9' },
  { label: '😞 Depressed', value: 1, color: '#8677a6' },
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
          backgroundColor: '#f5f7fa',
          minHeight: '100vh',
          padding: '40px',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: '#2e3a59',
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
              flex: '0 1 500px',
              padding: '40px',
              backgroundColor: '#e3e8f0',
              color: '#2e3a59',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minWidth: '320px',
            }}
          >
            <h2
              style={{
                marginBottom: '20px',
                color: '#3f4a6b',
                padding: '10px 15px',
                borderRadius: '6px',
                textAlign: 'center',
                fontWeight: '700',
                backgroundColor: '#d1d9e6',
                userSelect: 'none',
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
                        ? '2.5px solid #67789a'
                        : '1.5px solid #4a567d',
                    borderRadius: '10px',
                    backgroundColor: mood.color,
                    cursor: selectedMood ? 'default' : 'pointer',
                    opacity: selectedMood && selectedMood !== mood.value ? 0.65 : 1,
                    textAlign: 'left',
                    color: '#f9fafb',
                    fontWeight: '600',
                    boxShadow: selectedMood === mood.value ? '0 0 8px rgba(103, 120, 154, 0.5)' : 'none',
                    transition: 'all 0.3s ease',
                    userSelect: 'none',
                  }}
                  onClick={() => handleSelectMood(mood)}
                  disabled={!!selectedMood}
                  onMouseEnter={(e) => {
                    if (!selectedMood) e.currentTarget.style.filter = 'brightness(0.9)';
                  }}
                  onMouseLeave={(e) => {
                    if (!selectedMood) e.currentTarget.style.filter = 'brightness(1)';
                  }}
                >
                  {mood.label}
                </button>
              ))}
              {selectedMood && (
                <p
                  style={{
                    marginTop: '20px',
                    fontSize: '1rem',
                    color: '#576475',
                    textAlign: 'center',
                    fontWeight: '600',
                    userSelect: 'none',
                  }}
                >
                  You have already checked in today.
                </p>
              )}
            </div>
          </div>

          {/* Mood Graph Panel */}
          <div
            style={{
              flex: '1 1 600px',
              backgroundColor: '#e3e8f0',
              color: '#2e3a59',
              borderRadius: '12px',
              padding: '40px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: '320px',
              maxWidth: '700px',
            }}
          >
            <h2
              style={{
                color: '#3f4a6b',
                padding: '10px 15px',
                borderRadius: '6px',
                width: '100%',
                textAlign: 'center',
                marginBottom: '20px',
                fontWeight: '700',
                userSelect: 'none',
                backgroundColor: '#d1d9e6',
              }}
            >
              Your Mood Progression
            </h2>
            <div
              style={{
                width: '100%',
                height: '300px',
                backgroundColor: '#f7f9fc',
                borderRadius: '8px',
                border: '1px solid #67789a',
                padding: '20px',
                color: '#2e3a59',
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#c1c8dd" />
                  <XAxis dataKey="date" stroke="#67789a" />
                  <YAxis
                    domain={[1, 5]}
                    ticks={[1, 2, 3, 4, 5]}
                    stroke="#67789a"
                    tickFormatter={(value) =>
                      moods.find((m) => m.value === value)?.label.split(' ')[1]
                    }
                  />
                  <Tooltip
                    formatter={(value) => moods.find((m) => m.value === value)?.label}
                    contentStyle={{ color: '#2e3a59', backgroundColor: '#f0f3fa', borderRadius: '8px', border: '1px solid #c1c8dd' }}
                    labelStyle={{ fontWeight: '600' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="moodValue"
                    stroke="#67789a"
                    strokeWidth={3}
                    dot={{ r: 5, stroke: '#4a567d', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* New section below the graph */}
            <div
              style={{
                marginTop: '40px',
                backgroundColor: '#d1d9e6',
                borderRadius: '10px',
                padding: '20px',
                width: '100%',
                color: '#67789a',
                fontWeight: '600',
                textAlign: 'center',
                userSelect: 'none',
                boxShadow: '0 0 8px rgba(103, 120, 154, 0.15)',
              }}
            >
              Keep tracking your mood daily for better self-awareness and well-being.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
