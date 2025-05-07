import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState([
    { sender: 'assistant', text: 'Hello! I’m your cybersecurity expert. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      const newMessages = [...messages, { sender: 'user', text: input }];
      setMessages(newMessages);
      setInput('');

      // Simulated response (in production, connect to a backend or continuous learning model)
      setTimeout(() => {
        const responseText = generateCybersecurityResponse(input);
        setMessages([...newMessages, { sender: 'assistant', text: responseText }]);
      }, 1000);
    }
  };

  const generateCybersecurityResponse = (userMessage: string) => {
    // Placeholder response logic
    if (userMessage.toLowerCase().includes('threats')) {
      return "Let's discuss recent threats. Continuous analysis reveals emerging risks like zero-day vulnerabilities and AI-powered attacks.";
    } else if (userMessage.toLowerCase().includes('best practices')) {
      return "For optimal security, I recommend regular patching, two-factor authentication, and continuous monitoring of your network.";
    } else {
      return "I'm here to assist with any cybersecurity queries. Feel free to ask about topics like data protection, threat detection, or security protocols!";
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Cybersecurity Chat Assistant</h2>
      <div className="bg-white p-4 rounded-lg shadow-inner mb-4 max-h-80 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`flex mb-3 ${message.sender === 'assistant' ? 'justify-start' : 'justify-end'}`}>
            <div className={`p-3 rounded-lg ${message.sender === 'assistant' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question here..."
        />
        <button onClick={handleSend} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
