import { useState } from "react";
import NavBar from "../components/NavBar";

const QuestionsToAsk = [
  { id: 0, question: "Over the past two weeks, how often have you felt down, depressed, or hopeless?" },
  { id: 1, question: "How often have you felt little interest or pleasure in doing things?" },
  { id: 2, question: "Over the past two weeks, how often have you felt nervous, anxious, or on edge?" },
  { id: 3, question: "How often have you had trouble relaxing or calming down?" },
  { id: 4, question: "How often have you felt tired or had little energy?" },
  { id: 5, question: "Over the past two weeks, how often have you had trouble sleeping or sleeping too much?" },
  { id: 6, question: "How often have you had trouble concentrating on things like reading or watching TV?" },
  { id: 7, question: "How often have you felt irritable or easily annoyed?" },
  { id: 8, question: "How often have you felt hopeless about the future?" },
  { id: 9, question: "How often have you experienced physical symptoms like headaches, stomachaches, or muscle tension due to stress?" },
];

const Choices = ["Never", "Rarely", "Occasionally", "Often", "Always"];

export default function HealthTest() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSelect = (id, choice) => {
    setAnswers((prev) => ({ ...prev, [id]: choice }));
  };

  const handleSubmit = async () => {
    if (QuestionsToAsk.some((q) => !answers[q.id])) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/health-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await response.json();
      setRecommendations(data.response.recommendations || []);
      setSubmitted(true);
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setAnswers({});
    setRecommendations([]);
    setSubmitted(false);
  };

  return (
    <>
      <NavBar />
      <main
        style={{
          paddingTop: 80,
          minHeight: "100vh",
          background: "linear-gradient(135deg, #e9f0ff 0%, #f7faff 50%, #ffffff 100%)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#212529",
          maxWidth: 1400,
          minWidth: 1200,
          margin: "0 auto 50px",
          paddingLeft: 16,
          paddingRight: 16,
          boxSizing: "border-box",
          userSelect: "none",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!submitted ? (
          <>
            <h1
              style={{
                textAlign: "center",
                marginBottom: 24,
                color: "#004085",
                fontWeight: "700",
                fontSize: 28,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                textShadow: "1px 1px 2px rgba(0,64,133,0.15)",
                userSelect: "none",
              }}
            >
              Mental Wellness Check-In
            </h1>
            <p
              style={{
                maxWidth: 720,
                margin: "0 auto 48px",
                fontSize: 16,
                color: "#3a4a69",
                lineHeight: 1.5,
                textAlign: "center",
                fontWeight: "500",
                userSelect: "text",
              }}
            >
              We appreciate you taking a moment to check in on your mental wellbeing.
              Your honest responses help us provide personalized insights and
              resources tailored to your needs.
            </p>
            <div style={{ width: "100%", maxWidth: 720 }}>
              {QuestionsToAsk.map(({ id, question }) => (
                <section
                  key={id}
                  style={{
                    marginBottom: 28,
                    padding: 20,
                    borderRadius: 12,
                    backgroundColor: "#f0f4ff",
                    boxShadow: "0 6px 16px rgba(0, 64, 133, 0.1)",
                    transition: "box-shadow 0.3s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 10px 26px rgba(0,64,133,0.15)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 6px 16px rgba(0,64,133,0.1)")
                  }
                >
                  <p
                    style={{
                      fontWeight: "700",
                      fontSize: 17,
                      marginBottom: 18,
                      color: "#003366",
                      lineHeight: 1.3,
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
                      justifyContent: "center",
                    }}
                  >
                    {Choices.map((choice) => {
                      const selected = answers[id] === choice;
                      return (
                        <button
                          key={choice}
                          onClick={() => handleSelect(id, choice)}
                          style={{
                            padding: "12px 26px",
                            borderRadius: 30,
                            border: selected ? "3px solid #004085" : "2px solid #a9c0ff",
                            backgroundColor: selected ? "#cfe2ff" : "#e6efff",
                            color: selected ? "#002752" : "#004085",
                            fontWeight: selected ? "700" : "600",
                            fontSize: 14,
                            cursor: "pointer",
                            minWidth: 100,
                            textAlign: "center",
                            transition: "all 0.3s ease",
                            boxShadow: selected
                              ? "0 0 12px rgba(0,64,133,0.5)"
                              : "0 2px 6px rgba(0, 64, 133, 0.1)",
                            userSelect: "none",
                          }}
                          onMouseEnter={(e) => {
                            if (!selected) e.currentTarget.style.backgroundColor = "#d3e0ff";
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
            </div>
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  backgroundColor: "#004085",
                  color: "white",
                  border: "none",
                  borderRadius: 28,
                  padding: "14px 44px",
                  fontSize: 20,
                  fontWeight: "700",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: loading ? "none" : "0 8px 24px rgba(0, 64, 133, 0.45)",
                  opacity: loading ? 0.6 : 1,
                  userSelect: "none",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = "#003366";
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = "#004085";
                }}
              >
                {loading ? "Processing..." : "Submit"}
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
                letterSpacing: "0.03em",
                textShadow: "1px 1px 2px rgba(0,64,133,0.2)",
                userSelect: "none",
              }}
            >
              Thank You for Completing the Check-In
            </h2>
            <p
              style={{
                maxWidth: 720,
                margin: "16px auto 40px",
                color: "#495057",
                fontSize: 16,
                textAlign: "center",
                lineHeight: 1.6,
                fontWeight: "500",
                userSelect: "text",
              }}
            >
              Your responses have been reviewed. Here are some resources that may help.
            </p>

            {recommendations.length > 0 && (
              <div style={{ width: "100%", maxWidth: 720 }}>
                <h3
                  style={{
                    marginTop: 40,
                    marginBottom: 24,
                    textAlign: "center",
                    color: "#28a745",
                    fontSize: 22,
                    fontWeight: "700",
                    letterSpacing: "0.02em",
                    userSelect: "none",
                  }}
                >
                  🌟 Recommended Articles for You
                </h3>
                {recommendations.map((rec, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#fff",
                      padding: 20,
                      borderRadius: 14,
                      marginBottom: 18,
                      boxShadow: "0 6px 18px rgba(0,0,0,0.07)",
                      transition: "transform 0.3s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                  >
                    <strong
                      style={{
                        fontSize: 18,
                        color: "#212529",
                        display: "block",
                        marginBottom: 6,
                        userSelect: "text",
                      }}
                    >
                      {rec.title}
                    </strong>
                    <p
                      style={{
                        margin: 0,
                        color: "#495057",
                        fontSize: 14,
                        lineHeight: 1.5,
                        userSelect: "text",
                      }}
                    >
                      {rec.summary}
                    </p>
                    {rec.link && (
                      <a
                        href={rec.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          marginTop: 12,
                          color: "#004085",
                          textDecoration: "underline",
                          fontWeight: "600",
                          userSelect: "none",
                        }}
                      >
                        Read More
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div style={{ textAlign: "center", marginTop: 48 }}>
              <button
                onClick={reset}
                style={{
                  backgroundColor: "#004085",
                  color: "white",
                  border: "none",
                  borderRadius: 28,
                  padding: "14px 44px",
                  fontSize: 20,
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(0, 64, 133, 0.45)",
                  userSelect: "none",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#003366")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#004085")}
              >
                Take Again
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
