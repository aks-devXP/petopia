import React from 'react';
import PropTypes from 'prop-types';

const BasicInfo = ({ data }) => {
  const { breed, species, general_info = {}, images } = data;
  const imageSrc = images?.primary || images?.secondary || '/petopia/vite.svg';

  return (
    <div className=" text-ink-primary font-nunito">
      <div className="flex flex-col-reverse lg:flex-row ml-5 md:ml-20">
        <div className="p-5 flex flex-col justify-center items-center w-full jusify-center">
          <h1 className="font-quicksandBold text-5xl py-2 my-6 w-full">{breed}</h1>
          <dl className="w-full grid grid-cols-1 gap-3">
            {Object.entries(general_info).map(([key, value]) => (
              <div
                key={key}
                className="flex "
              >
                <dt className="font-bold w-1/3 text-left">
                  {key.replace(/([A-Z])/g, " $1").trim().replace(/^./, str => str.toUpperCase())}
                </dt>
                <dd className="w-2/3 text-left">{value || 'N/A'}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="w-full p-5 justify-center flex items-center">
          <img
            className="h-full w-full object-cover rounded-lg"
            src={imageSrc}
            alt={`${breed || species || 'Pet'} image`}
          />
        </div>
      </div>
    </div>
  );
};

BasicInfo.propTypes = {
  data: PropTypes.shape({
    breed: PropTypes.string,
    species: PropTypes.string,
    general_info: PropTypes.shape({
      breedGroup: PropTypes.string,
      description: PropTypes.string,
      temperament: PropTypes.string,
      height: PropTypes.string,
      weight: PropTypes.string,
      lifeExpectancy: PropTypes.string,
    }),
    images: PropTypes.shape({
      primary: PropTypes.string,
      secondary: PropTypes.string,
    }),
  }).isRequired,
};

export default BasicInfo;
 