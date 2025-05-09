import React, { useState, useRef } from 'react';
import { FaFilePdf, FaFileImage, FaTimes } from 'react-icons/fa';
import ReCAPTCHA from "react-google-recaptcha";

const ReportCrueltyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    phoneNumber: '',
    email: '',
    animalLocation: '',
    animalCity: '',
    incidentDate: '',
    incidentDetails: '',
    consent: false,
    files: []
  });

  const [fileError, setFileError] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  const recaptchaRef = useRef(null);
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  // console.log(siteKey);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      // Filter for allowed file types
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      const newFiles = Array.from(files)
        .filter(file => {
          // Check file type
          if (!allowedTypes.includes(file.type)) {
            setFileError('Only JPG, PNG & PDF files are allowed');
            return false;
          }
          // Check file size
          if (file.size > MAX_FILE_SIZE) {
            setFileError('File size should not exceed 10MB');
            return false;
          }
          setFileError('');
          return true;
        });
      
      // Combine existing files with new files, maintaining the 3-file limit
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...newFiles].slice(0, 3)
      }));

      e.target.value = '';
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const removeFile = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, index) => index !== indexToRemove)
    }));
  };

  const getFileIcon = (file) => {
    if (file.type === 'application/pdf') {
      return <FaFilePdf className="w-8 h-8 text-red-500" />;
    }
    return <FaFileImage className="w-8 h-8 text-blue-500" />;
  };

  const sendTokenToBackend = async (token) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/verify-recaptcha`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      console.log("Verification result:", data);
    } catch (err) {
      console.error("Failed to verify token", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate captcha
    if (!captchaValue) {
      alert('Please complete the captcha verification');
      return;
    }

    // Get the token from the recaptcha
    const token = window.grecaptcha.getResponse();
    console.log(JSON.stringify(token));

    // Send the token to the backend
    sendTokenToBackend(token);

    // Reset the CAPTCHA after submit
    window.grecaptcha.reset();
    
    // Handle form submission here
    console.log(formData);

    // adding API call for submission
  };

  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <div className="min-h-screen bg-[#FFF7D6] py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg px-10 py-5">
        <h1 className="text-3xl font-bold text-center text-[#704214] mb-8">
          Report Animal Cruelty
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column - Personal Information */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    placeholder="Enter your full name"
                    onChange={handleChange}
                    className="mt-1 block w-full h-10 px-2 rounded-md border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-[#FF8C42]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    placeholder="Enter your phone number"
                    onChange={handleChange}
                    className="mt-1 block w-full h-10 px-2 rounded-md border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-[#FF8C42]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    placeholder="Enter your email address"
                    onChange={handleChange}
                    className="mt-1 block w-full h-10 px-2 rounded-md border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-[#FF8C42]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    placeholder="Enter your city"
                    onChange={handleChange}
                    className="mt-1 block w-full h-10 px-2 rounded-md border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-[#FF8C42]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    placeholder="Enter your complete address"
                    onChange={handleChange}
                    className="mt-1 block w-full h-10 px-2 rounded-md border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-[#FF8C42]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Incident</label>
                  <input
                    type="date"
                    name="incidentDate"
                    required
                    value={formData.incidentDate}
                    onChange={handleChange}
                    className="mt-1 block w-full h-10 px-2 rounded-md border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-[#FF8C42]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Animal's Location</label>
                  <input
                    type="text"
                    name="animalLocation"
                    required
                    value={formData.animalLocation}
                    placeholder="Enter the exact location where you saw the animal"
                    onChange={handleChange}
                    className="mt-1 block w-full h-10 px-2 rounded-md border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-[#FF8C42]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Animal's City</label>
                  <input
                    type="text"
                    name="animalCity"
                    required
                    value={formData.animalCity}
                    placeholder="Enter the city where the animal is abused"
                    onChange={handleChange}
                    className="mt-1 block w-full h-10 px-2 rounded-md border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-[#FF8C42]"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Incident Details and File Upload */}
            <div className="flex flex-col items-end gap-10">
              <div className='w-[80%]'>
                <label className="block text-sm font-medium text-gray-700">Incident Details</label>
                <textarea
                  name="incidentDetails"
                  required
                  rows="8"
                  value={formData.incidentDetails}
                  placeholder="Include the names, phone numbers or any relevant details of individuals involved, dates and times, detailed description of the incident, and what has been done thus far here"
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-[#FF8C42]"
                />
              </div>

              <div className='w-[80%]'>
                <p className="block text-sm font-medium text-gray-700">Attach Photos/Documents</p>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    name="files"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleChange}
                    className="mt-1 block w-full text-sm text-transparent
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-[#FF8C42] file:text-white
                      hover:file:bg-[#704214] hover:file:cursor-pointer"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Maximum 3 files allowed (JPG, PNG & PDF only) upto 10 MB each</p>
                {/* <p className="text-xs text-gray-500">Maximum file size: 10MB</p> */}
                {fileError && (
                  <p className="text-xs text-red-500 mt-1">{fileError}</p>
                )}
                
                {/* File Preview Section */}
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {formData.files.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="flex flex-col items-center p-2 border rounded-lg bg-gray-50">
                        <button
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaTimes className="w-3 h-3" />
                        </button>
                        {getFileIcon(file)}
                        <p className="mt-2 text-xs text-gray-600 truncate w-full text-center">
                          {file.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-10">
            <input
              type="checkbox"
              name="consent"
              id='consent'
              required
              checked={formData.consent}
              onChange={handleChange}
              className="h-4 w-4 text-[#FF8C42] focus:ring-[#FF8C42] border-gray-300 rounded"
            />
            <label htmlFor='consent' className="ml-2 block text-sm text-gray-700">
              <span className='font-bold'>I consent to the processing of my personal data for the purpose of investigating this report.</span>
            </label>
          </div>

          {/* reCAPTCHA Section */}
          <div className="mt-6 flex justify-center">
            <ReCAPTCHA
              sitekey={siteKey}
              ref={recaptchaRef}
              onChange={onCaptchaChange}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FF8C42] hover:bg-[#704214] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF8C42]"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportCrueltyForm; 