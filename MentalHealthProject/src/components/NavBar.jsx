import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#eee" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>Chatbot</Link>
      <Link to="/checkin" style={{ marginRight: "1rem" }}>Checkin</Link>
      <Link to="/healthtest" style={{ marginRight: "1rem" }}>HealthTest</Link>
      <Link to="/hotlines" style={{ marginRight: "1rem" }}>Hotlines</Link>
    </nav>
  );
}

