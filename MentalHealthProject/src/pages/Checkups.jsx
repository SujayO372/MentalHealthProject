import React, { useState } from 'react';

const PhysicalCheckupQuestions = [
  { id: 0, question: "How many hours of sleep did you get last night?" },
  { id: 1, question: "What time did you go to bed?" },
  { id: 2, question: "Did you wake up feeling rested?" },
  { id: 3, question: "Have you had any headaches, dizziness, or body aches recently?" },
  { id: 4, question: "How many glasses of water have you had so far today?" },
  { id: 5, question: "Did you engage in any physical activity or exercise today?" },
  { id: 6, question: "Have you noticed any unusual fatigue or drowsiness?" },
  { id: 7, question: "Have you experienced any pain or discomfort in your body?" },
  { id: 8, question: "Did you spend time outside today? If so, for how long?" },
  { id: 9, question: "Are you experiencing any signs of a cold or flu (sore throat, coughing, etc.)?" }
];

function PhysicalHealthCheckup() {
  const [answers, setAnswers] = useState({});

  const handleChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted answers:", answers);
    alert("Thank you for submitting your daily physical health check-up!");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Daily Physical Health Check-Up</h2>
      <p style={styles.description}>
        This check-up helps you track basic physical health factors like sleep, hydration, diet, and overall wellness. Please answer the following questions honestly to monitor your body's condition daily.
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        {PhysicalCheckupQuestions.map(({ id, question }) => (
          <div key={id} style={styles.questionBlock}>
            <label htmlFor={`q${id}`} style={styles.label}>{question}</label>
            <input
              id={`q${id}`}
              type="text"
              value={answers[id] || ''}
              onChange={(e) => handleChange(id, e.target.value)}
              style={styles.input}
              placeholder="Your answer"
              required
            />
          </div>
        ))}

        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#d0e7ff',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#1a2a4a',
    maxWidth: '700px',
    margin: '0 auto',
    borderRadius: '12px',
    boxShadow: '0 0 18px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '15px',
    fontWeight: '700',
  },
  description: {
    fontSize: '1.1rem',
    marginBottom: '30px',
    lineHeight: 1.5,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  questionBlock: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '8px',
    fontWeight: '600',
    fontSize: '1rem',
  },
  input: {
    padding: '10px 14px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1.5px solid #82aaff',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  submitButton: {
    marginTop: '30px',
    padding: '12px 20px',
    fontSize: '1.1rem',
    fontWeight: '700',
    color: 'white',
    backgroundColor: '#2c7be5',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    alignSelf: 'center',
    width: '150px',
    transition: 'background-color 0.3s',
  }
};

export default PhysicalHealthCheckup;
