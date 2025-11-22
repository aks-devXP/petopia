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
export async function FacebookLoginAPI(user){
  console.log(user);
  const res = await fetch(`${Base_URL}/auth/facebook-login`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(user)
  })
  return await res.json();
}
export async function SingUpAPI(user){
  // console.log(user);
  return  await fetch(`${Base_URL}/auth/signup`,{
    method:'POST',
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify({user})
  });
}
export async function LoginGenAPI(user,type){
  // console.log(user);
  return fetch(`${Base_URL}/auth/gen-login`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({user,type})
  });
}

export  async  function ContactAPI(contactInfo){
  // console.log(contactInfo.message);
  return fetch(`${Base_URL}/user/contact-us`,{
    method:'POST',
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify(contactInfo)
  });
}

export async function UploadImageAPI(image,public_id){
  // console.log(image);
  const response = await fetch(`${Base_URL}/upload/upload_image`,{
    method:'POST',
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify({image,public_id})
  });
  const data = await response.json();
  // console.log('File uploaded successfully:', data);
  // console.log("UploadedImage Response",response);
  return data;
}