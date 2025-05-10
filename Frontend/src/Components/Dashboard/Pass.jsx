import React from 'react'

const Pass = () => {
  return (
    <div className='flex flex-col items-center justify-start h-screen'>
    <div className='bg-[#1d1c50] p-6 rounded-3xl shadow mt-24'>
                <h2 className='text-2xl font-semibold mb-6'>Login & Security</h2>
                <div className=''>
                  {/* <p className='my-2 text-[#c8adeb]'>Enter Your Current Password: <input className='ml-1 rounded-md  text-[#f2eef7] bg-[#08050c]' type="text" /></p> */}
                  <p className='my-2 text-[#c8adeb] mr-4'>Enter New Password: <input className='ml-1 rounded-md bg-[#08050c] text-[#f2eef7]' type="text" /></p>
                  <p className='my-2 text-[#c8adeb]'>Re-Enter New Password: <input className='ml-1 rounded-md bg-[#08050c] text-[#f2eef7]' type="text" /></p>
                  <div className='mt-5 bg-[#1d1c50] border-2 w-fit px-5 py-2 hover:bg-black rounded-full'>
                    <button className='text-lg'>Change Password</button>
                  </div>
                </div>
            </div>
    </div>
  )
}

export default Pass