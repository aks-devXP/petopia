import { ChevronFirst, ChevronLast } from 'lucide-react'
import React, { createContext, useContext, useState } from 'react'
const SidebarContext = createContext()

const Slidebar = ({children}) => {
  const [expanded, expandHandler] = useState(true)


  return (
    <aside className='h-full mt-20 bg-black'>
      <nav className="h-full flex flex-col bg-black">
        <div className="p-4 pb-2 flex justify-end item-center">
          {/* code for adding logo but cause it will seem repeatative that's not adding here 
          <img src={logo} className="w-32"
          alt="Logo/>*/}
          <div>
          <button
          onClick={()=> expandHandler((prev)=>!prev)}
           className="p-1.5 rounded-lg bg-indigo-400 hover:bg-indigo-800 
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
    font-medium rounded-md cursor-pointer transition-all duration-200 ${expanded ? "w-full" : "w-12"} ${active? "bg-gradient-to-tr from-indigo-200 to-indigo-300 text-violet-800" : "hover:bg-indigo-100 text-gray-600"}`}>
      {icon}
      <span className={`overflow-hidden transition-all ${expanded? "w-52 ml-3": "w-0 m-0"}`}>{text}</span>
      {alert && (
        <div className={`ml-1 w-2 h-2 rounded bg-indigo-400 ${expanded? "": ""}`}/>
      )}

      {!expanded && (
        <div className={`absolute left-full rounded-md px-2 py-2 ml-5 bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-5 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
          {text}
        </div>
      )}
    </li>
  )
}

export default Slidebar
