import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import JournalPage from './pages/JournalPage'; // ✅ add this
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        <Navbar />
        <div className="py-10 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journal" element={<JournalPage />} /> {/* ✅ new route */}
          </Routes>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
      </div>
    </Router>
  );
}

export default App;