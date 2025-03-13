import React, { useEffect, useState } from 'react';
import { GetProfileInfo } from '../../API/UserAPI';
import manager from '../../assets/avatar/manager.jpg';
import NameHolder from '../Dashboard/NameHolder';

const User = ({isEditing,toggleEditing,handleChange}) => {
    const [user, setUser] = useState({
        password: 'TTTTTTTT',
        name: 'Clara Barton',
        age: 30,
        gender: 'Female',
        phone: '+91 99XXXXXXXX',
        email: 'clara@gmail.com',
        petStatus: false,
    });

     useEffect( ()=>{
        const fetchUserProfile = async () => {
          try {
            const response = await GetProfileInfo(); // Fetch user data
            const data = await response.json(); // Convert response to JSON
      
            if (response.ok) {
              setUser((user)=>({
                ...user,
                ...data.user, // Update user state with fetched data
                })
              );
            } else {
              console.error("Error fetching user data:", data.message);
            }
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
    }
        };
        fetchUserProfile(); 
        
      },[]);
  return (
    <>
        <div className='text-[#E5E5CB] p-6 rounded-3xl shadow'>
            <h2 className='text-2xl font-semibold mb-6'>My Profile</h2>

            <div className='flex items-center mb-6'>
            <NameHolder 
                firstName="John" 
                lastName="Doe" 
                isEditable={isEditing}/>
            {/* {isEditing?
                />:<img src={manager} className='w-48 h-48 object-cover rounded-full' alt='User Avatar' />} */}
            <div className='ml-4'>
                {isEditing ? (
                    <div className='border border-[#E5E5CB] rounded-lg pl-2'>
                        <input
                        type='text'
                        name='name'
                        value={user.name}
                        onChange={handleChange}
                        className='text-lg font-medium bg-transparent  focus:outline-none'
                        />
                    </div>
                ) : (
                <p className='text-lg font-medium'>{user.name}</p>
                )}
                <p className='text-sm font-semibold text-n-3'>{user.petStatus ? ('Pet Owner') : ('User')}</p>
            </div>
            </div>

            <div>
            <h5 className='text-lg text-[#E5E5CB] font-semibold mb-4'>Contact Information</h5>
            <p className='mb-3'>
                Email:
                {isEditing ? (
                    <div className='border border-[#E5E5CB] rounded-lg mt-1 pl-2 w-[50%] px-2 py-1'>
                        <input
                        type='email'
                        name='email'
                        value={user.email}
                        onChange={handleChange}
                        className='bg-transparent w-full border-b focus:outline-none'
                        />
                    </div>
                ) : (
                <span className='ml-2'>{user.email}</span>
                )}
            </p>

            <p className='mb-3'>
                Phone:
                {isEditing ? (
                    <div className='border border-[#E5E5CB] rounded-lg mt-1 pl-2 w-fit p-1'>
                        <input
                        type='text'
                        name='phone'
                        value={user.phone}
                        onChange={handleChange}
                        className='bg-transparent border-b focus:outline-none'
                        />
                    </div>
                ) : (
                <span className='ml-2'>{user.phone}</span>
                )}
            </p>
            <p className='mb-3'>
                Age:
                {isEditing ? (
                    <div className='border border-[#E5E5CB] rounded-lg mt-1 pl-2 w-fit py-1 px-2'>
                        <input
                        type='number'
                        name='age'
                        value={user.age}
                        onChange={handleChange}
                        className='bg-transparent border-b focus:outline-none'
                        />
                    </div>
                ) : (
                <span className='ml-2'>{user.age}</span>
                )}
            </p>
            <p className='mb-3'>
                Gender:
                {isEditing ? (
                <select
                    name='gender'
                    value={user.gender}
                    onChange={handleChange}
                    className='ml-2  border-b bg-inherit focus:outline-none'
                >
                    <option value='Female' className='bg-black'>Female</option>
                    <option value='Male' className='bg-black'>Male</option>
                    <option value='Other' className='bg-black'>Other</option>
                </select>
                ) : (
                <span className='ml-2'>{user.gender}</span>
                )}
            </p>
            
            <button
                className='mt-4 px-6 py-2 bg-[#3C2A21] text-[#E5E5CB] rounded-xl hover:bg-[#D5CEA3] hover:text-black'
                onClick={toggleEditing}
            >
                {isEditing ? 'Save Details' : 'Update Information'}
            </button>
            </div>
        </div>
    </>
  )
}

export default User