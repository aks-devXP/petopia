import { handleError } from "../Util/Alerts";

const baseUrl = "http://localhost:3456/api/user";

export async function GetProfileInfo(){
  
  const response = await fetch(`${baseUrl}/profile-info`,{
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
  console.log("User Profile", await data);
  return data.user;

}

export async function UpdateProfileInfo(user){
  return fetch(`${baseUrl}/profile-info`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(user)
  })
}

export async function UpdatePassword(user){
  return fetch(`${baseUrl}/profile-pass`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(user)
  })
}

