import { useState, useRef, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, Send, Check, CheckCheck } from 'lucide-react';
import { createSocketConnection } from '../../utils/socket';

const MessageStatus = ({ status }) => {
  if (status === 'read') return <CheckCheck size={12} className='text-indigo-300' />;
  if (status === 'delivered') return <CheckCheck size={12} className='opacity-50' />;
  return <Check size={12} className='opacity-40' />;
};

const MessageBubble = ({ message }) => {
  const isMe = message.sender === 'me';
  return (
    <div className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'} mt-3`}>
      <div
        className={`
          max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
          ${
            isMe
              ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-br-sm shadow-md shadow-indigo-500/20'
              : 'bg-[color:var(--bg-secondary)] text-[color:var(--text-primary)] rounded-bl-sm border border-[color:var(--border-color)]'
          }
        `}
      >
        <p className='break-words'>{message.text}</p>
        <div className={`flex items-center gap-1 mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
          <span className={`text-[10px] ${isMe ? 'text-indigo-200' : 'text-[color:var(--text-tertiary)]'}`}>
            {message.time}
          </span>
          {isMe && <MessageStatus status={message.status} />}
        </div>
      </div>
    </div>
  );
};

const DateSeparator = ({ label }) => (
  <div className='flex items-center gap-3 my-4'>
    <div className='flex-1 h-px bg-[color:var(--border-color)] opacity-40' />
    <span className='text-[10px] font-medium text-[color:var(--text-tertiary)] bg-[color:var(--bg-secondary)] px-2 py-0.5 rounded-full border border-[color:var(--border-color)] opacity-70'>
      {label}
    </span>
    <div className='flex-1 h-px bg-[color:var(--border-color)] opacity-40' />
  </div>
);

const Chat = () => {
  const { targetUserId } = useParams();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user);
  const connections = useSelector((state) => state.connections);

  const targetUser = connections?.find((c) => c._id === targetUserId);

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const socketRef = useRef(null);

  const connectedUser = useMemo(() => {
    if (!loggedInUser || !targetUser) return null;
    return {
      sourceUser: {
        userId: loggedInUser._id,
        name: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
      },
      targetUser: {
        userId: targetUser._id,
        name: `${targetUser.firstName} ${targetUser.lastName}`,
      },
    };
  }, [loggedInUser, targetUser]);

  useEffect(() => {
    if (!connectedUser) return;
    const socket = createSocketConnection();
    socketRef.current = socket;
    socket.emit('joinChat', { ...connectedUser });

    socket.on('receiveMessage', (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [connectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = () => {
    const socket = socketRef.current;
    const text = inputValue.trim();
    if (!text || !socket) return;
    const newMsg = {
      text,
      ...connectedUser,
    };
    setInputValue('');
    socket.emit('sendMessage', newMsg);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!targetUser) {
    return (
      <div className='h-full flex items-center justify-center text-[color:var(--text-secondary)]'>
        <div className='text-center'>
          <p className='text-lg font-semibold'>User not found</p>
          <button
            onClick={() => navigate('/user-connections')}
            className='mt-4 text-sm text-indigo-400 hover:text-indigo-300 transition-colors'
          >
            ← Back to connections
          </button>
        </div>
      </div>
    );
  }

  const { firstName, lastName, profileImage } = targetUser || {};
  const initials = (firstName || 'D').charAt(0).toUpperCase();

  return (
    <div className='flex flex-col h-full max-h-[calc(100vh-64px)]'>
      {/* Header */}
      <div className='flex items-center gap-3 px-4 py-3 border-b border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] flex-shrink-0'>
        <button
          onClick={() => navigate('/user-connections')}
          className='p-2 rounded-full text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--bg-tertiary)] transition-colors flex-shrink-0'
        >
          <ArrowLeft size={18} />
        </button>

        <div className='relative flex-shrink-0'>
          <div className='w-10 h-10 rounded-full overflow-hidden ring-2 ring-indigo-500/30'>
            {profileImage ? (
              <img src={profileImage} alt={`${firstName} ${lastName}`} className='w-full h-full object-cover' />
            ) : (
              <div className='w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold'>
                {initials}
              </div>
            )}
          </div>
          <span className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[color:var(--bg-secondary)] rounded-full' />
        </div>

        <div className='flex-1 min-w-0'>
          <p className='font-semibold text-[color:var(--text-primary)] truncate'>
            {firstName} {lastName}
          </p>
          <p className='text-xs text-green-400'>Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className='flex-1 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-indigo-500/20 scrollbar-track-transparent'>
        <DateSeparator label='Today' />

        {messages.map((msg) => {
          return <MessageBubble key={msg.id} message={msg} />;
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className='flex-shrink-0 border-t border-[color:var(--border-color)] px-4 py-3 flex items-end gap-2 bg-[color:var(--bg-secondary)]'>
        <div className='flex-1 relative'>
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Type a message…'
            rows={1}
            className='w-full resize-none rounded-xl px-4 py-2.5 text-sm
              bg-[color:var(--bg-primary)] border border-[color:var(--border-color)]
              text-[color:var(--text-primary)] placeholder:text-[color:var(--text-tertiary)]
              focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30
              transition-colors leading-relaxed max-h-28 overflow-y-auto'
            style={{ scrollbarWidth: 'none' }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 112) + 'px';
            }}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={!inputValue.trim()}
          className={`p-2.5 rounded-full flex-shrink-0 transition-all duration-200
            ${
              inputValue.trim()
                ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95'
                : 'bg-[color:var(--bg-tertiary,#2a2a3e)] text-[color:var(--text-tertiary)] cursor-not-allowed'
            }`}
        >
          <Send size={16} className={inputValue.trim() ? '' : 'opacity-40'} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
