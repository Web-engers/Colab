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
      const username = 'User'; 
      socket.emit('chatMessage', { username, message });
      setMessage('');
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-lg h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">Chat Room</h2>
      <div className="flex-grow overflow-y-auto bg-white p-4 rounded-lg mb-4 border">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col mb-2 ${index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-200'} p-2 rounded-md`}
          >
            <span className="font-semibold text-sm text-gray-700">{msg.username}</span>
            <div className="text-gray-800">{msg.message}</div>
          </div>
        ))}
      </div>
      <div className="flex mt-auto">
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