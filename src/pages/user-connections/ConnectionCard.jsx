import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/getImageUrl';

const formatLastSeen = (lastSeen) => {
  if (!lastSeen) {
    return 'Offline';
  }

  const diffInMinutes = Math.max(1, Math.floor((Date.now() - new Date(lastSeen).getTime()) / 60000));

  if (diffInMinutes < 60) {
    return `Last seen ${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `Last seen ${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `Last seen ${diffInDays}d ago`;
};

const ConnectionCard = ({ connection }) => {
  const { firstName, lastName, age, gender, profileImage, about, isOnline, lastSeen, unreadCount } = connection;

  return (
    <div className='bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl overflow-hidden hover:shadow-lg hover:border-indigo-500/30 transition-all duration-300 group'>
      {/* Mini banner with avatar */}
      <div className='relative h-16 bg-gradient-to-r from-indigo-600/25 to-purple-600/25'>
        <div className='absolute -bottom-7 left-4'>
          <div className='w-14 h-14 rounded-full overflow-hidden border-3 border-[color:var(--bg-secondary)] ring-2 ring-[color:var(--border-color)] group-hover:ring-indigo-500/40 transition-all'>
            {profileImage ? (
              <img
                src={getImageUrl(profileImage)}
                alt={`${firstName} ${lastName}`}
                className='w-full h-full object-cover'
              />
            ) : (
              <div className='w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold'>
                {(firstName || 'D').charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='pt-9 px-4 pb-4'>
        <h2 className='font-bold text-sm text-[color:var(--text-primary)] truncate'>
          {firstName} {lastName}
        </h2>
        <div className='mt-1 flex items-center gap-2'>
          <span className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-slate-500'}`} />
          <p className={`text-[11px] ${isOnline ? 'text-green-400' : 'text-[color:var(--text-tertiary)]'}`}>
            {isOnline ? 'Online' : formatLastSeen(lastSeen)}
          </p>
        </div>
        {age && gender && (
          <p className='text-xs text-[color:var(--text-tertiary)] mt-0.5'>
            {age} yrs · <span className='capitalize'>{gender}</span>
          </p>
        )}
        {about && (
          <p className='text-xs mt-2 line-clamp-2 text-[color:var(--text-secondary)] leading-relaxed'>{about}</p>
        )}

        {/* Chat button */}
        <Link
          to={`/chat/${connection._id}`}
          className='relative mt-3 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium
            bg-indigo-500/10 text-indigo-400 border border-indigo-500/20
            hover:bg-indigo-500/20 hover:border-indigo-500/40 hover:text-indigo-300
            active:scale-95 transition-all duration-200'
        >
          <MessageCircle size={13} />
          Message
          {unreadCount > 0 && (
            <span className='absolute -top-2 -right-2 min-w-5 h-5 rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white flex items-center justify-center'>
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default ConnectionCard;
