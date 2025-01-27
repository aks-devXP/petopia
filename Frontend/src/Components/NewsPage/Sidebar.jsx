import React from 'react'

import { FaLink, FaFacebook, FaSquareXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import RelatedNewsCard from './RelatedNewsCard';

const Sidebar = () => {
  return (
    <>
        <div className='w-[20%] mb-20'>
            <div className=''>
                <p className='font-thin'>Published</p>
                <p className='font-bold'>15 January 2025 22:35 IST</p>
                <p className='mt-4 font-thin'>Content</p>
                <p className='font-bold hover:cursor-pointer'>Kevin Hendricks</p>
                <p className='mt-4 font-thin'>Share</p>
                
                <div className='flex justify-between mt-1'>
                    <Link to='/news2'>
                        <FaLink className='hover:cursor-pointer size-5'/>
                    </Link>

                    <a href='https://www.facebook.com'>
                        <FaFacebook className='hover:cursor-pointer size-5'/>
                    </a>

                    <a href='https://www.instagram.com'>
                        <RiInstagramFill className='hover:cursor-pointer size-5'/>
                    </a>

                    <a href='https://www.x.com'>
                        <FaSquareXTwitter className='hover:cursor-pointer size-5'/>
                    </a>
                </div>
            </div>

            <div className='mt-14 font-grotesk'>
                <p className='text-xl font-semibold'>Related News</p>
                <div className='flex flex-col'>
                    <RelatedNewsCard></RelatedNewsCard>
                    <RelatedNewsCard></RelatedNewsCard>
                    <RelatedNewsCard></RelatedNewsCard>
                </div>
            </div>
        </div>
    </>
  )
}

export default Sidebar