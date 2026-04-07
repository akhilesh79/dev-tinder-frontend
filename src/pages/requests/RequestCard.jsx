import axios from 'axios';
import { Check, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { VITE_API_BASE_URL } from '../../constants/common';
import { useDispatch } from 'react-redux';
import { clearRequest } from '../../store/appSlices/requestSlice';
import { getImageUrl } from '../../utils/getImageUrl';

const RequestCard = ({ request }) => {
  const { fromUserId, _id } = request;
  const { firstName, lastName, profileImage, age, gender, about } = fromUserId;
  const dispatch = useDispatch();

  const handleReviewRequest = async (requestId, status) => {
    try {
      const response = await axios.post(
        VITE_API_BASE_URL + `/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
      );
      if (!response.data) throw new Error('No Response Received');
      dispatch(clearRequest(requestId));
      toast.success(`You ${status} ${firstName}'s request!`);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${status} request`);
    }
  };

  return (
    <div className='bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-2xl p-4 hover:shadow-lg hover:border-indigo-500/20 transition-all duration-300 animate-fade-up'>
      <div className='flex items-center gap-4'>
        {/* Avatar */}
        <div className='w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ring-indigo-500/20'>
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

        {/* Info */}
        <div className='flex-1 min-w-0'>
          <h3 className='font-bold text-sm text-[color:var(--text-primary)] truncate'>
            {firstName} {lastName}
          </h3>
          {(age || gender) && (
            <p className='text-xs text-[color:var(--text-tertiary)] mt-0.5'>
              {age && `${age} yrs`}
              {age && gender && ' · '}
              {gender && <span className='capitalize'>{gender}</span>}
            </p>
          )}
          {about && <p className='text-xs text-[color:var(--text-secondary)] mt-1 line-clamp-1'>{about}</p>}
        </div>

        {/* Actions */}
        <div className='flex gap-2 flex-shrink-0'>
          <button
            onClick={() => handleReviewRequest(_id, 'rejected')}
            className='w-9 h-9 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 hover:border-red-500 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95'
            title='Reject'
          >
            <X size={16} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => handleReviewRequest(_id, 'accepted')}
            className='w-9 h-9 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white border border-indigo-500 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-indigo-500/20'
            title='Accept'
          >
            <Check size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
