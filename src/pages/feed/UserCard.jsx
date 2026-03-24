import axios from 'axios';
import { Heart, X, Code2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { VITE_API_BASE_URL } from '../../constants/common';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../../store/appSlices/feedSlice';

const UserCard = ({ userFeed }) => {
  const { _id, profileImage, age, gender, firstName, lastName, about, skills } = userFeed;
  const dispatch = useDispatch();

  const handleSendRequest = async (userId, status) => {
    try {
      const response = await axios.post(
        VITE_API_BASE_URL + `/request/send/${status}/${userId}`,
        {},
        { withCredentials: true },
      );
      if (!response.data) throw new Error('No Response Received');
      dispatch(removeFeed(userId));
      toast.success(`You ${status === 'interested' ? '❤️ liked' : '👋 passed on'} ${firstName}!`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to send request');
    }
  };

  return (
    <div className='animate-card-in relative'>
      {/* Stacked card effect - back cards */}
      <div className='absolute inset-x-3 bottom-[-8px] h-full rounded-3xl bg-base-200 -z-10 scale-[0.97]'></div>
      <div className='absolute inset-x-5 bottom-[-15px] h-full rounded-3xl bg-base-300 -z-20 scale-[0.94]'></div>

      {/* Main card */}
      <div className='relative w-[320px] sm:w-[370px] rounded-3xl overflow-hidden shadow-2xl bg-base-100'>
        {/* Profile image with gradient overlay */}
        <div className='relative h-[420px] sm:h-[460px] overflow-hidden'>
          {profileImage ? (
            <img src={profileImage} alt={`${firstName} ${lastName}`} className='w-full h-full object-cover' />
          ) : (
            <div className='w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center'>
              <span className='text-white text-7xl font-bold font-poppins'>
                {(firstName || 'D').charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent'></div>

          {/* Age & gender badges */}
          <div className='absolute top-4 left-4 flex gap-2'>
            {age && (
              <span className='px-2.5 py-1 bg-black/40 backdrop-blur-sm text-white text-xs rounded-full font-medium'>
                {age} yrs
              </span>
            )}
            {gender && (
              <span className='px-2.5 py-1 bg-black/40 backdrop-blur-sm text-white text-xs rounded-full font-medium capitalize'>
                {gender}
              </span>
            )}
          </div>

          {/* Text overlay on image */}
          <div className='absolute bottom-0 left-0 right-0 p-5'>
            <h2 className='text-3xl font-bold text-white mb-1.5 drop-shadow-md leading-tight'>
              {firstName} {lastName}
            </h2>
            {about && <p className='text-sm text-white/75 leading-relaxed line-clamp-2 mb-3'>{about}</p>}
            {skills?.length > 0 && (
              <div className='flex flex-wrap gap-1.5'>
                {skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className='px-2.5 py-0.5 bg-indigo-500/60 backdrop-blur-sm text-white text-xs rounded-full font-medium'
                  >
                    {skill}
                  </span>
                ))}
                {skills.length > 4 && (
                  <span className='px-2.5 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full'>
                    +{skills.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className='flex items-center justify-between px-8 py-4 bg-base-100'>
          {/* Pass button */}
          <button
            onClick={() => handleSendRequest(_id, 'ignored')}
            className='w-14 h-14 rounded-full bg-base-200 hover:bg-red-500/10 border-2 border-base-300 hover:border-red-400 text-base-content/50 hover:text-red-500 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-md'
            title='Pass'
          >
            <X size={22} strokeWidth={2.5} />
          </button>

          {/* Like button */}
          <button
            onClick={() => handleSendRequest(_id, 'interested')}
            className='w-14 h-14 rounded-full bg-rose-500 hover:bg-rose-600 border-2 border-rose-500 hover:border-rose-600 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg shadow-rose-500/30'
            title='Like'
          >
            <Heart size={22} fill='white' strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
