import React from 'react'
import Marquee from "react-fast-marquee";
import { getImgUrl } from '../Util/ImageExtract';

const InfiniteScroll = ({text,data,dir,bg,height}) => {
    const path = "../assets/Vet/"
    const logos = [
        { name: "Delhi", src: `${path}delhi.jpg`},
        { name: "Ahmedabad", src: `${path}ahmedabad.jpg`},
        { name: "Hyderabad", src: `${path}hyderabad.jpg`},
        { name: "Mumbai", src: `${path}mumbai.jpg`},
        { name: "Pune", src: `${path}pune.jpg`},
        { name: "Srinagar", src: `${path}Srinagar.jpg`},
    ];

  return (
    <>
        <div className={`bg-[#0f2747] w-full overflow-hidden py-8`}>
            <div className="w-full mx-auto flex items-center">
                <h3 className="ml-10 text-white text-xl max-w-36 font-semibold mb-5">
                    {text ? text : "Award winning & featured in..."}
                </h3>
                <div className="relative w-full overflow-hidden ">
                    <Marquee className='flex gap-5' direction={dir ? dir : "left"}>
                        {data ? (
                            [...data, ...data].map((img, index) => (
                                <img
                                    key={index}
                                    src={getImgUrl(img.src)}
                                    alt={img.name}
                                    className="h-32 rounded-3xl w-auto object-contain mx-5"
                                />
                                ))
                        )
                         : 
                            [...logos, ...logos].map((logo, index) => (
                            <img
                                key={index}
                                src={getImgUrl(logo.src)}
                                alt={logo.name}
                                className="h-32 rounded-3xl w-auto object-contain mx-5"
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