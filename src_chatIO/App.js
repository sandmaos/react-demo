import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef(null);
  
  const socket = io.connect('http://localhost:5000');
  useEffect(() => {
    socket.on('getResponse', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages])

  const sendMessage = () => {
    setMessages((prevMessages) => [...prevMessages, input]);
    socket.emit('sendMessage', input);
    setInput('');
  };

  return (
    <div className='app'>
      <h3>Chat GPT</h3>
      <div className='chat-container' ref={chatContainerRef}>
        {
          messages.map((msg, index) => (
            <div className={'chat-grid-' + (index % 2 === 0 ? 'me' : 'bot')} key={index}>{msg}</div>
          ))
        }

      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
