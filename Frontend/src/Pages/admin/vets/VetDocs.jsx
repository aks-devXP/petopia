import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVets } from '../../../API/VetAPI';
import Loader from '@components/Loader/Loader';

const VetDocs = () => {
    const specialities = ["General Physician", "Internal Medicine", "Surgery", "Dentistry", "Dermatology", "Ophthalmology"]
    const navigate = useNavigate();
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const {data, isPending, error} = useQuery({
        queryKey: ['getdocs'],
        queryFn: getVets,
    })

    const [doctors, setDoctors] = useState([]);

    // only update doctors when data is array, not undefined
    useEffect(() => {
      if (Array.isArray(data)) {
        setDoctors(data);
      }
    }, [data]);      

    // filtering doctors based on selected specialty
    const filteredDoctors = selectedSpecialty 
      ? doctors.filter(doc => doc.specialty === selectedSpecialty)
      : doctors;

    if(isPending) return (
      <div >
        <Loader/>
      </div>
    )

    if(error) return <div className='text-center text-2xl font-grotesk'>{error.message}</div>
    // console.log("Doctors", doctors);

  return (
    <>
        <div className='bg-sand-dark flex-col flex lg:flex-row md:flex-row sm:flex-col justify-around gap-5 py-5 pt-15'>
            <div className='w-full lg:w-1/5 md:w-1/5'>
                <p className='text-2xl text-center'>Browse through our <br /> specialist doctors here</p>
                <div className='grid grid-cols-3 px-5 lg:flex lg:flex-col sm:grid sm:grid-cols-4 items-start mt-10 gap-3 lg:w-[80%] sm:w-full sm:px-5'>
                    {
                      specialities.map((specialty, index) => (
                        <p 
                          key={index}
                          onClick={() => setSelectedSpecialty(selectedSpecialty === specialty ? null : specialty)}
                          className={`w-full pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:translate-x-1 hover:bg-sand-light hover:text-black ${
                            selectedSpecialty === specialty ? 'bg-sand-lightest text-black translate-x-5' : ''
                          }`}
                        >
                          {specialty}
                        </p>
                      ))
                    }
                </div>
            </div>

            <div className='w-full lg:w-2/3 md:w-2/3 sm:w-full grid-cols-2 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 px-5 gap-5 gap-y-6 min-h-[400px]'>
                {filteredDoctors.length === 0 ? (
                    <div className="col-span-full text-center flex items-center justify-center min-h-[400px]">
                        <div>
                            <p className="text-xl text-white font-medium">
                                No doctors are currently available for {selectedSpecialty}
                            </p>
                            <p className="text-sm text-[#5C5C5C] mt-2">
                                Please check back later or try a different specialty
                            </p>
                        </div>
                    </div>
                ) : (
                    filteredDoctors.map((doc,index)=>(
                        <div onClick={()=>{navigate(`/pet-services/vet/${doc._id}`)}} className="border border-[rgb(201,216,255)] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 bg-sand-light">
                            <img className="bg-[#EAEFFF]" src={(`/petopia/Vet/${doc.profilePic}`)} alt=""/>
                            <div className="p-4">
                                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                                    <p className="w-2 h-2 rounded-full bg-green-500"></p>
                                    <p>Available</p>
                                </div>
                                <p className="text-[#262626] text-lg font-medium">{doc.name}</p>
                                <p className="text-[#5C5C5C] text-sm">{doc.specialty}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </>
  )
}

export default VetDocs
