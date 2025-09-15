import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

// ----------------------------
// Questions & Choices
// ----------------------------
const AllQuestions = [
  { id: 0, question: "Over the past two weeks, how often have you felt down, depressed, or hopeless?" },
  { id: 1, question: "How often have you felt nervous, anxious, or on edge?" },
  { id: 2, question: "Have you had trouble sleeping or staying asleep recently?" },
  { id: 3, question: "How often have you felt little interest or pleasure in doing things?" },
  { id: 4, question: "Have you experienced sudden mood swings?" },
  { id: 5, question: "How often do you feel overwhelmed by daily tasks?" },
  { id: 6, question: "Have you noticed changes in your appetite or weight?" },
  { id: 7, question: "Do you find it hard to concentrate or focus?" },
  { id: 8, question: "Do you feel fatigued even after a full night's sleep?" },
  { id: 9, question: "Have you felt socially withdrawn or isolated?" },
  { id: 10, question: "Do you have frequent headaches or body aches related to stress?" },
  { id: 11, question: "Have you experienced panic attacks recently?" },
  { id: 12, question: "Do you find yourself worrying excessively?" },
  { id: 13, question: "Have you been more irritable than usual?" },
  { id: 14, question: "Do you avoid certain situations due to fear or anxiety?" },
  { id: 15, question: "Have you felt hopeless about the future?" },
  { id: 16, question: "Do you find it difficult to make decisions?" },
  { id: 17, question: "Have you noticed any changes in your motivation levels?" },
  { id: 18, question: "Do you struggle to control racing thoughts?" },
  { id: 19, question: "Have you felt emotionally numb or detached?" },
  { id: 20, question: "Do you find yourself overthinking small situations?" },
  { id: 21, question: "Have you lost interest in hobbies you once enjoyed?" },
  { id: 22, question: "Do you feel unsafe in your own environment?" },
  { id: 23, question: "Have you felt unusually pessimistic or cynical?" },
  { id: 24, question: "Do you have trouble trusting others?" },
  { id: 25, question: "Have you been avoiding responsibilities?" },
  { id: 26, question: "Do you feel mentally drained after social interactions?" },
  { id: 27, question: "Have you had sudden bursts of anger?" },
  { id: 28, question: "Do you experience frequent nightmares?" },
  { id: 29, question: "Have you noticed difficulty remembering details?" },
  { id: 30, question: "Do you feel restless or unable to relax?" },
  { id: 31, question: "Have you felt easily startled lately?" },
  { id: 32, question: "Do you avoid places or people that remind you of past trauma?" },
  { id: 33, question: "Have you had difficulty controlling your emotions?" },
  { id: 34, question: "Do you struggle with perfectionism?" },
  { id: 35, question: "Have you been feeling more lonely than usual?" },
  { id: 36, question: "Do you rely on substances to cope with emotions?" },
  { id: 37, question: "Have you been feeling guilt or shame without clear reason?" },
  { id: 38, question: "Do you have difficulty adapting to change?" },
  { id: 39, question: "Have you felt detached from reality or yourself?" },
  { id: 40, question: "Do you have unexplained physical symptoms during stress?" },
  { id: 41, question: "Have you been struggling to maintain relationships?" },
  { id: 42, question: "Do you feel overwhelmed by too many choices?" },
  { id: 43, question: "Have you been feeling like a burden to others?" },
  { id: 44, question: "Do you avoid talking about your feelings?" },
  { id: 45, question: "Have you been experiencing intrusive thoughts?" },
  { id: 46, question: "Do you find it hard to forgive yourself for past mistakes?" },
  { id: 47, question: "Have you felt less productive than you want to be?" },
  { id: 48, question: "Do you often compare yourself negatively to others?" },
  { id: 49, question: "Have you felt disconnected from your goals or values?" },
];

const Choices = ["Never", "Rarely", "Occasionally", "Often", "Always"];

