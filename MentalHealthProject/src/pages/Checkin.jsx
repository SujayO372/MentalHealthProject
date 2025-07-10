import NavBar from '../components/NavBar';

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

export default function HealthTest() {
  return (
    <div>
      <NavBar />
      <div style={{ padding: '20px' }}>
        <h1>Take a Health Test</h1>

        {/* New Section: Mental Health Test */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f0f4f8',
          borderRadius: '10px'
        }}>
          <h2 style={{ marginBottom: '15px' }}>Take a Mental Health Test</h2>
          <p>This short test will ask you a few questions to help you reflect on your mental well-being. Please answer honestly.</p>
        </div>
      </div>
    </div>
  );
}
