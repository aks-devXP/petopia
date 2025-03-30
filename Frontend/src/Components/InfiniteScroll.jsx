import React from 'react'
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import delhi from "../assets/Vet/delhi.jpg"


const InfiniteScroll = ({text,data}) => {

    const logos = [
        { name: "Delhi", src: "../assets/Vet/delhi.jpg" },
      ];      

  return (
    <>
        <div className="bg-[#0f2747] w-full overflow-hidden py-8">
            <div className="max-w-7xl mx-auto flex ">
                <h3 className="text-white text-xl max-w-36 font-semibold mb-5">
                    {text ? text : "Award winning & featured in..."}
                </h3>
                <div className="relative w-full overflow-hidden">
                    <Marquee className='flex gap-5' direction='left'>
                        {data ? {

                        } : 
                            [...logos, ...logos].map((logo, index) => (
                            <img
                                key={index}
                                src="../assets/Vet/delhi.jpg"
                                alt={logo.name}
                                className="h-10 w-auto object-contain mx-10"
                            />
                            ))
                        }
                    </Marquee>
                </div>
            </div>
        </div>
    </>
  )
}

export default InfiniteScroll