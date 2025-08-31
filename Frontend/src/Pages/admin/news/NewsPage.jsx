import React, { useEffect } from 'react'
import Heading from '@/components/NewsPage/Heading'
import MainImage from '@/components/NewsPage/MainImage'
import Content from '@/components/NewsPage/Content'
import Sidebar from '@/components/NewsPage/Sidebar'
import { useParams } from 'react-router-dom'

const NewsPage = ({topic,subtopic,time,img,imgSrc,data,author,date}) => {

  const NewsData = {
    A: {
      topic: "Uber allows Mumbai residents to travel with pets, Here’s how to book",
      subtopic: "Besides Mumbai, Uber Pet service is available in Delhi and Bengaluru.",
      time: "7",
      img: "https://blog.uber-cdn.com/cdn-cgi/image/width=2160,quality=80,onerror=redirect,format=auto/wp-content/uploads/sites/131/2016/06/Istanbul_uberPET-Launch_blog_960x480_r1.jpg",
      imgSrc: "Uber Newsroom",
      data: (
        <>
          <h4>
            Uber has expanded its pet-friendly ride service, Uber Pet, to Mumbai,
            joining Delhi and Bengaluru in offering pet-inclusive travel. With
            this move, Uber aims to make commuting easier and more accessible for
            pet owners across three major Indian cities.
          </h4>
          <br />
          <h4>
            Whether it’s a trip to the vet, a playdate at a park, or just a ride
            across town, Uber Pet ensures your furry companions can accompany you
            hassle-free. Booking is easy—just enter your destination in the Uber
            app, select “Uber Pet,” review trip details, and confirm. The feature
            supports both on-demand and scheduled rides, catering to spontaneous
            plans and pre-booked errands. Uber has also collaborated with Heads Up
            For Tails (HUFT) to offer exclusive discounts when traveling to HUFT
            stores and spas in these cities. Presenting your Uber Pet ride receipt
            at the store unlocks added perks, making the experience even more
            delightful.
          </h4>
          <br />
          <h4>
            With this thoughtful expansion, Uber reinforces its commitment to
            comfort, accessibility, and user-centric innovation. By recognizing
            the growing needs of pet parents in urban India, Uber Pet is not just
            a new feature—it's a step toward inclusive mobility where everyone,
            including our animal companions, is considered.
          </h4>
        </>
      ),
      author: "Express News Service",
      date: "March 6, 2025 19:17 IST",
    },
    B: {
      topic: "Gen Z Drives India's Pet Parenting Boom",
      subtopic:
        "Mars Petcare's global survey reveals 70% of Indian Gen Z pet owners are first-timers.",
      time: "5",
      img: "https://media.licdn.com/dms/image/v2/D4E12AQFQwXUZ-OurGg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1684406913385?e=2147483647&v=beta&t=QbPSAR02bVfR_6U8Rrjlqaziqpxb8Y4ZJ515GjwvW04",
      imgSrc: "Financial Express",
      data: (
        <>
          <h4>
            A recent global survey by Mars Petcare highlights a significant shift
            in India's pet ownership landscape, with Gen Z leading the charge.
            The study reveals that 70% of Indian Gen Z pet owners are first-time
            pet parents, indicating a burgeoning trend of pet adoption among the
            youth.
          </h4>
          <br />
          <h4>
            This surge is attributed to the desire for companionship, emotional
            support, and the therapeutic benefits pets offer. The nuclearization
            of families and increased urbanization have further fueled this trend,
            as young individuals seek solace and connection through pet ownership.
            Cats, in particular, are gaining popularity for their low-maintenance
            nature and stress-relieving presence.
          </h4>
          <br />
          <h4>
            The pet care industry is responding to this shift by offering
            specialized services and products tailored to the needs of these new
            pet parents. From organic pet food to tech-enabled grooming solutions,
            the market is evolving to cater to the preferences of a younger,
            more informed demographic.
          </h4>
        </>
      ),
      author: "BrandWagon Online",
      date: "November 27, 2024 13:30 IST",
    },
    C: {
      topic: "India's Pet Insurance Market Set to Reach ₹6,500 Crore by 2025",
      subtopic:
        "Rising pet ownership and veterinary costs drive demand for pet insurance.",
      time: "10",
      img: "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2023/04/pexels-petra-vajdova-7341095-Cropped-scaled.jpg",
      imgSrc: "Business Standard",
      data: (
        <>
          <h4>
            The pet insurance market in India is projected to reach ₹6,500 crore
            by 2025, reflecting the growing awareness and need for financial
            protection among pet owners. This surge is driven by the increasing
            costs of veterinary care and a heightened sense of responsibility
            towards pet health.
          </h4>
          <br />
          <h4>
            Insurance companies are introducing tailored policies to cater to this
            demand, covering a range of services from routine check-ups to
            emergency treatments. The trend signifies a shift in how pets are
            perceived—not just as companions but as integral family members whose
            well-being is paramount.
          </h4>
          <br />
          <h4>
            As the pet care industry continues to expand, the integration of
            financial products like insurance underscores the evolving dynamics of
            pet ownership in India, emphasizing preparedness and comprehensive
            care.
          </h4>
        </>
      ),
      author: "Press Trust of India",
      date: "May 8, 2024 17:41 IST",
    },
  };
  

  const { id } = useParams();
  const item = NewsData[id];

  return (
    <>
        <Heading topic={item.topic} subtopic={item.subtopic} time={item.time}></Heading>
        <MainImage img={item.img} imgSrc={item.imgSrc}></MainImage>
        <div className='flex justify-evenly h-fit pb-5'>
            <Content data={item.data}></Content>
            <Sidebar author={item.author} date={item.date}></Sidebar>
        </div>
    </>
  )
}

export default NewsPage