import React from 'react'

const Heading = ({topic, subtopic, time}) => {
  return (
    <>  
        <div className='text-center font-grotesk my-5 text-ink-primary'>
            <h1 className='font-bold text-6xl mb-10 max-w-[80%] mx-auto leading-tight'>{topic || "Exotic birds escape zoo damaged by heavy snow"}</h1>
            <h3 className='font-medium text-lg max-w-[50%] mx-auto mb-4 text-ink-primary/80'>{subtopic || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur non optio a perferendis maiores ducimus officia necessitatibus ea voluptatem, unde recusandae illo, nisi repellendus, odit quis id enim rerum corporis?"}</h3>
            <h5 className='font-light text-ink-primary/70'>{time || "5"} minutes read</h5>
        </div>
    </>
  )
}

export default Heading
