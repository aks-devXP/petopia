import { handleError } from "../Util/Alerts";

// const baseUrl = "http://localhost:3456/api/user";

export async function GetProfileInfo(){
  
  const response = await fetch(`/api/user/profile-info`,{
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
    const response =  await fetch(`/api/user/profile-info`,{
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
  return fetch(`/api/user/profile-pass`,{
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
  const response = await fetch(`/api/user/appointment_get`, {
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

