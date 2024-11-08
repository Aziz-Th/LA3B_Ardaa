// components/ChatInterface.js
import React, { useState, useEffect, useCallback } from 'react';

function ChatInterface() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getLLMResponse = useCallback(async (userMessage) => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userMessage,
            history: messages.map(msg => ({
              role: msg.user ? 'user' : 'assistant',
              content: msg.text
            })),
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMessages(prev => [...prev, { 
          text: data.response, 
          user: false,
          poem: data.retrieved_poem,
          meaning: data.poem_meaning 
        }]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [...prev, { 
          text: 'Sorry, there was an error processing your request.', 
          user: false 
        }]);
      } finally {
        setIsLoading(false);
      }
    }, [messages]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (inputValue.trim()) {
        const userMessage = inputValue.trim();
        setMessages(prev => [...prev, { text: userMessage, user: true }]);
        getLLMResponse(userMessage);  // Trigger API call with the user message
        setInputValue('');  // Clear input
      }
    };

    return (
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user ? 'user' : 'llm'}`}>
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className="message llm loading">
            <span className="loading-dots">...</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            className="chat-input"
          />
          <button 
            type="submit"
            className="chat-send-button"
            disabled={isLoading || !inputValue.trim()}  // Disable if loading or empty
          >
            {isLoading ? 'يتم الإرسال...' : 'إرسال'}
          </button>
        </form>
      </div>
    );
}

export default ChatInterface;
