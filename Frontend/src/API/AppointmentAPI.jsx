
const baseUrl = import.meta.env.VITE_BACKEND_BASEURL;

export async function getAppointmentsById(params) {
  try {
    const response = await fetch(`${baseUrl}/appointment/by-id/${params.id}`,{
    method:"GET",
    headers:{
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem("token")}`,
      "Accept": "application/json",
    }
    });
    const payload = response.json();
    if(!payload.success){
    throw new Error(payload.message||'Failed to fetch the targeted appointment');
    }
    return payload.data;
  }
  catch (error) {
    throw new Error(error.message);
  }
}


export async function getAppointmentsByUser() {
  try {
    const response = await fetch(`${baseUrl}/appointment/by-user`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`${localStorage.getItem("token")}`,
        "Accept": "application/json",
      }
    });

    const payload = await response.json();
    if(!payload.success){
      throw new Error(payload.message||'Failed to fetch the appointments list');

    }
    console.log(payload);
    return payload.data;
  
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createAppointment(params) {
  try {
    const response = await fetch(`${baseUrl}/appointment/create`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`${localStorage.getItem("token")}`,
        "Accept": "application/json",
      },
      body:JSON.stringify(params)
    });
    // if(!response.ok){
    //   const errPayload = await response.json();
    //   handleError(errPayload.message||`Request failed with ${response.status}`);
    // }
    const payload = await response.json();
    if(!payload.success){
      throw new Error(payload.message||'Failed to create appointment');
    }
    return payload;  
  } 
  catch (error) {
    throw new Error(error.message);
    
  }

}
export async function updateAppointment(params) {
  try {
    const response = await fetch(`${baseUrl}/appointment/update/${params.id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`${localStorage.getItem("token")}`,
        "Accept": "application/json",
      },
      body:JSON.stringify(params)
    });

    const payload = await response.json();
    if(!payload.success){
      throw new Error(payload.message||'Failed to update appointment');
    }
    return payload.data;  
  }
  catch (error) {   
    throw new Error(error.message);
  }
  
}
