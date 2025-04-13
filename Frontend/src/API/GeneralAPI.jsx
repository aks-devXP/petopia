const Base_URL =  import.meta.env.VITE_BACKEND_BASEURL
export async function LoginAPI(user){
  console.log(user);
  return fetch(`${Base_URL}/auth/login`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(user)
  });
}
export async function GoogleLoginAPI(user){
  console.log(user);
  const res = await  fetch(`${Base_URL}/auth/google-login`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(user)
  });
  // console.log(res);
  return res;
}

export async function SingUpAPI(user){
  console.log(user);
  return  await fetch(`${Base_URL}/auth/signup`,{
    method:'POST',
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify(user)
  });
}
export  async  function ContactAPI(contactInfo){
  console.log(contactInfo.message);
  return fetch(`${Base_URL}/user/contact-us`,{
    method:'POST',
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify(contactInfo)
  });
}