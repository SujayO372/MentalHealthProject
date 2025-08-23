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
      <div style={{ backgroundColor: '#f7f7f8', minHeight: '100vh', padding: '40px' }}>
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
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0,0,0,0.05)',
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
              }}
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
                  }}
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
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        width: '100%',
                      }}
                    />
                  ) : (
                    <span style={{ flex: 1, marginRight: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {chat.title || "Untitled"}
                    </span>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteChat(chat.id); }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: chat.id === activeChatId ? 'white' : '#d32f2f',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Chat Area */}
          <div style={{
            flex: 1,
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            height: '80vh',
            boxShadow: '0 0 15px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: msg.isUser ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div style={{
                    maxWidth: '70%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    backgroundColor: msg.isUser ? '#0b93f6' : '#e5e5ea',
                    color: msg.isUser ? 'white' : '#000',
                    fontSize: '15px',
                    lineHeight: '1.4',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {msg.messageContent}
                    <div style={{
                      fontSize: '11px',
                      opacity: 0.5,
                      marginTop: '4px',
                      textAlign: 'right',
                    }}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{
              display: 'flex',
              padding: '12px 20px',
              borderTop: '1px solid #ddd',
              backgroundColor: '#f7f7f8',
            }}>
              <input
  type="text"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
  placeholder="Type your message..."
  style={{
    flex: 1,
    padding: '12px 16px',
    borderRadius: '25px',
    border: '1px solid #ccc',
    outline: 'none',
    fontSize: '15px',
    marginRight: '10px',
    backgroundColor: 'white',
    color: '#000', // ensures black text while typing
  }}
/>

              <button
                onClick={handleSend}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#0b93f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
