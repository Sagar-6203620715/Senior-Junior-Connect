import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaPaperPlane, FaUser, FaRobot, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Chat() {
  const { collegeId } = useParams();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm a senior student from this college. How can I help you today?",
      sender: 'senior',
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: 2,
      text: "Hello! I'm interested in learning more about the CSE branch. What's the course structure like?",
      sender: 'user',
      timestamp: new Date(Date.now() - 30000)
    },
    {
      id: 3,
      text: "Great question! The CSE branch here has a well-structured curriculum. First year covers basics like programming, mathematics, and physics. Second year introduces core CS subjects like Data Structures, Algorithms, and Computer Architecture. Third and fourth years focus on advanced topics and electives.",
      sender: 'senior',
      timestamp: new Date(Date.now() - 15000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      setIsTyping(true);

      // Simulate senior response
      setTimeout(() => {
        const responses = [
          "That's a great question! Let me share my experience with you.",
          "I remember having the same concern when I was in your position.",
          "Based on my time here, I can definitely help you with that.",
          "That's something I wish I knew before joining. Here's what I learned...",
          "Great question! The faculty here is really supportive with such topics."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const seniorMessage = {
          id: messages.length + 2,
          text: randomResponse,
          sender: 'senior',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, seniorMessage]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/colleges" 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <FaArrowLeft className="text-gray-600" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <FaUser className="text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Senior Student</h2>
                  <p className="text-sm text-gray-500">College ID: {collegeId}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-500">Online</span>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-xs lg:max-w-md ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-blue-600' 
                    : 'bg-gray-600'
                }`}>
                  {message.sender === 'user' ? (
                    <FaUser className="text-white text-sm" />
                  ) : (
                    <FaRobot className="text-white text-sm" />
                  )}
                </div>
                <div className={`rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-900 border border-gray-200'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <FaRobot className="text-white text-sm" />
                </div>
                <div className="bg-white text-gray-900 border border-gray-200 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || isTyping}
              className="bg-blue-600 text-white p-3 rounded-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPaperPlane className="text-sm" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat; 