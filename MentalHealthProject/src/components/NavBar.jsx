import React from 'react';

export default function NavBar() {
  return (
    <nav style={{
      padding: "1rem 2rem",
      backgroundColor: "#2c3e50",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      display: "flex",
      justifyContent: "center",
      gap: "2rem",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}>
      {[
        { name: "Home", href: "/" },
        { name: "Speak with an AI", href: "/chatbot" },
        { name: "Check In", href: "/checkin" },
        { name: "Take a Health Test", href: "/healthtest" },
        { name: "Hotlines", href: "/hotlines" },
        { name: "Sign In/Up", href: "/signup" },
        { name: "Settings", href: "/settings" },
         // ✅ new link
      ].map(({ name, href }) => (
        <a
          key={name}
          href={href}
          style={{
            color: "#ecf0f1",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "1.1rem",
            padding: "0.3rem 0.6rem",
            borderRadius: "5px",
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#50e3c2";
            e.target.style.color = "#2c3e50";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#ecf0f1";
          }}
        >
          {name}
        </a>
      ))}
    </nav>
  );
}
