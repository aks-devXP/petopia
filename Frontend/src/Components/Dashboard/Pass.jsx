import React from 'react'

const Pass = () => {
  return (
    <div className='bg-n-6 p-6 rounded-3xl shadow'>
                <h2 className='text-2xl font-semibold mb-6'>Login & Security</h2>
                <div className=''>
                  <p className='my-2'>Enter Your Current Password: <input className='ml-1 rounded-md' type="text" /></p>
                  <p className='my-2'>Enter New Password: <input className='ml-1 rounded-md' type="text" /></p>
                  <p className='my-2'>Re-Enter New Password: <input className='ml-1 rounded-md' type="text" /></p>
                  <div className='mt-5 bg-n-6 border-2 w-fit px-5 py-2 hover:bg-black rounded-full'>
                    <button className='text-lg'>Change Password</button>
                  </div>
                </div>
            </div>
  )
}

export default Pass