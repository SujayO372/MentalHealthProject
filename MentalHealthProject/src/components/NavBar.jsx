import { Link } from "react-router";

export default function NavBar() {
  return (
    <nav style={{
      padding: "1rem 2rem",
      backgroundColor: "#2c3e50", // dark blue-gray for calmness
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      display: "flex",
      justifyContent: "center",
      gap: "2rem",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}>
      {["Home", "Chatbot", "Checkin", "HealthTest", "Hotlines"].map((page) => (
        <Link
          key={page}
          to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
          style={{
            color: "#ecf0f1", // light gray text
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "1.1rem",
            padding: "0.3rem 0.6rem",
            borderRadius: "5px",
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#50e3c2"; // teal highlight on hover
            e.target.style.color = "#2c3e50"; // dark text on hover
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#ecf0f1";
          }}
        >
          {page}
        </Link>
      ))}
    </nav>
  );
}
