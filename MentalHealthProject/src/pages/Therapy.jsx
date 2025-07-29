import React, { useState } from 'react';

// Questions array with appropriate input types
const PhysicalCheckupQuestions = [
  { id: 0, question: "How many hours of sleep did you get last night?", type: "number" },
  { id: 1, question: "What time did you go to bed?", type: "time" },
  { id: 2, question: "Did you wake up feeling rested?", type: "text" },
  { id: 3, question: "Have you had any headaches, dizziness, or body aches recently?", type: "text" },
  { id: 4, question: "How many glasses of water have you had so far today?", type: "number" },
  { id: 5, question: "Did you engage in any physical activity or exercise today?", type: "text" },
  { id: 6, question: "Have you noticed any unusual fatigue or drowsiness?", type: "text" },
  { id: 7, question: "Have you experienced any pain or discomfort in your body?", type: "text" },
  { id: 8, question: "Did you spend time outside today? If so, for how long?", type: "text" },
  { id: 9, question: "Are you experiencing any signs of a cold or flu (sore throat, coughing, etc.)?", type: "text" }
];

export default function PhysicalHealthCheckup() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted answers:", answers);
    setSubmitted(true);
    alert("Thank you for submitting your daily physical health check-up!");
    setAnswers({});
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Daily Physical Health Check-Up</h2>
      <p style={styles.description}>
        Answer the following questions to monitor your physical well-being each day.
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        {PhysicalCheckupQuestions.map(({ id, question, type }) => (
          <div key={id} style={styles.questionBlock}>
            <label htmlFor={`q${id}`} style={styles.label}>{question}</label>
            <input
              id={`q${id}`}
              type={type}
              value={answers[id] || ''}
              onChange={(e) => handleChange(id, e.target.value)}
              style={styles.input}
              placeholder="Your answer"
              required
            />
          </div>
        ))}

        <button type="submit" style={styles.submitButton}>Submit</button>
        {submitted && <p style={styles.success}>✅ Form submitted successfully.</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f0f8ff',
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
    marginBottom: '20px',
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    fontSize: '1.1rem',
    marginBottom: '30px',
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
    fontSize: '1rem',
    fontWeight: '600',
  },
  input: {
    padding: '10px 14px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1.5px solid #82aaff',
    outline: 'none',
  },
  submitButton: {
    marginTop: '30px',
    padding: '12px 20px',
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#2c7be5',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    alignSelf: 'center',
    width: '180px',
  },
  success: {
    textAlign: 'center',
    color: '#2e7d32',
    marginTop: '20px',
    fontWeight: '600',
  }
};
