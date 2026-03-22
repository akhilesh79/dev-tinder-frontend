import axios from 'axios';
import { Check, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { VITE_API_BASE_URL } from '../../constants/common';
import { useDispatch } from 'react-redux';
import { clearRequest } from '../../store/appSlices/requestSlice';

const RequestCard = ({ request }) => {
  const { fromUserId, _id } = request;
  const { firstName, lastName, profileImage, age, gender, about } = fromUserId;
  const dispatch = useDispatch();

  const handleReviewRequest = async (requestId, status) => {
    try {
      const response = await axios.post(
        VITE_API_BASE_URL + `/api/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
      );
      if (!response.data) {
        throw new Error('No Response Recieved');
      }

      dispatch(clearRequest(requestId));
      toast.success(`You ${status} ${firstName}'s request!`);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${status} request`);
    }
  };

  return (
    <div className='bg-base-200 rounded-lg p-4 flex items-center gap-4 hover:shadow-lg transition-shadow duration-300'>
      <div className='avatar flex-shrink-0'>
        <div className='w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
          <img src={profileImage} alt={`${firstName} ${lastName}`} />
        </div>
      </div>

      <div className='flex-1 min-w-0'>
        <h3 className='font-bold text-lg'>
          {firstName} {lastName}
        </h3>
        <p className='text-sm text-base-content/70'>
          {age} years old, {gender}
        </p>
        {about && <p className='text-sm text-base-content/80 mt-1'>{about}</p>}
      </div>

      <div className='flex gap-2 flex-shrink-0'>
        <button
          onClick={() => handleReviewRequest(_id, 'rejected')}
          className='btn btn-sm btn-outline btn-error gap-1'
          title='Reject'
        >
          <X size={16} />
        </button>
        <button
          onClick={() => handleReviewRequest(_id, 'accepted')}
          className='btn btn-sm btn-primary gap-1'
          title='Accept'
        >
          <Check size={16} />
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
