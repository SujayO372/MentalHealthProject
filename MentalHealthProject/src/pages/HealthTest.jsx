import { useState } from 'react';
import NavBar from '../components/NavBar'
const QuestionsToAsk = [
  {
    id: 0,
    question: 'How have you been feeling emotionally over the past two weeks?'
  },
  {
    id: 1,
    question: 'Have you experienced any recent changes in sleep patterns?'
  },
  {
    id: 2,
    question: 'Do you often feel overwhelmed or unable to cope with daily tasks?'
  },
  {
    id: 3,
    question: 'Have you noticed any changes in your appetite or eating habits?'
  },
  {
    id: 4,
    question: 'Do you find it difficult to concentrate or stay focused?'
  },
  {
    id: 5,
    question: 'Have you had any thoughts of self-harm or harming others?'
  }
];
const Choices = ['Never', 'Rarely', 'Ocassionaly', 'Often', 'Always']
export default function HealthTest() {
  const[answers, setAnswers] = useState({});

   const handleSelect = (questionId, choice) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: choice
    }));
  };

   return (
    <div style={{ padding: '20px' }}>
      <NavBar />
      <h1> Mental Health Test </h1>
<p style={{ maxWidth: '700px', margin: '20px auto', textAlign: 'center', fontSize: '1.1rem', color: '#333' }}>
  This short mental health check-in is designed to help you reflect on your emotional and psychological well-being.
  Your responses are not recorded and are meant to encourage self-awareness and support. Take your time and answer
  honestly based on your feelings.
</p>
        {QuestionsToAsk.map((q) => (
        <div key={q.id} style={{ marginBottom: '25px' }}>
          <h3>{q.question}</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {Choices.map((choice) => (
              <button
                key={choice}
                onClick={() => handleSelect(q.id, choice)}
                style={{
                  padding: '10px 15px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  backgroundColor: answers[q.id] === choice ? '#007bff' : '#f0f0f0',
                  color: answers[q.id] === choice ? 'white' : 'black',
                  cursor: 'pointer'
                }}
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
  onClick={() => console.log("Submitted answers:", answers)}
  style={{
    marginTop: '30px',
    padding: '12px 24px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer'
  }}
>
  Submit
</button>

    </div>
  );
}

