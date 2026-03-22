import { Heart, X } from 'lucide-react';

const UserCard = ({ userFeed }) => {
  const { profileImage, age, gender, firstName, lastName, about, skills } = userFeed;
  return (
    <div className='card bg-base-100 w-80 shadow-sm relative'>
      <figure className='h-72'>
        <img src={profileImage || ''} alt='user-photo' className='rounded-xl object-cover' />
      </figure>
      {/* Age & Gender */}
      <div className='text-center text-sm text-slate-400 mb-1 absolute p-1 left-3'>
        {age && `${age}yrs`} • {gender === 'female' ? 'Female' : 'Male'}
      </div>

      <div className='card-body items-center text-center relative p-3'>
        {/* Name */}
        <h3 className='text-center text-2xl font-bold text-white mb-1'>
          {firstName || 'First'} {lastName || ''}
        </h3>

        {/* About */}
        {about && <p className='text-slate-300 text-sm leading-relaxed mb-1 text-center'>{about}</p>}

        {/* Skills */}
        {skills.length > 0 && (
          <div className='mb-1'>
            <div className='flex flex-wrap gap-2 justify-center'>
              {skills.map((skill) => (
                <span
                  key={skill}
                  className='px-3 py-1 bg-indigo-600/30 border border-indigo-500/50 text-indigo-200 text-xs rounded-full'
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* icons for interested and ignnored */}
        <div className='w-full flex flex-1 justify-between mt-2'>
          <button className='btn btn-error text-white flex items-center gap-2 font-bold text-lg'>
            <X size={20} />
            <span className='text-xs'>NOPE</span>
          </button>
          <button className='btn btn-success text-white flex items-center gap-2 font-bold text-lg'>
            <span className='text-xs'>LIKE</span>
            <Heart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
