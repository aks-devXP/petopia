// ImpactSection.jsx
import React, { useEffect, useState } from "react";

// Counter component to animate number counting
const Counter = ({ target, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 10);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        clearInterval(interval);
        setCount(target);
      } else {
        setCount(Math.ceil(start));
      }
    }, 10);

    return () => clearInterval(interval);
  }, [target, duration]);

  return <span>{count}+</span>;
};

const Impact = () => {
  const data = [
    {
      value: 15,
      unit: "LAC",
      description: "children and their families are impacted every year",
    },
    {
      value: 2000,
      unit: "VILLAGES",
      description: "and slums are reached out to across the country",
    },
    {
      value: 400,
      unit: "PROJECTS",
      description: "focused on education, healthcare, and women empowerment",
    },
    {
      value: 25,
      unit: "STATES",
      description: "are reached including the remotest areas",
    },
  ];

  return (
    <div className="bg-gray-200 py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">OUR IMPACT</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-6xl font-bold text-sand-light">
              <Counter target={item.value} duration={1500} />
            </div>
            <div className="text-sand-mid text-lg font-semibold mt-2">
              {item.unit}
            </div>
            <p className="text-gray-600 mt-2 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Impact;
