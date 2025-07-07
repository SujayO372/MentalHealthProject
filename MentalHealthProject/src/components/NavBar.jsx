import { Link } from "react-router";

export default function NavBar() {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#eee" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
      <Link to="/chatbot" style={{ marginRight: "1rem" }}>Chatbot</Link>
      <Link to="/checkin" style={{ marginRight: "1rem" }}>Checkin</Link>
      <Link to="/healthtest" style={{ marginRight: "1rem" }}>HealthTest</Link>
      <Link to="/hotlines" style={{ marginRight: "1rem" }}>Hotlines</Link>
    </nav>
  );
}


