
const baseUrl = "http://localhost:3456/user";

export async function GetProfileInfo(){
  
  return fetch(`${baseUrl}/profile-info`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem("token")}`,
    },
  })
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