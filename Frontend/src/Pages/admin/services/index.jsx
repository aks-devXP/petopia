import React, { useState, useRef } from "react";
import trainerbg from "@assets/trainerbg.jpg";
import CareTakerOptions from "./CareTakerOptions";
import GroomerOptions from "./GroomerOptions";
import TrainerOptions from "./TrainerOptions";
import { Star, Clock, Shield, Users, Phone, Mail, MapPin, ChevronDown, Menu, X } from 'lucide-react';
import { Scissors, BookOpen, Heart } from "lucide-react";
import TrainerBanner from "./components/TrainerBanner";

function PetServices() {
  const textOptions = {
    trainer: "Where pet parents find expert care and trusted trainers.",
    caretaker: "Loving care when you're not there.",
    groomer: "Pamper your pet with top-notch grooming."
  };
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const services = [
    { id: 1, title: "Plumbing Services", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop", rating: 4.8, reviews: 124 },
    { id: 2, title: "Electrical Work", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop", rating: 4.9, reviews: 98 },
    { id: 3, title: "AC Repair", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop", rating: 4.7, reviews: 156 },
    { id: 4, title: "House Cleaning", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", rating: 4.6, reviews: 203 },
    { id: 5, title: "Appliance Repair", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", rating: 4.8, reviews: 87 },
    { id: 6, title: "Painting Services", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop", rating: 4.9, reviews: 142 }
  ];

  const popularServices = [
    { id: 1, title: "Bathroom Cleaning", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop", rating: 4.7, reviews: 89 },
    { id: 2, title: "Kitchen Deep Clean", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", rating: 4.8, reviews: 156 },
    { id: 3, title: "Furniture Assembly", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop", rating: 4.6, reviews: 73 },
    { id: 4, title: "Garden Maintenance", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop", rating: 4.9, reviews: 134 },
    { id: 5, title: "TV Mounting", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop", rating: 4.5, reviews: 67 },
    { id: 6, title: "Pest Control", image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop", rating: 4.7, reviews: 112 }
  ];

  const blogPosts = [
    { id: 1, title: "Expert Cleaning Safety Tips Every Homeowner Should Know", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
    { id: 2, title: "DIY vs. Professional: When to Call the Experts", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop" },
    { id: 3, title: "How Our App Makes Home Services That Much Easier", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop" }
  ];

  const testimonials = [
    { name: "Sarah Johnson", rating: 5, text: "Amazing service! The technician was professional and fixed my plumbing issue quickly." },
    { name: "Mike Chen", rating: 5, text: "Booked a cleaning service through the app. Super easy and the results were fantastic." },
    { name: "Lisa Rodriguez", rating: 5, text: "Reliable and trustworthy. I've used them multiple times and they never disappoint." }
  ];

  const [selectedService, setSelectedService] = useState("trainer");

  const servicesRef = useRef(null);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleBookClick = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden h-screen w-full">
        <div className="absolute inset-0 w-full h-full bg-black bg-opacity-70 z-4"></div>
        <img
          className="object-cover absolute inset-0 w-full h-full"
          src={trainerbg}
          alt="Service Background"
        />

        <div className="absolute w-full h-full flex flex-col justify-center text-white z-5 md:pl-5 p-3 pt-10">
          {/* Button Group */}
          <div className="flex gap-5">
            {Object.entries(textOptions).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleServiceSelect(key)}
                className={`w-[180px] text-[22px] transition-all duration-300 py-2 rounded-md
                  ${selectedService === key
                    ? "font-bold bg-white text-black"
                    : "hover:border-b-4 hover:border-gray-400 hover:font-bold"}`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          {/* Centered Text */}
          <div className="md:max-w-[70%] md:mt-0 mt-4 h-[300px] flex items-center text-[50px] lg:text-[70px] leading-tight">
            {textOptions[selectedService]}
          </div>

          {/* Book Appointment */}
          <div className="flex items-center justify-center mt-5 w-[200px] bg-transparent border-2
              border-white px-[15px] py-[10px]
              text-white cursor-pointer text-[16px] transition-all 
              duration-300 hover:bg-white hover:text-black">
            <button onClick={handleBookClick}>
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div ref={servicesRef} className="w-full bg-[#1A120B]">
        <div className="min-h-screen bg-[#E5E5CB]">

      {/* Quick Booking Section */}
      <section className="py-16 bg-[#E5E5CB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">
              Smooth Starts Here – Book in Seconds
              
            </h2>
            <p className="text-[#664343d3]">
              Fast, reliable, and stress-free pet services — from grooming and training to daily care, everything your pet needs is just a click away.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {/* Grooming */}
  <div className="text-center bg-white p-8 rounded-2xl shadow-sm">
    <div className="w-16 h-16 bg-[#E5E5CB] rounded-full flex items-center justify-center mx-auto mb-4">
      <Scissors className="h-8 w-8 text-[#1A120B]" />
    </div>
    <h3 className="text-xl font-semibold text-[#1A120B] mb-3">Pet Grooming</h3>
    <p className="text-[#3C2A21]">
      Pamper your furry friend with safe and professional grooming services.
    </p>
  </div>

  {/* Training */}
  <div className="text-center bg-white p-8 rounded-2xl shadow-sm">
    <div className="w-16 h-16 bg-[#E5E5CB] rounded-full flex items-center justify-center mx-auto mb-4">
      <BookOpen className="h-8 w-8 text-[#1A120B]" />
    </div>
    <h3 className="text-xl font-semibold text-[#1A120B] mb-3">Pet Training</h3>
    <p className="text-[#3C2A21]">
      Build good habits and strengthen your bond with expert training.
    </p>
  </div>

  {/* Caretaking */}
  <div className="text-center bg-white p-8 rounded-2xl shadow-sm">
    <div className="w-16 h-16 bg-[#E5E5CB] rounded-full flex items-center justify-center mx-auto mb-4">
      <Heart className="h-8 w-8 text-[#1A120B]" />
    </div>
    <h3 className="text-xl font-semibold text-[#1A120B] mb-3">Pet Caretaking</h3>
    <p className="text-[#3C2A21]">
      Loving care for your pet when you can’t be there — safe and reliable.
    </p>
  </div>
</div>

        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-[#E5E5CB]">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800">Featured Care Taker</h2>
            <button className="text-amber-700 hover:text-amber-800 transition-colors">View All</button>
          </div>
          
          <CareTakerOptions />
        </div>
      </section>


<section className="py-16 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          
          {/* Left Content */}
          <div className="lg:w-1/2 lg:pr-8 mb-10 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">
              Find the Perfect Trainer for Your Pet
            </h2>
            <p className="text-lg text-stone-700 mb-8">
              Our certified trainers specialize in obedience, socialization, and
              behavior correction to make your pet happy, healthy, and well-trained.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors">
                Book a Trainer
              </button>
              <button className="border-2 border-amber-700 text-amber-700 hover:text-amber-800 px-6 py-3 rounded-lg hover:text- transition-colors">
                View More
              </button>
            </div>
          </div>

          {/* Right - Trainers Banner */}
          <div className="lg:w-1/2">
            <TrainerBanner />
          </div>
        </div>
      </div>
    </section>

      {/* Popular Services */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800">Popular Services</h2>
            <button className="text-amber-700 hover:text-amber-800 transition-colors">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularServices.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-stone-800 mb-2">{service.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-stone-600">{service.rating}</span>
                      <span className="text-stone-500">({service.reviews})</span>
                    </div>
                    <button className="text-amber-700 hover:text-amber-800 transition-colors font-medium">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Here's Why Customers Trust Us
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">500+</div>
              <div className="text-stone-300">Verified Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">1000+</div>
              <div className="text-stone-300">Services Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">24+ Cities</div>
              <div className="text-stone-300">Across Country</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">4.8/5.0</div>
              <div className="text-stone-300">Average Rating</div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
              <h3 className="text-2xl font-bold text-white mb-6">
                Top-Rated Home Services by Experts
              </h3>
              <p className="text-stone-300 mb-8">
                All our professionals are background-checked, insured, and trained to deliver 
                exceptional service every time.
              </p>
              <button className="bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors">
                Get Started
              </button>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=400&fit=crop" 
                alt="Expert service" 
                className="rounded-xl shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">Valued by Real People</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-stone-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-amber-800 font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <span className="font-semibold text-stone-800">{testimonial.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
      </div>
    </div>
  );
}

export default PetServices;