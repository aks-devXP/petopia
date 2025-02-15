import React from 'react';
import './Dictionary.css';
import Card from '../Components/CardDictionary';
import breedsData from '../Data/breed.json'; 

const Dictionary = () => {
  return (
    <>
      <div className='search-div'>
        <input className='breed-search' type="text" placeholder="Search..." />
        <button className='breed-search-button'>Search</button>
      </div>

      <div className='breed-blocks'>
        {Object.entries(breedsData).map(([category, breeds]) => (
          <div key={category} className='category-block'>
            <div className='block-title'>{category}</div>
            <div className='breed-table'>
              {breeds.map((breed, index) => (
                <Card key={index} link={breed.link} text={breed.name} img={breed.image} alt={breed.name}
                className='breed-card' />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dictionary;
