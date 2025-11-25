import React from 'react'

import { FaLink, FaFacebook, FaSquareXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import RelatedNewsCard from './RelatedNewsCard';

const Sidebar = ({author, date}) => {
  return (
    <>
        <div className='w-[20%] mb-20 text-ink-primary'>
            <div className=''>
                <p className='font-thin text-ink-primary/60'>Published</p>
                <p className='font-bold'>{date || "15 January 2025 22:35 IST"}</p>
                <p className='mt-4 font-thin text-ink-primary/60'>Content</p>
                <p className='font-bold hover:cursor-pointer hover:text-brand'>{author || "Kevin Hendricks"}</p>
                <p className='mt-4 font-thin text-ink-primary/60'>Share</p>
                
                <div className='flex justify-between mt-1'>
                    <Link to='/news2'>
                        <FaLink className='hover:cursor-pointer size-5 hover:text-brand transition-colors'/>
                    </Link>

                    <a href='https://www.facebook.com'>
                        <FaFacebook className='hover:cursor-pointer size-5 hover:text-brand transition-colors'/>
                    </a>

                    <a href='https://www.instagram.com'>
                        <RiInstagramFill className='hover:cursor-pointer size-5 hover:text-brand transition-colors'/>
                    </a>

                    <a href='https://www.x.com'>
                        <FaSquareXTwitter className='hover:cursor-pointer size-5 hover:text-brand transition-colors'/>
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
