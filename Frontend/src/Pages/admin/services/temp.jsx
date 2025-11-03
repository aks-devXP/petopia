

import React from "react";
import ReactDOM from "react-dom/client";
import BlurText from "@components/BlurText"; // alias points to /src/components

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

export default function App() {
  return (
    <main className="w-full">
      <section className="bg-ink-primary flex justify-center text-center rounded-b-3xl mx-2 sm:mx-12 px-4 sm:px-8 lg:px-12">
        <BlurText
          text="Isn't this so cool?!"
          delay={80}
          animateBy="words"    // 'words' | 'letters'
          direction="top"       // 'top' | 'bottom'
          onAnimationComplete={handleAnimationComplete}
          className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-8"
        />


      </section>
    </main>
  );
}

