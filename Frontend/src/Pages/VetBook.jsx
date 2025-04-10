import React, { useEffect, useState } from 'react';
import { MdVerifiedUser } from "react-icons/md";
import { Star, Dot } from "lucide-react";
import { RiInformation2Fill } from "react-icons/ri";
import VetBookCard from '../Components/Vet/VetBookCard';
import { AppointmentTimings } from "../Util/AppointmentTimings";

const VetBook = ({ name, spec, exp, fee, info, img, rating }) => {
    const [toggleButton, setToggleButton] = useState(0);
    const [toggleTimeButton, setToggleTimeButton] = useState(0);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [reviews, setReviews] = useState([
        {
            name: "Wendy Phillips",
            date: "January 2025",
            content:
                "I am extremely pleased with Annie's appointment with Dr. Erika Latham! Dr. Latham quickly addressed my concerns about Annie’s issue.",
        },
        {
            name: "Lisa Daniels",
            date: "December 2024",
            content:
                "We didn't know how much we could get out of this visit, as our cat was generally healthy and we were mostly seeking a second opinion.",
        },
        {
            name: "Lisa Daniels",
            date: "December 2024",
            content:
                "We didn't know how much we could get out of this visit, as our cat was generally healthy and we were mostly seeking a second opinion.",
        },
        {
            name: "Wendy Phillips",
            date: "January 2025",
            content:
                "I am extremely pleased with Annie's appointment with Dr. Erika Latham! Dr. Latham quickly addressed my concerns about Annie’s issue.",
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
        // Get the available time slots for the selected date
        const times = AppointmentTimings();
        setAvailableTimes(times);
    }, []);

    return (
        <>
            <div className="bg-transparent py-5 w-full h-fit font-poppins">
                <div className="h-fit w-full flex flex-col lg:flex-row justify-evenly">
                    {/* Left Section */}
                    <div className="h-fit w-full lg:w-[60%]">
                        <div className="h-fit w-full text-black rounded-xl p-10">
                            {/* Doctor Info */}
                            <div className="h-72 rounded-xl bg-sand-light flex justify-evenly items-center" id="image">
                            <img
                                className="h-60 w-60 rounded-full shadow-lg"
                                src="https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc1.png"
                                alt=""
                            />
                                <div>
                                    <div className="flex gap-3 items-center">
                                        <p className="font-medium text-4xl">{name ? name : "Dr. John Doe"}</p>
                                        <MdVerifiedUser className="w-5 h-5" />
                                    </div>
                                    <div className="mt-2 flex gap-2 items-center">
                                        <p className="font-normal text-md">MBBS - {spec ? spec : "General Physician"}</p>
                                        <div className="rounded-3xl border-2 px-2 py-0.25 font-light bg-gradient-to-r from-neutral-800 via-gray-700 to-slate-950 border-n-5 text-xs text-white">
                                            <p>{exp ? exp : "3 Years"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Doctor Info */}
                            <div className="mt-5">
                                <p className="text-sm/6 mb-5 text-[antiquewhite]">
                                    {info
                                        ? info
                                        : "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies."}
                                </p>
                            </div>
                        </div>

                        {/* Review Section */}
                        <div className="h-fit w-full text-white p-5">
                            <div className="flex text-xl justify-start font-medium items-center gap-2 mb-3">
                                <Star className="w-4 h-4 text-rose-500" />
                                <span className="font-medium">{rating ? rating : "4.2"}</span>
                                <Dot className=''/>
                                <span>{reviews.length} Reviews</span>
                            </div>

                            <div className='bg-rose-300 px-5 rounded-3xl'>
                                <div
                                    className="w-full h-72 overflow-x-auto flex gap-5 snap-x snap-mandatory scroll-smooth no-scrollbar items-center"
                                    id="review-slider"
                                >
                                    {reviews.map((review, index) => (
                                        <div
                                            key={index}
                                            className="w-[30%] h-[80%] flex-shrink-0 bg-white rounded-xl shadow-md flex flex-col justify-between p-5 snap-start hover:scale-95 duration-500 cursor-pointer"
                                        >
                                            {/* Review Content */}
                                            <div className="h-[65%] overflow-hidden">
                                                <p className="text-black text-sm">{review.content}</p>
                                            </div>

                                            {/* Reviewer Info */}
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

                            {/* Review Slider */}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-[80%] mx-auto lg:w-[40%] p-5 h-screen">
                        <div className="w-full h-[90%] flex justify-center items-center sticky top-24">
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VetBook;
