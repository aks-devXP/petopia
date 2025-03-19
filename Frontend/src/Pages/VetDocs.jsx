import React from 'react'
import { data, useNavigate } from 'react-router-dom';

const VetDocs = () => {
    const docsPanel = [];
    const buttons = [];
    const specialities = ["General Physician", "Internal Medicine", "Surgery", "Dentistry", "Dermatology", "Ophthalmology"]
    const navigate = useNavigate();

    const doctors = [
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
      ];
    
    specialities.forEach((data) => {
        buttons.push(
            <p className='w-full pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:translate-x-2 hover:bg-sand-mid'>{data}</p>
        );
    })

    doctors.forEach((res)=>{docsPanel.push(
        <div onClick={()=>{navigate("/vet-book")}} className="border border-[rgb(201,216,255)] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 bg-sand-light">
            <img className="bg-[#EAEFFF]" src={res.imageUrl} alt=""/>
            <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className="w-2 h-2 rounded-full bg-green-500"></p>
                    <p>Available</p></div>
                    <p class="text-[#262626] text-lg font-medium">{res.name}</p>
                    <p class="text-[#5C5C5C] text-sm">{res.specialty}</p>
                </div>
        </div>
    )})


  return (
    <>
        <div className='bg-sand-dark flex flex-col sm:flex-row justify-around gap-5 py-5 mt-20'>
            <div className='w-1/5'>
                <p className='text-2xl text-center'>Browse through our <br /> specialist doctors here</p>
                <div className='flex flex-col items-start mt-10 gap-3 w-[80%]'>
                    {buttons}
                </div>
            </div>
            <div className='w-2/3 grid grid-cols-4 gap-4 gap-y-6'>
                {docsPanel}
            </div>
        </div>
    </>
  )
}

export default VetDocs