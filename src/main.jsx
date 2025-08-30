import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Chatbot from './pages/Chatbot.jsx'
import Checkin from './pages/Checkin.jsx'
import HealthTest from './pages/HealthTest.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Settings from './pages/Settings.jsx'
import Maps from './pages/Maps.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'

const root = document.getElementById('root')

createRoot(root).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
