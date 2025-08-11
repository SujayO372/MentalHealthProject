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
      <div
        style={{
          overflowX: "hidden",
          paddingTop: 60,
          background:
            "linear-gradient(135deg, #e9f0ff 0%, #f7faff 50%, #ffffff 100%)",
          minHeight: "100vh",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#212529",
        }}
      >
        <div
          style={{
            display: "flex",
            minWidth: 1200,  // Reduced from 1600+
            maxWidth: 1400,
            margin: "0 auto 40px",
            gap: 24,
            padding: "0 16px",
            boxSizing: "border-box",
          }}
        >
          {/* Left Panel: Questions + Submit */}
          <div
            style={{
              flex: 2,
              backgroundColor: "#f0f4ff",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 6px 16px rgba(0, 64, 133, 0.1)",
            }}
          >
            {!submitted ? (
              <>
                <h1
                  style={{
                    textAlign: "center",
                    marginBottom: 16,
                    color: "#004085",
                    fontWeight: "700",
                    fontSize: 26, // smaller
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    textShadow: "1px 1px 2px rgba(0,64,133,0.15)",
                  }}
                >
                  Mental Wellness Check-In
                </h1>
                <p
                  style={{
                    maxWidth: 600,
                    margin: "0 auto 32px",
                    fontSize: 16, // smaller
                    color: "#3a4a69",
                    lineHeight: 1.4,
                    textAlign: "center",
                    fontWeight: "500",
                    userSelect: "text",
                  }}
                >
                  We appreciate you taking a moment to check in on your mental
                  wellbeing. Your honest responses help us provide personalized
                  insights and resources tailored to your needs.
                </p>
                {QuestionsToAsk.map(({ id, question }) => (
                  <section
                    key={id}
                    style={{
                      marginBottom: 24, // less spacing
                      padding: 20,
                      borderRadius: 12,
                      backgroundColor: "#e6efff",
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
                        fontSize: 16, // smaller
                        marginBottom: 16,
                        color: "#003366",
                        lineHeight: 1.25,
                        userSelect: "none",
                      }}
                    >
                      {question}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
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
                              padding: "12px 24px",
                              borderRadius: 28,
                              border: selected
                                ? "3px solid #004085"
                                : "2px solid #a9c0ff",
                              backgroundColor: selected ? "#cfe2ff" : "#e6efff",
                              color: selected ? "#002752" : "#004085",
                              fontWeight: selected ? "700" : "600",
                              fontSize: 14,
                              cursor: "pointer",
                              minWidth: 90,
                              textAlign: "center",
                              transition: "all 0.3s ease",
                              boxShadow: selected
                                ? "0 0 12px rgba(0,64,133,0.5)"
                                : "0 2px 6px rgba(0, 64, 133, 0.1)",
                              userSelect: "none",
                            }}
                            onMouseEnter={(e) => {
                              if (!selected)
                                e.currentTarget.style.backgroundColor = "#d3e0ff";
                            }}
                            onMouseLeave={(e) => {
                              if (!selected)
                                e.currentTarget.style.backgroundColor = "#e6efff";
                            }}
                          >
                            {choice}
                          </button>
                        );
                      })}
                    </div>
                  </section>
                ))}
                <div style={{ textAlign: "center", marginTop: 16 }}>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                      backgroundColor: "#004085",
                      color: "white",
                      border: "none",
                      borderRadius: 26,
                      padding: "14px 40px",
                      fontSize: 18,
                      fontWeight: "700",
                      cursor: loading ? "not-allowed" : "pointer",
                      boxShadow: loading
                        ? "none"
                        : "0 8px 20px rgb(0 64 133 / 0.45)",
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
              <div
                style={{
                  padding: 24,
                  textAlign: "center",
                  color: "#004085",
                  fontWeight: "700",
                  fontSize: 20,
                  letterSpacing: "0.04em",
                  userSelect: "none",
                }}
              >
                <p>You've submitted your responses.</p>
                <button
                  onClick={reset}
                  style={{
                    marginTop: 20,
                    padding: "12px 40px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: 26,
                    cursor: "pointer",
                    fontSize: 18,
                    fontWeight: "700",
                    userSelect: "none",
                    boxShadow: "0 6px 16px rgb(108 117 125 / 0.4)",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5a6268")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#6c757d")}
                >
                  Take the Test Again
                </button>
              </div>
            )}
          </div>

          {/* Right Panel: Recommendations */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#d6f0f5",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 6px 16px rgba(0, 64, 133, 0.1)",
              color: "#212529",
              overflowY: "auto",
              maxHeight: "calc(100vh - 140px)",
            }}
          >
            <h2
              style={{
                fontWeight: "700",
                fontSize: 20,
                marginBottom: 24,
                color: "#004085",
                textAlign: "center",
                userSelect: "none",
              }}
            >
              Recommendations
            </h2>
            {recommendations.length === 0 ? (
              <p
                style={{
                  fontWeight: "600",
                  fontSize: 16,
                  color: "#6c757d",
                  textAlign: "center",
                  userSelect: "none",
                }}
              >
                No recommendations yet. Please submit your answers.
              </p>
            ) : (
              recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 12,
                    marginBottom: 18,
                    borderRadius: 10,
                    backgroundColor: "#cfe2ff",
                    boxShadow: "0 4px 10px rgba(0, 64, 133, 0.12)",
                    fontWeight: "600",
                    fontSize: 15,
                    userSelect: "text",
                    color: "#003366",
                  }}
                >
                  {rec}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
