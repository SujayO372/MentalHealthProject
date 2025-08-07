import { useState } from "react";
import NavBar from "../components/NavBar";

const QuestionsToAsk = [
  { id: 0, question: "Over the past two weeks, how often have you felt down, depressed, or hopeless?" },
  { id: 1, question: "How often have you had trouble falling asleep, staying asleep, or sleeping too much?" },
  { id: 2, question: "How often have you felt little interest or pleasure in doing things?" },
  { id: 3, question: "How often have you felt anxious or on edge?" },
  { id: 4, question: "How often have you had trouble concentrating on things, such as reading or watching TV?" },
  { id: 5, question: "How often have you felt tired or had little energy?" },
  { id: 6, question: "How often have you felt nervous or worried about different things?" },
  { id: 7, question: "How often have you had thoughts of harming yourself?" },
  { id: 8, question: "How often have you experienced mood swings or sudden feelings of anger?" },
  { id: 9, question: "How often have you felt isolated or lonely?" },
];

const Choices = ["Never", "Rarely", "Occasionally", "Often", "Always"];

function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#004085",
        color: "white",
        padding: "16px 24px",
        fontWeight: "700",
        fontSize: 22,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        zIndex: 1000,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      Mental Wellness Check-In
    </nav>
  );
}

function ArticleCard({ icon, sourceName, title, description, url }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 24,
        boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
        alignItems: "center",
        maxWidth: 720,
        margin: "20px auto",
        transition: "transform 0.15s ease-in-out",
        cursor: "pointer",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
      onClick={() => window.open(url, "_blank")}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") window.open(url, "_blank");
      }}
    >
      <div
        style={{
          fontSize: 52,
          minWidth: 90,
          textAlign: "center",
          userSelect: "none",
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <small style={{ color: "#6c757d", fontWeight: "600" }}>{sourceName}</small>
        <h3 style={{ margin: "8px 0", fontSize: 20, color: "#004085" }}>{title}</h3>
        <p style={{ fontSize: 15, color: "#495057", marginBottom: 10 }}>{description}</p>
        <span
          style={{
            color: "#007bff",
            fontWeight: "600",
            textDecoration: "underline",
            userSelect: "none",
          }}
        >
          Read more →
        </span>
      </div>
    </div>
  );
}

