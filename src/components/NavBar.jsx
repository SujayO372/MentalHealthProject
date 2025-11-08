import React from "react";
import { useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Serene AI", href: "/chatbot" },
    { name: "Check In", href: "/checkin" },
    { name: "Assess your Health", href: "/healthtest" },
    { name: "Hotline Forum", href: "/hotlines" },
    { name: "Find Help", href: "/search" },
    { name: "Log in", href: "/login" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <nav
      style={{
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "center",
        gap: "2.5rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(25px) saturate(180%)",
        backgroundColor: "rgba(10, 10, 15, 0.9)",
        boxShadow: "0 8px 24px rgba(0,245,255,0.15)",
        borderBottom: "1px solid rgba(0, 245, 255, 0.3)",
        borderRadius: "0 0 16px 16px",
        transition: "background 0.3s ease",
      }}
    >
      {navItems.map(({ name, href }) => {
        const isActive = location.pathname === href;

        return (
          <a
            key={name}
            href={href}
            style={{
              position: "relative",
              color: isActive ? "#00f5ff" : "#d0d0d0",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "1rem",
              padding: "0.3rem 0",
              transition: "color 0.3s ease",
            }}
          >
            {name}
            <span
              style={{
                position: "absolute",
                bottom: "-3px",
                left: 0,
                height: "2px",
                width: isActive ? "100%" : "0%",
                backgroundColor: "#00f5ff",
                boxShadow: "0 0 8px #00f5ff, 0 0 12px #00f5ff",
                transition: "width 0.3s ease",
              }}
              className="underline"
            />
          </a>
        );
      })}

      <style>
        {`
          a:hover {
            color: #00f5ff !important;
          }
          a:hover span {
            width: 100% !important;
          }
        `}
      </style>
    </nav>
  );
}