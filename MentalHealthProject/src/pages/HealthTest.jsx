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
export default function HealthTest() {
  return (
    <div>
      <NavBar />
      <div >
        <h1> Take a Health Test </h1>
        
      </div>
    </div>
  );
}