export default function HealthTest() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const articles = [
    {
      icon: "🌧️",
      sourceName: "MoodCare Insights",
      title: "Understanding Persistent Sadness and Hopelessness",
      description:
        "Explore why you might feel low and how to develop emotional resilience over time.",
      url: "https://www.moodcare.com/articles/depression-awareness",
    },
    {
      icon: "🛌",
      sourceName: "Restful Mind",
      title: "Breaking the Cycle of Poor Sleep and Mental Stress",
      description: "Learn strategies for falling asleep faster and maintaining healthier sleep patterns.",
      url: "https://www.restfulmind.org/sleep-habits-for-mental-health",
    },
    {
      icon: "🎨",
      sourceName: "Joy Journal",
      title: "Reigniting Interest in Hobbies and Passions",
      description:
        "Feeling joyless? Here's how to rediscover your spark through micro-joys and hobbies.",
      url: "https://www.joyjournal.com/bring-back-happiness",
    },
    {
      icon: "😬",
      sourceName: "Anxiety Help Hub",
      title: "Managing Restlessness and Irritability",
      description: "Discover calming techniques for when you’re feeling anxious, restless, or edgy.",
      url: "https://www.anxietyhub.org/articles/calming-your-nerves",
    },
    {
      icon: "📚",
      sourceName: "Focus Better Daily",
      title: "How to Rebuild Your Focus One Step at a Time",
      description: "Trouble concentrating? These cognitive strategies can help you regain clarity.",
      url: "https://www.focusbetterdaily.com/improve-concentration",
    },
    {
      icon: "⚡",
      sourceName: "Energy Reset",
      title: "Beat Burnout: How to Restore Your Energy Levels Naturally",
      description: "Understand fatigue from a mental wellness perspective and learn what helps.",
      url: "https://www.energyreset.net/fight-fatigue",
    },
    {
      icon: "🌪️",
      sourceName: "MindStorm",
      title: "When Worry Doesn’t Stop: Tools to Quiet the Mind",
      description: "Anxiety can feel like a whirlwind—this guide offers real tools to help.",
      url: "#",
    },
  ];

  const questionToArticleMap = {
    0: [0],
    1: [1],
    2: [2],
    3: [3],
    4: [4],
    5: [5],
    6: [6],
  };

  const handleSelect = (id, choice) => {
    setAnswers((prev) => ({ ...prev, [id]: choice }));
  };

  const handleSubmit = async () => {
    if (QuestionsToAsk.some((q) => !answers[q.id])) {
      alert("Please answer all questions before submitting.");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:5000/health-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await response.json();
      console.log("Health Test Result:", data.response);
      setSubmitted(true);
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  // Collect recommended articles if user answered Never or Rarely
  const recommendedArticles = [];
  if (submitted) {
    for (const [qid, ans] of Object.entries(answers)) {
      if (ans === "Never" || ans === "Rarely") {
        const ids = questionToArticleMap[qid];
        if (ids) {
          ids.forEach((articleIdx) => {
            const article = articles[articleIdx];
            if (!recommendedArticles.includes(article)) {
              recommendedArticles.push(article);
            }
          });
        }
      }
    }
  }

  return (
    <>
    <NavBar> </NavBar>
      <main
        style={{
          paddingTop: 80,
          minHeight: "100vh",
          background: "linear-gradient(135deg, #e9f0ff 0%, #f7faff 50%, #ffffff 100%)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#212529",
          maxWidth: 900,
          margin: "0 auto 50px",
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        {!submitted ? (
          <>
            <h1
              style={{
                textAlign: "center",
                marginBottom: 40,
                color: "#004085",
                fontWeight: "700",
                fontSize: 32,
              }}
            >
              Mental Wellness Check-In
            </h1>
            {QuestionsToAsk.map(({ id, question }) => (
              <section
                key={id}
                style={{
                  marginBottom: 32,
                  padding: 20,
                  borderRadius: 12,
                  backgroundColor: "#f0f4ff",
                  boxShadow: "0 3px 6px rgba(0, 64, 133, 0.15)",
                }}
              >
                <p
                  style={{
                    fontWeight: "700",
                    fontSize: 18,
                    marginBottom: 16,
                    color: "#003366",
                    userSelect: "none",
                  }}
                >
                  {question}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    flexWrap: "wrap",
                    userSelect: "none",
                  }}
                >
                  {Choices.map((choice) => {
                    const selected = answers[id] === choice;
                    return (
                      <button
                        key={choice}
                        onClick={() => handleSelect(id, choice)}
                        style={{
                          padding: "10px 20px",
                          borderRadius: 30,
                          border: selected ? "3px solid #004085" : "2px solid #a9c0ff",
                          backgroundColor: selected ? "#cfe2ff" : "#e6efff",
                          color: selected ? "#002752" : "#004085",
                          fontWeight: selected ? "700" : "600",
                          fontSize: 14,
                          cursor: "pointer",
                          minWidth: 100,
                          textAlign: "center",
                          transition: "all 0.25s ease",
                          boxShadow: selected
                            ? "0 0 8px rgba(0,64,133,0.4)"
                            : "none",
                        }}
                        onMouseEnter={(e) => {
                          if (!selected) e.currentTarget.style.backgroundColor = "#d7e4ff";
                        }}
                        onMouseLeave={(e) => {
                          if (!selected) e.currentTarget.style.backgroundColor = "#e6efff";
                        }}
                      >
                        {choice}
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#004085",
                  color: "white",
                  border: "none",
                  borderRadius: 28,
                  padding: "14px 40px",
                  fontSize: 20,
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: "0 6px 16px rgb(0 64 133 / 0.35)",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#002752")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#004085")}
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <>
            <h2
              style={{
                textAlign: "center",
                color: "#004085",
                fontWeight: "700",
                fontSize: 28,
              }}
            >
              Thank You for Completing the Check-In
            </h2>
            <p
              style={{
                maxWidth: 700,
                margin: "12px auto 36px",
                color: "#495057",
                fontSize: 16,
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              Your responses have been recorded. Please review the helpful resources below and
              consider reaching out to a mental health professional if you need additional
              support.
            </p>
            <div
              style={{
                maxWidth: 720,
                margin: "20px auto 50px",
                padding: 20,
                backgroundColor: "#fff3cd",
                borderRadius: 10,
                border: "1.5px solid #ffeeba",
                boxShadow: "0 4px 8px rgba(255 238 168 / 0.5)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#856404",
                  fontSize: 14,
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                <strong>Important:</strong> This assessment is for educational purposes only and is
                not a substitute for professional mental health advice. If you're experiencing
                severe symptoms or having thoughts of self-harm, please contact a mental health
                professional or crisis helpline immediately.
              </p>
            </div>

            <h3
              style={{
                marginTop: 10,
                marginBottom: 20,
                textAlign: "center",
                color: "#004085",
                fontSize: 24,
                fontWeight: "700",
              }}
            >
              📚 Helpful Resources
            </h3>

            {articles.map((article, i) => (
              <ArticleCard key={i} {...article} />
            ))}

            {recommendedArticles.length > 0 && (
              <>
                <h3
                  style={{
                    marginTop: 40,
                    marginBottom: 20,
                    textAlign: "center",
                    color: "#dc3545",
                    fontSize: 22,
                    fontWeight: "700",
                  }}
                >
                  🛎️ Recommended Resources for You
                </h3>
                {recommendedArticles.map((article, i) => (
                  <ArticleCard key={`rec-${i}`} {...article} />
                ))}
              </>
            )}

            <div style={{ textAlign: "center", marginTop: 50 }}>
              <button
                onClick={reset}
                style={{
                  padding: "14px 40px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: 28,
                  cursor: "pointer",
                  fontSize: 18,
                  fontWeight: "700",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#565e64")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#6c757d")}
              >
                Retake Assessment
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
