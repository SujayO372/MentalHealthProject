import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home.jsx'
import Chatbot from './pages/Chatbot.jsx'
import Checkin from './pages/Checkin.jsx'
import HealthTest from './pages/HealthTest.jsx'
import Signup from './pages/Signup.jsx';
import './index.css'
import Login from './pages/Login.jsx'
import Settings from './pages/Settings.jsx'
import Maps from './pages/Maps.jsx' // Import the Maps component
import { AuthProvider } from './context/AuthContext.jsx'
const root = document.getElementById('root');
createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path="chatbot" element={<Chatbot />} />
        <Route path="checkin" element={<Checkin />} />
        <Route path="healthtest" element={<HealthTest />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="settings" element={<Settings />} />
        <Route path="maps" element={<Maps />} /> 
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)