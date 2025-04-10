import { handleError } from "../Util/Alerts";

const baseUrl = "http://localhost:3456/user";

export async function GetProfileInfo(){
  
  const user = await fetch(`api/user/profile-info`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem("token")}`,
    },
  })
  if (!user.success) {
    handleError(user.message)
  }
  const data = await user.json()
  // console.log("User Profile", await user.json());
  return data.user;

}

export async function UpdateProfileInfo(user){
  return fetch(`api/user/profile-info`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(user)
  })
}

export async function UpdatePassword(user){
  return fetch(`api/user/profile-pass`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(user)
  })
}

