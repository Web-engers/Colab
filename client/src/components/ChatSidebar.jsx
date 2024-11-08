import React, { useState } from 'react';
import { Drawer, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import Chat from './Chat';

const ChatSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  return (
    <div>
      <IconButton
        color="primary"
        onClick={toggleDrawer(true)}
        className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-700 text-white rounded-full p-2"
      >
        <ChatIcon fontSize="large" />
      </IconButton>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 300,
            padding: 2,
            backgroundColor: '#f7f7f7',
          },
        }}
      >
        <div className="w-80 p-4 h-full flex flex-col bg-gray-100">
          <Chat />
        </div>
      </Drawer>
    </div>
  );
};

export default ChatSideBar;