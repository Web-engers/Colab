import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { arrayUnion, getDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useFirebase } from '../../context/Firebase';
import { v4 as uuidv4 } from "uuid";

const socket = io('http://localhost:3001');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const params = useParams();
  const [username, setUsername] = useState('');
  const [chatID, setChatID] = useState('');
  const { currentUser } = useFirebase();

  useEffect(() => {
    setUsername(currentUser?.name || 'Guest');
  
    const fetchData = async () => {
      try {
        const boardRef = doc(db, 'boards', params.id);
        const boardDoc = await getDoc(boardRef);
        const boardData = boardDoc.data();
  
        if (boardData) {
          let chatID = boardData.chatID;
  
          if (!chatID) {
            chatID = uuidv4();
            await updateDoc(boardRef, { chatID });
          }
  
          setChatID(chatID);
  
          const chatRef = doc(db, 'chats', chatID);
          const chatDoc = await getDoc(chatRef);
  
          if (!chatDoc.exists()) {
            await setDoc(chatRef, { messages: [] });
            setMessages([]); 
          } else {
            setMessages(chatDoc.data().messages || []);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [params.id, currentUser]);

  useEffect(() => {
    socket.on('chatMessage', async (msg) => {
      const chatRef = doc(db, "chats", chatID); 
      const chatDoc = await getDoc(chatRef);
      const allmes = chatDoc.data()?.messages || []; 
      console.log(msg)
      setMessages(prev=>{
        [...prev,msg]
      }); 
      console.log(messages)
    });
    return () => {
      socket.off('chatMessage');
    };
  }, []);

  const sendMessage = async () => {
    if (message.trim()) {
      const msgData = { username, message };
      socket.emit('chatMessage', msgData); 
      try {
        const chatRef = doc(db, 'chats', chatID);
        await updateDoc(chatRef, {
          messages: arrayUnion(msgData), 
        });
        const chatDoc = await getDoc(chatRef); // Get the updated messages
        const allmes = chatDoc.data()?.messages || []; // Access messages safely
        setMessages(allmes); // Update state with the new messages
      } catch (error) {
        console.error('Error updating messages:', error);
      }
      setMessage('');
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="h-12 bg-gray-200 text-gray-800 flex items-center justify-center p-2 font-semibold">
        Chat Room
      </div>

      <div className="flex-grow overflow-y-auto bg-white p-4 space-y-2">
        {messages?.map((msg, index) => (
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
