import React from "react";


import WelcomeBanner from "./components/WelcomeBanner"; // adjust path if needed
import AppointmentBanner from "./components/AppointmentBanner"; // your JSX banner component
import PetBanner from "./components/PetBanner";
import FavouriteBanner from "./components/FavouriteBanner";
import ProfileBanner from "./components/ProfileBanner";
import MessagePreferencesBanner from "./components/MessagePreferencesBanner";
import PawButton from "@/components/buttons/PawButton";

// Dummy data aligned with your Appointment shape
const DUMMY_APPOINTMENTS = [
  {
    _id: "a1",
    serviceName: "General Check-up",
    type: "vet",
    date: "2025-10-24T00:00:00.000Z",
    time: "10:30",
    status: "confirmed",
    serviceCost: 800,
    description: "Annual wellness exam and vaccination review.",
    pet: { name: "Milo" },
    provider: {
      name: "Dr. Kavya Sharma",
      avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400",
      location: "Paws & Care Clinic",
      phone: "+91 98765 43210",
    },
  },
  {
    _id: "a2",
    serviceName: "Full Grooming",
    type: "groomer",
    date: "2025-10-26T00:00:00.000Z",
    time: "14:00",
    status: "pending",
    serviceCost: 1200,
    description: "Bath, nail trim, ear cleaning, and coat styling.",
    pet: { name: "Zara" },
    provider: {
      name: "Furry Styles",
      avatar: "https://images.unsplash.com/photo-1601582585289-b6154fe3625b?q=80&w=400",
      location: "Sector 21, City",
      phone: "+91 90000 11111",
    },
  },
  {
    _id: "a3",
    serviceName: "Obedience Session",
    type: "trainer",
    date: "2025-10-28T00:00:00.000Z",
    time: "18:00",
    status: "completed",
    serviceCost: 900,
    description: "Intro to leash walking and recall.",
    pet: { name: "Rocky" },
    provider: {
      name: "Training with Arjun",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
      location: "Home Visit",
      phone: "+91 95555 22222",
    },
  },
  {
    _id: "a4",
    serviceName: "Daycare Slot",
    type: "daycare",
    date: "2025-11-02T00:00:00.000Z",
    time: "09:00",
    status: "cancelled",
    serviceCost: 700,
    description: "Half-day supervised play.",
    pet: { name: "Coco" },
    provider: {
      name: "Happy Tails Daycare",
      avatar: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?q=80&w=400",
      location: "HSR Layout",
      phone: "+91 98888 33333",
    },
  },
  {
    _id: "a5",
    serviceName: "Vaccine Booster",
    type: "vet",
    date: "2025-11-05T00:00:00.000Z",
    time: "11:15",
    status: "pending",
    serviceCost: 600,
    description: "DHPP booster dose.",
    pet: { name: "Luna" },
    provider: {
      name: "City Vet Clinic",
      avatar: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=400",
      location: "Indiranagar",
      phone: "+91 97777 44444",
    },
  },
];

export default function Home() {
  return (
    <div className="w-full space-y-6">
      <WelcomeBanner username="Aditya" />

      {/* Dashboard banner: fixed height, internal scroll, compact cards */}
      <div className="px-4 py-2 md:py-4 lg:mx-8 flex-1 flex flex-col md:flex-row gap-6">
        <div className="md:w-[65%] w-full">
          <PetBanner />
        </div>
        <div className="md:w-[35%] w-full">
          <AppointmentBanner appointments={DUMMY_APPOINTMENTS} />
        </div>
      </div>

      <FavouriteBanner />
      

      <div className="px-4 py-2 md:py-4 lg:mx-8 flex flex-col md:flex-row gap-6 justify-center">

        <div className="md:inline-block w-full md:w-fit flex md:aspect-square ">
          <ProfileBanner className="h-full w-full" />
        </div>

        <div className="flex-1">
          <MessagePreferencesBanner />
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <PawButton text="Logout" className="mb-3" 
          onClick={() => {
            console.log("Logout clicked");
          }} />
      </div>

      </div>

  );
}
