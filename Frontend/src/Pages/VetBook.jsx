import React from 'react'
import { useState } from 'react';
import { MdVerifiedUser } from "react-icons/md";
import { RiInformation2Fill } from "react-icons/ri";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { CalendarCheck } from 'lucide-react';
import DateTile from '../Components/Vet/DateTile';
import TimeTile from '../Components/Vet/TimeTile';

const VetBook = ({name,spec,exp,fee,info,img}) => {
    const [toggleButton, setToggleButton] = useState(false);
    const [toggleTimeButton, setToggleTimeButton] = useState(false);

    const today = new Date();
    const currentWeek = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() + i);
        return {
        date: date.getDate(),
        day: date.toLocaleDateString("en-US", { weekday: "short" }), // "Mon", "Tue", etc.
        };
    });

    const timeSlots = ["10 A.M. - 1 P.M.", "3 P.M. - 5 P.M.", "Special Timing"];
    // console.log(currentWeek);
    

  return (
    <>
        <div className='bg-transparent py-5 w-full h-screen mt-20 font-poppins'>
            <div className='h-full w-full flex flex-wrap justify-center gap-5'>
                <div className='h-[50%] rounded-xl bg-sand-light' id='image'>
                    <img className='h-full' src="https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc1.png" alt="" />
                </div>

                <div className='h-1/2 w-1/2 bg-gradient-to-tr from-[#667eea] to-[#764ba2] text-black rounded-xl p-10'>
                    <div className='flex gap-3 items-center'>
                        <p className='font-medium text-4xl'>{name ? name : "Dr. John Doe"}</p>
                        <div className=''>
                            <MdVerifiedUser className='w-5 h-5' />
                        </div>
                    </div>

                    <div className='mt-2 flex gap-2 items-center'>
                        <p className='font-normal text-md'>MBBS - {spec ? spec : "General Physician"}</p>
                        <div className='rounded-3xl border-2 px-2 py-0.25 font-light bg-gradient-to-r from-neutral-800 via-gray-700 to-slate-950 border-n-5 text-xs text-white'>
                            <p >{exp ? exp : "3 Years"}</p>
                        </div>
                    </div>

                    <div className='flex gap-1 items-center mt-5'>
                        <p className='text-sm text-black font-medium'>About</p>
                        <RiInformation2Fill className='w-3 h-3'/>
                    </div>

                    <p className='text-xs/5 mb-5 text-[antiquewhite]'>{info ? info : "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies."}</p>

                    <div className='flex items-center font-medium'>
                        <p className='mr-2'>Appointment Fee: </p>
                        <RiMoneyRupeeCircleFill className=''/>
                        <p className='ml-0.5 '>{fee ? fee : "1500"}</p>
                    </div>
                </div>

                <div className='h-1/2 w-full px-20 flex justify-evenly'>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <p>Select Your Booking Slot</p>
                            <div className='flex flex-wrap mt-5 gap-5'>
                                {currentWeek.map((item,index) => (
                                <DateTile click={() => setToggleButton(index+1)} date={item.date} day={item.day} toggle={toggleButton == index+1}/>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            {toggleButton != false && (
                                <>
                                    <div className='mt-10 duration-500'>
                                        <div>
                                            <p>Select Your Timing Slot</p>
                                        </div>
                                        <div className='flex flex-wrap mt-5 gap-5'>
                                            {timeSlots.map((item,index) => (
                                                <TimeTile click={() => setToggleTimeButton(index+1)} time={item} toggle={toggleTimeButton == index+1}/>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className='mt-28 border w-fit h-fit px-5 py-10 rounded-xl border-white font-light hover:bg-blue-500 hover:border-blue-500 text-sm text-center cursor-pointer flex gap-5 items-center duration-500 hover:scale-105'>
                            <button>Confirm Appointment</button>
                            <div>
                                <CalendarCheck />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </>
  )
}

export default VetBook