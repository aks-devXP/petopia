import { useQueries } from '@tanstack/react-query';
import {
  Calendar1,
  HeartPulse,
  LogOut,
  MessageCircleMore,
  UserCircle,
} from 'lucide-react';
import React, { useState } from 'react';
import { GetPets } from '../API/PetApi';
import { getAppointments, GetProfileInfo } from '../API/UserAPI';
import Appointments from '../Components/Dashboard/Appointments';
import AuthControl from '../Components/Dashboard/AuthControl';
import History from '../Components/Dashboard/History';
import Messages from '../Components/Dashboard/Messages';
import Pass from '../Components/Dashboard/Pass';
import User from '../Components/Dashboard/ProfileSettings';
import Slidebar, { SlidebarItem } from '../Components/Dashboard/slidebar';
import Loader from '../Components/Loader/Loader';
import { handleError } from '../Util/Alerts';


const Testing = () => {

  // ************* This Is for Cloudinary Image Upload ************ //
  // const [file, setFile] = useState('');
  // const [image, setImage] = useState('');
  // const [imageUrl, setImageUrl] = useState('');

  // const handleChange = (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const selectedFile = e.target.files[0];

  //     const reader = new FileReader();
  //     reader.readAsDataURL(selectedFile);

  //     reader.onloadend = () => {
  //       const imagePreview = reader.result;
  //       setImage(imagePreview);
  //       console.log('Preview Image:', imagePreview);
  //     };
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const result = await fetch('http://localhost:3456/api/upload/upload_image', {
  //       method: 'POST',
  //       body: JSON.stringify({ image }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     const data = await result.json();
  //     console.log('File uploaded successfully:', data);

  //     const uploadedFile = data.public_id;
  //     setFile(data.url);
  //     setImageUrl(data.url);
  //     console.log('Uploaded File:', uploadedFile);
  //   } 
  //   catch (error) {
  //     console.error('Error uploading file:', error);
  //   }
  // };

  // return (
  //   <div className="flex flex-col items-start justify-center mt-4 w-screen h-screen">
  //     <h1>Hello, This is a Cloudinary Set Intro.</h1>

  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         {imageUrl ? (
  //           <div className="app_image">
  //             <h2>Uploaded Image:</h2>
  //             <img className="ViewImage" src={imageUrl} alt="Uploaded" />
  //           </div>
  //         ) : (
  //           <>
  //             <label htmlFor="fileInput">Upload your photo here</label>
  //             <input
  //               type="file"
  //               id="fileInput"
  //               onChange={handleChange}
  //               required
  //               accept="image/png, image/jpg, image/jpeg"
  //             />
  //             <button className="app-Submit_button" type="submit">
  //               Upload
  //             </button>
  //           </>
  //         )}
  //       </div>
  //     </form>

  //     <div className="mt-4">
  //       {image ? (
  //         <div className="app-Preview_image">
  //           <h2>Preview:</h2>
  //           <img className="w-28 h-60" src={image} alt="Preview" />
  //         </div>
  //       ) : (
  //         <div>
  //           <h2>No file selected</h2>
  //         </div>
  //       )}
  //        <div className="mt-4 bg-white p-4 rounded-lg shadow-md ">
  //     <PhotoUploader maxImages= {4}  />
  //     </div>


  //     </div>

  //   </div>
  // );
  const [user, setUser] = useState({
    password: 'TTTTTTTT',
    name: 'Clara Barton',
    age: 30,
    gender: '',
    phone: '+91 99XXXXXXXX',
    email: '',
    petStatus: false,
  });

  // const { option } = useParams();

  const [toggleButton, setToggleButton] = useState(1);


  const [userInfo, petInfo, appointments] = useQueries({
    queries: [
      {
        queryKey: ['userProfile'],
        queryFn: GetProfileInfo,
        enabled: localStorage.getItem('userAuth') === 'user',
      },
      {
        queryKey: ['petProfile'],
        queryFn: GetPets,
        enabled: localStorage.getItem('userAuth') === 'user',
      },
      {
        queryKey: ['Appointments'],
        queryFn: getAppointments
      }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const logOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    window.location.href = '/';
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  if (userInfo.error) {
    console.log("Error In ", userInfo.error.message);
    handleError(userInfo.error.message);
  }
  // console.log("User Dash", userInfo.data);
  // console.log("Pet Dash", petInfo.data);
  // if (!appointments.isPending) {
  //   console.log("Appointments", appointments.data);
  // }

  return (
    <>
      {(appointments.isPending && userInfo.isPending) ? (<div>
        <Loader />
      </div>) : (
        <div className='bg-[#1A120B] min-h-screen'>
          <div className='flex h-full bg-[#1A120B]'>
            <div className='h-[85vh] flex flex-col justify-between pr-2 '>
              <Slidebar>
                <SlidebarItem click={() => setToggleButton(1)} active={toggleButton === 1} icon={<UserCircle />} className="bg-[#1A120B]" text="User Profile" />
                <SlidebarItem click={() => setToggleButton(3)} active={toggleButton === 3} icon={<Calendar1 />} text="Appointments" alert="See Appointments" />
                <SlidebarItem click={() => setToggleButton(4)} active={toggleButton === 4} icon={<HeartPulse />} text="Medical History" alert="View Medical History" />
                <SlidebarItem click={() => setToggleButton(5)} active={toggleButton === 5} icon={<MessageCircleMore />} text="Message Settings" alert={false} />
                <SlidebarItem icon={<LogOut />} text="Logout" alert={false} click={logOut} />
              </Slidebar>
            </div>

            <div className='w-full'>
              <div className='px-2 h-fit mx-auto my-5 border-l border-[#E5E5CB]/20'>
                  <>
                    {toggleButton === 1 && (
                      localStorage.getItem("userAuth") === "user" ? (
                        <User
                          info={userInfo.data}
                          petInfo={petInfo.data}
                          userFetch={userInfo.refetch}
                          petFetch={petInfo.refetch}
                        />
                      ) : (
                        <AuthControl />
                      ))}
                    {toggleButton === 2 && <Pass />}
                    {toggleButton === 3 && <Appointments data={appointments.data} refetch={appointments.refetch} petdata={petInfo.data} />}
                    {toggleButton === 4 && <History />}
                    {toggleButton === 5 && <Messages />}
                  </>
              
              </div>
            </div>
          </div>
        </div>)
      }
    </>
  );
};

export default Testing;
