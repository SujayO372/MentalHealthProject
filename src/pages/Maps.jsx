import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabase.js";

export default function ForumNeon() {
  const { user, loading, signIn, signOut } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("General");
  const [repliesDraft, setRepliesDraft] = useState({});

  // initial fetch
  useEffect(() => {
    let mounted = true;
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("timestamp", { ascending: false });
      if (!error && mounted) setPosts(data || []);
    };
    fetchPosts();
    return () => { mounted = false; };
  }, []);

  // realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('public-posts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, (payload) => {
        const row = payload.new;
        setPosts(prev => prev.find(p => p.id === row.id) ? prev : [row, ...prev]);
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'posts' }, (payload) => {
        const row = payload.new;
        setPosts(prev => prev.map(p => (p.id === row.id ? row : p)));
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'posts' }, (payload) => {
        const deleted = payload.old;
        setPosts(prev => prev.filter(p => p.id !== deleted.id));
      })
      .subscribe();

    return () => { try { channel.unsubscribe(); } catch (e) {} };
  }, []);

  const handlePost = async () => {
    if (!newPost.trim() || !user) return;
    if (!newTitle.trim()) { alert('Please enter a title'); return; }
    if (!confirm('This post will be public. Post anyway?')) return;

    const post = {
      content: newPost.trim(),
      timestamp: new Date().toISOString(),
      username: user.email,
      upvotes: 0,
      categories: newCategory || 'General',
      title: newTitle.trim()
    };

    const { data, error } = await supabase.from("posts").insert(post).select().single();
    if (!error && data) setPosts(prev => prev.find(p => p.id === data.id) ? prev : [data, ...prev]);
    else alert('Failed to post');
    console.log(error);
    setNewPost("");
    setNewTitle("");
    setNewCategory('General');
  };
    

  const handleReply = async (postId) => {
    const text = (repliesDraft[postId] || '').trim();
    if (!text || !user) return;
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const updatedReplies = [...(post.replies || []), { content: text, author: user.email, timestamp: new Date().toISOString() }];
    const { error } = await supabase.from("posts").update({ replies: updatedReplies }).eq("id", postId);

    if (!error) {
      setPosts(prev => prev.map(p => (p.id === postId ? { ...p, replies: updatedReplies } : p)));
      setRepliesDraft(prev => { const copy = {...prev}; delete copy[postId]; return copy; });
    }
  };

  const handleDeletePost = async (postId) => {
    const post = posts.find(p => p.id === postId);
    if (!post || post.author !== user.id) { alert('Can only delete your posts'); return; }
    if (!confirm('Delete this post?')) return;

    const { error } = await supabase.from('posts').delete().eq('id', postId).select().single();
    if (!error) setPosts(prev => prev.filter(p => p.id !== postId));
    else alert('Failed to delete');
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return (
    <div style={{ padding: 50, textAlign: "center" }}>
      <h2>Please log in</h2>
      <button onClick={() => signIn("YOUR_EMAIL", "YOUR_PASSWORD")} style={{ padding: "12px 24px", borderRadius: 12 }}>Sign In</button>
    </div>
  );

  const styles = {
    page: { paddingTop: 90, minHeight: '100vh', background: "radial-gradient(circle at 10% 10%, rgba(255,0,128,0.06), transparent 15%), radial-gradient(circle at 90% 90%, rgba(0,255,255,0.06), transparent 15%), linear-gradient(180deg, #020014 0%, #080018 100%)", color: '#e6f7ff', fontFamily: "'Inter', sans-serif", padding: '40px 20px' },
    container: { maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28, alignItems: 'start' },
    feed: { background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', borderRadius: 14, padding: 18, border: '1px solid rgba(0,255,255,0.04)', boxShadow: '0 10px 40px rgba(0,0,0,0.6), 0 0 30px rgba(255,0,128,0.02)' },
    sidebar: { background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', borderRadius: 14, padding: 16, border: '1px solid rgba(0,255,255,0.04)', height: 'fit-content' },
    inputLarge: { width: '100%', padding: 12, borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', color: '#e6f7ff', fontSize: 15, marginBottom: 8 },
    inputSmall: { padding: 10, borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', color: '#e6f7ff', fontSize: 14, marginBottom: 8 },
    postBtn: { padding: '10px 14px', borderRadius: 10, border: 'none', background: 'linear-gradient(45deg, #ff0080, #00ffff)', color: '#00121a', fontWeight: 800, cursor: 'pointer' },
    deleteBtn: { padding: '6px 10px', borderRadius: 8, border: 'none', background: 'linear-gradient(45deg, #ff6b6b, #ff9a9a)', color: '#fff', cursor: 'pointer', fontWeight: 700 },
    postCard: { borderRadius: 12, padding: 14, marginBottom: 12, background: 'linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0))', border: '1px solid rgba(0,255,255,0.04)' },
    authorRow: { display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: '#9fe8ff' },
    replyBox: { display: 'flex', gap: 8, marginTop: 10 },
    replyInput: { flex: 1, padding: 8, borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', color: '#e6f7ff' },
    small: { color: '#bfefff', fontSize: 12 },
    neonOverlay: { position: 'fixed', top: 90, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(circle at 15% 10%, rgba(255,0,128,0.05) 0%, transparent 20%), radial-gradient(circle at 85% 90%, rgba(0,255,255,0.05) 0%, transparent 20%)', mixBlendMode: 'screen' }
  };

  const preferredCategories = ['Announcements', 'General', 'Help', 'Off-topic'];
  const otherCategories = Array.from(new Set(posts.map(p => p.categories).filter(c => c && !preferredCategories.includes(c))));
  const allCategories = [...preferredCategories, ...otherCategories];

  return (
    <>
      <NavBar />
      <div style={styles.page}>
        <div style={styles.neonOverlay} />

        <div style={styles.container}>
          <div style={styles.feed}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h2 style={{ margin: 0 }}>Welcome, {user.email}</h2>
              <button onClick={signOut} style={{ ...styles.postBtn, padding: '8px 10px' }}>Sign Out</button>
            </div>

            <div style={{ marginBottom: 18 }}>
              <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Title" style={styles.inputSmall} />
              <select value={newCategory} onChange={e => setNewCategory(e.target.value)} style={styles.inputSmall}>
                <option>General</option><option>Help</option><option>Off-topic</option><option>Announcements</option>
              </select>
              <textarea value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="Write something..." style={styles.inputLarge} rows={3} />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}><button onClick={handlePost} style={styles.postBtn}>Post</button></div>
            </div>

            {allCategories.map(cat => {
              const catPosts = posts.filter(p => (p.categories || 'General') === cat);
              if (!catPosts.length) return null;
              return (
                <section key={cat} style={{ marginBottom: 18 }}>
                  <h3 style={{ color: '#bff4ff', marginBottom: 10 }}>{cat}</h3>
                  {catPosts.map(p => (
                    <article key={p.id} style={styles.postCard}>
                      <div style={styles.authorRow}>
                        <div style={{ fontWeight: 800 }}>{p.title}</div>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                          <div style={{ fontSize: 12, opacity: 0.8 }}>{new Date(p.timestamp).toLocaleString()}</div>
                          {p.author === user.id && <button onClick={() => handleDeletePost(p.id)} style={styles.deleteBtn}>Delete</button>}
                        </div>
                      </div>

                      <div style={{ color: '#9fe8ff', marginBottom: 8 }}><strong>{p.username}</strong> · <span style={{ fontSize: 13, color: '#dff8ff' }}>{p.categories}</span></div>
                      <div style={{ color: '#dff8ff', whiteSpace: 'pre-wrap' }}>{p.content}</div>

                      <div style={styles.replyBox}>
                        <input value={repliesDraft[p.id] || ''} onChange={e => setRepliesDraft(prev => ({ ...prev, [p.id]: e.target.value }))} placeholder="Reply..." style={styles.replyInput} />
                        <button onClick={() => handleReply(p.id)} style={styles.postBtn}>Reply</button>
                      </div>
                    </article>
                  ))}
                </section>
              )
            })}
          </div>

          <aside style={styles.sidebar}>
            <h3>Community</h3>
            <p style={styles.small}>Be respectful. Neon UI only.</p>
            <div style={{ marginTop: 12 }}>
              <div style={{ marginBottom: 10, color: '#bfefff' }}><strong>Channels</strong></div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{allCategories.map(c => <span key={c} style={{ padding: '6px 10px', borderRadius: 999, background: 'rgba(0,255,255,0.06)', color: '#00121a', fontWeight: 700 }}>{c}</span>)}</div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