// ----------------------------
// HealthTest Component
// ----------------------------
export default function HealthTest() {
  const [questionsToAsk, setQuestionsToAsk] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedSubmitted = localStorage.getItem("healthTestSubmitted");
    const storedRecs = localStorage.getItem("healthTestRecommendations");
    const storedQuestions = localStorage.getItem("healthTestQuestions");
    const storedAnswers = localStorage.getItem("healthTestAnswers");

    if (storedSubmitted === "true" && storedRecs && storedQuestions && storedAnswers) {
      setSubmitted(true);
      setRecommendations(JSON.parse(storedRecs));
      setQuestionsToAsk(JSON.parse(storedQuestions));
      setAnswers(JSON.parse(storedAnswers));
    } else {
      const shuffled = [...AllQuestions].sort(() => Math.random() - 0.5);
      setQuestionsToAsk(shuffled.slice(0, 6));
    }
  }, []);

  const handleSelect = (id, choice) => {
    setAnswers((prev) => {
      const updated = { ...prev, [id]: choice };
      localStorage.setItem("healthTestAnswers", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmit = async () => {
    if (questionsToAsk.some((q) => !answers[q.id])) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setLoading(true);

    try {
      const payload = { answers };
      const res = await fetch("http://127.0.0.1:5000/health-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const message = data?.error || data?.response?.result || `Server returned ${res.status}`;
        alert("Failed to get recommendations: " + message);
        setLoading(false);
        return;
      }

      const recs = data?.response?.recommendations || [];
      if (!Array.isArray(recs) || recs.length === 0) {
        alert("No recommendations returned. Please try again.");
        setLoading(false);
        return;
      }

      const normalized = recs.map((r) => ({
        title: r.title || r.name || "Mental Health Resource",
        summary: r.summary || r.description || "Summary not available.",
        link: r.link || r.url || "",
      }));

      setRecommendations(normalized);
      setSubmitted(true);

      localStorage.setItem("healthTestSubmitted", "true");
      localStorage.setItem("healthTestRecommendations", JSON.stringify(normalized));
      localStorage.setItem("healthTestQuestions", JSON.stringify(questionsToAsk));
      localStorage.setItem("healthTestAnswers", JSON.stringify(answers));
    } catch (err) {
      console.error("Request failed:", err);
      alert("Network error — could not reach the backend. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setAnswers({});
    setRecommendations([]);
    setSubmitted(false);
    localStorage.removeItem("healthTestSubmitted");
    localStorage.removeItem("healthTestRecommendations");
    localStorage.removeItem("healthTestQuestions");
    localStorage.removeItem("healthTestAnswers");

    const shuffled = [...AllQuestions].sort(() => Math.random() - 0.5);
    setQuestionsToAsk(shuffled.slice(0, 6));
  };

  const allAnswered = questionsToAsk.every((q) => answers[q.id]);

  // --- styles ---
  const styles = {
    container: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #0a0a0a 0%, #1a0033 25%, #000814 50%, #001122 75%, #0a0a0a 100%)",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      color: "#ffffff",
      overflow: "hidden",
      position: "relative",
    },
    pageContent: { paddingTop: "80px" },
    neonOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "radial-gradient(circle at 20% 20%, rgba(255, 0, 150, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)",
      pointerEvents: "none",
      zIndex: 1,
    },
    content: {
      position: "relative",
      zIndex: 2,
      padding: "40px 20px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    // (other styles unchanged)
  };

  return (
    <>
      <NavBar />

      <div style={styles.container}>
        <div style={styles.neonOverlay}></div>

        <style>{`
          @keyframes neonPulse {
            0%, 100% { background-position: 0% 50%; filter: brightness(1) saturate(1); }
            50% { background-position: 100% 50%; filter: brightness(1.2) saturate(1.3); }
          }
        `}</style>

        <div style={{ ...styles.content, ...styles.pageContent }}>
          {!submitted ? (
            <>
              <h1 style={{ fontSize: "3.5rem", fontWeight: "900", textAlign: "center" }}>
                NEURAL WELLNESS
              </h1>
              <p style={{ textAlign: "center", fontSize: "1.2rem", marginBottom: "40px" }}>
                Advanced Mental Health Assessment • Complete all {questionsToAsk.length} questions
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
                  gap: "25px",
                  margin: "40px 0",
                }}
              >
                {questionsToAsk.map(({ id, question }) => (
                  <div
                    key={id}
                    style={{
                      background: "rgba(20, 20, 40, 0.8)",
                      border: "1px solid rgba(0, 255, 255, 0.3)",
                      borderRadius: "20px",
                      padding: "30px",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>{question}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      {Choices.map((choice) => {
                        const selected = answers[id] === choice;
                        return (
                          <button
                            key={choice}
                            onClick={() => handleSelect(id, choice)}
                            style={{
                              padding: "10px 18px",
                              borderRadius: "25px",
                              border: selected ? "2px solid #00ffff" : "2px solid transparent",
                              background: selected
                                ? "linear-gradient(45deg, #ff0080, #00ffff)"
                                : "rgba(255, 255, 255, 0.1)",
                              color: "#fff",
                              cursor: "pointer",
                            }}
                          >
                            {choice}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !allAnswered}
                style={{
                  display: "block",
                  margin: "40px auto",
                  padding: "18px 40px",
                  borderRadius: "35px",
                  border: "none",
                  background: "linear-gradient(45deg, #ff0080, #00ffff)",
                  color: "#fff",
                  fontWeight: "800",
                  fontSize: "1.2rem",
                  cursor: loading || !allAnswered ? "not-allowed" : "pointer",
                  opacity: loading || !allAnswered ? 0.6 : 1,
                }}
              >
                {loading ? "ANALYZING..." : "SUBMIT ASSESSMENT"}
              </button>
            </>
          ) : (
            <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>✨ ASSESSMENT COMPLETE ✨</h2>
              {recommendations.map((rec, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(20, 20, 40, 0.9)",
                    borderRadius: "15px",
                    padding: "25px",
                    margin: "20px 0",
                  }}
                >
                  <h4 style={{ color: "#00ffff", marginBottom: "10px" }}>{rec.title}</h4>
                  <p>{rec.summary}</p>
                  {rec.link && (
                    <a
                      href={rec.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#ff0080", fontWeight: "600" }}
                    >
                      Explore Resource →
                    </a>
                  )}
                </div>
              ))}
              <button onClick={reset} style={{ marginTop: "20px" }}>
                🔄 RETAKE ASSESSMENT
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
