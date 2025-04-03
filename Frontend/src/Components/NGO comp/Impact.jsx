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
      description: "Stray animals have been rescued",
    },
    {
      value: 2000,
      unit: "NGO's",
      description: "are affiliated with us",
    },
    {
      value: 400,
      unit: "PROJECTS",
      description: "focused on animal welfare",
    },
    {
      value: 25,
      unit: "STATES",
      description: "are reached including the remotest areas",
    },
  ];

  return (
    <div className="py-12 px-6 w-full m-auto"
    style={{
      backgroundImage: 'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #9d9ce4, #a09de7, #a39fea, #bc96e6, #d58cdc, #ec81cc, #ff77b7)',
    }}>
      <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-[#FABC3F]">OUR IMPACT</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-6xl font-bold text-[#faecf4]">
              <Counter target={item.value} duration={1500} />
            </div>
            <div className="text-[#A02334] text-lg font-semibold mt-2">
              {item.unit}
            </div>
            <p className="text-[#383737] mt-2 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
// 1b3535
// linear-gradient(to right bottom, #ebb63e, #ff813e, #ff3b67, #f300a2, #982be0)
export default Impact;
