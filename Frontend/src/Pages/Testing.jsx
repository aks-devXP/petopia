import {
  Calendar1,
  HeartPulse,
  LogOut,
  MessageCircleMore,
  UserCircle,
} from 'lucide-react'
import React from 'react'
import Slidebar, { SlidebarItem } from '../Components/Dashboard/slidebar'
// testing for the slidebar
const Testing = () => {
  return (
    <div className='flex flex-col'>
      

    <div className="flex flex-row h-screen w-full">
      
      <Slidebar>
        <SlidebarItem icon={<UserCircle/>} text="User Profile" active={true}/>
        <SlidebarItem icon={<Calendar1/>} text="Appointments" alert="See Appointments"/>
        <SlidebarItem icon={<HeartPulse/>} text="Medical History" alert="View Medical History"/>
        <SlidebarItem icon={<MessageCircleMore/>} text="Message Settings" alert={false}/>
        <SlidebarItem  icon={<LogOut/>} text="Logout" alert={false}/>
      </Slidebar>
      {/*Main Component*/}
      <div className="flex-grow bg-gray-100 p-6 h-full">
        <h1 className="text-2xl font-bold mb-4 text-color-5">
          Main Component
        </h1>
        <p className="mb-4 text-color-7">
          This is the main component that will contain the rest of the content.
        </p>
        <div className="bg-white p-4 rounded shadow text-color-3">
        Only for testing purposes
        </div>
      </div>
    </div>
    </div>
  )
}


export default Testing
