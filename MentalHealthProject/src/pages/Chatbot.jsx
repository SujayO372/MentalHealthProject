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
      <div style={{ display: "flex", height: "90vh", fontFamily: "Tahoma" }}>
        {/* Sidebar */}
        <div style={{ width: "260px", borderRight: "1px solid #ccc", background: "#f4f4f4", padding: "12px" }}>
          <button
            onClick={handleNewChat}
            style={{
              width: "100%",
              padding: "10px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              marginBottom: "12px",
              cursor: "pointer"
            }}
          >
            ➕ New Chat
          </button>
          <h3 style={{ color: "#333", marginBottom: "4px" }}>Recent Chats</h3>
          <small style={{ color: "#777", fontSize: "12px" }}>
            Double click on a chat title to rename
          </small>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "8px" }}>
            {recentChats.map((chat) => (
              <li
                key={chat.id}
                style={{
                  background: chat.id === activeChatId ? "#dfeeff" : "transparent",
                  padding: "6px",
                  borderRadius: "6px",
                  marginBottom: "6px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div style={{ flex: 1, cursor: "pointer" }}>
                  {editingChatId === chat.id ? (
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onBlur={saveChatTitle}
                      onKeyDown={(e) => e.key === "Enter" && saveChatTitle()}
                      autoFocus
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <div
                      onClick={() => handleSelectChat(chat.id)}
                      onDoubleClick={() => handleEditChatTitle(chat)}
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      {chat.title || "Untitled Chat"}
                    </div>
                  )}
                  <small style={{ color: "#555" }}>{chat.lastUpdated}</small>
                </div>
                <button
                  onClick={() => handleDeleteChat(chat.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "red",
                    cursor: "pointer",
                    marginLeft: "8px"
                  }}
                  title="Delete chat"
                >
                  🗑
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px", background: "#007bff", color: "#fff", fontWeight: "700" }}>
            {activeChat?.title ? activeChat.title : "Speak to an AI"}
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "15px", background: "#e9ecef" }}>
            {messages.length === 0 ? (
              <div style={{ textAlign: "center", color: "#666", marginTop: "50px" }}>
                <p>No messages yet — say hi 👋</p>
                <p>Type a message below to start chatting.</p>
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} style={{ margin: "10px 0", textAlign: m.isUser ? "right" : "left" }}>
                  <div
                    style={{
                      display: "inline-block",
                      background: m.isUser ? "#dcf8c6" : "#fff",
                      padding: "10px",
                      borderRadius: "10px",
                      maxWidth: "70%",
                      color: "#000"
                    }}
                  >
                    <p style={{ margin: 0 }}>{m.messageContent}</p>
                    <small style={{ color: "#666" }}>{m.timestamp}</small>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ display: "flex", padding: "12px", borderTop: "1px solid #ccc", background: "#fff" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc"
              }}
            />
            <button
              onClick={handleSend}
              style={{
                padding: "10px 18px",
                background: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                marginLeft: "8px",
                cursor: "pointer"
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
