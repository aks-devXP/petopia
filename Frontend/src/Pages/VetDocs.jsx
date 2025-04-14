import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVets } from '../API/VetAPI';
import Loader from '../Components/Loader/Loader';

const VetDocs = () => {
    const docsPanel = [];
    const buttons = [];
    const specialities = ["General Physician", "Internal Medicine", "Surgery", "Dentistry", "Dermatology", "Ophthalmology"]
    const navigate = useNavigate();
    const {data, isPending, error} = useQuery({
        queryKey: ['getdocs'],
        queryFn: getVets,
    })
    const [doctors, setDoctors] = useState([
        {
          name: 'Dr. John Doe',
          imageUrl: 'https://vetic-img.s3.ap-south-1.amazonaws.com/Dr.anshulShukla.jpg',
          specialty: 'Cardiology',
          stars: '4.2',
          location: 'New York, USA'
        },
        {
          name: 'Dr. Satya Yadav',
          imageUrl: 'https://vetic-img.s3.ap-south-1.amazonaws.com/Satyendra.png',
          specialty: 'Pediatrics',
          stars: '5',
          location: 'Los Angeles, USA'
        },
        {
          name: 'Dr. Amit Shah',
          imageUrl: 'https://vetic-img.s3.ap-south-1.amazonaws.com/Dr.+Amit.png',
          specialty: 'Orthopedic',
          stars: '3.7',
          location: 'New Delhi, IN'
        },
    
        {
          name: 'Dr. Rajneesh Mishra',
          imageUrl: 'https://vetic-img.s3.ap-south-1.amazonaws.com/Dr.+Anurag+Garg.png',
          specialty: 'Psychatric',
          stars: '4.7',
          location: 'New Delhi, IN'
        },
    
        {
          name: 'Dr. Aazad Mani',
          imageUrl: 'https://vetic-img.s3.ap-south-1.amazonaws.com/Dr.+Anurag+Gunawat.png',
          specialty: 'Dentist',
          stars: '4.6',
          location: 'Agra, IN'
        },
    
        {
          name: 'Dr. Vinay Kumar',
          imageUrl: 'https://vetic-img.s3.ap-south-1.amazonaws.com/Dr.+Dheeraj.png',
          specialty: 'Radiology',
          stars: '3.9',
          location: 'Ratlaam, IN'
        },
    
        {
          name: 'Dr. Amrinder Chaddha',
          imageUrl: 'https://vetic-img.s3.ap-south-1.amazonaws.com/Dr.+Arun+Kumar.png',
          specialty: 'Veterinary',
          stars: '4.9',
          location: 'Ludhiana, IN'
        }
      ]);

      useEffect(()=>{
        
        setDoctors(data);
        
      },[data])
    

    if(isPending) return <div >
      <Loader/>
    </div>
    if(error) return <div className='text-center text-2xl font-grotesk'>{error.message}</div>
    console.log("Doctors", doctors);

    specialities.forEach((data) => {
        buttons.push(
            <p className='w-full pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:translate-x-2 hover:bg-sand-mid'>{data}</p>
        );
    })


    doctors.forEach((res)=>{docsPanel.push(
        <div onClick={()=>{navigate(`/vet-book/${res._id}`)}} className="border border-[rgb(201,216,255)] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 bg-sand-light">
            <img className="bg-[#EAEFFF]" src={`https://petopia-inky.vercel.app/assets/Vet/${res.profilePic}`} alt=""/>
            <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className="w-2 h-2 rounded-full bg-green-500"></p>
                    <p>Available</p>
                </div>
                <p class="text-[#262626] text-lg font-medium">{res.name}</p>
                <p class="text-[#5C5C5C] text-sm">{res.specialty}</p>
                </div>
        </div>
    )})


  return (
    <>
        <div className='bg-sand-dark flex-col flex lg:flex-row md:flex-row sm:flex-col justify-around gap-5 py-5 pt-15'>
            <div className='w-full lg:w-1/5 md:w-1/5'>
                <p className='text-2xl text-center'>Browse through our <br /> specialist doctors here</p>
                <div className='grid grid-cols-3 px-5 lg:flex lg:flex-col sm:grid sm:grid-cols-4 items-start mt-10 gap-3 lg:w-[80%] sm:w-full sm:px-5'>
                    {buttons}
                </div>
            </div>
            <div className='w-full lg:w-2/3 md:w-2/3 sm:w-full grid-cols-2 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 px-5 gap-5 gap-y-6'>
                {docsPanel}
            </div>
        </div>
    </>
  )
}

export default VetDocs