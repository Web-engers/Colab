// Chat.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chatMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chatMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const username = 'User'; // Replace with actual username logic if needed
      socket.emit('chatMessage', { username, message });
      setMessage('');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="h-12 bg-gray-200 text-gray-800 flex items-center justify-center p-2 font-semibold">
        Chat Room
      </div>

      {/* Chat Messages Area */}
      <div className="flex-grow overflow-y-auto bg-white p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`rounded-lg p-3 max-w-xs text-sm ${
                index % 2 === 0 ? 'bg-blue-400 text-white' : 'bg-purple-400 text-white'
              }`}
            >
              <span className="block">{msg.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input Section */}
      <div className="bg-gray-100 p-2 flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow border border-gray-300 rounded-lg p-2 mr-2"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
