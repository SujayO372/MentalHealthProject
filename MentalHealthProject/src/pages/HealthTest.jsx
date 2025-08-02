import { useState } from "react";

// NavBar component - old style with subtle gray hover, no blue
function NavBar() {
  return (
    <nav
      style={{
        padding: "1rem 2rem",
        backgroundColor: "#2c3e50",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {[
        { name: "Home", href: "/" },
        { name: "Speak with an AI", href: "/chatbot" },
        { name: "Check In", href: "/checkin" },
        { name: "Take a Health Test", href: "/healthtest" },
        { name: "Hotlines", href: "/hotlines" },
        { name: "Sign In/Up", href: "/signup" },
      ].map(({ name, href }) => (
        <a
          key={name}
          href={href}
          style={{
            color: "#ecf0f1",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "1.1rem",
            padding: "0.3rem 0.6rem",
            borderRadius: "5px",
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#444"; // subtle gray hover
            e.target.style.color = "#ecf0f1";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#ecf0f1";
          }}
        >
          {name}
        </a>
      ))}
    </nav>
  );
}

// 10 questions
const QuestionsToAsk = [
  {
    id: 0,
    question:
      "Over the past two weeks, how often have you felt down, depressed, or hopeless?",
  },
  {
    id: 1,
    question:
      "How often have you had trouble falling asleep, staying asleep, or sleeping too much?",
  },
  {
    id: 2,
    question:
      "How often have you felt little interest or pleasure in doing things?",
  },
  {
    id: 3,
    question: "How often have you felt anxious or on edge?",
  },
  {
    id: 4,
    question:
      "How often have you had trouble concentrating on things, such as reading or watching TV?",
  },
  {
    id: 5,
    question: "How often have you felt tired or had little energy?",
  },
  {
    id: 6,
    question:
      "How often have you felt nervous or worried about different things?",
  },
  {
    id: 7,
    question: "How often have you had thoughts of harming yourself?",
  },
  {
    id: 8,
    question:
      "How often have you experienced mood swings or sudden feelings of anger?",
  },
  {
    id: 9,
    question: "How often have you felt isolated or lonely?",
  },
];

const Choices = ["Never", "Rarely", "Occasionally", "Often", "Always"];

// Article Card Component
function ArticleCard({ icon, sourceName, title, description, url }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        alignItems: "center",
        maxWidth: "700px",
        margin: "20px auto",
      }}
    >
      <div
        style={{
          fontSize: "48px",
          minWidth: "80px",
          textAlign: "center",
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
            color: "#555",
          }}
        >
          <small>{sourceName}</small>
        </div>
        <h3
          style={{
            margin: "4px 0",
            fontSize: "18px",
            color: "#007bff",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "#444",
            marginBottom: "10px",
          }}
        >
          {description}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#28a745",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Read more →
        </a>
      </div>
    </div>
  );
}

