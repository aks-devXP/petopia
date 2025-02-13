import React from 'react'
import { useState } from 'react';
import { MdVerifiedUser } from "react-icons/md";
import { RiInformation2Fill } from "react-icons/ri";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import DateTile from '../Components/Vet/DateTile';

const VetBook = () => {
    const [toggleButton, setToggleButton] = useState(false);
  return (
    <>
        <div className='bg-black py-5 w-full h-screen'>
            <div className='h-full w-full flex flex-wrap justify-center gap-5'>
                <div className='h-[50%] rounded-xl bg-blue-500' id='image'>
                    <img className='h-full' src="https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc1.png" alt="" />
                </div>

                <div className='h-1/2 w-1/2 bg-yellow-800 rounded-xl p-10'>
                    <div className='flex gap-2 items-center'>
                        <p className='h4'>Dr. Davis Richard</p>
                        <MdVerifiedUser />
                    </div>

                    <div className='mt-1 flex gap-2 items-center mb-4'>
                        <p className=''>MBBS - General Physician</p>
                        <div className='rounded-3xl border-2 px-1 py-0.25 font-extralight border-n-2 text-xs'>
                            <p >3 Years</p>
                        </div>
                    </div>

                    <div className='flex gap-1 items-center'>
                        <p className='text-sm text-black font-medium'>About</p>
                        <RiInformation2Fill/>
                    </div>

                    <p className='text-xs/6 mb-5'>Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.</p>

                    <div className='flex items-center'>
                        <p className='mr-2'>Appointment Fee: </p>
                        <RiMoneyRupeeCircleFill />
                        <p className='ml-0.5'>1500</p>
                    </div>
                </div>

                <div className='h-1/2 w-1/2  p-5'>
                    <p>Booking Slots</p>
                    <div className='flex mt-5 justify-evenly'>
                        <DateTile click={() => setToggleButton(1)} date={10} day={'Mon'} toggle={toggleButton == 1}/>
                        <DateTile click={() => setToggleButton(2)} date={11} day={'Tue'} toggle={toggleButton == 2}/>
                        <DateTile click={() => setToggleButton(3)} date={12} day={'Wed'} toggle={toggleButton == 3}/>
                        <DateTile click={() => setToggleButton(4)} date={13} day={'Thu'} toggle={toggleButton == 4}/>
                        <DateTile click={() => setToggleButton(5)} date={14} day={'Fri'} toggle={toggleButton == 5}/>
                        <DateTile click={() => setToggleButton(6)} date={15} day={'Sat'} toggle={toggleButton == 6}/>
                        <DateTile click={() => setToggleButton(7)} date={16} day={'Sun'} toggle={toggleButton == 7}/>
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