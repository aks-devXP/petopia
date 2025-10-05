import React from 'react';
import PropTypes from 'prop-types';
import germanShepherd from '@assets/PetGuide/germanShepherd.png';

const AnatomySection = ({ data }) => {
  const { physical_characteristics = {} } = data;

  return (
    <div className="text-black px-6">
      
        <h2 className="text-3xl font-bold mb-6">Head to Tail</h2>
        <dl className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full flex justify-center items-center">
            <img
              className="w-full "
              src={germanShepherd}
              alt="German Shepherd Anatomy"
            />
          </div>
          <div className="p-5 flex flex-col justify-center">
            {Object.entries(physical_characteristics).map(([key, value]) => (
              <div key={key} className="mb-4">
                <dt className="font-bold">
                  {key.replace(/([A-Z])/g, " $1").trim().replace(/^./, str => str.toUpperCase())}:
                </dt>
                <dd>{value || 'N/A'}</dd>
              </div>
            ))}
          </div>
        </dl>
      </div>
    
  );
};

AnatomySection.propTypes = {
  data: PropTypes.shape({
    physical_characteristics: PropTypes.shape({
      ears: PropTypes.string,
      head: PropTypes.string,
      fur: PropTypes.string,
      body: PropTypes.string,
      tail: PropTypes.string,
    }),
  }).isRequired,
};

export default AnatomySection;