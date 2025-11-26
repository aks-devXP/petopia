const baseUrl = import.meta.env.VITE_BACKEND_BASEURL;

export async function createReport(params) {
  try {
    
    const response = await fetch(`${baseUrl}/cruelty-report/create`,
      {
        body:JSON.stringify({
          reporter_name: params.name,
          address: params.address,
          city: params.city,
          reporter_phone: params.phoneNumber,
          reporter_email: params.email,
          animal_location: params.animalLocation,
          animal_city: params.animalCity,
          // can't use date of future
          doi: params.incidentDate,
          description:params.incidentDetails,
          consent: params.consent,
          photo_url: params.photoURLs||[],
        }),
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
      }
    );
    const payload = await response.json();
    if(!payload.success || !response.ok){
      throw new Error(payload.message||`Failed to post cruelty report`);
    }
    return true;
  }
  catch(error){
    throw new Error("Error in posting cruelty report: "+ error.message);
  }
}

export async function uploadEvidence(params) {
  try {
    const field = import.meta.env.VITE_report_field;
    const folder =import.meta.env.VITE_report_folder;
    const formData = new FormData();
    formData.append(field,params.photos);
    formData.append("folder",folder);
    formData.append("field",field);
    // don't need to specify api content type as it will be handled by the call automatically for form data type
    const uploadResp = await fetch(`${baseUrl}/upload/upload_report_photos`,{
      method:"POST"
    });
    const payload = await uploadResp.json();
    if(!uploadResp.ok||!payload.success){
      throw new Error(payload.error||"Failed To Upload Photos");
    }
    return payload.data;
  }  
  catch(error){
    throw new Error(error.message);
  }
}