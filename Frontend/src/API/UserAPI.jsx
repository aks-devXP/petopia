import { handleError } from "../Util/Alerts";

const baseUrl = import.meta.env.VITE_BACKEND_BASEURL

export async function GetProfileInfo(){
  
  const response = await fetch(`${baseUrl}/user/profile-info`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem("token")}`,
    },
  })
  if (!response.success) {
    handleError(response.message)
  }
  const data = await response.json()
  // console.log("User Profile", await data);
  return data.user;

}

export async function UpdateProfileInfo(user){
  try {
    const response =  await fetch(`${baseUrl}/user/profile-info`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({user})
    })
    const data = await response.json()
    // if (!data.success) {
    //   throw new Error(data.message)
    // }
    // console.log("User Profile Updated", await data);
    return data;
  } catch (error) {
    console.error("Error updating profile:", error)
    handleError(error.message)
    
  }
}

export async function UpdatePassword(user){
  return fetch(`${baseUrl}/user/profile-pass`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(user)
  })
}
// 67f595f06cef232b330c26b5
export async function getAppointments(){
  if(localStorage.getItem("userAuth") === "user"){

  
  const response = await fetch(`${baseUrl}/user/appointment_get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem("token")}`,
    }
  });

  const data = await response.json();

  if (!data.success) {
    // Throwing an error lets React Query catch it in useQuery's error state
    throw new Error(data.message || "Failed to fetch appointments");
  }

  return data.appointments;
}
else{
  const response = await fetch(`${baseUrl}/trainer/appointment_get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem("token")}`,

    },body: JSON.stringify({
      type:localStorage.getItem("userAuth")
    })
    
  });
  const data = await response.json();
  return data.appointments;
}
}

