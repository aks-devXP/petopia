import trainerbg from "@assets/HomeScreen/homescreen-bg.jpg";
import { BookOpen, Heart, Scissors, Star } from "lucide-react";
import { useRef, useState } from "react";
import CareTakerOptions from "./CareTakerOptions";
import TrainerBanner from "./components/TrainerBanner";

function PetServices() {
  const textOptions = {
    trainer: "Expert training to build trust, obedience, and a happy bond.",
    caretaker: "Loving, reliable care when you can’t be there.",
    groomer: "Pampering your pet with safe and professional grooming.",
  };

  const [selectedService, setSelectedService] = useState("trainer");
  const servicesRef = useRef(null);

  const groomers = [
    {
      id: 1,
      name: "Pawfect Grooming Studio",
      image:
        "https://images.unsplash.com/photo-1629909613654-28e4c1b7e53c?q=80&w=1200&auto=format&fit=crop",
      rating: 4.8,
      reviews: 120,
    },
    {
      id: 2,
      name: "Happy Tails Salon",
      image:
        "https://images.unsplash.com/photo-1601979031896-89cdd8243b45?q=80&w=1200&auto=format&fit=crop",
      rating: 4.6,
      reviews: 95,
    },
    {
      id: 3,
      name: "Fluffy Friends Groomers",
      image:
        "https://images.unsplash.com/photo-1558788353-f76d92427f16?q=80&w=1200&auto=format&fit=crop",
      rating: 4.9,
      reviews: 210,
    },
    {
      id: 4,
      name: "The Dog Spa",
      image:
        "https://images.unsplash.com/photo-1629909613654-28e4c1b7e53c?q=80&w=1200&auto=format&fit=crop",
      rating: 4.7,
      reviews: 88,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "The grooming service was amazing! My dog looks and feels fantastic.",
    },
    {
      name: "Mike Chen",
      text: "I booked a caretaker and felt at peace knowing my pet was in safe hands.",
    },
    {
      name: "Lisa Rodriguez",
      text: "The trainer was patient and professional — my puppy learned so much!",
    },
  ];

  const handleServiceSelect = (service) => setSelectedService(service);

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
          alt="Pet Services Background"
        />

        <div className="absolute w-full h-full flex flex-col justify-center text-white z-5 md:pl-5 p-3 pt-10">
          {/* Button Group */}
          <div className="flex gap-5">
            {Object.entries(textOptions).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleServiceSelect(key)}
                className={`w-[180px] text-[22px] transition-all duration-300 py-2 rounded-md
                  ${
                    selectedService === key
                      ? "font-bold bg-white text-ink-secondary"
                      : "hover:border-b-4 hover:border-gray-400 hover:font-bold"
                  }`}
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
          <div
            className="flex items-center justify-center mt-5 w-[200px] bg-transparent border-2
              border-white px-[15px] py-[10px]
              text-white cursor-pointer text-[16px] transition-all 
              duration-300 hover:bg-white hover:text-ink-secondary"
          >
            <button onClick={handleBookClick}>Book Appointment</button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div ref={servicesRef} className="w-full bg-[#1A120B]">
        <div className="min-h-screen bg-app-bg">
          {/* Quick Booking Section */}
          <section className="py-16 bg-app-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-stone-800 mb-4">
                  Smooth Starts Here – Book in Seconds
                </h2>
                <p className="text-ink-secondary">
                  Fast, reliable, and stress-free pet services — from grooming
                  and training to caretaking, everything your pet needs is just
                  a click away.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Grooming */}
                <div className="text-center bg-white p-8 rounded-2xl shadow-sm">
                  <div className="w-16 h-16 bg-app-bg rounded-full flex items-center justify-center mx-auto mb-4">
                    <Scissors className="h-8 w-8 text-ink-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink-primary mb-3">
                    Pet Grooming
                  </h3>
                  <p className="text-ink-secondary">
                    Pamper your furry friend with safe and professional grooming
                    services.
                  </p>
                </div>

                {/* Training */}
                <div className="text-center bg-white p-8 rounded-2xl shadow-sm">
                  <div className="w-16 h-16 bg-app-bg rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-ink-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink-primary mb-3">
                    Pet Training
                  </h3>
                  <p className="text-ink-secondary">
                    Build good habits and strengthen your bond with expert
                    training.
                  </p>
                </div>

                {/* Caretaking */}
                <div className="text-center bg-white p-8 rounded-2xl shadow-sm">
                  <div className="w-16 h-16 bg-app-bg rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-ink-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink-primary mb-3">
                    Pet Caretaking
                  </h3>
                  <p className="text-ink-secondary">
                    Loving care for your pet when you can’t be there — safe and
                    reliable.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Caretaker */}
          <section className="py-16 bg-app-bg">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-bold text-stone-800">
                  Featured Caretakers
                </h2>
                <button className="text-amber-700 hover:text-amber-800 transition-colors">
                  View All
                </button>
              </div>
              <CareTakerOptions />
            </div>
          </section>

          {/* Trainers Section */}
          <section className="py-16 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center">
                {/* Left Content */}
                <div className="lg:w-1/2 lg:pr-8 mb-10 lg:mb-0">
                  <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">
                    Find the Perfect Trainer for Your Pet
                  </h2>
                  <p className="text-lg text-stone-700 mb-8">
                    Our certified trainers specialize in obedience,
                    socialization, and behavior correction to make your pet
                    happy, healthy, and well-trained.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors">
                      Book a Trainer
                    </button>
                    <button className="border-2 border-amber-700 text-amber-700 px-6 py-3 rounded-lg hover:text-amber-800 transition-colors">
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

          {/* Groomers */}
          <section className="py-16 bg-app-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-bold text-stone-800">
                  Top Groomers Near You
                </h2>
                <button className="text-amber-700 hover:text-amber-800 transition-colors">
                  View All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {groomers.slice(0, 3).map((groomer) => (
                  <div
                    key={groomer.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <img
                      src={groomer.image}
                      alt={groomer.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-stone-800 mb-2">
                        {groomer.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-stone-600">
                            {groomer.rating}
                          </span>
                          <span className="text-stone-500">
                            ({groomer.reviews})
                          </span>
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
                  Why Pet Parents Trust Us
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8 mb-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-400 mb-2">
                    500+
                  </div>
                  <div className="text-stone-300">Certified Professionals</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-400 mb-2">
                    1000+
                  </div>
                  <div className="text-stone-300">Happy Pets Served</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-400 mb-2">
                    24+ Cities
                  </div>
                  <div className="text-stone-300">Nationwide Coverage</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-400 mb-2">
                    4.8/5.0
                  </div>
                  <div className="text-stone-300">Average Rating</div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16 bg-app-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-stone-800 mb-4">
                  Loved by Pet Parents
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm"
                  >
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-500 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-stone-600 mb-4 italic">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center mr-3">
                        <span className="text-amber-800 font-semibold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-semibold text-stone-800">
                        {testimonial.name}
                      </span>
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