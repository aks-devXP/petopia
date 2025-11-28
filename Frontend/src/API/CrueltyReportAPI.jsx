const baseUrl = import.meta.env.VITE_BACKEND_BASEURL;

export async function createReport(params) {
  try {
    
    const response = await fetch(`${baseUrl}/ngo/create-report`,
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
          photo_url: params.photoURLS||[],
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
export async function uploadEvidence({ photos }) {
  try {
    const field = import.meta.env.VITE_report_field;   
    const folder = import.meta.env.VITE_report_folder; 

    const formData = new FormData();

    // append each file to the same field name
    (photos || []).forEach((file) => {
      formData.append(field, file);
    });

    formData.append("folder", folder);
    formData.append("fieldName", field);

    const uploadResp = await fetch(`${baseUrl}/upload/upload_report_photos`, {
      method: "POST",
      body: formData,
      // No "Content-Type" header – browser sets correct multipart boundary
    });

    const payload = await uploadResp.json();

    if (!uploadResp.ok || !payload.success) {
      console.log(uploadResp);
      throw new Error(payload.error || "Failed To Upload Photos");
    }

    return payload.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
