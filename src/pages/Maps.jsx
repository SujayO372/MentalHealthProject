import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabase.js";

export default function Maps() {
  const { user, loading, signIn, signOut } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newPost, setNewPost] = useState("");
  const [newCategory, setNewCategory] = useState("General");
  const [repliesDraft, setRepliesDraft] = useState({});

  // Fetch posts initially
  useEffect(() => {
    let mounted = true;
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("timestamp", { ascending: false });
      if (!error && mounted) setPosts(data || []);
      if (error) console.error("Fetch error:", error);
    };
    fetchPosts();
    return () => { mounted = false; };
  }, []);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("public-posts")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "posts" }, payload => {
        const row = payload.new;
        setPosts(prev => prev.find(p => p.id === row.id) ? prev : [row, ...prev]);
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "posts" }, payload => {
        const row = payload.new;
        setPosts(prev => prev.map(p => (p.id === row.id ? row : p)));
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "posts" }, payload => {
        const deleted = payload.old;
        setPosts(prev => prev.filter(p => p.id !== deleted.id));
      })
      .subscribe();

    return () => { try { channel.unsubscribe(); } catch (e) {} };
  }, []);

  const handlePost = async () => {
    if (!newPost.trim() || !newTitle.trim() || !user) return;
    if (!confirm("This post will be public. Post anyway?")) return;

    const post = {
      id: crypto.randomUUID(),
      title: newTitle.trim(),
      content: newPost.trim(),
      timestamp: new Date().toISOString(),
      username: user.email,
      upvotes: 0,
      categories: newCategory || "General",
      comment: null,
      replies: [],
    };

    const { data, error } = await supabase.from("posts").insert(post).select().single();
    if (error) {
      console.error("Insert error:", error);
      alert(`Failed to post: ${error.message}`);
      return;
    }

    if (data) setPosts(prev => prev.find(p => p.id === data.id) ? prev : [data, ...prev]);

    setNewPost("");
    setNewTitle("");
    setNewCategory("General");
  };

  const handleDeletePost = async (postId) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", postId).select().single();
    if (!error) setPosts(prev => prev.filter(p => p.id !== postId));
    else console.error("Delete error:", error);
  };

  const handleReply = async (postId) => {
    const text = (repliesDraft[postId] || "").trim();
    if (!text || !user) return;

    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const updatedReplies = [...(post.replies || []), {
      author: user.email,
      content: text,
      timestamp: new Date().toISOString()
    }];

    const { error } = await supabase.from("posts").update({ replies: updatedReplies }).eq("id", postId);
    if (!error) {
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, replies: updatedReplies } : p));
      setRepliesDraft(prev => { const copy = { ...prev }; delete copy[postId]; return copy; });
    } else console.error("Reply error:", error);
  };

  const handleLike = async (postId) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const newUpvotes = (post.upvotes || 0) + 1;

    const { error } = await supabase
      .from("posts")
      .update({ upvotes: newUpvotes })
      .eq("id", postId);

    if (!error) {
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, upvotes: newUpvotes } : p));
    } else {
      console.error("Like error:", error);
    }
  };

  if (loading) return (
    <>
      <NavBar />
      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at 10% 10%, rgba(255,0,128,0.06), transparent 15%), radial-gradient(circle at 90% 90%, rgba(0,255,255,0.06), transparent 15%), linear-gradient(180deg, #020014 0%, #080018 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#e6f7ff",
        fontFamily: "'Space Grotesk', 'Roboto', sans-serif"
      }}>
        <div style={{
          textAlign: "center",
          padding: "40px",
          background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
          borderRadius: "20px",
          border: "1px solid rgba(0,255,255,0.1)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.6), 0 0 30px rgba(255,0,128,0.02)"
        }}>
          <div style={{
            width: "60px",
            height: "60px",
            border: "3px solid rgba(0,255,255,0.3)",
            borderTop: "3px solid #00ffff",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 20px"
          }}></div>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "10px", color: "#00ffff" }}>Loading...</h2>
          <p style={{ color: "#9fe8ff" }}>Preparing your community experience</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </>
  );

  if (!user) return (
    <>
      <NavBar />
      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at 10% 10%, rgba(255,0,128,0.06), transparent 15%), radial-gradient(circle at 90% 90%, rgba(0,255,255,0.06), transparent 15%), linear-gradient(180deg, #020014 0%, #080018 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        color: "#e6f7ff",
        fontFamily: "'Space Grotesk', 'Roboto', sans-serif",
        position: "relative"
      }}>
        {/* Background Effects */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 20% 30%, rgba(255,0,128,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,255,255,0.08) 0%, transparent 40%)",
          animation: "pulse 4s ease-in-out infinite alternate"
        }} />
        
        <div style={{
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
          position: "relative",
          zIndex: 1
        }}>
          {/* Main Card */}
          <div style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            borderRadius: "24px",
            padding: "50px 40px",
            border: "1px solid rgba(0,255,255,0.15)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(255,0,128,0.05)",
            backdropFilter: "blur(20px)"
          }}>
            {/* Icon */}
            <div style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #ff0080, #00ffff)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 30px",
              fontSize: "40px",
              animation: "glow 2s ease-in-out infinite alternate"
            }}>
              🌟
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: "2.8rem",
              fontWeight: "800",
              margin: "0 0 15px",
              background: "linear-gradient(135deg, #00ffff, #ff0080)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Join Our Community
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: "1.3rem",
              color: "#9fe8ff",
              marginBottom: "35px",
              lineHeight: "1.5"
            }}>
              Connect with others on their mental health journey. Share experiences, find support, and grow together.
            </p>

            {/* Features List */}
            <div style={{
              marginBottom: "40px",
              textAlign: "left"
            }}>
              {[
                { icon: "💬", text: "Real-time discussions and support" },
                { icon: "🤝", text: "Connect with like-minded individuals" },
                { icon: "📚", text: "Share resources and experiences" },
                { icon: "🔒", text: "Safe and moderated environment" }
              ].map((feature, index) => (
                <div key={index} style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                  padding: "12px 16px",
                  background: "rgba(0,255,255,0.05)",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,255,255,0.08)"
                }}>
                  <span style={{ fontSize: "24px", marginRight: "15px" }}>{feature.icon}</span>
                  <span style={{ color: "#dff8ff", fontSize: "1.1rem" }}>{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Sign In Button */}
            <button
              onClick={() => window.location.href = '/signup'}
              style={{
                padding: "18px 40px",
                fontSize: "1.2rem",
                fontWeight: "800",
                border: "none",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #ff0080, #00ffff)",
                color: "#001a2e",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "'Space Grotesk', 'Roboto', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "1px",
                boxShadow: "0 8px 25px rgba(255,0,128,0.3)"
              }}
              onMouseEnter={e => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 12px 35px rgba(255,0,128,0.4)";
              }}
              onMouseLeave={e => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 25px rgba(255,0,128,0.3)";
              }}
            >
              Sign In to Continue
            </button>

            {/* Help Text */}
            <p style={{
              marginTop: "25px",
              color: "#7dd3fc",
              fontSize: "0.95rem"
            }}>
              Need help? <a href="/support" style={{ color: "#00ffff", textDecoration: "underline" }}>Contact Support</a>
            </p>
          </div>
        </div>

        <style jsx>{`
          @keyframes pulse {
            0% { opacity: 0.3; }
            100% { opacity: 0.6; }
          }
          
          @keyframes glow {
            0% { box-shadow: 0 0 20px rgba(255,0,128,0.3); }
            100% { box-shadow: 0 0 30px rgba(0,255,255,0.4); }
          }
        `}</style>
      </div>
    </>
  );

  const styles = {
    page: { paddingTop: 90, minHeight: "100vh", background: "radial-gradient(circle at 10% 10%, rgba(255,0,128,0.06), transparent 15%), radial-gradient(circle at 90% 90%, rgba(0,255,255,0.06), transparent 15%), linear-gradient(180deg, #020014 0%, #080018 100%)", color: "#e6f7ff", fontFamily: "'Space Grotesk', 'Roboto', sans-serif", padding: "40px 20px" },
    container: { maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 360px", gap: 28, alignItems: "start" },
    feed: { background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))", borderRadius: 14, padding: 18, border: "1px solid rgba(0,255,255,0.04)", boxShadow: "0 10px 40px rgba(0,0,0,0.6), 0 0 30px rgba(255,0,128,0.02)" },
    sidebar: { background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))", borderRadius: 14, padding: 16, border: "1px solid rgba(0,255,255,0.04)", height: "fit-content" },
    inputLarge: { width: "100%", padding: 12, borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", color: "#e6f7ff", fontSize: 15, marginBottom: 8, fontFamily: "'Space Grotesk', 'Roboto', sans-serif" },
    inputSmall: { padding: 10, borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", color: "#e6f7ff", fontSize: 14, marginBottom: 8, fontFamily: "'Space Grotesk', 'Roboto', sans-serif" },
    postBtn: { padding: "10px 14px", border: "none", borderRadius: 10, background: "linear-gradient(45deg, #ff0080, #00ffff)", color: "#00121a", fontWeight: 800, cursor: "pointer", fontFamily: "'Space Grotesk', 'Roboto', sans-serif" },
    deleteBtn: { padding: "6px 10px", borderRadius: 8, border: "none", background: "linear-gradient(45deg, #ff6b6b, #ff9a9a)", color: "#fff", cursor: "pointer", fontWeight: 700, fontFamily: "'Space Grotesk', 'Roboto', sans-serif" },
    postCard: { borderRadius: 12, padding: 14, marginBottom: 12, background: "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0))", border: "1px solid rgba(0,255,255,0.04)" },
    authorRow: { display: "flex", justifyContent: "space-between", marginBottom: 8, color: "#9fe8ff" },
    replyBox: { display: "flex", gap: 8, marginTop: 10 },
    replyInput: { flex: 1, padding: 8, borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", color: "#e6f7ff", fontFamily: "'Space Grotesk', 'Roboto', sans-serif" },
    small: { color: "#bfefff", fontSize: 12 },
    neonOverlay: { position: "fixed", top: 90, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0, background: "radial-gradient(circle at 15% 10%, rgba(255,0,128,0.05) 0%, transparent 20%), radial-gradient(circle at 85% 90%, rgba(0,255,255,0.05) 0%, transparent 20%)", mixBlendMode: "screen" }
  };

  const categories = ["Announcements", "General", "Help", "Off-topic"];

  return (
    <>
      <NavBar />
      <div style={styles.page}>
        <div style={styles.neonOverlay} />
        <div style={styles.container}>
          <div style={styles.feed}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h2 style={{ margin: 0 }}>Welcome, {user.email}</h2>
              <button onClick={signOut} style={{ ...styles.postBtn, padding: "8px 10px" }}>Sign Out</button>
            </div>

            {/* New Post */}
            <div style={{ marginBottom: 18 }}>
              <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Title" style={styles.inputSmall} />
              <select value={newCategory} onChange={e => setNewCategory(e.target.value)} style={styles.inputSmall}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
              <textarea value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="Write something..." style={styles.inputLarge} rows={3} />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={handlePost} style={styles.postBtn}>Post</button>
              </div>
            </div>

            {/* Posts */}
            {categories.map(cat => {
              const catPosts = posts.filter(p => (p.categories || "General") === cat);
              if (!catPosts.length) return null;
              return (
                <section key={cat} style={{ marginBottom: 18 }}>
                  <h3 style={{ color: "#bff4ff", marginBottom: 10 }}>{cat}</h3>
                  {catPosts.map(p => (
                    <article key={p.id} style={styles.postCard}>
                      <div style={styles.authorRow}>
                        <div style={{ fontWeight: 800 }}>{p.title}</div>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <div style={{ fontSize: 12, opacity: 0.8 }}>{new Date(p.timestamp).toLocaleString()}</div>
                          {p.username === user.email && <button onClick={() => handleDeletePost(p.id)} style={styles.deleteBtn}>Delete</button>}
                        </div>
                      </div>
                      <div style={{ color: "#9fe8ff", marginBottom: 8 }}><strong>{p.username}</strong></div>
                      <div style={{ color: "#dff8ff", whiteSpace: "pre-wrap" }}>{p.content}</div>

                      {/* Likes */}
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
                        <button onClick={() => handleLike(p.id)} style={{ ...styles.postBtn, padding: '4px 8px', fontSize: 13 }}>❤️ Like</button>
                        <span style={{ fontSize: 13, color: '#dff8ff' }}>{p.upvotes || 0}</span>
                      </div>

                      {/* Replies */}
                      {p.replies?.map((r, i) => (
                        <div key={i} style={{ paddingLeft: 12, fontSize: 13, marginTop: 4, color: '#bfefff' }}>
                          <strong>{r.author}</strong>: {r.content}
                        </div>
                      ))}

                      {/* Reply Box */}
                      <div style={styles.replyBox}>
                        <input value={repliesDraft[p.id] || ''} onChange={e => setRepliesDraft(prev => ({ ...prev, [p.id]: e.target.value }))} placeholder="Reply..." style={styles.replyInput} />
                        <button onClick={() => handleReply(p.id)} style={styles.postBtn}>Reply</button>
                      </div>
                    </article>
                  ))}
                </section>
              );
            })}
          </div>

          <aside style={styles.sidebar}>
            <h3>Community</h3>
            <p style={styles.small}>Be respectful. Neon UI only.</p>
            <div style={{ marginTop: 12 }}>
              <div style={{ marginBottom: 10, color: "#bfefff" }}><strong>Channels</strong></div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {categories.map(c => <span key={c} style={{ padding: "6px 10px", borderRadius: 999, background: "rgba(0,255,255,0.06)", color: "#00121a", fontWeight: 700 }}>{c}</span>)}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}