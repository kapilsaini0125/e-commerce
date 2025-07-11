import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import Login from './components/login';




function App() {
 const [currentUser, setCurrentUser] = useState(null)
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element= {currentUser ? <Navigate to= '/dashboard'/>: <Navigate to= '/signup'/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
          </BrowserRouter>
       
    </>
  )
}

export default App
