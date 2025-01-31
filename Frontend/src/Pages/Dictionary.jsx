import React from 'react';
import './Dictionary.css'
import germanShepherd from '../assets/GuidePageImages/german_shepherd.png';
const Dictionary = () => {
  return (
    <>
      <div className='search-div'>
        <input className='breed-search' type="text" placeholder="Search..." />
        <button className='breed-search-button'>Search</button>
      </div>
      <div className='breed-blocks'>
        <div className='dog-blocks'>
            <div className='block-title'>Cats</div>
            <div className='breed-table'>
                <div className='breed-cell'></div>
                <div className='breed-cell'></div>
                <div className='breed-cell'></div>
            </div>
        </div>
        <div className='cat-blocks'>
            <div className='block-title'>Dogs</div>
            <div className='breed-table'>
                <div className='breed-cell'>
                    <img className="breed-img" src={germanShepherd} alt="German Shepherd" />
                    <p className='breed-title'>German Shepherd</p>
                </div>
                <div className='breed-cell'></div>
                <div className='breed-cell'></div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Dictionary;