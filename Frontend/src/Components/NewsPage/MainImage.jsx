import React from 'react'

const MainImage = ({img,imgSrc}) => {
  return (
    <>
        <div className="flex flex-col mt-5 mb-15">
    <div className="w-[80%] h-[500px] rounded-xl mx-auto bg-black mb-3">
        <img 
            src={img || "https://ichef.bbci.co.uk/news/1024/cpsprodpb/de2e/live/632b41c0-cf4f-11ef-ac0b-3daa0fac542c.jpg.webp"} 
            alt="" 
            className="object-cover w-full h-full rounded-2xl" 
        />
    </div>
    <h4 className="mx-auto font-extralight">Picture by {imgSrc || "2024 Getty Images"}</h4>
</div>

    </>
  )
}

export default MainImage