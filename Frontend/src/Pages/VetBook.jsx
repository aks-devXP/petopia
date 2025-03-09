import React from 'react'
import { useState } from 'react';
import { MdVerifiedUser } from "react-icons/md";
import { RiInformation2Fill } from "react-icons/ri";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import DateTile from '../Components/Vet/DateTile';

const VetBook = ({name,spec,exp,fee,info,img}) => {
    const [toggleButton, setToggleButton] = useState(false);

    const today = new Date();
    const currentWeek = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() + i);
        return {
        date: date.getDate(),
        day: date.toLocaleDateString("en-US", { weekday: "short" }), // "Mon", "Tue", etc.
        };
    });
    // console.log(currentWeek);
    

  return (
    <>
        <div className='bg-sand-dark py-5 w-full h-screen'>
            <div className='h-full w-full flex flex-wrap justify-center gap-5'>
                <div className='h-[50%] rounded-xl bg-sand-light' id='image'>
                    <img className='h-full' src="https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc1.png" alt="" />
                </div>

                <div className='h-1/2 w-1/2 bg-gradient-to-tr from-[#667eea] to-[#764ba2] text-black rounded-xl p-10'>
                    <div className='flex gap-2 items-center'>
                        <p className='h4'>{name ? name : "Dr. John Doe"}</p>
                        <MdVerifiedUser />
                    </div>

                    <div className='mt-1 flex gap-2 items-center mb-4'>
                        <p className=''>MBBS - {spec ? spec : "General Physician"}</p>
                        <div className='rounded-3xl border-2 px-2 py-0.25 font-extralight bg-gradient-to-r from-neutral-800 via-gray-700 to-slate-950 border-n-5 text-xs text-white'>
                            <p >{exp ? exp : "3 Years"}</p>
                        </div>
                    </div>

                    <div className='flex gap-1 items-center'>
                        <p className='text-sm text-black font-semibold'>About</p>
                        <RiInformation2Fill/>
                    </div>

                    <p className='text-xs/6 mb-5 text-[antiquewhite]'>{info ? info : "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies."}</p>

                    <div className='flex items-center'>
                        <p className='mr-2'>Appointment Fee: </p>
                        <RiMoneyRupeeCircleFill/>
                        <p className='ml-0.5 '>{fee ? fee : "1500"}</p>
                    </div>
                </div>

                <div className='h-1/2 w-1/2  p-5'>
                    <p>Booking Slots</p>
                    <div className='flex mt-5 justify-evenly'>
                        {currentWeek.map((item,index) => (
                        <DateTile click={() => setToggleButton(index+1)} date={item.date} day={item.day} toggle={toggleButton == index+1}/>
                        ))}
                    </div>
                    <div className='mt-10 border w-fit h-fit px-10 py-2 rounded-full border-white font-light hover:bg-blue-500 hover:border-blue-500 text-sm text-center cursor-pointer'>
                        <button>Book an Appointment</button>
                    </div>
                </div>
            </div>
            
        </div>
    </>
  )
}

export default VetBook