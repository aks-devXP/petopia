import React from 'react'
import TeamInfo from '../Components/TeamInfo'
import Header from '../Components/Header'

const About = () => {
  return (
    <>
      <Header 
      path='/about-vid.mp4'
      normal1=''
      highlighted='Learn More' 
      normal2='about our mission and services.' 
      textcol='antiquewhite'
      ></Header>
      <TeamInfo></TeamInfo>
    </>
  )
}

export default About
