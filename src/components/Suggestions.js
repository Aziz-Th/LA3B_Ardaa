// components/Suggestions.js
import React from 'react';

// components/Suggestions.js
function Suggestions({ onSuggestionClick }) {
    const suggestions = ['ما معنى', 'ما معنى', 'من قائل', 'ما معنى'];
  
    return (
      <div className="suggestions-grid">
        {suggestions.map((text, index) => (
          <button key={index} className="suggestion-button" onClick={() => onSuggestionClick(`${text} ...`)}>
            {text} ...
          </button>
        ))}
      </div>
    );
  }

export default Suggestions;
