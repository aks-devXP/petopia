import { ChevronFirst, ChevronLast } from 'lucide-react'
import React, { createContext, useContext, useState } from 'react'
const SidebarContext = createContext()

const Slidebar = ({children}) => {
  const [expanded, expandHandler] = useState(false)


  return (
    <aside className='h-full mt-5 '>
      <nav className="h-full flex flex-col">
        <div className="p-4 pb-2 flex justify-end item-center">
          {/* code for adding logo but cause it will seem repeatative that's not adding here 
          <img src={logo} className="w-32"
          alt="Logo/>*/}
          <div>
          <button
          onClick={()=> expandHandler((prev)=>!prev)}
           className="p-1.5 rounded-lg bg-[#705cacd5] hover:text-white text-[#f3f3ec] 
           transition-colors">
            {expanded?<ChevronFirst/>:<ChevronLast/>}
          </button>
          </div>
        </div>
        
        <SidebarContext.Provider value={{expanded, expandHandler}}>
        <ul className="flex-1 px-3">
          {children}
        </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  )
}
export function SlidebarItem({icon, text, active, alert, click}){
  const {expanded, expandHandler} = useContext(SidebarContext)
  
  return(
    <li onClick={click} className={`relative group flex justify-evenly items-center h-12 py-2 px-2 mb-3
    font-medium rounded-md cursor-pointer transition-all duration-200 
    ${expanded ? "w-full" : "w-12"} 
    ${active? "bg-[#2c1e66] text-[#E5E5CB]" : "hover:text-white text-white/50"}`}>
      {icon}
      <span className={`overflow-hidden transition-all ${expanded? "w-40 ml-3": "w-0 m-0"}`}>{text}</span>
      {alert && (
        <div className={`ml-1 w-2 h-2 rounded bg-[#9966db] ${expanded? "": ""}`}/>
      )}

      {!expanded && (
        <div className={`absolute left-full rounded-md px-2 py-2 ml-5 bg-[#7255f794] text-[#E5E5CB] text-sm
          invisible opacity-20 -translate-x-5 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
          {text}
        </div>
      )}
    </li>
  )
}

export default Slidebar
