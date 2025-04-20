import React from 'react'

const ProfileRouting = () => {
  const type = localStorage.getItem("userAuth")
  if(type === 'user'){
    return import('./UserProfile')
  }
  else if(type === 'vet'){
    return import('./VetProfile')
  }
  
  return (
    <div>
      No Profile Found
    </div>
  )
}

export default ProfileRouting
