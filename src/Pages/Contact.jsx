import React from 'react';
import { NavLink } from 'react-router-dom';
import manager from '../assets/avatar/manager.jpg';
import Header from '../Components/Header';

const Contact = () => {
  return (
    <>
      <Header normal1='We treat your feedback seriously.' highlighted='Contact Us' normal2='for any queries.' textcol='antiquewhite'></Header>
      <section
        className="py-12 bg-n-8"
        id="section_6"
      >
        <div className="container mx-auto">
          <div className="flex flex-wrap">

            {/* Contact Info Section */}
            <div className="lg:w-1/3 w-full lg:ml-auto mb-8 lg:mb-0">
              <div className="bg-n-6 p-6 rounded-3xl shadow">
                <h2 className="text-2xl font-semibold mb-6">Get in touch</h2>

                <div className="flex items-center mb-6">
                  <img
                    src={manager}
                    className="w-32 h-32 object-cover rounded-full"
                    alt=""
                  />
                  <div className="ml-4">
                    <p className="text-lg font-medium mb-1">Clara Barton</p>
                    <p className="text-sm font-semibold text-n-3">
                      HR &amp; Office Manager
                    </p>
                  </div>
                </div>

                <div className="">
                  <h5 className="text-lg text-white font-semibold mb-4">Contact Information</h5>
                  <p className="flex text-n-3 items-center mb-3">
                    <i className="bi-geo-alt mr-2"></i>
                    Akershusstranda 20, 0150 Oslo, Norway
                  </p>
                  <p className="flex items-center mb-3">
                    <i className="bi-telephone mr-2"></i>
                    <NavLink
                      to="tel:+91999966660"
                      className="text-blue-400 hover:underline"
                    >
                      +91 999966660
                    </NavLink>
                  </p>
                  <p className="flex items-center mb-3">
                    <i className="bi-envelope mr-2"></i>
                    <NavLink
                      to="mailto:support@petopia.com"
                      className="text-blue-400 hover:underline"
                    >
                      support@petopia.com
                    </NavLink>
                  </p>
                  <NavLink
                    to="https://maps.app.goo.gl/h3owoTeNAq6g5yYH7"
                    className="mt-4 inline-block px-6 py-2 bg-color-7 text-white rounded hover:bg-blue-500"
                  >
                    Get Direction
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="lg:w-1/2 w-full mx-auto">
              <form
                className="p-6 bg-n-6 rounded-3xl shadow"
                action="#"
                method="post"
                role="form"
              >
                <h2 className="text-2xl font-semibold mb-4">Contact form</h2>
                <p className="mb-6 text-n-3">
                  Or, you can just send an email at:  
                  <NavLink
                    to="mailto:support@petopia.com"
                    className="text-blue-400 hover:underline"
                  >
                    {' '}
                    support@petopia.com
                  </NavLink>
                </p>

                <div className="flex flex-wrap -mx-2">
                  <div className="w-1/2 px-2 mb-4">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                      placeholder="Jack"
                      required
                    />
                  </div>
                  <div className="w-1/2 px-2 mb-4">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <input
                  type="email"
                  name="email"
                  id="email"
                  pattern="[^ @]*@[^ @]*"
                  className="w-full p-3 mb-4 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                  placeholder="Jackdoe@gmail.com"
                  required
                />

                <select
                  id="exampleDropdown"
                  className="w-full p-3 mb-4 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Who are you
                  </option>
                  <option value="petOwner">Pet Owner</option>
                  <option value="option2">Veterinary Doc</option>
                  <option value="option3">Pet Trainer</option>
                  <option value="option4">Others</option>
                </select>

                <textarea
                  name="message"
                  rows="5"
                  className="w-full p-3 mb-4 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                  id="message"
                  placeholder="How can we help you?"
                ></textarea>

                <button
                  type="submit"
                  className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
