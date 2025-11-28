import { createReport, uploadEvidence } from '@/API/CrueltyReportAPI';
import { handleInfo, handleSuccess } from '@/Util/Alerts';
import { useRef, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { FaCalendarAlt, FaEnvelope, FaExclamationTriangle, FaFileImage, FaFilePdf, FaInfoCircle, FaMapMarkerAlt, FaPhone, FaShieldAlt, FaTimes, FaUser } from 'react-icons/fa';
const Dummy = {
  name: '',
    address: '',
    city: '',
    phoneNumber: '',
    email: '',
    animalLocation: '',
    animalCity: '',
    // can't use date of future
    incidentDate: '',
    incidentDetails: '',
    consent: false,
    files: []
}
const ReportCrueltyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    phoneNumber: '',
    email: '',
    animalLocation: '',
    animalCity: '',
    // can't use date of future
    incidentDate: '',
    incidentDetails: '',
    consent: false,
    files: []
  });

  const [fileError, setFileError] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const recaptchaRef = useRef(null);
  const fileInputRef = useRef(null);
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  // console.log(siteKey);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      if (files && files.length > 0) {
        processFiles(files);
      }
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

  const processFiles = (fileList) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const newFiles = Array.from(fileList)
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
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
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
      return data?.success;
    } catch (err) {
      console.error("Failed to verify token", err);
      return false;
    }
  };

  const handleSubmit = async (e) => {

    try {
      e.preventDefault();
      setSubmitError('');
  
      if (!captchaValue) {
        throw new Error('Please complete the captcha verification.');
        
      }
  
      const token = window.grecaptcha.getResponse();
      if (!token) {
        throw new Error('Captcha token missing. Please retry.');
        
      }
  
      setIsSubmitting(true);
      const verified = await sendTokenToBackend(token);
  
      if (!verified) {
        throw new Error('Captcha verification failed. Please retry.');
      }
      

      // API
      // console.log(formData);
       // adding API call for submission
      // Step-1 Upload Files if given
      // Only if there are files
      let uploaded = [];
      if (formData.files && formData.files.length > 0) {
        uploaded = await uploadEvidence({ photos: formData.files });
      }

      // map to URLs
      formData.photoURLs = uploaded.map((item) => item.url);

      // const data = formData;
      // delete data.files;
      // console.log(uploaded);
      const report = await createReport(formData)
      if(report){
        handleSuccess("Report Submitted Successfully")
        handleInfo("We will try to address it as soon as possible. Thank you!")
      }
      setFormData(Dummy);
      return;
    } 
    catch (error) {
      setSubmitError(error.message||"Failed To Submit The Query");
      
    }
    finally{
      window.grecaptcha.reset();
      setIsSubmitting(false);
      
    }
  };

  //  const handleSubmit = async (e) => {
  //   try {
  //     e.preventDefault();
  //     if (!captchaValue) {
  //     handleInfo('Please complete the captcha verification'); // Use handleInfo instead of alert
  //     return;
  //   }

  //   // adding API call for submission
  //   // const token = window.grecaptcha.getResponse();
  //   const token = recaptchaRef.current.getValue();
  //   // console.log(JSON.stringify(token));
  //   if (!token) {
  //         throw new Error("reCAPTCHA token missing. Please try again.");
  //     }
  
  //     // Send the token to the backend
  //     const captcha = await sendTokenToBackend(token);
  //     if(!captcha.success){
  //       throw new Error("Captcha Verification Failed");
  //     }
      
      
  //     // Handle form submission here  
  //     // adding API call for submission
  //     // Step-1 Upload Files if given
  //     const uploaded = await uploadEvidence({photos:formData.files});
  //     formData.photoURLS = uploaded.map(element => {
  //       return element.url;
  //     });
  //     const data = formData;
  //     delete data.files;
  //     // console.log(uploaded);
  //     const report = await createReport(formData)
  //     if(report){
  //       handleSuccess("Report Submitted Successfully")
  //       handleInfo("We will try to address it as soon as possible. Thank you!")
  //     }
      
  //   } 
  //   catch (error) {
  //     handleError(error.message||"Error in Submitting the Cruelty Report Form")
  //   }
  //   finally{
  //     // Reset the CAPTCHA after submit
  //     recaptchaRef.current.reset();
  //   }
  // };


  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7D6] via-[#FFF9E6] to-[#FFF7D6] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section with Graphic */}
        <div className="bg-gradient-to-r from-[#FF8C42] to-[#704214] rounded-t-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between px-8 py-10 text-white">
            <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <FaShieldAlt className="text-5xl md:text-6xl text-white opacity-90" />
                <h1 className="text-4xl md:text-5xl font-bold">
                  Report Animal Cruelty
                </h1>
              </div>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto md:mx-0">
                Your voice matters. Help us protect animals by reporting incidents of cruelty. 
                All reports are taken seriously and handled with confidentiality.
              </p>
            </div>
            <div className="flex-shrink-0">
              {/* Decorative SVG Graphic */}
              <svg 
                className="w-48 h-48 md:w-64 md:h-64 opacity-20" 
                viewBox="0 0 200 200" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M60 100 Q100 60 140 100" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <path d="M80 120 Q100 100 120 120" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <circle cx="85" cy="90" r="3" fill="currentColor"/>
                <circle cx="115" cy="90" r="3" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg shadow-sm">
          <div className="flex items-start">
            <FaInfoCircle className="text-blue-500 text-xl mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> Please provide as much detail as possible. 
                Include dates, times, locations, and any evidence (photos/videos). 
                Your information helps us take swift action to protect animals in need.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-b-2xl shadow-xl px-6 md:px-10 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Personal Information */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#FF8C42]/10 to-transparent p-4 rounded-lg border-l-4 border-[#FF8C42] mb-4">
                <h2 className="text-xl font-semibold text-[#704214] flex items-center gap-2">
                  <FaUser className="text-[#FF8C42]" />
                  Your Information
                </h2>
                <p className="text-sm text-gray-600 mt-1">We'll keep your information confidential</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaUser className="text-[#FF8C42] text-sm" />
                    Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      placeholder="Enter your full name"
                      onChange={handleChange}
                      className="block w-full h-11 px-4 pl-10 rounded-lg border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaPhone className="text-[#FF8C42] text-sm" />
                    Phone Number
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      placeholder="Enter your phone number"
                      onChange={handleChange}
                      className="block w-full h-11 px-4 pl-10 rounded-lg border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaEnvelope className="text-[#FF8C42] text-sm" />
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      placeholder="Enter your email address"
                      onChange={handleChange}
                      className="block w-full h-11 px-4 pl-10 rounded-lg border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#FF8C42] text-sm" />
                    City
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      placeholder="Enter your city"
                      onChange={handleChange}
                      className="block w-full h-11 px-4 pl-10 rounded-lg border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#FF8C42] text-sm" />
                    Address
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      placeholder="Enter your complete address"
                      onChange={handleChange}
                      className="block w-full h-11 px-4 pl-10 rounded-lg border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaCalendarAlt className="text-[#FF8C42] text-sm" />
                    Date of Incident
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="date"
                      name="incidentDate"
                      required
                      value={formData.incidentDate}
                      onChange={handleChange}
                      className="block w-full h-11 px-4 pl-10 rounded-lg border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#FF8C42] text-sm" />
                    Animal's Location
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      name="animalLocation"
                      required
                      value={formData.animalLocation}
                      placeholder="Enter the exact location where you saw the animal"
                      onChange={handleChange}
                      className="block w-full h-11 px-4 pl-10 rounded-lg border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#FF8C42] text-sm" />
                    Animal's City
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      name="animalCity"
                      required
                      value={formData.animalCity}
                      placeholder="Enter the city where the animal is abused"
                      onChange={handleChange}
                      className="block w-full h-11 px-4 pl-10 rounded-lg border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Incident Details and File Upload */}
            <div className="flex flex-col gap-8">
              <div className="bg-gradient-to-r from-[#FF8C42]/10 to-transparent p-4 rounded-lg border-l-4 border-[#FF8C42]">
                <h2 className="text-xl font-semibold text-[#704214] flex items-center gap-2">
                  <FaExclamationTriangle className="text-[#FF8C42]" />
                  Incident Information
                </h2>
                <p className="text-sm text-gray-600 mt-1">Provide detailed information about the incident</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaExclamationTriangle className="text-[#FF8C42] text-sm" />
                  Incident Details
                </label>
                <textarea
                  name="incidentDetails"
                  required
                  rows="10"
                  value={formData.incidentDetails}
                  placeholder="Include the names, phone numbers or any relevant details of individuals involved, dates and times, detailed description of the incident, and what has been done thus far here"
                  onChange={handleChange}
                  className="block w-full p-4 rounded-lg border-gray-300 shadow-sm focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20 transition-all resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  💡 Tip: Be as specific as possible. Include dates, times, locations, and descriptions of what you witnessed.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaFileImage className="text-[#FF8C42] text-sm" />
                  Attach Photos/Documents
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="files"
                  multiple
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleChange}
                  className="hidden"
                />
                <div
                  onClick={handleFileClick}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 bg-gradient-to-br from-gray-50 to-white transition-all cursor-pointer ${
                    isDragging
                      ? 'border-[#FF8C42] bg-[#FF8C42]/10 scale-[1.02]'
                      : 'border-[#FF8C42]/30 hover:border-[#FF8C42]/50 hover:bg-[#FF8C42]/5'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center">
                    <FaFileImage className={`text-5xl text-[#FF8C42] mb-4 transition-transform ${isDragging ? 'scale-110' : ''}`} />
                    <p className="text-base font-semibold text-gray-700 mb-2">
                      {isDragging ? 'Drop files here' : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-500 text-center">
                      Maximum 3 files allowed (JPG, PNG & PDF only) up to 10 MB each
                    </p>
                  </div>
                </div>
                {fileError && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-xs text-red-600 flex items-center gap-2">
                      <FaTimes className="text-red-500" />
                      {fileError}
                    </p>
                  </div>
                )}
                
                {/* File Preview Section */}
                {formData.files.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-3">Uploaded Files:</p>
                    <div className="grid grid-cols-3 gap-4">
                      {formData.files.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="flex flex-col items-center p-3 border-2 border-gray-200 rounded-lg bg-white hover:border-[#FF8C42] hover:shadow-md transition-all">
                            <button
                              onClick={() => removeFile(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                              type="button"
                            >
                              <FaTimes className="w-3 h-3" />
                            </button>
                            {getFileIcon(file)}
                            <p className="mt-2 text-xs text-gray-600 truncate w-full text-center font-medium">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Consent Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <div className="flex items-start">
              <input
                type="checkbox"
                name="consent"
                id='consent'
                required
                checked={formData.consent}
                onChange={handleChange}
                className="h-5 w-5 text-[#FF8C42] focus:ring-[#FF8C42] border-gray-300 rounded mt-0.5 flex-shrink-0"
              />
              <label htmlFor='consent' className="ml-3 block text-sm text-gray-700">
                <span className='font-semibold text-gray-800'>I consent to the processing of my personal data for the purpose of investigating this report.</span>
                <span className='block text-xs text-gray-600 mt-1'>Your information will be kept confidential and used solely for the purpose of investigating this report.</span>
              </label>
            </div>
          </div>

          {/* reCAPTCHA Section */}
          <div className="mt-8 flex flex-col items-center">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-sm text-gray-600 mb-4 text-center">Please verify you're human</p>
              <ReCAPTCHA
                sitekey={siteKey}
                ref={recaptchaRef}
                onChange={onCaptchaChange}
              />
            </div>
          </div>

          {submitError && (
            <p className="text-center text-sm text-red-600 mt-3">{submitError}</p>
          )}

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-3 py-4 px-8 border border-transparent shadow-lg text-base font-semibold rounded-lg text-white bg-gradient-to-r from-[#FF8C42] to-[#704214] hover:from-[#704214] hover:to-[#FF8C42] focus:outline-none focus:ring-4 focus:ring-[#FF8C42]/30 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FaShieldAlt className="text-lg" />
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
            <p className="text-xs text-gray-500 mt-4">
              By submitting this form, you confirm that all information provided is accurate to the best of your knowledge.
            </p>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default ReportCrueltyForm; 
