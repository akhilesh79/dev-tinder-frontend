const ConnectionCard = ({ connection }) => {
  const { firstName, lastName, age, gender, profileImage, about } = connection;
  return (
    <div className='card bg-base-100 shadow-sm flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 w-1/2'>
      <div className='card-image w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex-shrink-0'>
        <img src={profileImage} alt={`photo`} className='rounded-full object-cover w-full h-full' />
      </div>
      <div className='flex-1 text-center sm:text-left'>
        <h2 className='font-bold text-lg sm:text-xl'>
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p className='text-xs sm:text-sm text-base-content/70'>
            {age} years old, {gender}
          </p>
        )}
        {about && (
          <p className='text-xs sm:text-sm mt-2 line-clamp-2 sm:line-clamp-3 text-base-content/80' title={about}>
            {about}
          </p>
        )}
      </div>
    </div>
  );
};

export default ConnectionCard;
