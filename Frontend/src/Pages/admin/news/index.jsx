import React from 'react'
import Slider from '../../../components/Slider'
import news1 from "@assets/news-slider/news-1.jpg"
import news2 from "@assets/news-slider/news-2.jpg"
import news3 from "@assets/news-slider/news-3.jpg"
import news4 from "@assets/news-slider/news-4.jpg"
import Header from '../../../components/Header'
import newsVid from '/news-vid1.mp4'
import TrendingNews from '../../../components/NewsPage/TrendingNews'
import WeekTop from "../../../components/NGO comp/WeekTop"

const News = () => {
    const arr = [news1, news2, news3, news4]
  return (
    <>
        <TrendingNews></TrendingNews>
        <WeekTop></WeekTop>
        <Header path={newsVid} normal1='Stay updated with the latest happenings at Petopia.'
            highlighted='Read News' 
            normal2='to discover new updates and events.' 
            textcol='antiquewhite'>
        </Header>
    </>
  )
}

export default News