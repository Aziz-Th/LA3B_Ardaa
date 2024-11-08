import React, { useState } from 'react';

const ArabicSearchComponent = () => {
  const [isChat, setIsChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (text) => {
    setIsChat(true);
    setMessages([{ text, user: true }]);
    // Simulate LLM response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: 'This is a simulated response from the LLM.', user: false }]);
    }, 1000);
    setInputValue('');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages(prev => [...prev, { text: inputValue, user: true }]);
      setInputValue('');
      // Simulate LLM response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'Another simulated response from the LLM.', user: false }]);
      }, 1000);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <div className="image-container">
          <img src="/api/placeholder/800/300" alt="Group of Arab men" className="main-image" />
          <div className="gradient-overlay"></div>
          <div className="logo">
            <img src="/api/placeholder/50/50" alt="Logo" />
          </div>
        </div>
        
        <div className="title">
          <h1>لاعب العرضة</h1>
        </div>
        
        {isChat ? (
          <div className="chat-container">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.user ? 'user' : 'llm'}`}>
                {message.text}
              </div>
            ))}
          </div>
        ) : (
          <div className="buttons-grid">
            {['ما معنى', 'ما معنى', 'من قائل', 'ما معنى'].map((text, index) => (
              <button key={index} className="grid-button" onClick={() => handleSearch(`${text} ...`)}>
                {text} ...
              </button>
            ))}
          </div>
        )}
        
        <form onSubmit={handleSendMessage} className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder={isChat ? "Type your message..." : "Search..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="search-button">
            {isChat ? 'Send' : 'بحث'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .container {
          background-color: #1a2910;
          color: white;
          min-height: 100vh;
          padding: 1rem;
          display: flex;
          flex-direction: column;
        }
        .content {
          max-width: 48rem;
          margin: 0 auto;
          position: relative;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .image-container {
          position: relative;
        }
        .main-image {
          width: 100%;
          object-fit: cover;
        }
        .gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(26, 41, 16, 0), #1a2910);
        }
        .logo {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background-color: white;
          border-radius: 50%;
          padding: 0.5rem;
        }
        .logo img {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
        }
        .title {
          position: absolute;
          top: 1rem;
          right: 1rem;
        }
        .title h1 {
          font-size: 1.5rem;
          font-weight: bold;
          text-align: right;
        }
        .search-container {
          display: flex;
          margin-top: auto;
          padding: 1rem;
        }
        .search-input {
          flex-grow: 1;
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;
          padding: 0.5rem 1rem;
          border: none;
        }
        .search-button {
          background-color: #2d4120;
          color: white;
          border-top-right-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          padding: 0.5rem 1rem;
          font-weight: bold;
          border: none;
        }
        .buttons-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 1rem;
        }
        @media (min-width: 640px) {
          .buttons-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .grid-button {
          background-color: #2d4120;
          color: white;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          text-align: right;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .grid-button:hover {
          background-color: #3d5530;
        }
        .chat-container {
          flex-grow: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
        }
        .message {
          max-width: 70%;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          margin-bottom: 0.5rem;
        }
        .message.user {
          align-self: flex-end;
          background-color: #2d4120;
        }
        .message.llm {
          align-self: flex-start;
          background-color: #3d5530;
        }
      `}</style>
    </div>
  );
};

export default ArabicSearchComponent;