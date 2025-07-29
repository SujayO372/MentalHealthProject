import { useState } from 'react';
import NavBar from '../components/NavBar';

const QuestionsToAsk = [
  {
    id: 0,
    question: "Over the past two weeks, how would you describe your overall emotional well-being?"
  },
  {
    id: 1,
    question: "Have you experienced any notable changes in your sleep patterns or quality of rest recently?"
  },
  {
    id: 2,
    question: "How often do you feel overwhelmed or find it difficult to manage daily responsibilities?"
  },
  {
    id: 3,
    question: "Have you noticed any recent changes in your appetite or eating habits?"
  },
  {
    id: 4,
    question: "Do you find it challenging to concentrate or maintain focus throughout the day?"
  },
  {
    id: 5,
    question: "Have you had any thoughts related to self-harm or harming others?"
  },
  {
    id: 6,
    question: "Have you been avoiding social situations or withdrawing from friends and family?"
  },
  {
    id: 7,
    question: "Do you often feel a sense of hopelessness or that things won't improve?"
  },
  {
    id: 8,
    question: "Have you lost interest in activities or hobbies that you usually enjoy?"
  },
  {
    id: 9,
    question: "How often do you experience feelings of anxiety, panic, or excessive worry?"
  },
  {
    id: 10,
    question: "Do you find yourself feeling unusually irritable or short-tempered?"
  },
  {
    id: 11,
    question: "Have you noticed physical symptoms like fatigue, headaches, or stomach issues without a clear cause?"
  },
  {
    id: 12,
    question: "Do you feel emotionally numb or disconnected from your surroundings?"
  },
  {
    id: 13,
    question: "How frequently do you experience mood swings or emotional highs and lows?"
  },
  {
    id: 14,
    question: "Are you currently experiencing any major life changes or stressors?"
  },
  {
    id: 15,
    question: "Do you feel supported by the people around you when you're struggling emotionally?"
  },
  {
    id: 16,
    question: "Have you been relying on substances like alcohol, nicotine, or drugs to cope with your emotions?"
  },
  {
    id: 17,
    question: "Do you feel like you’re able to express your feelings openly and honestly?"
  },
  {
    id: 18,
    question: "Have you found it hard to get out of bed or start your day on most mornings?"
  },
  {
    id: 19,
    question: "Are there specific thoughts or concerns that keep repeating in your mind and are hard to ignore?"
  }
];


const Choices = ['Never', 'Rarely', 'Occasionally', 'Often', 'Always'];

function ArticleCard({ icon, sourceName, title, description, image, url }) {
  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      alignItems: 'center',
      maxWidth: '700px',
      margin: '20px auto'
    }}>
      <img
        src={image}
        alt={title}
        style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover' }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', color: '#555' }}>
          <span style={{ marginRight: '8px' }}>{icon}</span>
          <small>{sourceName}</small>
        </div>
        <h3 style={{ margin: '4px 0', fontSize: '18px', color: '#007bff' }}>{title}</h3>
        <p style={{ fontSize: '14px', color: '#444' }}>{description}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#28a745', fontWeight: 'bold' }}>
          Read more →
        </a>
      </div>
    </div>
  );
}

export default function HealthTest() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId, choice) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: choice
    }));
  };

  const handleSubmit = () => {
    const allAnswered = QuestionsToAsk.every(q => answers[q.id]);
    if (allAnswered) {
      setSubmitted(true);
    } else {
      alert('Please answer all questions before submitting.');
    }
  };

  const articles = [
    {
      icon: '🧘‍♂️',
      sourceName: 'Mindful Daily',
      title: '5 Simple Ways to Practice Mindfulness Every Day',
      description: 'Incorporate mindfulness into your routine with easy habits you can start right now.',
      image: 'data:image/jpeg;base64,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',
      url: 'https://example.com/mindfulness-tips'
    },
    {
      icon: '🌙',
      sourceName: 'Sleep Health Journal',
      title: 'Improving Your Sleep Hygiene for Better Mental Health',
      description: 'Learn how small bedtime habits can greatly improve your mental clarity and mood.',
      image: 'data:image/jpeg;base64,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',
      url: 'https://example.com/sleep-hygiene'
    },
    {
      icon: '💬',
      sourceName: 'Therapy Today',
      title: 'When to Consider Talking to a Therapist',
      description: 'Here are signs that you may benefit from seeking professional mental health support.',
      image: 'data:image/jpeg;base64,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',
      url: 'https://example.com/therapy-guide'
    }
  ];

  return submitted ? (
    <div style={{ padding: '40px', backgroundColor: '#f0f8ff', minHeight: '100vh' }}>
      <NavBar />
      <h2 style={{ textAlign: 'center', color: '#333' }}>Personalized Recommendations</h2>
      <p style={{ maxWidth: '600px', margin: '0 auto', color: '#444', textAlign: 'center' }}>
        Thank you for completing the check-in. Based on your responses, here are some suggestions for articles:
      </p>
      <ul style={{
        marginTop: '20px',
        textAlign: 'left',
        maxWidth: '600px',
        marginInline: 'auto',
        color: '#333',
        lineHeight: 1.6
      }}>
        <li>Practice daily mindfulness or meditation exercises.</li>
        <li>Maintain a consistent sleep schedule.</li>
        <li>Consider talking to a licensed therapist for additional support.</li>
        <li>Stay connected with supportive friends or family.</li>
        <li>Get regular physical activity, even light walks.</li>
      </ul>

      <h3 style={{ marginTop: '50px', textAlign: 'center', color: '#007bff' }}>Recommended Reads</h3>
      {articles.map((article, index) => (
        <ArticleCard key={index} {...article} />
      ))}
    </div>
  ) : (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <NavBar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Mental Health Check-In</h1>
        <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px', color: '#555' }}>
          This brief check-in is designed to help you reflect on your emotional and mental well-being.
          Your answers are private and intended to promote self-awareness and support. Please answer honestly.
        </p>

        {QuestionsToAsk.map(q => (
          <div
            key={q.id}
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              marginBottom: '25px'
            }}
          >
            <h3 style={{ marginBottom: '15px', color: '#333' }}>{q.question}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {Choices.map(choice => (
                <button
                  key={choice}
                  onClick={() => handleSelect(q.id, choice)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '6px',
                    border: answers[q.id] === choice ? '2px solid #007bff' : '1px solid #ccc',
                    backgroundColor: answers[q.id] === choice ? '#007bff' : '#f0f0f0',
                    color: answers[q.id] === choice ? '#fff' : '#333',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            onClick={handleSubmit}
            style={{
              padding: '14px 28px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
