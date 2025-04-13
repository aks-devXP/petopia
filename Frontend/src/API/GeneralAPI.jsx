
export async function LoginAPI(user){
  console.log(user);
  return fetch(`/api/auth/login`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(user)
  });
}
export async function GoogleLoginAPI(user){
  console.log(user);
  const res = await  fetch(`/api/auth/google-login`,{
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
  return  await fetch(`/api/auth/signup`,{
    method:'POST',
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify(user)
  });
}
export  async  function ContactAPI(contactInfo){
  console.log(contactInfo.message);
  return fetch(`/api/user/contact-us`,{
    method:'POST',
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify(contactInfo)
  });
}