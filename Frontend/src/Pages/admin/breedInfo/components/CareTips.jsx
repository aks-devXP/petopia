import React from 'react';
import PropTypes from 'prop-types';

const CareTips = ({ data }) => {
  const { history = [], care = {}, diet = {} } = data;

  return (
    <div className="text-ink-primary font-nunito">
      <div className="p-6">
        <div className="space-y-10">
          {/* History Section */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">History</h3>
            {history.length > 0 ? (
              <ul className="list-disc list-inside space-y-2 px-1">
                {history.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              'No history available.'
            )}
          </div>

          {/* Care Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Care</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Object.keys(care).map((key) => (
                <div key={key} className="space-y-1">
                  <h4 className="text-md font-semibold">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </h4>
                  <p>{care[key] || 'No details available.'}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Diet Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Diet</h3>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {['recommended', 'notRecommended'].map((key) => (
                <div key={key} className="space-y-2">
                  <h4 className="text-md font-semibold">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </h4>
                  {diet[key] && diet[key].length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {diet[key].map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    'No items listed.'
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CareTips.propTypes = {
  data: PropTypes.shape({
    history: PropTypes.arrayOf(PropTypes.string),
    care: PropTypes.shape({
      exercise: PropTypes.string,
      grooming: PropTypes.string,
      training: PropTypes.string,
    }),
    diet: PropTypes.shape({
      recommended: PropTypes.arrayOf(PropTypes.string),
      notRecommended: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
};

export default CareTips;