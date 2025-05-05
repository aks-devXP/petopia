import React from 'react';
import User from '../Components/Dashboard/ProfileSettings';

const ProfileRouting = (props) => {
  const type = localStorage.getItem("userAuth")
  if(type === 'user'){
    return <User  />
  }
  else if(type === 'vet'){
    return 
  }
  
  return (
    <div>
      No Profile Found
    </div>
  )
}

export default ProfileRouting
