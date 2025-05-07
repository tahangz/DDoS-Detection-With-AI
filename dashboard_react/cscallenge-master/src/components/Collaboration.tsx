// Collaboration.tsx
import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

const Collaboration: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Analyst 1', message: 'Investigating the new threat detected.', time: '10:00 AM' },
    { id: 2, user: 'Analyst 2', message: 'I have updated the incident report.', time: '10:05 AM' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    const now = new Date();
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, user: 'You', message: newMessage, time: now.toLocaleTimeString() },
    ]);
    setNewMessage('');
  };

  return (
    <div className="p-6 flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6">Collaboration</h2>
      <div className="bg-white p-6 rounded-lg shadow-md flex-1 overflow-auto">
        <ul>
          {messages.map((msg) => (
            <li key={msg.id} className="mb-4">
              <div className="flex items-center">
                <MessageSquare className="mr-2 text-blue-500" />
                <div>
                  <h4 className="font-semibold">{msg.user}</h4>
                  <p>{msg.message}</p>
                  <p className="text-sm text-gray-500">Time: {msg.time}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <textarea
          className="w-full p-2 border rounded"
          rows={3}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        ></textarea>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
          onClick={handleSendMessage}
        >
          <Send className="mr-2" />
          Send
        </button>
      </div>
    </div>
  );
};

export default Collaboration;
