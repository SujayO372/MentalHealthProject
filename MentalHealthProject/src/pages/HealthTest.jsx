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
      <div style={{ overflowX: 'auto', paddingTop: 80, background: 'linear-gradient(135deg, #e9f0ff 0%, #f7faff 50%, #ffffff 100%)', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: '#212529' }}>
        <div style={{ display: 'flex', minWidth: 1600, maxWidth: 1800, margin: '0 auto 50px', gap: 40, padding: '0 24px', boxSizing: 'border-box' }}>
          
          {/* Left Panel: Questions + Submit */}
          <div style={{ flex: 1, backgroundColor: '#f0f4ff', borderRadius: 14, padding: 32, boxShadow: "0 8px 20px rgba(0, 64, 133, 0.1)" }}>
            {!submitted ? (
              <>
                <h1
                  style={{
                    textAlign: "center",
                    marginBottom: 20,
                    color: "#004085",
                    fontWeight: "700",
                    fontSize: 32,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    textShadow: "1px 1px 2px rgba(0,64,133,0.15)",
                  }}
                >
                  Mental Wellness Check-In
                </h1>
                <p
                  style={{
                    maxWidth: 700,
                    margin: "0 auto 40px",
                    fontSize: 18,
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
                {QuestionsToAsk.map(({ id, question }) => (
                  <section
                    key={id}
                    style={{
                      marginBottom: 32,
                      padding: 24,
                      borderRadius: 14,
                      backgroundColor: "#e6efff",
                      boxShadow: "0 8px 20px rgba(0, 64, 133, 0.1)",
                      transition: "box-shadow 0.3s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 12px 30px rgba(0,64,133,0.18)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 8px 20px rgba(0,64,133,0.1)")
                    }
                  >
                    <p
                      style={{
                        fontWeight: "700",
                        fontSize: 18,
                        marginBottom: 20,
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
                        gap: 16,
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
                              padding: "14px 28px",
                              borderRadius: 30,
                              border: selected
                                ? "3px solid #004085"
                                : "2px solid #a9c0ff",
                              backgroundColor: selected ? "#cfe2ff" : "#e6efff",
                              color: selected ? "#002752" : "#004085",
                              fontWeight: selected ? "700" : "600",
                              fontSize: 15,
                              cursor: "pointer",
                              minWidth: 110,
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
                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                      backgroundColor: "#004085",
                      color: "white",
                      border: "none",
                      borderRadius: 28,
                      padding: "16px 48px",
                      fontSize: 22,
                      fontWeight: "700",
                      cursor: loading ? "not-allowed" : "pointer",
                      boxShadow: loading
                        ? "none"
                        : "0 8px 24px rgb(0 64 133 / 0.45)",
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
                  padding: 32,
                  textAlign: "center",
                  color: "#004085",
                  fontWeight: "700",
                  fontSize: 24,
                  letterSpacing: "0.04em",
                  userSelect: "none",
                }}
              >
                <p>You've submitted your responses.</p>
                <button
                  onClick={reset}
                  style={{
                    marginTop: 24,
                    padding: "14px 48px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: 28,
                    cursor: "pointer",
                    fontSize: 20,
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
              borderRadius: 14,
              padding: 32,
              boxShadow: "0 8px 20px rgba(0, 64, 133, 0.1)",
              color: "#212529",
              overflowY: "auto",
              maxHeight: "calc(100vh - 160px)", // allow scrolling inside if content is long
            }}
          >
            {submitted ? (
              <>
                <h2
                  style={{
                    textAlign: "center",
                    color: "#004085",
                    fontWeight: "700",
                    fontSize: 30,
                    letterSpacing: "0.03em",
                    textShadow: "1px 1px 1.5px rgba(0,64,133,0.2)",
                    marginBottom: 20,
                  }}
                >
                  Thank You for Completing the Check-In
                </h2>
                <p
                  style={{
                    color: "#495057",
                    fontSize: 17,
                    textAlign: "center",
                    lineHeight: 1.6,
                    fontWeight: "500",
                    marginBottom: 30,
                  }}
                >
                  Your responses have been reviewed. Here are some resources that may help.
                </p>
                {recommendations.length > 0 ? (
                  recommendations.map((rec, i) => (
                    <div
                      key={i}
                      style={{
                        background: "#fff",
                        padding: 24,
                        borderRadius: 14,
                        marginBottom: 18,
                        boxShadow: "0 8px 22px rgba(0,0,0,0.07)",
                        transition: "transform 0.3s ease",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "translateY(-4px)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "translateY(0)")
                      }
                    >
                      <strong
                        style={{
                          fontSize: 19,
                          color: "#212529",
                          display: "block",
                          marginBottom: 8,
                        }}
                      >
                        {rec.title}
                      </strong>
                      <p
                        style={{
                          margin: 0,
                          color: "#495057",
                          fontSize: 15,
                          lineHeight: 1.5,
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
                            color: "#007bff",
                            textDecoration: "underline",
                            fontWeight: "600",
                            marginTop: 12,
                            display: "inline-block",
                            userSelect: "text",
                          }}
                        >
                          Read more →
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: "center", color: "#495057", marginTop: 30 }}>
                    No recommendations available at this time.
                  </p>
                )}
              </>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  color: "#6c757d",
                  fontSize: 18,
                  marginTop: 60,
                  userSelect: "none",
                }}
              >
                <p>Complete the questionnaire on the left to see your personalized recommendations.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
