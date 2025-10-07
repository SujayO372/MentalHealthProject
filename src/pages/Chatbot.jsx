import React from 'react';
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

export default function Chatbot() {
  const [recentChats, setRecentChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("recentChats")) || [];
    setRecentChats(savedChats);

    if (savedChats.length > 0) {
      const first = savedChats[0];
      setActiveChatId(first.id);
      const savedMessages = JSON.parse(localStorage.getItem(`chat_${first.id}`)) || [];
      setMessages(savedMessages);
    }
  }, []);

  const persistRecentChats = (updated) => {
    setRecentChats(updated);
    localStorage.setItem("recentChats", JSON.stringify(updated));
  };

  const persistChatMessages = (chatId, msgs) => {
    localStorage.setItem(`chat_${chatId}`, JSON.stringify(msgs));
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();

    let chatId = activeChatId;
    if (!chatId) {
      chatId = Date.now();
      const newChat = { id: chatId, title: "Generating title...", lastUpdated: new Date().toLocaleString() };
      persistRecentChats([newChat, ...recentChats]);
      setActiveChatId(chatId);
      setMessages([]);
    }

    const savedMessages = JSON.parse(localStorage.getItem(`chat_${chatId}`)) || [];
    const isFirstMessage = savedMessages.length === 0;

    const userMsg = {
      isUser: true,
      messageContent: userMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    const newMessages = [...savedMessages, userMsg];
    setMessages(newMessages);
    persistChatMessages(chatId, newMessages);
    setInput("");

    if (isFirstMessage) {
      try {
        const topicRes = await fetch("http://129.153.80.76:5000/get-topic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: userMessage }),
        });

        if (!topicRes.ok) throw new Error(`Topic API ${topicRes.status}`);
        const topicData = await topicRes.json();
        let topicTitle = topicData?.topic?.trim() || "";

        if (!topicTitle) {
          const words = userMessage.split(/\s+/).filter(word => word.length > 2);
          topicTitle = words.slice(0, 3).join(" ");
          if (topicTitle.length > 30) topicTitle = topicTitle.substring(0, 27) + "...";
          if (!topicTitle) topicTitle = "New Chat";
        }

        setRecentChats((prev) => {
          const updated = prev.map((c) =>
            c.id === chatId ? { ...c, title: topicTitle, lastUpdated: new Date().toLocaleString() } : c
          );
          localStorage.setItem("recentChats", JSON.stringify(updated));
          return updated;
        });

      } catch {
        const words = userMessage.split(/\s+/).filter(word => word.length > 2);
        let fallbackTitle = words.slice(0, 3).join(" ");
        if (fallbackTitle.length > 30) fallbackTitle = fallbackTitle.substring(0, 27) + "...";
        if (!fallbackTitle) fallbackTitle = "New Chat";

        setRecentChats((prev) => {
          const updated = prev.map((c) =>
            c.id === chatId ? { ...c, title: fallbackTitle, lastUpdated: new Date().toLocaleString() } : c
          );
          localStorage.setItem("recentChats", JSON.stringify(updated));
          return updated;
        });
      }
    }

    try {
      const response = await fetch("http://129.153.80.76:5000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage }),
      });

      const data = await response.json();
      const botText = data?.response?.result?.message?.content ?? "Sorry — couldn't parse the response.";
      const botMsg = { isUser: false, messageContent: botText, timestamp: new Date().toLocaleTimeString() };

      setMessages((prev) => {
        const updated = [...prev, botMsg];
        persistChatMessages(chatId, updated);
        return updated;
      });

    } catch {
      const botMsg = {
        isUser: false,
        messageContent: "Connection error — please try again.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => {
        const updated = [...prev, botMsg];
        persistChatMessages(chatId, updated);
        return updated;
      });
    }
  };

  const handleNewChat = () => {
    const newId = Date.now();
    const newChat = { id: newId, title: "", lastUpdated: new Date().toLocaleString() };
    persistRecentChats([newChat, ...recentChats]);
    setActiveChatId(newId);
    setMessages([]);
  };

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    const saved = JSON.parse(localStorage.getItem(`chat_${chatId}`)) || [];
    setMessages(saved);
  };

  const handleDeleteChat = (chatId) => {
    const updated = recentChats.filter((c) => c.id !== chatId);
    persistRecentChats(updated);
    localStorage.removeItem(`chat_${chatId}`);
    if (activeChatId === chatId) {
      const next = updated[0];
      setActiveChatId(next ? next.id : null);
      setMessages(next ? JSON.parse(localStorage.getItem(`chat_${next.id}`)) || [] : []);
    }
  };

  const handleEditChatTitle = (chat) => {
    setEditingChatId(chat.id);
    setEditingTitle(chat.title || "");
  };

  const saveChatTitle = () => {
    setRecentChats((prev) => {
      const updated = prev.map((c) =>
        c.id === editingChatId ? { ...c, title: editingTitle, lastUpdated: new Date().toLocaleString() } : c
      );
      localStorage.setItem("recentChats", JSON.stringify(updated));
      return updated;
    });
    setEditingChatId(null);
    setEditingTitle("");
  };

  const activeChat = recentChats.find((c) => c.id === activeChatId);

  const styles = {
    page: {
      paddingTop: '90px',
      minHeight: '100vh',
      background: 'radial-gradient(circle at 10% 10%, rgba(255,0,128,0.06), transparent 15%), radial-gradient(circle at 90% 90%, rgba(0,255,255,0.06), transparent 15%), linear-gradient(180deg, #020014 0%, #080018 100%)',
      color: '#e6f7ff',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      gap: '30px',
      padding: '40px 20px',
      alignItems: 'flex-start',
    },
    sidebar: {
      flex: '0 0 320px',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
      border: '1px solid rgba(0,255,255,0.06)',
      borderRadius: '14px',
      padding: '18px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.5), 0 0 30px rgba(0,255,255,0.02)',
      backdropFilter: 'blur(6px)',
      color: '#cdefff',
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
    },
    newChatBtn: {
      padding: '12px',
      background: 'linear-gradient(45deg, #ff0080, #00ffff)',
      color: '#00121a',
      border: 'none',
      borderRadius: '10px',
      fontWeight: '800',
      marginBottom: '16px',
      cursor: 'pointer',
      boxShadow: '0 6px 20px rgba(0,255,255,0.12), 0 6px 20px rgba(255,0,128,0.08)',
    },
    recentTitle: {
      marginBottom: '6px',
      color: '#bfefff',
    },
    smallHint: {
      color: '#7fe6ff',
      fontSize: '12px',
      marginBottom: '10px',
    },
    chatList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      overflowY: 'auto',
      flex: 1,
    },
    chatListItem: (active) => ({
      background: active ? 'linear-gradient(90deg, rgba(0,255,255,0.12), rgba(255,0,128,0.08))' : 'transparent',
      color: active ? '#00121a' : '#cdefff',
      padding: '10px 12px',
      borderRadius: '10px',
      marginBottom: '10px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: active ? '1px solid rgba(0,255,255,0.18)' : '1px solid transparent',
      boxShadow: active ? '0 6px 18px rgba(0,255,255,0.06)' : 'none',
      fontWeight: 600,
      transition: 'all 0.18s ease',
    }),
    deleteBtn: (active) => ({
      background: 'transparent',
      border: 'none',
      color: active ? '#00121a' : '#ff9aa2',
      fontWeight: '700',
      cursor: 'pointer',
      marginLeft: '8px',
    }),
    chatArea: {
      flex: 1,
      background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
      borderRadius: '14px',
      display: 'flex',
      flexDirection: 'column',
      height: '75vh',
      overflow: 'hidden',
      border: '1px solid rgba(0,255,255,0.04)',
      boxShadow: '0 10px 40px rgba(0,0,0,0.6), 0 0 30px rgba(255,0,128,0.02)',
      position: 'relative',
    },
    messagesWrap: {
      flex: 1,
      padding: '22px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      backgroundImage: 'radial-gradient( circle at 10% 10%, rgba(255,0,128,0.02), transparent 10%), radial-gradient(circle at 90% 90%, rgba(0,255,255,0.02), transparent 10%)',
    },
    userBubble: {
      maxWidth: '70%',
      padding: '12px 16px',
      borderRadius: '14px',
      background: 'linear-gradient(90deg, #00c3ff 0%, #0072ff 100%)',
      color: '#00121a',
      fontSize: '15px',
      lineHeight: '1.4',
      boxShadow: '0 6px 30px rgba(0,120,255,0.12), 0 0 40px rgba(0,255,255,0.06)',
      whiteSpace: 'pre-wrap',
    },
    botBubble: {
      maxWidth: '70%',
      padding: '12px 16px',
      borderRadius: '14px',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
      border: '1px solid rgba(0,255,255,0.06)',
      color: '#e6f7ff',
      fontSize: '15px',
      lineHeight: '1.5',
      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.4), 0 6px 20px rgba(0,0,0,0.2)',
      whiteSpace: 'pre-wrap',
    },
    timeText: {
      fontSize: '11px',
      opacity: 0.6,
      marginTop: '6px',
      textAlign: 'right',
    },
    inputRow: {
      display: 'flex',
      padding: '14px',
      borderTop: '1px solid rgba(0,255,255,0.03)',
      background: 'linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.01))',
      alignItems: 'center',
      gap: '10px',
    },
    input: {
      flex: 1,
      padding: '12px 16px',
      borderRadius: '28px',
      border: '1px solid rgba(0,255,255,0.06)',
      outline: 'none',
      fontSize: '15px',
      background: 'rgba(255,255,255,0.02)',
      color: '#e6f7ff',
      boxShadow: '0 6px 20px rgba(0,255,255,0.02)',
    },
    sendBtn: {
      padding: '12px 18px',
      background: 'linear-gradient(45deg, #ff0080, #00ffff)',
      color: '#00121a',
      border: 'none',
      borderRadius: '24px',
      fontWeight: '800',
      cursor: 'pointer',
      boxShadow: '0 8px 30px rgba(255,0,128,0.08), 0 8px 30px rgba(0,255,255,0.08)',
    },
    neonOverlay: {
      position: 'fixed',
      top: '90px',
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 0,
      background: 'radial-gradient(circle at 15% 10%, rgba(255,0,128,0.05) 0%, transparent 20%), radial-gradient(circle at 85% 90%, rgba(0,255,255,0.05) 0%, transparent 20%)',
      mixBlendMode: 'screen',
    }
  };

  return (
    <>
      <NavBar />
      <div style={styles.page}>
        <div style={styles.neonOverlay} />

        <div style={styles.container}>
          {/* Sidebar */}
          <div style={styles.sidebar}>
            <button onClick={handleNewChat} style={styles.newChatBtn}>
              ➕ New Chat
            </button>
            <h3 style={styles.recentTitle}>Recent Chats</h3>
            <small style={styles.smallHint}>Double click to rename</small>

            <ul style={styles.chatList}>
              {recentChats.map(chat => {
                const active = chat.id === activeChatId;
                return (
                  <li
                    key={chat.id}
                    style={styles.chatListItem(active)}
                    onClick={() => handleSelectChat(chat.id)}
                    onDoubleClick={() => handleEditChatTitle(chat)}
                  >
                    {editingChatId === chat.id ? (
                      <input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onBlur={saveChatTitle}
                        onKeyDown={(e) => e.key === 'Enter' && saveChatTitle()}
                        autoFocus
                        style={{
                          padding: '6px 8px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.06)',
                          width: '100%',
                          color: '#00121a',
                          background: 'rgba(255,255,255,0.9)'
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          flex: 1,
                          marginRight: '10px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          color: chat.title ? undefined : '#7fe6ff',
                          fontStyle: chat.title ? 'normal' : 'italic'
                        }}
                      >
                        {chat.title || "Untitled"}
                      </span>
                    )}

                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteChat(chat.id); }}
                      style={styles.deleteBtn(active)}
                    >
                      ✕
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Chat Area */}
          <div style={styles.chatArea}>
            <div style={{
              padding: '14px 22px',
              borderBottom: '1px solid rgba(0,255,255,0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.01), rgba(255,255,255,0.00))',
            }}>
              <div>
                <div style={{ fontWeight: 800, color: '#e6f7ff' }}>{activeChat?.title || "New Chat"}</div>
                <div style={{ fontSize: '12px', opacity: 0.7, color: '#9fe8ff' }}>{activeChat?.lastUpdated || ""}</div>
              </div>
              <div style={{ fontSize: '12px', color: '#9fe8ff' }}>NEON MODE</div>
            </div>

            <div style={styles.messagesWrap} id="messagesWrap">
              {messages.map((msg, i) => (
                <div key={i} style={{ alignSelf: msg.isUser ? 'flex-end' : 'flex-start' }}>
                  <div style={msg.isUser ? styles.userBubble : styles.botBubble}>
                    {msg.messageContent}
                    <div style={styles.timeText}>{msg.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.inputRow}>
              <input
                style={styles.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
              />
              <button onClick={handleSend} style={styles.sendBtn}>Send</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes neonPulse {
          0%,100% {
            filter: drop-shadow(0 0 6px rgba(0,255,255,0.08))
                    drop-shadow(0 0 10px rgba(255,0,128,0.04));
          }
          50% {
            transform: translateY(-2px);
            filter: drop-shadow(0 0 12px rgba(0,255,255,0.12))
                    drop-shadow(0 0 18px rgba(255,0,128,0.08));
          }
        }

        #messagesWrap {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
}
