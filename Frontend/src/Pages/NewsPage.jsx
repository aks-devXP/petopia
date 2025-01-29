import React, { useEffect } from 'react'
import Heading from '../Components/NewsPage/Heading'
import MainImage from '../Components/NewsPage/MainImage'
import Content from '../Components/NewsPage/Content'
import Sidebar from '../Components/NewsPage/Sidebar'
import Lenis from 'lenis'

const NewsPage = () => {
  return (
    <>
        <Heading></Heading>
        <MainImage></MainImage>
        <div className='flex justify-evenly h-fit'>
            <Content></Content>
            <Sidebar></Sidebar>
        </div>
    </>
  )
}

export default NewsPage