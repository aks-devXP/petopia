import { useQueries } from '@tanstack/react-query';
import {
  Calendar1,
  HeartPulse,
  LogOut,
  MessageCircleMore,
  UserCircle,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { GetPets } from '../API/PetApi';
import { getAppointments, GetProfileInfo } from '../API/UserAPI';
import Appointments from '../Components/Dashboard/Appointments';
import History from '../Components/Dashboard/History';
import Messages from '../Components/Dashboard/Messages';
import Pass from '../Components/Dashboard/Pass';
import User from '../Components/Dashboard/ProfileSettings';
import Slidebar, { SlidebarItem } from '../Components/Dashboard/slidebar';
import Loader from '../Components/Loader/Loader';
import { handleError } from '../Util/Alerts';

const UserDashboard = () => {
  const [user, setUser] = useState({
    password: 'TTTTTTTT',
    name: 'Clara Barton',
    age: 30,
    gender: '',
    phone: '+91 99XXXXXXXX',
    email: '',
    petStatus: false,
  });

  const { option } = useParams();

  const [toggleButton, setToggleButton] = useState(null);

  useEffect(() => {
    if (option) {
      setToggleButton(Number(option));
    }
  }, [option]);

  const [userInfo, petInfo, appointments] = useQueries({
    queries: [
      {
        queryKey: ['userProfile'],
        queryFn: GetProfileInfo
      },
      {
        queryKey: ['petProfile'],
        queryFn: GetPets
      },
      {
        queryKey: ['Appointments'],
        queryFn: getAppointments
      }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const logOut =  ()=>{
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('userAuth');
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
    console.log("Error In ",userInfo.error.message);
    handleError(userInfo.error.message);
  }
  // console.log("User Dash", userInfo.data);
  // console.log("Pet Dash", petInfo.data);
  // if (!appointments.isPending) {
  //   console.log("Appointments", appointments.data);
  // }
  
  return (
    <>
    {(appointments.isPending &&  userInfo.isPending)  ?(<div>
      <Loader/>
    </div>):(
      <div className='bg-[#1A120B] min-h-screen'>
        <div className='flex h-full bg-[#1A120B]'>
          <div className='h-[85vh] flex flex-col justify-between pr-2 '>
            <Slidebar>
              <SlidebarItem click={() => setToggleButton(1)} active={toggleButton === 1} icon={<UserCircle />} className="bg-[#1A120B]" text="User Profile" />
              <SlidebarItem click={() => setToggleButton(3)} active={toggleButton === 3} icon={<Calendar1 />} text="Appointments" alert="See Appointments" />
              <SlidebarItem click={() => setToggleButton(4)} active={toggleButton === 4} icon={<HeartPulse />} text="Medical History" alert="View Medical History" />
              <SlidebarItem click={() => setToggleButton(5)} active={toggleButton === 5} icon={<MessageCircleMore />} text="Message Settings" alert={false} />
              <SlidebarItem icon={<LogOut />} text="Logout" alert={false} click = {logOut} />
            </Slidebar>
          </div>

          <div className='w-full'>
            <div className='px-2 h-fit mx-auto my-5 border-l border-[#E5E5CB]/20'>
              {(userInfo.isPending && petInfo.isPending) || toggleButton === null ? (
                <div className='text-center text-2xl font-grotesk'>Loading...</div>
              ) : (
                <>
                  {toggleButton === 1 && <User info={userInfo.data} petInfo={petInfo.data} userFetch= {userInfo.refetch} petFetch ={petInfo.refetch} />}
                  {toggleButton === 2 && <Pass />}
                  {toggleButton === 3  && <Appointments  data = {appointments.data} refetch = {appointments.refetch} petdata={petInfo.data} />}
                  {toggleButton === 4 && <History />}
                  {toggleButton === 5 && <Messages />}
                </>
              )}
            </div>
          </div>
        </div>
      </div>)
      }
    </>
  );
};

export default UserDashboard;