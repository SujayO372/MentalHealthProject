import React from 'react';
import { useState, useEffect } from "react";

// Simple NavBar component since the original was imported
const NavBar = () => (
  <nav style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: 'rgba(10, 10, 10, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 255, 255, 0.3)',
    padding: '15px 30px',
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
  }}>
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{
        fontSize: '1.5rem',
        fontWeight: '800',
        background: 'linear-gradient(45deg, #ff0080, #00ffff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        NEURAL WELLNESS
      </div>
      <div style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
      }}>
        <span style={{ color: '#00ffff', fontSize: '0.9rem' }}>Mental Health Assessment</span>
      </div>
    </div>
  </nav>
);

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

export default function HealthTest() {
  const [questionsToAsk, setQuestionsToAsk] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const shuffled = [...AllQuestions].sort(() => Math.random() - 0.5);
    setQuestionsToAsk(shuffled.slice(0, 6));
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
      // Simulated API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockRecommendations = [
        {
          title: "Mindfulness and Meditation Techniques",
          summary: "Discover powerful breathing exercises and meditation practices to help manage stress and anxiety.",
          link: "#"
        },
        {
          title: "Building Healthy Sleep Habits",
          summary: "Learn evidence-based strategies for improving sleep quality and establishing consistent sleep patterns.",
          link: "#"
        }
      ];
      setRecommendations(mockRecommendations);
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
    setQuestionsToAsk(shuffled.slice(0, 6));
  };

  const allAnswered = questionsToAsk.every(q => answers[q.id]);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0033 25%, #000814 50%, #001122 75%, #0a0a0a 100%)',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      color: '#ffffff',
      overflow: 'hidden',
      position: 'relative',
      paddingTop: '80px', // Add padding for fixed navbar
    },
    neonOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 20% 20%, rgba(255, 0, 150, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)',
      pointerEvents: 'none',
      zIndex: 1,
    },
    content: {
      position: 'relative',
      zIndex: 2,
      padding: '40px 20px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    title: {
      textAlign: 'center',
      fontSize: '3.5rem',
      fontWeight: '900',
      marginBottom: '20px',
      background: 'linear-gradient(45deg, #ff0080, #00ffff, #ff0080)',
      backgroundSize: '200% 200%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'neonPulse 3s ease-in-out infinite',
      textShadow: '0 0 20px rgba(255, 0, 128, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)',
    },
    subtitle: {
      textAlign: 'center',
      fontSize: '1.2rem',
      color: '#b0b0ff',
      marginBottom: '40px',
      textShadow: '0 0 10px rgba(176, 176, 255, 0.5)',
    },
    questionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
      gap: '25px',
      margin: '40px 0',
      maxWidth: '1400px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    questionCard: {
      background: 'rgba(20, 20, 40, 0.8)',
      border: '1px solid rgba(0, 255, 255, 0.3)',
      borderRadius: '20px',
      padding: '30px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
    },
    questionText: {
      fontSize: '1.1rem',
      fontWeight: '600',
      marginBottom: '20px',
      color: '#ffffff',
      lineHeight: '1.4',
    },
    choicesContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      justifyContent: 'center',
    },
    choiceButton: {
      padding: '10px 18px',
      borderRadius: '25px',
      border: '2px solid transparent',
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#ffffff',
      fontWeight: '600',
      fontSize: '0.9rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(5px)',
    },
    choiceButtonSelected: {
      background: 'linear-gradient(45deg, #ff0080, #00ffff)',
      border: '2px solid #00ffff',
      color: '#ffffff',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(255, 0, 128, 0.4)',
      transform: 'scale(1.05)',
    },
    navigationContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      marginTop: '40px',
    },
    submitButton: {
      padding: '18px 40px',
      borderRadius: '35px',
      border: 'none',
      background: 'linear-gradient(45deg, #ff0080, #00ffff)',
      color: '#ffffff',
      fontWeight: '800',
      fontSize: '1.2rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      margin: '40px auto',
      display: 'block',
    },
    resultsContainer: {
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto',
    },
    resultsTitle: {
      fontSize: '2.5rem',
      fontWeight: '800',
      marginBottom: '20px',
      color: '#00ffff',
      textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
    },
    recommendationCard: {
      background: 'rgba(20, 20, 40, 0.9)',
      border: '1px solid rgba(255, 0, 128, 0.4)',
      borderRadius: '15px',
      padding: '25px',
      margin: '20px 0',
      textAlign: 'left',
      backdropFilter: 'blur(15px)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 0, 128, 0.2)',
    },
    pageIndicator: {
      color: '#b0b0ff',
      fontSize: '1rem',
      textShadow: '0 0 10px rgba(176, 176, 255, 0.5)',
    },
    navButton: {
      marginTop: '20px',
      padding: '12px 22px',
      borderRadius: '12px',
      border: 'none',
      background: 'rgba(0, 255, 255, 0.1)',
      color: '#ffffff',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }
  };

  return (
    <div style={styles.container}>
      <NavBar />
      <div style={styles.neonOverlay}></div>

      <style>
        {`
          @keyframes neonPulse {
            0%, 100% { 
              background-position: 0% 50%;
              filter: brightness(1) saturate(1);
            }
            50% { 
              background-position: 100% 50%;
              filter: brightness(1.2) saturate(1.3);
            }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>

      <div style={styles.content}>
        {!submitted ? (
          <>
            <h1 style={styles.title}>NEURAL WELLNESS</h1>
            <p style={styles.subtitle}>
              Advanced Mental Health Assessment • Complete all {questionsToAsk.length} questions below
            </p>

            <div style={styles.questionsGrid}>
              {questionsToAsk.map(({ id, question }) => (
                <div
                  key={id}
                  style={{
                    ...styles.questionCard,
                    transform: answers[id] ? 'scale(1.02)' : 'scale(1)',
                    borderColor: answers[id] ? 'rgba(0, 255, 255, 0.6)' : 'rgba(0, 255, 255, 0.3)',
                  }}
                >
                  <p style={styles.questionText}>{question}</p>
                  <div style={styles.choicesContainer}>
                    {Choices.map((choice) => {
                      const selected = answers[id] === choice;
                      return (
                        <button
                          key={choice}
                          onClick={() => handleSelect(id, choice)}
                          style={selected ? 
                            { ...styles.choiceButton, ...styles.choiceButtonSelected } : 
                            styles.choiceButton
                          }
                          onMouseEnter={(e) => {
                            if (!selected) {
                              e.target.style.background = 'rgba(0, 255, 255, 0.2)';
                              e.target.style.border = '2px solid rgba(0, 255, 255, 0.5)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!selected) {
                              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                              e.target.style.border = '2px solid transparent';
                            }
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
                ...styles.submitButton,
                opacity: (loading || !allAnswered) ? 0.6 : 1,
                cursor: (loading || !allAnswered) ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!loading && allAnswered) {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 0 40px rgba(0, 255, 255, 0.8)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && allAnswered) {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.6)';
                }
              }}
            >
              {loading ? "ANALYZING..." : "SUBMIT ASSESSMENT"}
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              marginBottom: '20px',
              color: '#00ffff',
              textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
            }}>
              ✨ ASSESSMENT COMPLETE ✨
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#b0b0ff',
              marginBottom: '40px',
              lineHeight: '1.6',
              textShadow: '0 0 10px rgba(176, 176, 255, 0.5)'
            }}>
              Your neural patterns have been analyzed. Here are personalized recommendations to enhance your mental wellness journey.
            </p>

            {recommendations.length > 0 && (
              <div style={{ margin: '40px 0' }}>
                <h3 style={{
                  fontSize: '1.8rem',
                  color: '#ff0080',
                  marginBottom: '30px',
                  textShadow: '0 0 15px rgba(255, 0, 128, 0.5)'
                }}>
                  🧠 AI-Curated Resources
                </h3>
                {recommendations.map((rec, i) => (
                  <div key={i} style={styles.recommendationCard}>
                    <h4 style={{
                      color: '#00ffff',
                      fontSize: '1.3rem',
                      marginBottom: '15px',
                      textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
                    }}>
                      {rec.title}
                    </h4>
                    <p style={{
                      color: '#ffffff',
                      lineHeight: '1.6',
                      marginBottom: '15px'
                    }}>
                      {rec.summary}
                    </p>
                    {rec.link && (
                      <a
                        href={rec.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#ff0080',
                          textDecoration: 'none',
                          fontWeight: '600',
                          textShadow: '0 0 10px rgba(255, 0, 128, 0.5)'
                        }}
                      >
                        Explore Resource →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={reset}
              style={styles.navButton}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(0, 255, 255, 0.3)';
                e.target.style.boxShadow = '0 0 25px rgba(0, 255, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(0, 255, 255, 0.1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              🔄 RETAKE ASSESSMENT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
