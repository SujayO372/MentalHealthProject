import { useState } from 'react';
import NavBar from '../components/NavBar';

const recentChats = [
  { id: 1, title: "Therapy Chat", lastUpdated: "10:42 AM" },
  { id: 2, title: "Motivation", lastUpdated: "Yesterday" },
  { id: 3, title: "Daily Check-in", lastUpdated: "Monday" },
];

export default function Chatbot() {
  const [messages, setMessages] = useState([]); // <- start empty
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMsg = {
      isUser: true,
      messageContent: input.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    // Add user message immediately for snappy UI
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    try {
      const response = await fetch("http://127.0.0.1:5000/query", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input.trim() }),
      });

      const data = await response.json();
      const botMsg = {
        isUser: false,
        // defend against unexpected response shapes:
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
          <button style={{
            marginBottom: '20px',
            padding: '10px 15px',
            width: '100%',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}>Start a New Chat</button>
          <h2 style={{ color: '#000' }}>Recent Chats</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {recentChats.map(chat => (
              <li key={chat.id} style={{ marginBottom: '10px', cursor: 'pointer' }}>
                <strong style={{ color: '#000' }}>{chat.title}</strong>
                <br />
                <small style={{ color: '#555' }}>{chat.lastUpdated}</small>
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

          {/* Message List */}
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

          {/* Message Input Bar */}
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
