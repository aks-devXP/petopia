import React from 'react';
import Marquee from "react-fast-marquee";
import { getImgUrl } from '../Util/ImageExtract';

const InfiniteScroll = ({list,text,data, dir, max_width="7xl", img_width ="auto", img_height="32", folder="Vet" , bg_col = "0f2747", img_fit ="cover", rounded="3", pad="8", mx= "5"}) => {

    const path = `../assets/Vet/`

    let logos = [
        { name: "Delhi", src: `${path}delhi.jpg`},
        { name: "Ahmedabad", src: `${path}ahmedabad.jpg`},
        { name: "Hyderabad", src: `${path}hyderabad.jpg`},
        { name: "Mumbai", src: `${path}mumbai.jpg`},
        { name: "Pune", src: `${path}pune.jpg`},
        { name: "Srinagar", src: `${path}Srinagar.jpg`},
    ]; 
    logos = list ? list : logos;

  return (
    <>
        <div className={`bg-[#${bg_col}] w-full overflow-hidden py-${pad}`}>
            <div className={`max-w-${max_width}  mx-auto flex items-center`}>
                <h3 className="text-white text-xl max-w-36 font-semibold mb-5">
                    {text }
                </h3>
                <div className="relative w-full overflow-hidden ">
                    <Marquee className={`flex gap-4`} direction={dir?dir:'left'}>
                        {data ? {

                        } : 
                            [...logos, ...logos].map((logo, index) => (
                            <img
                                key={index}
                                src={getImgUrl(logo.src)}
                                alt={logo.name}
                                className={`h-${img_height} rounded-${rounded}xl w-${img_width} object-${img_fit} mx-${mx} `}
                                loading='lazy'
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