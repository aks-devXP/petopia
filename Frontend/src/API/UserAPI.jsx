const baseUrl = "http://localhost:3456";

export async function GetProfileInfo(){
  return fetch(`http://localhost:3456/user/profile-info`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem("token")}`,
    },
  })
}