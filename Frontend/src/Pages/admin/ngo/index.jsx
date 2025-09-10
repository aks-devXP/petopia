import React from 'react'
import BasicHero from '@/components/BasicHero'
import InfiniteScroll from '@/components/InfiniteScroll'
import Banner from '@/components/NGO comp/Banner'
import Impact from '@/components/NGO comp/Impact'
import SupportACause from '@/components/NGO comp/SupportACause'

const NGO = () => {
  const path = "NGO/"
  const list = [ { name: "Dog Caring", src: `${path}2e5f69dd-1a6a-4260-b39d-6cc56932d751.jpeg`},
    { name: "Ahmedabad", src: `${path}9c2d3071-d377-4811-888b-0ea185978ddc.jpeg`},
    { name: "Hyderabad", src: `${path}5480f0d9-dab7-4438-a1c3-d2ba14b5aef2.jpeg`},
    { name: "Mumbai", src: `${path}55248cf5-23dd-4c25-a266-04c73a00285f.jpeg`},
    { name: "Pune", src: `${path}03505041-df8c-487c-af29-69aa00e47000.jpeg`},
    { name: "Srinagar", src: `${path}13095094-524d-4068-a69d-0ad16991234e.jpeg`}]
    const list2 = [ { name: "Dog Caring", src: `${path}pexels-ifaw-5486964.jpg`},
      { name: "Ahmedabad", src: `${path}pexels-ifaw-5487067.jpg`},
      { name: "Hyderabad", src: `${path}pexels-ifaw-5487074.jpg`},
      { name: "Mumbai", src: `${path}pexels-sims1217-12195429.jpg`},
      { name: "Pune", src: `${path}pexels-sims1217-12195433.jpg`},
      { name: "Srinagar", src: `${path}2e5f69dd-1a6a-4260-b39d-6cc56932d751.jpeg`}]
      
  return (
    <div className='w-full bg-[#0b0811]'>
      <div className='w-full'>
        <Banner/>
      </div>
      <div className=''>
        <Impact/>
      </div>
      
      <div className='m-10'>
        <BasicHero title={"Need to find a new home for a pet?"} description={"We're here to help them find a new, loving family—quickly and safely by Adopting a Pet."} buttonText={"Learn More"} imageSrc={"https://media.adoptapet.com/image/upload/c_scale,w_524,dpr_2/f_auto,q_auto/homepage-rehome-pet.jpg"} imageLeft={false}/>
      </div>
      
      <div>
        <SupportACause />
      </div>
      
      <div className='m-10 h-[500px]'>
        <BasicHero title={"Be the change, you always hoped for"} description={"Join us as a Volunteer and make a Difference in Someone's Life Today"} buttonText={"Get Involved"} imageSrc={"https://images.squarespace-cdn.com/content/v1/667b351276399d72c27b633e/e402dcb1-58f7-441c-82e0-314b1081fcbe/babyPuppy.jpg"} imageLeft={true} bgColor={"bg-[#00D4FF]"} textColor={"text-[#001F3F]"} textColor2={"text-gray-700"} to={"/volunteer"}/>
      </div>

      <div className='bg-[#0b0811] my-10 flex flex-col' >
        <div className='flex justify-left px-4 py-2  '>
          <h3 className='text-5xl font-grotesk font-bold bg-clip-text text-transparent bg-[linear-gradient(90deg,_rgba(15,6,170,0.9710477941176471)_0%,_rgba(255,138,138,0.9150253851540616)_81%)] text-left tracking-widest'>One Memory</h3>
        </div>
        
        <InfiniteScroll dir="right" max_width="8xl" img_width="80" img_height="60" list = {list} folder = "NGO" bg_col="#FF9D3D" rounded="0" pad="0" mx="2"></InfiniteScroll>
        
        <div className='flex justify-end px-4 mt-2'>
          <h3 className='text-5xl font-grotesk font-bold text-right  bg-clip-text text-transparent bg-[linear-gradient(90deg,_rgba(15,6,170,0.9710477941176471)_0%,_rgba(255,138,138,0.9150253851540616)_81%)] tracking-widest'>One Life</h3>
        </div>
        
        <InfiniteScroll  dir="left" max_width="8xl" img_width="80" img_height="60" list = {list2} folder = "NGO" bg_col="#FF9D3D" rounded="0" pad="4" mx="2"/>
      </div>
    </div>
  )
}

export default NGO
