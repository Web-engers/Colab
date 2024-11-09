import React, { useState } from 'react';
import { Drawer, IconButton, Box } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import Chat from './Chat';

const ChatSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  return (
    <div>
      {/* Button to open the chat sidebar */}
      <IconButton
        color="primary"
        onClick={toggleDrawer(true)}
        className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg z-50"
      >
        <ChatIcon fontSize="large" className="fixed bottom-5 right-5" />
      </IconButton>

      {/* Drawer for chat (right side) */}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 360, // Adjust width as needed
            height: '100vh',
            padding: 0,
            backgroundColor: '#f5f5f5',
            boxShadow: 'none',
          },
        }}
      >
        <Box className="w-full h-full flex flex-col">
          <Chat />
        </Box>
      </Drawer>
    </div>
  );
};

export default ChatSideBar;