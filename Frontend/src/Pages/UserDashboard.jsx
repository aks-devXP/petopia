import React, { useState } from 'react';
import { FaBookMedical, FaCalendarMinus, FaCircleUser } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import Appointments from '../Components/Dashboard/Appointments';
import ButtonNav from '../Components/Dashboard/ButtonNav';
import History from '../Components/Dashboard/History';
import Messages from '../Components/Dashboard/Messages';
import Pass from '../Components/Dashboard/Pass';
import User from '../Components/Dashboard/User';


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
  // useEffect( ()=>{
  //   const fetchUserProfile = async () => {
  //   try {
  //     const response = await GetProfileInfo(); // Fetch user data
  //     const data = await response.json(); // Convert response to JSON

  // useEffect( ()=>{
  //   const fetchUserProfile = async () => {
  //   try {
  //     const response = await GetProfileInfo(); // Fetch user data
  //     const data = await response.json(); // Convert response to JSON

  //     if (response.ok) {
  //       setUser((prevUser) => ({
  //         ...prevUser,
  //         ...data, // Update user state with fetched data
  //       }));
  //     } else {
  //       console.error("Error fetching user data:", data.message);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch user profile:", error);
  //   }
  // };

  // fetchUserProfile(); 
    
  // },[]);
  const [isEditing, setIsEditing] = useState(false);
  const [toggleButton, setToggleButton] = useState(1);

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

  return (
    <>
      <div className='bg-white h-screen'>
        <div className='flex h-full'>
          <div className='lg:w-1/5 h-full bg-n-6'>
              <ul className= 'w-full font-grotesk text-lg'>
                <ButtonNav click={() => setToggleButton(1)} icon={<MdDashboard/>} content={<li className=''>My Account</li>} isActive={toggleButton === 1}></ButtonNav>
                <ButtonNav click={() => setToggleButton(2)} icon={<FaCircleUser />} content={<li className=''>Login & Security</li>} isActive={toggleButton === 2}></ButtonNav>
                <ButtonNav click={() => setToggleButton(3)} icon={<FaCalendarMinus/>} content={<li className=''>My Appointments</li>} isActive={toggleButton === 3}></ButtonNav>
                <ButtonNav icon={<FaBookMedical/>} click={() => setToggleButton(4)} content={<li className='' >Medical History</li>} isActive={toggleButton === 4}></ButtonNav>
                <ButtonNav click={() => setToggleButton(5)} icon={<TiMessages/>} content={<li className='' >Messages Preferences</li>} isActive={toggleButton === 5}></ButtonNav>
              </ul>
          </div>

          <div className='w-4/5 bg-black'>
              <div className='w-[90%] h-fit mx-auto my-5'>
                  {toggleButton == 1 ? <User isEditing={isEditing}  toggleEditing={toggleEditing} handleChange={handleChange}></User> : <></>}
                  {toggleButton == 2 ? <Pass/>: <></>}
                  {toggleButton == 3 ? <Appointments />: <></>}
                  {toggleButton == 4 ? <History/> : <></>}
                  {toggleButton == 5 ? <Messages/> : <></>}
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
