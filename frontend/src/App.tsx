import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chessboard from './components/Chessboard';
import Register from './pages/register/Register';
import Login from './pages/login/Login';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chessboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
