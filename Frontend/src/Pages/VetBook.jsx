import React from 'react'
import { useEffect, useState } from 'react';
import { MdVerifiedUser } from "react-icons/md";
import { Star, Dot } from "lucide-react"
import { RiInformation2Fill } from "react-icons/ri";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import DateTile from '../Components/Vet/DateTile';
import TimeTile from '../Components/Vet/TimeTile';
import VetBookCard from '../Components/Vet/VetBookCard';
import { AppointmentTimings } from "../Util/AppointmentTimings";

const VetBook = ({name,spec,exp,fee,info,img, rating}) => {
    const [toggleButton, setToggleButton] = useState(0);
    const [toggleTimeButton, setToggleTimeButton] = useState(0);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [reviews,setReviews] = useState();

    const today = new Date();
    const currentWeek = Array.from({ length: 15 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() + i);
        return {
        date: date.getDate(),
        day: date.toLocaleDateString("en-US", { weekday: "short" }), // "Mon", "Tue", etc.
        fullDate: date.toDateString()
        };
    });


    useEffect(() => {
        // Get the available time slots for the selected date
        const times = AppointmentTimings();
        setAvailableTimes(times);
        console.log(availableTimes);
    }, []);

    

  return (
    <>
        <div className='bg-transparent py-5 w-full h-fit font-poppins'>
            <div className='h-fit w-full flex justify-evenly'>
                <div className='h-fit w-[60%]'>
                    <div className='h-fit w-full text-black rounded-xl p-10'>
                        <div className='h-[50%] rounded-xl bg-sand-light flex items-center' id='image'>
                            <img className='h-72' src="https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc1.png" alt="" />
                            <div>
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
                            </div>
                        </div>

                        <div className='mt-5'>
                            <p className='text-sm/6 mb-5 text-[antiquewhite]'>{info ? info : "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies."}</p>
                        </div>
                    </div>

                    <div className='h-fit w-full text-white'>
                        <div className='flex text-xl justify-start font-medium items-center gap-1'>
                            <Star className='w-5 h-5'/>
                            <span className='font-medium'>{rating ? rating : "4.2"}</span>
                            <Dot />
                            <span> {reviews} Reviews</span>
                        </div>

                        <div className='w-full h-72 rounded-2xl bg-white mt-2 flex items-center overflow-x-auto gap-5'>
                            <div className='w-[40%] h-[80%] bg-black rounded-xl flex flex-col gap-10'>
                                <div className='h-[65%] w-full overflow-hidden px-5 py-2 bg-yellow-600'>
                                    <span className=''>
                                        We didn't know how much we could get out of this visit, as our cat was generally healthy and we were mostly seeking a second opinion. But Dr. Latham was able to give us some very valuable information about how to care for aging cats, generally, and about what our specific kitty might need. We got a lot out of it and found her extremely knowledgeable, personable, and professional. Would definitely recommend a visit with her for both acute concerns or for general advice about your pet. You can definitely tell she cares about her patients, even those she hasn't met in person. Thanks Dr. Latham!
                                    </span>
                                </div>

                                <div className='w-full h-[35%] flex  justify-evenly'>
                                    
                                    <div className='flex flex-col bg-green-400 px-2'>
                                        <span>Wendy Philips</span>
                                        <span>January 2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-[30%] h-screen'>
                    <div className='w-full h-[84%] flex justify-center items-center sticky top-24'>
                        <VetBookCard fees={'2590'} day={'Today'} time={'10 A.M.'} currentWeek={currentWeek} availableTimes={availableTimes} toggleButton={toggleButton} setToggleButton={setToggleButton} toggleTime={toggleTimeButton} setTimeButton={setToggleTimeButton} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default VetBook