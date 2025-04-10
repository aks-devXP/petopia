import React from 'react';
import Card from "../Components/Vet/CardHero";
import vet from "../assets/vet.png";
import Slider from '../Components/Vet/Slider';
import { TbSquareRoundedArrowRightFilled } from "react-icons/tb";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { HeartHandshake, ShoppingBag, ShieldCheck } from "lucide-react";
import InfiniteScroll from '../Components/InfiniteScroll';
import VetCareInfo from '../Components/Vet/VetCareInfo';


function VetHome() {
  const navigate = useNavigate();
  const doctors = [
    {
      name: 'Dr. John Doe',
      imageUrl: 'https://vetic-img.s3.ap-south-1.amazonaws.com/Dr.anshulShukla.jpg',
      specialty: 'Cardiology',
      stars: '4.2',
      location: 'New York, USA'
    },
    {
      name: 'Dr. Satya Yadav',
      imageUrl: 'https://vetic-img.s3.ap-south-1.amazonaws.com/Satyendra.png',
      specialty: 'Pediatrics',
      stars: '5',
      location: 'Los Angeles, USA'
    },
    {
      name: 'Dr. Amit Shah',
      imageUrl: 'https://vetic-img.s3.ap-south-1.amazonaws.com/Dr.+Amit.png',
      specialty: 'Orthopedic',
      stars: '3.7',
      location: 'New Delhi, IN'
    },

    {
      name: 'Dr. Rajneesh Mishra',
      imageUrl: 'https://vetic-img.s3.ap-south-1.amazonaws.com/Dr.+Anurag+Garg.png',
      specialty: 'Psychatric',
      stars: '4.7',
      location: 'New Delhi, IN'
    },

    {
      name: 'Dr. Aazad Mani',
      imageUrl: 'https://vetic-img.s3.ap-south-1.amazonaws.com/Dr.+Anurag+Gunawat.png',
      specialty: 'Dentist',
      stars: '4.6',
      location: 'Agra, IN'
    },

    {
      name: 'Dr. Vinay Kumar',
      imageUrl: 'https://vetic-img.s3.ap-south-1.amazonaws.com/Dr.+Dheeraj.png',
      specialty: 'Radiology',
      stars: '3.9',
      location: 'Ratlaam, IN'
    },

    {
      name: 'Dr. Amrinder Chaddha',
      imageUrl: 'https://vetic-img.s3.ap-south-1.amazonaws.com/Dr.+Arun+Kumar.png',
      specialty: 'Veterinary',
      stars: '4.9',
      location: 'Ludhiana, IN'
    }
  ];

  const clinics = [
    {
      name: "Pitampura",
      timings: "8 A.M. to 11 P.M",
      stars: "4.3",
      imageUrl: "https://vetic-img.s3.ap-south-1.amazonaws.com/CDP/Pitampura+/Fac1.png"
    },

    {
      name: "Lajpat Nagar",
      timings: "9 A.M. to 8 P.M",
      stars: "4.6",
      imageUrl: "https://vetic-img.s3.ap-south-1.amazonaws.com/CDP/Defence+Colony/Fac1.jpg"
    },

    {
      name: "Okhla",
      timings: "8 A.M. to 10 P.M",
      stars: "4.9",
      imageUrl: "https://vetic-img.s3.ap-south-1.amazonaws.com/CDP/Malviya+nagar/Fac1.png"
    }
  ]

  return (
    <>
      <div className='relative h-screen w-full opacity-85 bg-black bg-[url(https://static.vecteezy.com/system/resources/previews/011/602/170/large_2x/veterinary-clinic-female-doctor-portrait-at-the-animal-hospital-holding-cute-sick-cat-free-photo.jpg)] bg-cover bg-blend-lighten'>
        <div className='absolute left-5 bottom-0 my-5 w-[50%]'>
          <p className='font-semibold text-4xl'>Trusted Vet Consultation & Compassionate Care by Expert Vets</p>
          <div onClick={()=>navigate("/vet-docs")} className='mt-10 flex justify-between items-center gap-2 border-black px-10 py-5 w-fit cursor-pointer rounded-2xl border-2 border-solid bg-black hover:bg-n-1 hover:border-white hover:text-black hover:scale-105 transition-transform'>
            <button>Book Appointment</button>
            <IoIosArrowDroprightCircle className='w-5 h-5'/>
          </div>

          <div className='flex justify-between lg:w-[70%] sm:w-[100%] mt-12'>
            <Card link='/vet' text='150+ Caring Vets' img={vet} alt='Vet Logo Art'></Card>
            <Card link='/vet' text='24/7 Care Available' img='https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-24-hours-veterinary-flaticons-flat-flat-icons.png' alt='Vet Logo Art'></Card>
            <Card link='/vet' text='800+ Pets Served' img={'https://img.icons8.com/dusk/64/pets.png'} alt='Vet Logo Art'></Card>
          </div>
        </div>
      </div>

      <div className='w-full'>
        <InfiniteScroll text={"Now Available in your City"}/>
      </div>

      <div className='h-fit w-full'>
        <VetCareInfo/>
      </div>

      <div className='h-fit'>
        <div className="bg-[#0f2747] text-white py-16 px-5 w-full h-fit flex flex-col justify-between items-center">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-2">
              Get the Best Care for your Pet
            </h2>
            <p className="text-lg text-gray-300 mb-5">
              Your pet will receive treatment from our top-rated international veterinarians.
            </p>
          </div>

          <div onClick={()=>navigate("/vet-docs")} className='flex justify-between items-center gap-2 px-10 py-5 w-fit cursor-pointer rounded-2xl hover:bg-[#F7418F] bg-pink-500 text-gray-900 hover:text-black hover:scale-105 duration-500'>
            <button>Book Appointment</button>
            <IoIosArrowDroprightCircle className='w-5 h-5'/>
          </div>

          {/* Info Cards Section */}
          <div className="flex justify-around w-full gap-10 mt-10">
            {/* Card 1 - Guidance & Support */}
            <div className="w-72 text-center">
              <HeartHandshake className="w-12 h-12 text-pink-400 mx-auto white mb-3" />
              <h3 className="text-xl font-bold mb-2">Guidance & support</h3>
              <p className="text-sm text-gray-300">
                Vets will work with you to understand your pet's health & wellness issues, as well as
                provide guidance and next steps to help your pet.
              </p>
            </div>

            {/* Card 2 - Over-the-counter product suggestions */}
            <div className="w-72 text-center">
              <ShoppingBag className="w-12 h-12 mx-auto text-[#6AD4DD] mb-3" />
              <h3 className="text-xl font-bold mb-2">Over-the-counter product suggestions</h3>
              <p className="text-sm text-gray-300">
                While prescriptions are not available, Our Vets can make suggestions as to which
                non-medicated products would be helpful for your pet's health concern.
              </p>
            </div>

            {/* Card 3 - Peace of mind */}
            <div className="w-72 text-center">
              <ShieldCheck className="w-12 h-12 mx-auto text-[#36BA98] mb-3" />
              <h3 className="text-xl font-bold mb-2">Peace of mind</h3>
              <p className="text-sm text-gray-300">
                Verified Professionals are available 24/7 for providing exceptional care to your pet at any time of the day
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default VetHome