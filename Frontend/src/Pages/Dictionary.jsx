import React from 'react';
import Card from '../Components/CardDictionary';
<<<<<<< Updated upstream
import breedsData from '../Data/breed.json'; 
import { useState, useEffect } from 'react';
=======
import breedsData from '../Data/breed.json';
import './Dictionary.css';
>>>>>>> Stashed changes

const Dictionary = () => {
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = Object.entries(breedsData).flatMap(([_, breeds]) =>
        breeds.map(async (breed) => {
          try {
            const imgSrc = breed.image;
            setLoadedImages((prev) => ({ ...prev, [breed.image]: imgSrc }));
          } catch (error) {
            console.error(`Error loading image: ${breed.image}`, error);
          }
        })
      );
      await Promise.all(imagePromises);
    };

    loadImages();
  }, []);

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
<<<<<<< Updated upstream
                <Card key={index} link={breed.link} text={breed.name} img={loadedImages[breed.image]} alt={breed.name}
=======
                <Card key={index} link={breed.link} text={breed.name} img={'breed.image'} alt={breed.name}
>>>>>>> Stashed changes
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
