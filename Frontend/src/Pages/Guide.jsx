import React from 'react';
import chicken from '../assets/Food/chicken.svg';
import chocolate from '../assets/Food/chocolate.svg';
import fatty from '../assets/Food/fatty.svg';
import fish from '../assets/Food/fish.svg';
import grain from '../assets/Food/grain.svg';
import grapes from '../assets/Food/grapes.svg';
import meat from '../assets/Food/meat.svg';
import mutton from '../assets/Food/mutton.svg';
import onion from '../assets/Food/onion.svg';
import vegetables from '../assets/Food/vegetables.svg';
import germanShepherd from '../assets/PetGuide/germanShepherd.png';
import Rating from '../Components/Rating';
import petData from '../Data/BreedData.json';



const Guide = () => {
  return (


    /* top section */
    <div className="guide-container bg-[#f5f5dc] p-[20px]">
      <div className="flex ml-20">
        <div className="text-black p-[20px] flex flex-col justify-center items-center w-[50%]">
          <h1 className="table-cell font-[550] px-2 py-1 text-[50px] m-[40px] w-full">{petData.breed}</h1>
            <dl className="w-full">
              {Object.entries(petData.general_info).map(([key, value]) => (
                <div className="table-row" key={key}>
                  <dt className="table-cell font-bold px-2 py-1">
                    {key.replace(/([A-Z])/g, " $1").trim().replace(/^./, str => str.toUpperCase())}
                  </dt>
                  <dd className="table-cell text-left px-2 py-1">: {value}</dd>
                </div>
              ))}
            </dl>
        </div>

        <div className="w-[50%] p-[20px]">
          <img className="h-full w-full" src={germanShepherd} alt="German Shepherd" />
        </div>
      </div>


      <div className="bg-[#D8DBBD] p-[10px] rounded-[20px] text-black flex flex-col gap-[40px]">
      {/* Ratings Section */}
        <div >

          <dl className="w-full grid grid-cols-3 p-[20px] gap-x-[40px] gap-y-[20px]">
            {Object.entries(petData.ratings).map(([key, value]) => (
              <div className="flex justify-between py-2" key={key}>
                <dt className="font-bold flex justify-center items-center text-[15px]">
                  {key.replace(/([A-Z])/g, " $1").trim().replace(/^./, str => str.toUpperCase())}
                </dt>
                <dd className=''><Rating a={value} /></dd>
              </div>
            ))}
          </dl>
        </div>


        {/* Physical Traits */}
        <div className="p-[20px]">
          <h2 className="text-[30px] font-bold mb-[20px]">Head to Tail</h2>
          <dl className="w-full grid grid-cols-2 gap-[50px]">
            <div className='p-[50px]'>
            <img className="h-full w-full" src={germanShepherd} alt="German Shepherd" />
            </div>
            <div className='p-[50px] flex flex-col justify-center'>
              {Object.entries(petData.physical_characteristics).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <dt className="font-bold">{key.replace(/([A-Z])/g, " $1").trim().replace(/^./, str => str.toUpperCase())}:</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </div>
          </dl>
        </div>

        {/* Exercise & Training */}
        <div className="p-[20px]">
          <h2 className="text-[30px] font-bold mb-[20px]">Exercise & Training</h2>
          <p>{petData.care.exercise}</p>
        </div>

        {/* Diet Information */}
        <div className="p-[20px]">
          <h2 className="text-[30px] font-bold mb-[20px]">Diet</h2>

          <div className='grid grid-cols-2 gap-[20px]'>
            
            <div className='w-[50%]'>
              <h3 className="font-bold">To Give:</h3>

              <div className="mb-[10px] flex flex-col gap-[40px]">
                <div>
                <div className='flex'>
                  <img className="h-15 w-15" src={chicken} alt="chicken" />
                  <img className="h-15 w-15" src={fish} alt="fish" />
                  <img className="h-15 w-15" src={meat} alt="meat" />
                  <img className="h-15 w-15" src={mutton} alt="mutton" />
                </div>
                <div>High-quality protein sources (chicken, meat, fish)</div>
                </div>
                <div>
                <div className='flex'>
                  <img className="h-15 w-15" src={grain} alt="grain" />
                </div>
                <div>Whole grains (brown rice, oatmeal)</div>
                </div>
                <div>
                <div className='flex'>
                  <img className="h-15 w-15" src={vegetables} alt="vegetables" />
                </div>
                <div>Vegetables and fruits (carrots, apples, blueberries)</div>
                </div>
              </div>
              </div>

              <div className='w-[50%]'>
              <h3 className="font-bold">To Avoid:</h3>
              <div className="mb-[10px] grid grid-cols-2 gap-[40px]">
                <div>
                  <div className="flex">
                    <div className="relative inline-block h-15 w-15">
                      <img src={chocolate} className="h-full w-full" alt="chocolate" />
                      <div className="absolute top-1/2 left-[15%] w-[80%] h-[6px] bg-black opacity-70 rotate-45"></div>
                    </div>
                  </div>
                  <div>Chocolate</div>
                </div>

                <div>
                  <div className="flex">
                    <div className="relative inline-block h-15 w-15">
                      <img src={grapes} className="h-full w-full" alt="grapes" />
                      <div className="absolute top-1/2 left-[15%] w-[60%] h-[6px] bg-black opacity-70 rotate-45"></div>
                    </div>
                  </div>
                  <div>Grapes and raisins</div>
                </div>

                <div>
                  <div className="flex">
                    <div className="relative inline-block h-15 w-15">
                      <img src={onion} className="h-full w-full" alt="onion" />
                      <div className="absolute top-1/2 left-[15%] w-[70%] h-[6px] bg-black opacity-70 rotate-45"></div>
                    </div>
                  </div>
                  <div>Onions and garlic</div>
                </div>

                <div>
                  <div className="flex">
                    <div className="relative inline-block h-15 w-15">
                      <img src={fatty} className="h-full w-full" alt="fatty" />
                      <div className="absolute top-1/2 left-[15%] w-[100%] h-[6px] bg-black opacity-70 rotate-45"></div>
                    </div>
                  </div>
                  <div>Excessively fatty or processed foods</div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Health Information */}
        <div className="p-[20px]">
          <h2 className="text-[30px] font-bold mb-[20px]">Health & Care</h2>
          <h3 className="font-bold">Bloat Symptoms:</h3>
          <ul className="list-disc pl-[20px] mb-[10px]">
            {petData.health.bloatSymptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
          <h3 className="font-bold">Prevention Tips:</h3>
          <ul className="list-disc pl-[20px]">
            {petData.health.bloatPrevention.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Guide;
