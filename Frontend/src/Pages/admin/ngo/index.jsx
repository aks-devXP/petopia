import React, { useRef } from 'react'
import SupportACause from '@/components/NGO comp/SupportACause'
import NGOHero from '@/components/NGO comp/NGOHero'
import NgoImpactBanner from './components/NgoImpactBanner'
import NgoHowCanYouHelp from './components/NgoHowCanYouHelp'

const NGO = () => {
  const impactRef = useRef(null)
  const scrollToImpact = () => {
    impactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const path = "NGO/"
  const list = [ { name: "Dog Caring", src: `${path}2e5f69dd-1a6a-4260-b39d-6cc56932d751.jpeg`},
    { name: "Ahmedabad", src: `${path}9c2d3071-d377-4811-888b-0ea185978ddc.jpeg`},
    { name: "Hyderabad", src: `${path}5480f0d9-dab7-4438-a1c3-d2ba14b5aef2.jpeg`},
    { name: "Mumbai", src: `${path}55248cf5-23dd-4c25-a266-04c73a00285f.jpeg`},
    { name: "Pune", src: `${path}03505041-df8c-487c-af29-69aa00e47000.jpeg`},
    { name: "Srinagar", src: `${path}13095094-524d-4068-a69d-0ad16991234e.jpeg`}] 
  const list2 = [ { name: "Dog Caring", src: `${path}pexels-ifaw-5486964.jpg`},
      { name: "Ahmedabad", src: `${path}pexels-ifaw-5487067.jpg`},
      { name: "Hyderabad", src: `${path}pexels-ifaw-5487074.jpg`},
      { name: "Mumbai", src: `${path}pexels-sims1217-12195429.jpg`},
      { name: "Pune", src: `${path}pexels-sims1217-12195433.jpg`},
      { name: "Srinagar", src: `${path}2e5f69dd-1a6a-4260-b39d-6cc56932d751.jpeg`}]
      
  return (
    <div className='w-full bg-app-bg'>
      <NGOHero onExploreServices={scrollToImpact} />
      <SupportACause />
      <NgoHowCanYouHelp/>
      <NgoImpactBanner/>
    </div>
  )
}

export default NGO
