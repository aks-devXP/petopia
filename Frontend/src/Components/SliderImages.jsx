import { useEffect, useState } from 'react';

const SliderImages = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };

  // Auto-Scrolling the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slides.length]);

  return (
    <div className="overflow-hidden relative w-auto h-[80%]">
      <div
        className="flex transition-transform ease-in-out duration-500"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 basis-full w-full h-full"
          >
            <img
              className="w-full h-screen object-cover"
              src={slide}
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-2 w-full flex justify-center gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`rounded-full w-3 h-3 cursor-pointer ${
              index === currentSlide ? 'bg-white' : 'bg-gray-500'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SliderImages;
