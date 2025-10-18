import React, { useState, useEffect } from 'react';
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
  { label: '🤩 Ecstatic', value: 5, color: '#ff8bd6' },
  { label: '😊 Happy', value: 4, color: '#6fffe9' },
  { label: '😐 Neutral', value: 3, color: '#9ad1ff' },
  { label: '😔 Sad', value: 2, color: '#b48bff' },
  { label: '😞 Depressed', value: 1, color: '#ff7fa2' },
];

const getTodayDate = () => new Date().toISOString().split('T')[0];

export default function Checkin() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [chatOpen, setChatOpen] = useState(false); // ✅ Added for chat bubble
  const today = getTodayDate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('moodHistory')) || [];
    setMoodHistory(saved);

    const todayMood = saved.find((entry) => entry.date === today);
    if (todayMood) {
      setSelectedMood(todayMood.value);
    }
  }, [today]);

  const handleSelectMood = (mood) => {
    if (selectedMood) return;

    const newEntry = { date: today, value: mood.value };
    const filtered = moodHistory.filter((e) => e.date !== today);
    const updated = [...filtered, newEntry].sort((a, b) => a.date.localeCompare(b.date));

    localStorage.setItem('moodHistory', JSON.stringify(updated));
    setMoodHistory(updated);
    setSelectedMood(mood.value);
  };

  const chartData = moodHistory
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((entry) => ({
      date: new Date(entry.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      moodValue: entry.value,
    }));

  const neonPink = '#ff0080';
  const neonCyan = '#00ffff';
  const darkBg = '#070014';

  return (
    <>
      <NavBar />
      <div
        style={{
          paddingTop: '90px',
          minHeight: '100vh',
          background: `radial-gradient(circle at 10% 20%, rgba(255,0,128,0.06), transparent 12%), radial-gradient(circle at 90% 85%, rgba(0,255,255,0.04), transparent 14%), linear-gradient(180deg, ${darkBg} 0%, #02021a 100%)`,
          color: '#e6f7ff',
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          overflowX: 'hidden',
        }}
      >
        {/* soft neon glows */}
        <div
          style={{
            position: 'fixed',
            top: 90,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            zIndex: 0,
            background:
              'radial-gradient(circle at 10% 10%, rgba(255,0,128,0.06) 0%, transparent 20%), radial-gradient(circle at 85% 90%, rgba(0,255,255,0.05) 0%, transparent 20%)',
            mixBlendMode: 'screen',
          }}
        />

        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '40px 20px',
            display: 'flex',
            gap: '30px',
            alignItems: 'flex-start',
            zIndex: 2,
            position: 'relative',
          }}
        >
          {/* Mood Selector Panel */}
          <div
            style={{
              flex: '0 1 480px',
              padding: '30px',
              borderRadius: '14px',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
              border: `1px solid rgba(0,255,255,0.06)`,
              boxShadow:
                '0 10px 40px rgba(0,0,0,0.6), 0 0 30px rgba(255,0,128,0.02)',
              backdropFilter: 'blur(6px)',
              color: '#e6f7ff',
              minWidth: '300px',
            }}
          >
            <h2
              style={{
                textAlign: 'center',
                fontSize: '1.6rem',
                marginBottom: '18px',
                fontWeight: 900,
                letterSpacing: '0.5px',
                background: `linear-gradient(90deg, ${neonPink}, ${neonCyan})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 16px rgba(0,255,255,0.06), 0 0 24px rgba(255,0,128,0.06)',
                userSelect: 'none',
              }}
            >
              How are you feeling today?
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {moods.map((mood) => {
                const isSelected = selectedMood === mood.value;
                return (
                  <button
                    key={mood.value}
                    onClick={() => handleSelectMood(mood)}
                    disabled={!!selectedMood}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      justifyContent: 'space-between',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border: isSelected
                        ? `2px solid ${neonCyan}`
                        : `1px solid rgba(255,255,255,0.06)`,
                      background: isSelected
                        ? `linear-gradient(90deg, rgba(0,255,255,0.12), rgba(255,0,128,0.08))`
                        : `linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))`,
                      color: isSelected ? '#00121a' : '#e6f7ff',
                      cursor: selectedMood ? 'default' : 'pointer',
                      boxShadow: isSelected
                        ? `0 10px 40px rgba(0,255,255,0.08), 0 0 40px rgba(255,0,128,0.06)`
                        : '0 6px 20px rgba(0,0,0,0.4)',
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      transition: 'all 0.18s ease',
                      userSelect: 'none',
                      outline: 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 10,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.15rem',
                          background: `linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))`,
                          border: `1px solid rgba(255,255,255,0.04)`,
                          boxShadow: '0 6px 18px rgba(0,0,0,0.3)',
                        }}
                      >
                        <span
                          style={{
                            filter: isSelected
                              ? 'drop-shadow(0 0 6px rgba(0,255,255,0.6))'
                              : 'none',
                          }}
                        >
                          {mood.label.split(' ')[0]}
                        </span>
                      </div>
                      <div style={{ minWidth: 120, textAlign: 'left' }}>{mood.label}</div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: isSelected ? neonCyan : mood.color,
                          boxShadow: isSelected
                            ? `0 0 10px ${neonCyan}`
                            : `0 0 6px ${mood.color}`,
                        }}
                      />
                      <div
                        style={{
                          opacity: 0.9,
                          fontWeight: 800,
                          color: isSelected ? '#00121a' : '#cfefff',
                        }}
                      >
                        {isSelected ? 'Selected' : ''}
                      </div>
                    </div>
                  </button>
                );
              })}

              {selectedMood && (
                <p
                  style={{
                    marginTop: '10px',
                    textAlign: 'center',
                    color: '#aaddff',
                    fontWeight: 700,
                    userSelect: 'none',
                    textShadow: '0 0 8px rgba(0,255,255,0.04)',
                  }}
                >
                  You checked in for {new Date().toLocaleDateString()} — thank you ✨
                </p>
              )}
            </div>
          </div>

          {/* Mood Graph Panel */}
          <div
            style={{
              flex: '1 1 600px',
              minWidth: '320px',
              borderRadius: '14px',
              padding: '26px',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
              border: `1px solid rgba(0,255,255,0.06)`,
              boxShadow:
                '0 10px 40px rgba(0,0,0,0.6), 0 0 30px rgba(255,0,128,0.02)',
              color: '#e6f7ff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
            }}
          >
            <h2
              style={{
                textAlign: 'center',
                fontSize: '1.5rem',
                marginBottom: '14px',
                fontWeight: 900,
                background: `linear-gradient(90deg, ${neonCyan}, ${neonPink})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                userSelect: 'none',
              }}
            >
              Your Mood Progression
            </h2>

            <div
              style={{
                height: 320,
                borderRadius: 10,
                padding: 12,
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.12), rgba(255,255,255,0.01))',
                border: '1px solid rgba(103,120,154,0.08)',
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <defs>
                    <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor={neonCyan} stopOpacity={1} />
                      <stop offset="100%" stopColor={neonPink} stopOpacity={1} />
                    </linearGradient>
                    <filter id="glow" height="200%" width="200%" x="-50%" y="-50%">
                      <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" tick={{ fill: '#cfefff' }} />
                  <YAxis
                    domain={[1, 5]}
                    ticks={[1, 2, 3, 4, 5]}
                    stroke="rgba(255,255,255,0.3)"
                    tick={{ fill: '#cfefff' }}
                    tickFormatter={(value) =>
                      moods.find((m) => m.value === value)?.label.split(' ')[1]
                    }
                  />
                  <Tooltip
                    formatter={(value) => moods.find((m) => m.value === value)?.label}
                    contentStyle={{
                      color: '#00121a',
                      backgroundColor: '#e9ffff',
                      borderRadius: '8px',
                      border: '1px solid rgba(0,0,0,0.06)',
                    }}
                    labelStyle={{ fontWeight: '700' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="moodValue"
                    stroke="url(#lineGrad)"
                    strokeWidth={3.5}
                    dot={{ r: 6, stroke: '#070014', strokeWidth: 3 }}
                    activeDot={{ r: 8 }}
                    filter="url(#glow)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div
              style={{
                marginTop: '20px',
                padding: '16px',
                borderRadius: 10,
                background: `linear-gradient(90deg, rgba(0,255,255,0.03), rgba(255,0,128,0.02))`,
                border: '1px solid rgba(0,255,255,0.04)',
                textAlign: 'center',
                fontWeight: 700,
                color: '#cfefff',
                userSelect: 'none',
                boxShadow: '0 8px 30px rgba(0,255,255,0.03)',
              }}
            >
              Keep checking in daily — trends reveal what's really changing over time.
            </div>
          </div>
        </div>

        {/* subtle animated neon underline */}
        <style>{`
          @keyframes neonPulse {
            0% { filter: drop-shadow(0 0 6px rgba(0,255,255,0.06)); transform: translateY(0); }
            50% { filter: drop-shadow(0 0 14px rgba(255,0,128,0.09)); transform: translateY(-2px); }
            100% { filter: drop-shadow(0 0 6px rgba(0,255,255,0.06)); transform: translateY(0); }
          }

          button[disabled] {
            animation: neonPulse 3.2s ease-in-out infinite;
          }
        `}</style>
      </div>

      {/* Floating Chat Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen ? (
          <div className="relative w-80 h-[500px] bg-[#070014]/95 backdrop-blur-md shadow-xl rounded-2xl border border-cyan-400/20 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between bg-cyan-600/30 text-cyan-100 px-4 py-2 border-b border-cyan-400/20">
              <span className="font-medium">Chat Assistant</span>
              <button
                onClick={() => setChatOpen(false)}
                className="hover:text-pink-400 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Chatbot body */}
            <div className="flex-1 overflow-y-auto p-3 text-white text-sm">
              {/* Replace this with your actual chatbot component */}
              <p className="opacity-70">
                Hey there 👋 I'm your assistant. Ask me anything!
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setChatOpen(true)}
            className="rounded-full p-4 shadow-lg bg-cyan-500 hover:bg-cyan-400 text-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
              />
            </svg>
          </button>
        )}
      </div>
    </>
  );
}
