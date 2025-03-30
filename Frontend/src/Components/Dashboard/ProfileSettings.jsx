import React, { useState } from 'react';
import { ChevronDown, Pencil, PencilIcon, Trash2 } from 'lucide-react';

const ProfileSettings = () => {
  // State for form values
  const [formValues, setFormValues] = useState({
    name: 'Akash',
    surname: 'Kumar',
    email: 'gay@guy.com',
    city: 'New Delhi',
    address: '123 Pet Street',
    state: 'Delhi',
    petName: 'Buddy',
    petCategory: 'Dog',
    petBreed: 'Golden Retriever',
    petAge: '3 years'
  });

  return (
    <div className="bg-[#111111] bg-opacity-50 text-[#E5E5CB] p-8 pt-0 min-h-screen">
      
      {/* Profile Section */}
      <div className="mb-12">
        <div className='flex items-center gap-2'>
            <h2 className="text-lg font-medium mb-1">Profile</h2>
            <PencilIcon size={16}/>
        </div>
        <p className="text-sm text-[#E5E5CB]/50 mb-6">Set your account details</p>
        
        <div className="flex flex-wrap">
          <div className="w-full lg:w-3/4 pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-[#E5E5CB]/50 mb-1">Name</label>
                <input 
                  type="text" 
                  value={formValues.name} 
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-[#E5E5CB]" 
                />
              </div>
              <div>
                <label className="block text-sm text-[#E5E5CB]/50 mb-1">Surname</label>
                <input 
                  type="text" 
                  value={formValues.surname} 
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-[#E5E5CB]" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-[#E5E5CB]/50 mb-1">Email</label>
              <input 
                type="email" 
                value={formValues.email} 
                className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-[#E5E5CB]" 
              />
            </div>
          </div>
          
          <div className="w-full lg:w-[24%] flex justify-center lg:justify-end mt-6 lg:mt-0">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-[#e5d6c5] flex items-center justify-center overflow-hidden">
                <img src="" alt="Profile" className="w-full h-full object-cover"/>
              </div>
              <div className="mt-2 flex justify-center">
                <button className="bg-[#3C2A21] text-sm border rounded-full px-3 py-1 text-gray-300 mr-2">
                  Edit photo
                </button>
                <button>
                  <Trash2 size={18}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pet Details */}
      <div className="mb-12">
        <h2 className="text-lg font-medium mb-1">Pet Details</h2>
        <p className="text-sm text-[#E5E5CB]/50 mb-6">Let us know more about your friend</p>
        
        <div className='flex flex-col gap-6'>
        <div className='flex gap-4'>
          <div className='w-[24%]'>
            <label className="block text-sm text-[#E5E5CB]/50 mb-1">Name</label>
            <input
              type="text"
              value={formValues.petName}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-[#E5E5CB]"
            />
          </div>
          <div className='w-[24%]'>
            <label className="block text-sm text-[#E5E5CB]/50 mb-1">Category</label>
            <input
              type="text"
              value={formValues.petCategory}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-[#E5E5CB]"
            />
          </div>
          <div className='w-[24%]'>
            <label className="block text-sm text-[#E5E5CB]/50 mb-1">Breed</label>
            <input
              type="text"
              value={formValues.petBreed}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-[#E5E5CB]"
            />
          </div>
          <div className='w-[24%]'>
            <label className="block text-sm text-[#E5E5CB]/50 mb-1">Age</label>
            <input
              type="text"
              value={formValues.petAge}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-[#E5E5CB]"
            />
          </div>
          <div className='w-[4%] pt-7 pl-2'>
                <Trash2/>
            </div>
        </div>
        <div className='flex gap-4'>
          <div className='w-[24%]'>
            <label className="block text-sm text-[#E5E5CB]/50 mb-1">Name</label>
            <input
              type="text"
              value={formValues.petName}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-[#E5E5CB]"
            />
          </div>
          <div className='w-[24%]'>
            <label className="block text-sm text-[#E5E5CB]/50 mb-1">Category</label>
            <input
              type="text"
              value={formValues.petCategory}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-[#E5E5CB]"
            />
          </div>
          <div className='w-[24%]'>
            <label className="block text-sm text-[#E5E5CB]/50 mb-1">Breed</label>
            <input
              type="text"
              value={formValues.petBreed}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-[#E5E5CB]"
            />
          </div>
          <div className='w-[24%]'>
            <label className="block text-sm text-[#E5E5CB]/50 mb-1">Age</label>
            <input
              type="text"
              value={formValues.petAge}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-[#E5E5CB]"
            />
          </div>
          <div className='w-[4%] pt-7 pl-2'>
                <Trash2/>
            </div>
        </div>
        </div>
        <button className="bg-[#3C2A21] border rounded-md w-20 px-3 py-1 mt-6 text-gray-300 mr-2">
            Add
        </button>
      </div>
      
      {/* Location */}
      <div className="mb-12">
        <div className="flex items-center mb-1">
          <h2 className="text-lg font-medium">Location</h2>
          <div className="ml-2 relative group">
            {/* <button className="rounded-full border border-[#333] w-5 h-5 flex items-center justify-center text-[#E5E5CB]/50 text-xs">
              i
            </button>
            <div className="absolute hidden group-hover:block bg-[#222] p-2 rounded text-xs w-48 text-gray-300 top-full mt-1 left-0 z-10">
              More information about 
            </div> */}
          </div>
        </div>
        <p className="text-sm text-[#E5E5CB]/50 mb-6">Calibrate your results based on your locality</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Address</label>
            <input 
              type="text" 
              value={formValues.address} 
              className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-white" 
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">City</label>
            <input 
              type="text" 
              value={formValues.city} 
              className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-white" 
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">State</label>
            <input 
              type="text" 
              value={formValues.state} 
              className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-white" 
            />
          </div>
          </div>
      </div>
    </div>
  );
};

export default ProfileSettings;