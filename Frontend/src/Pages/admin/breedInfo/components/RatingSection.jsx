import React from 'react';
import PropTypes from 'prop-types';
import { FaPaw } from 'react-icons/fa';

const RatingSection = ({ data }) => {
  const { ratings } = data;

  return (
    <div className="mt-6 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-16 lg:gap-x-32 gap-y-6 md:gap-y-10">
        {Object.keys(ratings).map((key) => (
          <div key={key} className="flex items-center justify-between ">
            <label className="text-sm font-bold text-ink-primary">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((paw) => (
                <FaPaw
                  key={paw}
                  className={`text-xl ${paw <= ratings[key] ? 'text-ink-primary' : 'text-gray-500'}`}
                />
              ))}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

RatingSection.propTypes = {
  data: PropTypes.shape({
    ratings: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default RatingSection;