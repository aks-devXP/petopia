const baseUrl = "http://localhost:3456";

export async function LoginAPI(user){
  console.log(user);
  return fetch(`${baseUrl}/auth/login`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(user)
  });
}

export async function SingUpAPI(user){
  console.log(user);
  return fetch(`${baseUrl}/auth/signup`,{
    method:'POST',
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify(user)
  });
}
export  async  function ContactAPI(contactInfo){
  console.log(contactInfo.message);
  return fetch(`${baseUrl}/user/contact-us`,{
    method:'POST',
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify(contactInfo)
  });
}