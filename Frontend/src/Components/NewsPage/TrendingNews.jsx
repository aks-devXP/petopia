import React from 'react'
import dogImage from '../../assets/signup-bg.jpg'
import Card from './Card'

const TrendingNews = () => {
  return (
    <>
        <section>
            <div className='py-4 bg-n-7 h-fit'>
            <h2 className="text-center text-3xl font-extrabold my-10">Trending News</h2>
                <div className='flex h-fit mt-2 justify-between'>
                    <Card img={dogImage}></Card>
                    <Card img={dogImage}></Card>
                    <Card img={dogImage}></Card>
                </div>
            </div>
        </section>
    </>
  )
}

export default TrendingNews