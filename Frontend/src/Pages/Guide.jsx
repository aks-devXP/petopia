import React from 'react';
import germanShepherd from '../assets/GuidePageImages/german_shepherd.png';
import './Guide.css';

const Guide = () => {
  return (
    <>
      <div className="container">
        <div className="left-section">
          <div className="pet-guide-detail">
            <h1 className='tip-heading'>Tips</h1>
            <ul className='tip-points'>
              <li>German Shepherds need 7-10 years of daily exercise.</li>
              <li>Early training is key as they grow into large, strong dogs.</li>
              <li>They require a “job” to avoid boredom and destructive behavior.</li>
              <li>Naturally protective, they may bark frequently and be reserved with guests.</li>
              <li>Expect significant shedding and dog hair around the house.</li>
            </ul>

          </div>

          <div className="bloat-symptoms">
            <h1 className='tip-heading'>Symptoms of Bloat</h1>
            <ul className='tip-points'>
              <li>Swollen or distended abdomen</li>
              <li>Abdominal pain</li>
              <li>Unproductive retching/dry heaving</li>
              <li>Drooling</li>
              <li>Pacing/restlessness</li>
              <li>Lethargy</li>
            </ul>

            <div className='care-tips'>
              <h1 className='tip-heading'>Tips to Help Prevent Bloat</h1>
              <ul className='tip-points'>
                <li>Feed smaller, more frequent meals instead of one big meal</li>
                <li>Don’t allow your dog to gorge on food or water, use a slow feeder if necessary</li>
                <li>Never allow unfettered access to food (make sure their food bags/bins are out of reach)</li>
                <li>No exercise for a minimum of one hour before or two hours after meals</li>
                <li>Talk to your veterinarian about a gastropexy, a preventative procedure for high-risk dogs</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="right-section">
          <div className="picture">
            <img className="pet-picture" src={germanShepherd} alt="German Shepherd" />
          </div>
          <div className="info">
            <h1 className="pet-name">German Shepherd</h1>
            <dl className="pet-info">
              <div className="info-row">
                <dt>Breed Group</dt>
                <dd>: Working</dd>
              </div>
              <div className="info-row">
                <dt>Temperament</dt>
                <dd>: Smart, loyal, and protective</dd>
              </div>
              <div className="info-row">
                <dt>Energy Level</dt>
                <dd>: High</dd>
              </div>
              <div className="info-row">
                <dt>Height</dt>
                <dd>: 22 to 26 inches</dd>
              </div>
              <div className="info-row">
                <dt>Weight</dt>
                <dd>: 50 to 90 pounds</dd>
              </div>
              <div className="info-row">
                <dt>Life Expectancy</dt>
                <dd>: 7 to 10 years</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default Guide;