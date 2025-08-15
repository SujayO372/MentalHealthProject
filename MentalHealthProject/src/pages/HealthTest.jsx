import { useState } from "react";
import NavBar from "../components/NavBar";

const QuestionsToAsk = [
  { id: 0, question: "Over the past two weeks, how often have you felt down, depressed, or hopeless?" },
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
      console.log("Health Test Result:", data.response);
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
                disabled={loading}
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
                  opacity: loading ? 0.6 : 1,
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
              Your responses have been reviewed. Here are some resources that may help.
            </p>

            {recommendations.length > 0 && (
              <>
                <h3
                  style={{
                    marginTop: 40,
                    marginBottom: 20,
                    textAlign: "center",
                    color: "#28a745",
                    fontSize: 22,
                    fontWeight: "700",
                  }}
                >
                  🌟 AI-Recommended Articles for You
                </h3>
                {recommendations.map((rec, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#fff",
                      padding: 20,
                      borderRadius: 10,
                      marginBottom: 16,
                      boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                    }}
                  >
                    <strong>{rec.title}</strong>
                    <p>{rec.summary}</p>
                    {rec.link && (
                      <a
                        href={rec.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#007bff", textDecoration: "underline" }}
                      >
                        Read more →
                      </a>
                    )}
                  </div>
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
                }}
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
