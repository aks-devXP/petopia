import React from 'react';
import Card from "../Components/Vet/CardHero";
import vet from "../assets/vet.png";

function VetHome() {

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
      <div className='relative'>
        <img className='' src="https://static.vecteezy.com/system/resources/previews/011/602/170/large_2x/veterinary-clinic-female-doctor-portrait-at-the-animal-hospital-holding-cute-sick-cat-free-photo.jpg" alt="" />
        <div className='absolute left-5 bottom-0 my-5 w-[50%]'>
          <p className='font-semibold text-4xl'>Trusted Vet Consultation Near You Compassionate Care by Expert Vets</p>
          <button className='mt-10 border-black px-4 py-2 rounded-2xl border-2 border-solid bg-black hover:bg-n-4 hover:border-n-3 transition-colors'>Book Appointment</button>
          <div className='flex justify-between w-[70%] mt-12'>
            <Card link='/vet' text='150+ Caring Vets' img={vet} alt='Vet Logo Art'></Card>
            <Card link='/vet' text='24/7 Care Available' img={vet} alt='Vet Logo Art'></Card>
            <Card link='/vet' text='800+ Pets Served' img={vet} alt='Vet Logo Art'></Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default VetHome