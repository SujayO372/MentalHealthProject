import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';

export default function Chatbot() {
  const [recentChats, setRecentChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const [editingChatId, setEditingChatId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  // Load chats on mount
  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem('recentChats')) || [];
    setRecentChats(savedChats);

    if (savedChats.length > 0) {
      setActiveChatId(savedChats[0].id);
      const savedMessages = JSON.parse(localStorage.getItem(`chat_${savedChats[0].id}`)) || [];
      setMessages(savedMessages);
    }
  }, []);

  // Save messages when changed
  useEffect(() => {
    if (activeChatId) {
      localStorage.setItem(`chat_${activeChatId}`, JSON.stringify(messages));
      setRecentChats(prevChats => {
        const updated = prevChats.map(chat =>
          chat.id === activeChatId
            ? { ...chat, lastUpdated: new Date().toLocaleString() }
            : chat
        );
        localStorage.setItem('recentChats', JSON.stringify(updated));
        return updated;
      });
    }
  }, [messages, activeChatId]);

  const handleSend = async () => {
    if (!input.trim()) return;

    let chatId = activeChatId;
    let isNewChat = false;

    // Auto-create chat if none selected
    if (!chatId) {
      chatId = Date.now();
      const newChat = {
        id: chatId,
        title: '', // will set from first user message
        lastUpdated: new Date().toLocaleString()
      };
      const updatedChats = [newChat, ...recentChats];
      setRecentChats(updatedChats);
      localStorage.setItem('recentChats', JSON.stringify(updatedChats));
      setActiveChatId(chatId);
      setMessages([]);
      isNewChat = true;
    }

    const newMsg = {
      isUser: true,
      messageContent: input.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // If first message in chat → set as title
    if (isNewChat) {
      const firstTitle = input.trim().slice(0, 30) + (input.trim().length > 30 ? "..." : "");
      setRecentChats(prevChats => {
        const updated = prevChats.map(chat =>
          chat.id === chatId ? { ...chat, title: firstTitle } : chat
        );
        localStorage.setItem('recentChats', JSON.stringify(updated));
        return updated;
      });
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/query", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input.trim() }),
      });

      const data = await response.json();
      const botMsg = {
        isUser: false,
        messageContent: data?.response?.result?.message?.content ?? "Sorry — I couldn't parse the response.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prevMessages => [...prevMessages, botMsg]);
    } catch (error) {
      console.error('Error fetching response:', error);
      const botMsg = {
        isUser: false,
        messageContent: "Sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prevMessages => [...prevMessages, botMsg]);
    }
  };

  const handleNewChat = () => {
    const newId = Date.now();
    const newChat = { id: newId, title: '', lastUpdated: new Date().toLocaleString() };
    const updatedChats = [newChat, ...recentChats];
    setRecentChats(updatedChats);
    localStorage.setItem('recentChats', JSON.stringify(updatedChats));
    setActiveChatId(newId);
    setMessages([]);
  };

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    const savedMessages = JSON.parse(localStorage.getItem(`chat_${chatId}`)) || [];
    setMessages(savedMessages);
  };

  const handleDeleteChat = (chatId) => {
    const updatedChats = recentChats.filter(chat => chat.id !== chatId);
    setRecentChats(updatedChats);
    localStorage.setItem('recentChats', JSON.stringify(updatedChats));
    localStorage.removeItem(`chat_${chatId}`);

    if (chatId === activeChatId) {
      setActiveChatId(updatedChats.length ? updatedChats[0].id : null);
      setMessages(updatedChats.length ? JSON.parse(localStorage.getItem(`chat_${updatedChats[0].id}`)) || [] : []);
    }
  };

  const handleEditChatTitle = (chat) => {
    setEditingChatId(chat.id);
    setEditingTitle(chat.title);
  };

  const saveChatTitle = () => {
    setRecentChats(prevChats => {
      const updated = prevChats.map(chat =>
        chat.id === editingChatId ? { ...chat, title: editingTitle } : chat
      );
      localStorage.setItem('recentChats', JSON.stringify(updated));
      return updated;
    });
    setEditingChatId(null);
    setEditingTitle('');
  };

  return (
    <>
      <NavBar />
      <div style={{ display: 'flex', height: '90vh' }}>
        {/* Sidebar */}
        <div style={{
          width: '250px',
          borderRight: '1px solid #ccc',
          padding: '20px',
          backgroundColor: '#f8f8f8',
          color: '#000'
        }}>
          <button
            onClick={handleNewChat}
            style={{
              marginBottom: '20px',
              padding: '10px 15px',
              width: '100%',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            Start a New Chat
          </button>
          <h2 style={{ color: '#000' }}>Recent Chats</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {recentChats.map(chat => (
              <li
                key={chat.id}
                style={{
                  marginBottom: '10px',
                  backgroundColor: chat.id === activeChatId ? '#e0e0e0' : 'transparent',
                  padding: '5px',
                  borderRadius: '5px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ flex: 1, cursor: 'pointer' }}>
                  {editingChatId === chat.id ? (
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onBlur={saveChatTitle}
                      onKeyDown={(e) => e.key === 'Enter' && saveChatTitle()}
                      autoFocus
                      style={{ width: '100%', padding: '5px' }}
                    />
                  ) : (
                    <strong
                      style={{ color: '#000' }}
                      onDoubleClick={() => handleEditChatTitle(chat)}
                      onClick={() => handleSelectChat(chat.id)}
                    >
                      {chat.title || "Untitled Chat"}
                    </strong>
                  )}
                  <br />
                  <small style={{ color: '#555' }}>{chat.lastUpdated}</small>
                </div>
                <button
                  onClick={() => handleDeleteChat(chat.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'red',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    marginLeft: '5px'
                  }}
                  title="Delete chat"
                >
                  🗑
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h1 style={{
            padding: '20px',
            backgroundColor: '#007bff',
            color: '#fff',
            margin: 0
          }}>
            Speak to an AI
          </h1>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            backgroundColor: '#eee'
          }}>
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#666', marginTop: '50px' }}>
                <p style={{ margin: 0, fontSize: '18px' }}>No messages yet — say hi 👋</p>
                <p style={{ marginTop: '8px' }}>Type a message below to start the conversation.</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <Message
                  key={index}
                  isUser={msg.isUser}
                  messageContent={msg.messageContent}
                  timestamp={msg.timestamp}
                />
              ))
            )}
          </div>

          {/* Input */}
          <div style={{
            display: 'flex',
            padding: '10px 20px',
            borderTop: '1px solid #ccc',
            backgroundColor: '#fff'
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Send a message..."
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                marginRight: '10px',
                color: '#000'
              }}
            />
            <button
              onClick={handleSend}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px'
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

function Message({ isUser, messageContent, timestamp }) {
  return (
    <div style={{
      textAlign: isUser ? 'right' : 'left',
      margin: '10px 0',
      background: isUser ? '#dcf8c6' : '#f1f0f0',
      padding: '10px',
      borderRadius: '10px',
      maxWidth: '60%',
      marginLeft: isUser ? 'auto' : '0',
      marginRight: isUser ? '0' : 'auto',
      color: '#000'
    }}>
      <p style={{ color: '#000', margin: 0 }}>{messageContent}</p>
      <small style={{ color: '#333' }}>{timestamp}</small>
    </div>
  );
}