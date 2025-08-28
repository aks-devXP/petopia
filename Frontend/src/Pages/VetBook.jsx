import { Dot, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import { useParams } from "react-router-dom";
import { getVetById } from "../API/VetAPI";
import Loader from "../Components/Loader/Loader";
import VetBookCard from "../Components/Vet/VetBookCard";

const VetBook = () => {
  const { id } = useParams();
  const [toggleButton, setToggleButton] = useState(0);
  const [toggleTimeButton, setToggleTimeButton] = useState(0);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const [reviews, setReviews] = useState([
    {
      name: "Wendy Phillips",
      date: "January 2025",
      content:
        "I am extremely pleased with Annie's appointment with Dr. Erika Latham! Dr. Latham quickly addressed my concerns about Annie's issue.",
    },
    {
      name: "Lisa Daniels",
      date: "December 2024",
      content:
        "We didn't know how much we could get out of this visit, as our cat was generally healthy and we were mostly seeking a second opinion.",
    },
    
    {
      name: "Jonathan Reeves",
      date: "March 2025",
      content:
        "Dr. Carter is incredibly knowledgeable and compassionate. She took the time to explain everything in detail and made my dog feel very comfortable.",
    },
    {
      name: "Rachel Gomez",
      date: "February 2025",
      content:
        "Professional, punctual, and patient. Dr. Carter answered all our questions with a smile. Highly recommended for first-time pet owners!",
    },
    {
      name: "Samuel Turner",
      date: "February 2025",
      content:
        "The clinic was clean and well-organized. Dr. Carter provided excellent care and follow-up instructions. Very satisfied with the visit.",
    },
    {
      name: "Priya Desai",
      date: "January 2025",
      content:
        "Dr. Carter was amazing with our puppy! She's gentle, thorough, and truly passionate about her work. We'll definitely be coming back.",
    },
  ]);
  

  const today = new Date();
  const currentWeek = Array.from({ length: 15 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return {
      date: date.getDate(),
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      fullDate: date.toDateString(),
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vet = await getVetById(id);
        if (vet) {
          setData(vet);
          setAvailableTimes(vet.timings)
        }
      } catch (err) {
        console.error("Error loading vet data:", err);
      } finally {
        setLoading(false);
      }
      // setAvailableTimes(AppointmentTimings());
    };

    fetchData();
  }, [id]);

  console.log(availableTimes);

  if (loading || !data) {
    return <Loader />;
  }
  // console.log(data.profilePic);

  return (
    <div className="bg-transparent py-5 w-full h-fit font-poppins">
      <div className="h-fit w-full flex flex-col lg:flex-row justify-evenly">
        {/* Left Section */}
        <div className="h-fit w-full lg:w-[60%]">
          <div className="h-fit w-full text-black rounded-xl p-10">
            {/* Doctor Info */}
            <div
              className="h-72 rounded-xl bg-sand-light flex justify-evenly items-center"
              id="image"
            >
              <img
                className="h-60 w-60 rounded-full shadow-lg object-cover"
                src={(`/petopia/Vet/${data.profilePic}`)}
                alt="Profile"
              />
              <div>
                <div className="flex gap-3 items-center">
                  <p className="font-medium text-4xl">
                    {data.name || "Dr. John Doe"}
                  </p>
                  <MdVerifiedUser className="w-5 h-5" />
                </div>
                <div className="mt-2 flex gap-2 items-center">
                  <p className="font-normal text-md">
                    MBBS - {data.specialization || "General Physician"}
                  </p>
                  <div className="rounded-3xl border-2 px-2 py-0.5 font-light bg-gradient-to-r from-neutral-800 via-gray-700 to-slate-950 border-n-5 text-xs text-white">
                    <p>{data.tenure ? `${data.tenure} Years` : "3 Years"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="mt-5">
              <p className="text-sm/6 mb-5 text-[antiquewhite]">
                {data.about ||
                  "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies."}
              </p>
            </div>
          </div>

          {/* Review Section */}
          <div className="h-fit w-full text-white p-5">
            <div className="flex text-xl justify-start font-medium items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-rose-500" />
              <span className="font-medium">{data.rating || "4.2"}</span>
              <Dot className="" />
              <span>{reviews.length} Reviews</span>
            </div>

            <div className="bg-rose-300 px-5 rounded-3xl">
              <div
                className="w-full h-72 overflow-x-auto flex gap-5 snap-x snap-mandatory scroll-smooth no-scrollbar items-center"
                id="review-slider"
              >
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="w-[30%] h-[80%] flex-shrink-0 bg-white rounded-xl shadow-md flex flex-col justify-between p-5 snap-start hover:scale-95 duration-500 cursor-pointer"
                  >
                    <div className="h-[65%] overflow-hidden">
                      <p className="text-black text-sm">{review.content}</p>
                    </div>
                    <div className="w-full flex gap-3 items-center mt-5">
                      <div className="w-8 h-8 bg-blue-400 rounded-full flex justify-center items-center text-black font-semibold">
                        {review.name.charAt(0)}
                      </div>
                      <div className="flex flex-col text-black">
                        <span className="font-medium">{review.name}</span>
                        <span className="text-xs">{review.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[80%] mx-auto lg:w-[40%] p-5 h-full">
          <div className="w-full h-full flex justify-center items-center sticky top-24">
            <VetBookCard
              fees={"2590"}
              day={"Today"}
              time={"10 A.M."}
              currentWeek={currentWeek}
              availableTimes={availableTimes}
              toggleButton={toggleButton}
              setToggleButton={setToggleButton}
              toggleTime={toggleTimeButton}
              setTimeButton={setToggleTimeButton}
              vetName={data.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetBook;
