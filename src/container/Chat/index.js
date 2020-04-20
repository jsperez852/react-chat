import React from 'react';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import ChatFragment from './ChatFragment';
import ChatFragmentSpringBoot from './ChatFragmentSpringBoot';
import { NODE_JS_URI, SPRINGBOOT_URI } from './ChatProps';

const currentConnection = NODE_JS_URI;

const socket = currentConnection === NODE_JS_URI ? io.connect(NODE_JS_URI) : null;

const Chat = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        {currentConnection === NODE_JS_URI &&
          <SocketProvider socket={socket}>
           <ChatFragment />
          </SocketProvider>
        || <ChatFragmentSpringBoot socket={SPRINGBOOT_URI} />}
      </Container>
    </>
  );
};

export default Chat;