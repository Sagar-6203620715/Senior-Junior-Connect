import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaRobot, FaPaperPlane, FaEllipsisH, FaPhone, FaVideo, FaSearch, FaSmile } from 'react-icons/fa';

function Chat() {
  const { collegeId } = useParams();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm a senior student from this college. How can I help you today?",
      sender: 'senior',
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

      // Enhanced simulated senior response
      setTimeout(() => {
        const responses = [
          "That's a great question! Let me share my experience with you. When I was in your position, I had similar concerns.",
          "I remember having the same concern when I was preparing for college admissions. Here's what I learned from my journey...",
          "Based on my time here, I can definitely help you with that. The faculty and facilities are really supportive.",
          "That's something I wish I knew before joining. Here's what I discovered during my first year...",
          "Great question! The college environment here is really conducive for learning. Let me break it down for you.",
          "I understand your concern. From my experience, here's what you should know about this aspect...",
          "That's an important point to consider. Let me share some insights that might help you make an informed decision."
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-2 h-2 bg-primary-400 rounded-full"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-accent-400 rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto h-screen flex flex-col">
        {/* Enhanced Chat Header */}
        <div className="glass border-b border-gray-200/50 px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/colleges" 
                className="p-3 hover:bg-white/20 rounded-2xl transition-all duration-300 group"
              >
                <FaArrowLeft className="text-gray-600 group-hover:text-primary-600 group-hover:scale-110 transition-all duration-300" />
              </Link>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <FaUser className="text-white text-lg" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">Senior Student</h2>
                  <p className="text-sm text-gray-600">College ID: {collegeId}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 font-medium">Online</span>
              </div>
              <div className="flex gap-2">
                <button className="p-3 hover:bg-white/20 rounded-2xl transition-all duration-300 group">
                  <FaPhone className="text-gray-600 group-hover:text-primary-600 group-hover:scale-110 transition-all duration-300" />
                </button>
                <button className="p-3 hover:bg-white/20 rounded-2xl transition-all duration-300 group">
                  <FaVideo className="text-gray-600 group-hover:text-primary-600 group-hover:scale-110 transition-all duration-300" />
                </button>
                <button className="p-3 hover:bg-white/20 rounded-2xl transition-all duration-300 group">
                  <FaSearch className="text-gray-600 group-hover:text-primary-600 group-hover:scale-110 transition-all duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
            >
              <div className={`flex items-start gap-4 max-w-xs lg:max-w-md ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-br from-primary-500 to-primary-600' 
                    : 'bg-gradient-to-br from-gray-600 to-gray-700'
                }`}>
                  {message.sender === 'user' ? (
                    <FaUser className="text-white text-sm" />
                  ) : (
                    <FaRobot className="text-white text-sm" />
                  )}
                </div>
                <div className={`rounded-2xl px-6 py-4 shadow-lg ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white'
                    : 'bg-white text-gray-900 border border-gray-200'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-3 ${
                    message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Enhanced Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fade-in-up">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center shadow-lg">
                  <FaRobot className="text-white text-sm" />
                </div>
                <div className="bg-white rounded-2xl px-6 py-4 shadow-lg border border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">Typing...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Message Input */}
        <div className="glass border-t border-gray-200/50 p-6">
          <form onSubmit={handleSendMessage} className="flex items-center gap-4">
            <button 
              type="button"
              className="p-3 hover:bg-white/20 rounded-2xl transition-all duration-300 group"
            >
              <FaSmile className="text-gray-600 group-hover:text-accent-500 group-hover:scale-110 transition-all duration-300" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:outline-none text-gray-800 placeholder-gray-500 transition-all duration-300"
              />
            </div>
            <button 
              type="submit"
              disabled={!newMessage.trim()}
              className="p-4 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
            >
              <FaPaperPlane className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat; 