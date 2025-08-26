import React, { useState } from "react";
import NavBar from "../components/NavBar";

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [viewingPost, setViewingPost] = useState(null);
  const [reply, setReply] = useState("");

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      author: "Anonymous",
      content: newPost.trim(),
      timestamp: new Date().toLocaleString(),
      replies: [],
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleReply = (postId) => {
    if (!reply.trim()) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, replies: [...p.replies, { content: reply, timestamp: new Date().toLocaleString() }] }
          : p
      )
    );
    setReply("");
  };

  const styles = {
    page: {
      paddingTop: "90px",
      minHeight: "100vh",
      background:
        "radial-gradient(circle at 10% 10%, rgba(255,0,128,0.06), transparent 15%), radial-gradient(circle at 90% 90%, rgba(0,255,255,0.06), transparent 15%), linear-gradient(180deg, #020014 0%, #080018 100%)",
      color: "#e6f7ff",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      gap: "30px",
      padding: "40px 20px",
      alignItems: "flex-start",
    },
    sidebar: {
      flex: "0 0 250px",
      background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
      border: "1px solid rgba(0,255,255,0.06)",
      borderRadius: "14px",
      padding: "18px",
      boxShadow: "0 8px 30px rgba(0,0,0,0.5), 0 0 30px rgba(0,255,255,0.02)",
      backdropFilter: "blur(6px)",
      color: "#cdefff",
      minHeight: "70vh",
      display: "flex",
      flexDirection: "column",
    },
    mainContent: {
      flex: 1,
      background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
      borderRadius: "14px",
      padding: "20px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.6), 0 0 30px rgba(255,0,128,0.02)",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    title: {
      fontSize: "22px",
      fontWeight: 700,
      color: "#ff9aff",
      marginBottom: "10px",
    },
    topicList: {
      listStyle: "none",
      paddingLeft: "0",
      marginBottom: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    topicItem: {
      padding: "8px 12px",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      color: "#cdefff",
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(0,255,255,0.06)",
    },
    topicItemHover: {
      background: "linear-gradient(90deg, rgba(0,255,255,0.1), rgba(255,0,128,0.1))",
      boxShadow: "0 4px 15px rgba(0,255,255,0.2), 0 4px 15px rgba(255,0,128,0.2)",
    },
    input: {
      padding: "12px 16px",
      borderRadius: "28px",
      border: "1px solid rgba(0,255,255,0.06)",
      outline: "none",
      fontSize: "15px",
      background: "rgba(255,255,255,0.02)",
      color: "#e6f7ff",
      marginBottom: "10px",
    },
    postBtn: {
      padding: "12px 18px",
      background: "linear-gradient(45deg, #ff0080, #00ffff)",
      color: "#00121a",
      border: "none",
      borderRadius: "24px",
      fontWeight: "800",
      cursor: "pointer",
      marginBottom: "20px",
    },
    postsList: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    postCard: {
      padding: "14px 18px",
      borderRadius: "14px",
      background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
      border: "1px solid rgba(0,255,255,0.06)",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    postCardHover: {
      boxShadow: "0 6px 20px rgba(0,255,255,0.12), 0 0 25px rgba(255,0,128,0.08)",
    },
    postHeader: {
      fontSize: "13px",
      opacity: 0.7,
      marginBottom: "6px",
      display: "flex",
      justifyContent: "space-between",
    },
    replyArea: {
      marginTop: "14px",
      display: "flex",
      gap: "10px",
    },
    replyBtn: {
      padding: "6px 12px",
      background: "linear-gradient(45deg, #ff0080, #00ffff)",
      border: "none",
      borderRadius: "16px",
      color: "#00121a",
      cursor: "pointer",
    },
  };

  return (
    <>
      <NavBar />
      <div style={styles.page}>
        <div style={styles.neonOverlay} />

        <div style={styles.container}>
          {/* Sidebar */}
          <div style={styles.sidebar}>
            <h3>Forum Sections</h3>
            <p>💬 General</p>
            <p>🧘 Mental Wellness</p>
            <p>🆘 Emergency Help</p>
          </div>

          {/* Main content */}
          <div style={styles.mainContent}>
            {viewingPost ? (
              // Full post view with replies
              <>
                <button
                  onClick={() => setViewingPost(null)}
                  style={{ ...styles.postBtn, marginBottom: "10px" }}
                >
                  ← Back
                </button>
                <div style={styles.postCard}>
                  <div style={styles.postHeader}>
                    <span>{viewingPost.author}</span>
                    <span>{viewingPost.timestamp}</span>
                  </div>
                  <div>{viewingPost.content}</div>

                  {/* Replies */}
                  <div style={{ marginTop: "12px" }}>
                    {viewingPost.replies.map((r, i) => (
                      <div key={i} style={{ padding: "6px 8px", marginBottom: "6px", background: "rgba(0,255,255,0.02)", borderRadius: "8px" }}>
                        <div>{r.content}</div>
                        <div style={{ fontSize: "11px", opacity: 0.6 }}>{r.timestamp}</div>
                      </div>
                    ))}
                  </div>

                  <div style={styles.replyArea}>
                    <input
                      style={styles.input}
                      placeholder="Write a reply..."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleReply(viewingPost.id)}
                    />
                    <button style={styles.replyBtn} onClick={() => handleReply(viewingPost.id)}>
                      Reply
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // Forum main view
              <>
                <h2 style={styles.title}>This forum is designed for mental health topics:</h2>
                <ul style={styles.topicList}>
                  {["Managing Anxiety", "Stress Reduction Techniques", "Depression Support", "Mental Wellness Practices", "Mindfulness & Meditation", "Sharing Personal Experiences"].map((topic, idx) => (
                    <li
                      key={idx}
                      style={styles.topicItem}
                      onMouseEnter={(e) => e.currentTarget.style.cssText = `${Object.entries(styles.topicItemHover).map(([k,v])=>`${k}:${v}`).join(";")};`}
                      onMouseLeave={(e) => e.currentTarget.style.cssText = `${Object.entries(styles.topicItem).map(([k,v])=>`${k}:${v}`).join(";")};`}
                    >
                      {topic}
                    </li>
                  ))}
                </ul>

                <input
                  style={styles.input}
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Write a new post..."
                  onKeyDown={(e) => e.key === "Enter" && handlePost()}
                />
                <button style={styles.postBtn} onClick={handlePost}>Post</button>

                <div style={styles.postsList}>
                  {posts.map((p) => (
                    <div key={p.id} style={styles.postCard} onClick={() => setViewingPost(p)}>
                      <div style={styles.postHeader}>
                        <span>{p.author}</span>
                        <span>{p.timestamp}</span>
                      </div>
                      <div>{p.content}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Neon overlay */}
      <div
        style={{
          position: "fixed",
          top: "90px",
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(circle at 15% 10%, rgba(255,0,128,0.05) 0%, transparent 20%), radial-gradient(circle at 85% 90%, rgba(0,255,255,0.05) 0%, transparent 20%)",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
