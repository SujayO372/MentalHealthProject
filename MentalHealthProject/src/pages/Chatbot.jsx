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
        const topicRes = await fetch("http://127.0.0.1:5000/get-topic", {
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
      const response = await fetch("http://127.0.0.1:5000/query", {
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

  return (
    <>
      <NavBar />
      <div style={{ backgroundColor: '#e3f2fd', minHeight: '100vh', padding: '40px' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          gap: '30px',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: '#0d47a1',
        }}>
          {/* Sidebar */}
          <div style={{
            flex: 0.3,
            backgroundColor: '#bbdefb',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 0 10px rgba(13, 71, 161, 0.15)',
            minWidth: '280px',
            display: 'flex',
            flexDirection: 'column',
            color: '#0d47a1',
          }}>
            <button
              onClick={handleNewChat}
              style={{
                padding: '12px',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                marginBottom: '20px',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(25, 118, 210, 0.4)',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0d47a1'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1976d2'}
            >
              ➕ New Chat
            </button>
            <h3 style={{ marginBottom: '10px' }}>Recent Chats</h3>
            <small style={{ color: '#1976d2', fontSize: '12px', marginBottom: '10px' }}>
              Double click to rename
            </small>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: 0, overflowY: 'auto', flex: 1 }}>
              {recentChats.map(chat => (
                <li
                  key={chat.id}
                  style={{
                    backgroundColor: chat.id === activeChatId ? '#1976d2' : 'transparent',
                    color: chat.id === activeChatId ? 'white' : '#0d47a1',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: chat.id === activeChatId ? '0 4px 12px rgba(25, 118, 210, 0.6)' : 'none',
                    transition: 'background-color 0.3s ease, color 0.3s ease',
                  }}
                  onClick={() => handleSelectChat(chat.id)}
                  onDoubleClick={() => handleEditChatTitle(chat)}
                >
                  {editingChatId === chat.id ? (
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onBlur={saveChatTitle}
                      onKeyDown={(e) => e.key === 'Enter' && saveChatTitle()}
                      autoFocus
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        borderRadius: '5px',
                        border: '1px solid #1976d2',
                        fontSize: '14px',
                        color: '#0d47a1',
                      }}
                    />
                  ) : (
                    <span style={{ flex: 1, fontWeight: '600' }}>
                      {chat.title || <em style={{ color: '#90caf9' }}>Untitled Chat</em>}
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat.id);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: chat.id === activeChatId ? 'white' : '#0d47a1',
                      fontSize: '18px',
                      cursor: 'pointer',
                      padding: 0,
                      marginLeft: '10px',
                    }}
                    title="Delete chat"
                  >
                    ✖
                  </button>
                </li>
              ))}
              {recentChats.length === 0 && (
                <li style={{ color: '#1976d2', fontStyle: 'italic' }}>
                  No chats yet. Start a new chat!
                </li>
              )}
            </ul>
          </div>

          {/* Chat window */}
          <div style={{
            flex: 0.7,
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '25px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 0 20px rgba(25, 118, 210, 0.2)',
            minHeight: '70vh',
            color: '#0d47a1',
          }}>
            <h2 style={{ marginBottom: '15px', borderBottom: '2px solid #1976d2', paddingBottom: '8px' }}>
              {activeChat ? activeChat.title || "New Chat" : "Select or Start a Chat"}
            </h2>
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px', paddingRight: '10px' }}>
              {messages.length === 0 && (
                <p style={{ fontStyle: 'italic', color: '#90caf9' }}>
                  No messages yet. Say hello!
                </p>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    maxWidth: '70%',
                    marginBottom: '15px',
                    padding: '12px 18px',
                    borderRadius: '15px',
                    backgroundColor: msg.isUser ? '#1976d2' : '#bbdefb',
                    color: msg.isUser ? 'white' : '#0d47a1',
                    alignSelf: msg.isUser ? 'flex-end' : 'flex-start',
                    boxShadow: msg.isUser
                      ? '0 4px 12px rgba(25, 118, 210, 0.5)'
                      : '0 4px 8px rgba(187, 222, 251, 0.5)',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {msg.messageContent}
                  <div style={{ fontSize: '10px', opacity: 0.6, marginTop: '6px', textAlign: 'right' }}>
                    {msg.timestamp}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  borderRadius: '30px',
                  border: '2px solid #1976d2',
                  fontSize: '16px',
                  color: '#f0f0f0ff',
                  outline: 'none',
                  boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#0d47a1'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#1976d2'}
              />
              <button
                onClick={handleSend}
                style={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  fontSize: '22px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(25, 118, 210, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0d47a1'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1976d2'}
                title="Send message"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
