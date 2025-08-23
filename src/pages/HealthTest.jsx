import React from 'react';
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

const AllQuestions = [
  { id: 0, question: "Over the past two weeks, how often have you felt down, depressed, or hopeless?" },
  { id: 1, question: "How often have you felt nervous, anxious, or on edge?" },
  { id: 2, question: "Have you had trouble sleeping or staying asleep recently?" },
  { id: 3, question: "How often have you felt little interest or pleasure in doing things?" },
  { id: 4, question: "Have you experienced sudden mood swings?" },
  { id: 5, question: "How often do you feel overwhelmed by daily tasks?" },
  { id: 6, question: "Have you noticed changes in your appetite or weight?" },
  { id: 7, question: "Do you find it hard to concentrate or focus?" },
  { id: 8, question: "Do you feel fatigued even after a full night’s sleep?" },
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

export default function HealthTest() {
  const [questionsToAsk, setQuestionsToAsk] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const shuffled = [...AllQuestions].sort(() => Math.random() - 0.5);
    setQuestionsToAsk(shuffled.slice(0, 10));
  }, []);

  const handleSelect = (id, choice) => {
    setAnswers((prev) => ({ ...prev, [id]: choice }));
  };

  const handleSubmit = async () => {
    if (questionsToAsk.some((q) => !answers[q.id])) {
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
      setRecommendations(data.response?.recommendations || []);
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
    const shuffled = [...AllQuestions].sort(() => Math.random() - 0.5);
    setQuestionsToAsk(shuffled.slice(0, 10));
  };

  return (
    <>
      <NavBar />
      <main
        style={{
          paddingTop: 80,
          minHeight: "100vh", // allow background to grow
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#212529",
          background: "linear-gradient(135deg, #e9f0ff 0%, #f7faff 50%, #ffffff 100%)",
        }}
      >
        <div style={{ flexGrow: 1, backgroundColor: "#fff", paddingBottom: 40 }}>
          {!submitted ? (
            <>
              <h1
                style={{
                  textAlign: "center",
                  marginBottom: 24,
                  color: "#004085",
                  fontWeight: "700",
                  fontSize: 32,
                }}
              >
                Mental Wellness Test
              </h1>

              <div
                style={{
                  flexGrow: 1,
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 16,
                  padding: 16,
                }}
              >
                {questionsToAsk.map(({ id, question }) => (
                  <div
                    key={id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 12,
                      borderRadius: 12,
                      backgroundColor: "#f0f4ff",
                      boxShadow: "0 3px 6px rgba(0, 64, 133, 0.15)",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "700",
                        fontSize: 16,
                        marginBottom: 12,
                        color: "#003366",
                        userSelect: "none",
                      }}
                    >
                      {question}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
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
                              padding: "6px 12px",
                              borderRadius: 20,
                              border: selected
                                ? "3px solid #004085"
                                : "2px solid #a9c0ff",
                              backgroundColor: selected ? "#cfe2ff" : "#e6efff",
                              color: selected ? "#002752" : "#004085",
                              fontWeight: selected ? "700" : "600",
                              fontSize: 12,
                              cursor: "pointer",
                              transition: "all 0.25s ease",
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

              <div style={{ textAlign: "center", margin: 24 }}>
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
                    boxShadow: "0 6px 16px rgb(0 64, 133 / 0.35)",
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
                          style={{
                            color: "#007bff",
                            textDecoration: "underline",
                          }}
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
        </div>
      </main>
    </>
  );
}
