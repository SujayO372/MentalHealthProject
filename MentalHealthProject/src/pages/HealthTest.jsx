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
          background:
            "linear-gradient(135deg, #e9f0ff 0%, #f7faff 50%, #ffffff 100%)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#212529",
          maxWidth: 1200,
          margin: "0 auto 50px",
          paddingLeft: 24,
          paddingRight: 24,
          boxSizing: "border-box",
          userSelect: "none",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {!submitted ? (
          <>
            <h1
              style={{
                textAlign: "center",
                marginBottom: 20,
                color: "#003366",
                fontWeight: "700",
                fontSize: 32,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                textShadow: "1px 1px 2px rgba(0,51,102,0.3)",
              }}
            >
              Mental Wellness Check-In
            </h1>
            <p
              style={{
                maxWidth: 700,
                margin: "0 auto 40px",
                fontSize: 18,
                color: "#2a3e75",
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
                  backgroundColor: "#dbe5ff",
                  boxShadow: "0 8px 20px rgba(0, 51, 102, 0.15)",
                  transition: "box-shadow 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 12px 30px rgba(0,51,102,0.25)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0, 51, 102, 0.15)")
                }
              >
                <p
                  style={{
                    fontWeight: "700",
                    fontSize: 18,
                    marginBottom: 20,
                    color: "#00264d",
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
                            ? "3px solid #003366"
                            : "2px solid #a3b9ff",
                          backgroundColor: selected ? "#a7bbff" : "#dbe5ff",
                          color: selected ? "#001a4d" : "#003366",
                          fontWeight: selected ? "700" : "600",
                          fontSize: 15,
                          cursor: "pointer",
                          minWidth: 110,
                          textAlign: "center",
                          transition: "all 0.3s ease",
                          boxShadow: selected
                            ? "0 0 12px rgba(0,51,102,0.6)"
                            : "0 2px 6px rgba(0, 51, 102, 0.1)",
                          userSelect: "none",
                        }}
                        onMouseEnter={(e) => {
                          if (!selected) e.currentTarget.style.backgroundColor = "#c0cdff";
                        }}
                        onMouseLeave={(e) => {
                          if (!selected) e.currentTarget.style.backgroundColor = "#dbe5ff";
                        }}
                      >
                        {choice}
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
            <div style={{ textAlign: "center", marginTop: 48 }}>
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  backgroundColor: "#3855d1",
                  color: "#e1e8ff",
                  border: "none",
                  borderRadius: 32,
                  padding: "16px 52px",
                  fontSize: 22,
                  fontWeight: "800",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: loading
                    ? "none"
                    : "0 12px 30px rgba(66, 99, 255, 0.85)",
                  opacity: loading ? 0.7 : 1,
                  userSelect: "none",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = "#2e43a9";
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = "#3855d1";
                }}
              >
                {loading ? "Processing..." : "Submit"}
              </button>
              <p
                style={{
                  marginTop: 12,
                  fontSize: 14,
                  color: "#adc8ff",
                  fontWeight: "600",
                  userSelect: "none",
                  opacity: 0.8,
                }}
              >
                Your recommendations will appear once submitted.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2
              style={{
                textAlign: "center",
                color: "#003366",
                fontWeight: "700",
                fontSize: 30,
                letterSpacing: "0.03em",
                textShadow: "1px 1px 1.5px rgba(0,51,102,0.2)",
              }}
            >
              Thank You for Completing the Check-In
            </h2>
            <p
              style={{
                maxWidth: 700,
                margin: "16px auto 40px",
                fontSize: 18,
                color: "#2a3e75",
                lineHeight: 1.5,
                textAlign: "center",
                fontWeight: "500",
                userSelect: "text",
              }}
            >
              Based on your answers, here are some recommendations for your mental wellness:
            </p>
            <ul
              style={{
                maxWidth: 700,
                margin: "0 auto 48px",
                paddingLeft: 20,
                color: "#2a3e75",
                fontSize: 17,
                fontWeight: "600",
                lineHeight: 1.5,
                userSelect: "text",
              }}
            >
              {recommendations.length > 0 ? (
                recommendations.map((rec, index) => (
                  <li key={index} style={{ marginBottom: 12 }}>
                    {rec}
                  </li>
                ))
              ) : (
                <li>No recommendations available at this time.</li>
              )}
            </ul>
            <div style={{ textAlign: "center" }}>
              <button
                onClick={reset}
                style={{
                  backgroundColor: "#00264d",
                  color: "#a7bbff",
                  border: "none",
                  borderRadius: 30,
                  padding: "14px 44px",
                  fontSize: 18,
                  fontWeight: "700",
                  cursor: "pointer",
                  userSelect: "none",
                  boxShadow: "0 8px 24px rgba(0, 38, 77, 0.6)",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#001f3d";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#00264d";
                }}
              >
                Take Test Again
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
