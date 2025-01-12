import React from 'react';
import { NavLink } from 'react-router-dom';
import mission from '../assets/mission.jpg';

const TeamInfo = () => {
  return (
    <>
      <section
        className="py-12 bg-n-8"
        id="section_2"
      >
        <div className="container flex flex-nowrap justify-between gap-10 mx-auto px-6">
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
              <img
                src={mission}
                className="rounded-3xl shadow-md w-full"
                alt=""
              />
            </div>

            <div className='lg:w-1/2'>
            <div className="w-full">
              <div className="mb-8 w-1/2">
                <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
                <h5 className="text-xl font-medium mb-4">Clean & Responsive Web-App</h5>
                <p className="text-n-4">
                  The Project is based on MERN Stack with Tailwind for CSS and is currently under development.
                </p>
              </div>

              <div className="flex">
                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                  <div className="mb-6">
                    <h5 className="text-lg font-semibold mb-3">Our Mission</h5>
                    <p className="text-n-4">All in one solution for all needs related to your furry friends</p>
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <div className="flex justify-between md:block">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-semibold">2025</div>
                      <div className="text-n-4">Founded</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-semibold">3</div>
                      <div className="text-n-4">Team Size</div>
                    </div>
                  </div>
                </div>
            </div>

              </div>
            </div>
            </div>
            <div>
        </div>
      </section>
    </>
  );
};

export default TeamInfo;
