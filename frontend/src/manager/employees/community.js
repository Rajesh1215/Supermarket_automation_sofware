// ChatUI.js
import React, { useState } from 'react';

const Community = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (input.trim() !== '') {
      const message = { text: input, timestamp: new Date().toLocaleTimeString() };
      setMessages((prevMessages) => [...prevMessages, message]);
      setInput('');
    }
  };

  return (
    <div style={{ width: '300px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ height: '200px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>You:</strong> {message.text} ({message.timestamp})
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Community;
