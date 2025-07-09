import NavBar from '../components/NavBar';

const dummyMessages = [
  {
    isUser: true,
    messageContent: "Hi, how are you?",
    timestamp: "10:38:23"
  },
  {
    isUser: false,
    messageContent: "I'm good! How can I support you today?",
    timestamp: "10:39:42"
  },
  {
    isUser: true,
    messageContent: "I'm feeling a bit down lately.",
    timestamp: "10:40:57"
  },
  {
    isUser: false,
    messageContent: "I'm here to help. Would you like to talk about what's been bothering you?",
    timestamp: "10:42:00"
  }
];

export default function Chatbot() {
  const message = {
    isUser: true,
    messageContent: "hi how are you?",
    "time-stamp": "dummy-data",
  };
  

  return (
    <>
      <NavBar />
      <h1>Chatbot Page</h1>

      
    </>
  );
}

/*

*/