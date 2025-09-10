import React from 'react'

const NewsHero = ({
  title = 'Animal News & Stories',
  subtitle = 'Stay ahead with impactful updates, research, and inspiring stories from the animal world.',
  videoSrc = './news-vid1.mp4'
}) => {
  return (
    <section className="relative w-full overflow-hidden rounded-b-3xl">
      <div className="relative h-[56vw] max-h-[520px] min-h-[260px]">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-white/90 text-sm sm:text-base md:text-lg">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}

export default NewsHero


