import React from 'react';

export default function NavBar() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Serene AI", href: "/chatbot" },
    { name: "Daily CheckIn", href: "/checkin" },
    { name: "Assess your Health", href: "/healthtest" },
    { name: "Hotline Forum", href: "/maps" },
    { name: "Sign up", href: "/signup" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <nav style={{
      padding: "1rem 2rem",
      display: "flex",
      justifyContent: "center",
      gap: "2.5rem",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      backdropFilter: "blur(25px) saturate(180%)", // much stronger blur
      backgroundColor: "rgba(31, 41, 55, 0.35)", // more transparent
      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
      borderRadius: "0 0 16px 16px",
      transition: "background 0.3s ease",
    }}>
      {navItems.map(({ name, href }) => (
        <a
          key={name}
          href={href}
          style={{
            position: "relative",
            color: "#f9fafb",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "1rem",
            padding: "0.3rem 0",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#50e3c2";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#f9fafb";
          }}
        >
          {name}
          <span
            style={{
              position: "absolute",
              bottom: "-3px",
              left: 0,
              height: "2px",
              width: "0%",
              backgroundColor: "#50e3c2",
              boxShadow: "0 0 6px #50e3c2",
              transition: "width 0.3s ease",
            }}
            className="underline"
          />
        </a>
      ))}
      <style>
        {`
          a:hover span {
            width: 100%;
          }
        `}
      </style>
    </nav>
  );
}
