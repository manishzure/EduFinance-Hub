"use client"
import React, { useState } from 'react';
import { FaUser } from "react-icons/fa"; // Imports icons from the react-icons library to use in the UI.
import { RiRobot2Line } from "react-icons/ri";
import './Blank.css';

function RecipeChatbot() {
  const [prompt, setPrompt] = useState('');
  const [isNewMessage, setIsNewMessage] = useState(true);
  const [responses, setResponses] = useState(["How can I help you?"]); // : An array to store the conversation history
  const [isLoading, setIsLoading] = useState(false);

  const handlePrompt = async (e) => {
    e.preventDefault();
    if (!prompt) return;


    setIsLoading(true);

    try {
      const response = await fetch('https://Akshayram1.pythonanywhere.com/chef', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: prompt, isNew: isNewMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPrompt('');
      setIsNewMessage(false);
      setResponses([...responses, prompt, data.response]);
    } catch (error) {
      console.error('Error:', error);
    }
    setIsLoading(false);
  };

  
  // Function to render HTML tags properly
  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <div className="chat-container">
      {responses.map((response, index) => (
        <div key={index} className={`message-row ${index % 2 === 0 ? '' : 'reverse'}`}>
          {index % 2 === 0 ? (
            <RiRobot2Line className="message-avatar" />
          ) : (
            <FaUser className="message-avatar" />
          )}
          <div className={`message-bubble ${index % 2 !== 0 ? 'user' : ''}`}>
            <div dangerouslySetInnerHTML={renderHTML(response)}></div>
          </div>
        </div>
      ))}

      <form className="chat-form" onSubmit={handlePrompt}>
        <input
          type="text"
          placeholder="Type a message"
          className="chat-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit" className="send-button" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default RecipeChatbot;