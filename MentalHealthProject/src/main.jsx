import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home.jsx'
import Chatbot from './pages/Chatbot.jsx'
import Checkin from './pages/Checkin.jsx'
import HealthTest from './pages/HealthTest.jsx'
import Hotlines from './pages/Hotlines.jsx'
import './index.css'

const root = document.getElementById('root');
createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="chatbot" element={<Chatbot />} />
        <Route path="checkin" element={<Checkin />} />
        <Route path="healthtest" element={<HealthTest />} />
        <Route path="hotlines" element={<Hotlines />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)