// Main Health Test Component
function HealthTest() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // console.log("questionId, choice ---- >", questionId, choice )
  const handleSelect = (questionId, choice) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: choice,
    }));
  };

  // call python backend service


  const handleSubmit = async () => {
  const formattedAnswers = QuestionsToAsk.map((q) => ({
  question: q.question,
  answer: answers[q.id] || "No answer"
}));

console.log("Submitted Answers:");
formattedAnswers.forEach(({ question, answer }) => {
  console.log(`Q: ${question}`);
  console.log(`A: ${answer}`);
});

  console.log("answers ---------> ", answers)

  try {
    const response = await fetch('http://127.0.0.1:5000/health-test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ answers })  // Send actual answers here
    });

    const data = await response.json();
    console.log('Health Test Result:', data.response);

    setSubmitted(true);  // move this here after successful fetch

  } catch (error) {
    console.error('Request failed:', error);
  }

  if (!allAnswered) {
    alert("Please answer all questions before submitting.");
    return;
  }
};


  const resetAssessment = () => {
    setSubmitted(false);
    setAnswers({});
  };

  const articles = [
    {
      icon: "🧘‍♂️",
      sourceName: "Mindful Daily",
      title: "5 Simple Ways to Practice Mindfulness Every Day",
      description:
        "Incorporate mindfulness into your routine with easy habits you can start right now.",
      url: "https://www.mindful.org/meditation/mindfulness-getting-started/",
    },
    {
      icon: "🌙",
      sourceName: "Sleep Health Journal",
      title: "Improving Your Sleep Hygiene for Better Mental Health",
      description:
        "Learn how small bedtime habits can greatly improve your mental clarity and mood.",
      url: "https://www.sleepfoundation.org/sleep-hygiene",
    },
    {
      icon: "💬",
      sourceName: "Psychology Today",
      title: "When to Consider Talking to a Therapist",
      description:
        "Here are signs that you may benefit from seeking professional mental health support.",
      url: "https://www.psychologytoday.com/us/therapists",
    },
    {
      icon: "🏃‍♀️",
      sourceName: "Wellness Guide",
      title: "The Mental Health Benefits of Regular Exercise",
      description:
        "Discover how physical activity can boost your mood and reduce stress.",
      url: "https://www.mayoclinic.org/diseases-conditions/depression/in-depth/depression-and-exercise/art-20046495",
    },
  ];

  if (submitted) {
    return (
      <div style={{ backgroundColor: "#f0f8ff", minHeight: "100vh" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
          <h2
            style={{
              textAlign: "center",
              color: "#333",
              marginBottom: "20px",
            }}
          >
            Thank You for Completing the Check-In
          </h2>
          <p
            style={{
              maxWidth: "600px",
              margin: "0 auto 30px",
              color: "#444",
              textAlign: "center",
              fontSize: "16px",
              lineHeight: "1.6",
            }}
          >
            Your responses have been recorded. Please review the helpful resources
            below and consider reaching out to a mental health professional if you
            need additional support.
          </p>

          <div
            style={{
              maxWidth: "700px",
              margin: "40px auto",
              padding: "20px",
              backgroundColor: "#fff3cd",
              borderRadius: "8px",
              border: "1px solid #ffeaa7",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#856404",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              <strong>Important:</strong> This assessment is for educational purposes
              only and is not a substitute for professional mental health advice. If
              you're experiencing severe symptoms or having thoughts of self-harm,
              please contact a mental health professional or crisis helpline
              immediately.
            </p>
          </div>

          <h3
            style={{
              marginTop: "50px",
              textAlign: "center",
              color: "#007bff",
              fontSize: "24px",
            }}
          >
            📚 Helpful Resources
          </h3>

          {articles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button
              onClick={resetAssessment}
              style={{
                padding: "12px 24px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                transition: "background-color 0.2s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#5a6268")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#6c757d")}
            >
              Take Assessment Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
            fontSize: "28px",
          }}
        >
          Mental Health Check-In
        </h1>
        <p
          style={{
            textAlign: "center",
            maxWidth: "700px",
            margin: "0 auto 40px",
            color: "#555",
            fontSize: "16px",
            lineHeight: "1.6",
          }}
        >
          This brief check-in is designed to help you reflect on your emotional and
          mental well-being. Please answer honestly to help us better understand your
          current state.
        </p>

        {QuestionsToAsk.map((q, index) => (
          <div
            key={q.id}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              marginBottom: "25px",
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
                color: "#333",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              {index + 1}. {q.question}
            </h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "flex-start",
              }}
            >
              {Choices.map((choice) => (
                <button
                  key={choice}
                  onClick={() => handleSelect(q.id, choice)}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "6px",
                    border:
                      answers[q.id] === choice
                        ? "2px solid #007bff"
                        : "1px solid #ccc",
                    backgroundColor:
                      answers[q.id] === choice ? "#007bff" : "#f8f9fa",
                    color: answers[q.id] === choice ? "#fff" : "#333",
                    fontWeight: answers[q.id] === choice ? "bold" : "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontSize: "14px",
                    minWidth: "80px",
                  }}
                  onMouseOver={(e) => {
                    if (answers[q.id] !== choice) {
                      e.target.style.backgroundColor = "#e9ecef";
                      e.target.style.borderColor = "#007bff";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (answers[q.id] !== choice) {
                      e.target.style.backgroundColor = "#f8f9fa";
                      e.target.style.borderColor = "#ccc";
                    }
                  }}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            onClick={handleSubmit}
            style={{
              padding: "16px 32px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              minWidth: "200px",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
          >
            Complete Check-In
          </button>
        </div>
      </div>
    </div>
  );
}

// Main App Component with NavBar
function App() {
  return (
    <>
      <NavBar />
      <HealthTest />
    </>
  );
}

export default App;
