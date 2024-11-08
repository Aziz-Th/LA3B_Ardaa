// App.js
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import ardaaImage from './ardaa.jpeg'; // Import the image
import logoImage from './Ardaa.png'; // Import the logo image

function App() {
  const [isChatActive, setChatActive] = useState(false);

  // Trigger ChatInterface with initial search query
  const handleSearch = (query) => {
    setChatActive(true);
  };

  return (
    <div className="app-container">
      <Header />

      <div className="wide-image-container">
        <img src={ardaaImage} alt="Wide decorative image" className="wide-image" />
        {/* <div className="logo-overlay">
          <img src={logoImage} alt="Logo" className="logo-image" />
        </div> */}
        <div className="gradient-overlay"></div>
      </div>

      <div className={`search-section ${isChatActive ? 'chat-active' : ''}`}>
        {!isChatActive && (
          <div>
            <button className="search-button" onClick={() => handleSearch("Welcome!")}>
               تحدث مع علام
            </button>
          </div>
        )}
      </div>

      {isChatActive && (
        <div className="chat-section">
          <ChatInterface />
        </div>
      )}
    </div>
  );
}

export default App;
