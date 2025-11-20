import { handleError } from "../Util/Alerts";
const baseUrl = import.meta.env.VITE_BACKEND_BASEURL


export async function GetPets ()  {
  try {
    const response = await fetch(`${baseUrl}/pet/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    // console.log("Pet Data", await data.petInfo);
    return data.petInfo;
  }
  catch (error) {
    handleError(error.message);
  }
}

export async function GetAdoptionPets(city) {
  try {
    const params = city ? `?city=${encodeURIComponent(city)}` : ''
    const response = await fetch(`${baseUrl}/adoption/public${params}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch pets')
    }
    return data.pets
  } catch (error) {
    handleError(error.message)
  }
}

export async function CreateAdoptionPet(pet) {
  try {
    const response = await fetch(`${baseUrl}/adoption/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(pet),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'Failed to create adoption listing');
    }
    return data;
  } catch (error) {
    handleError(error.message)
  }
}

export async function CreatePet(pet) {
  try {
    console.log("Pet", pet);
    const response = await fetch(`${baseUrl}/pet/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(pet),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    console.log("Pet Created", data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function UpdatePet(pet) {
  try {
    const response = await fetch(`${baseUrl}/pet/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(pet),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    // console.log("Pet Updated", data);
    return data;
  } catch (error) {
    handleError(error.message);
  }
}

export async function DeletePet(petId) {
  try {
    const response = await fetch(`${baseUrl}/pet/delete/${petId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ petId }),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    // console.log("Pet Deleted", data);
    return data;
  } catch (error) {
    handleError(error.message);
  }
}

  export async function UploadPetImage(params) {
    try {
      const field = import.meta.env.VITE_Pofilefield;
      // console.log(field)
      const token = localStorage.getItem("token");
      // console.log(params);
      // Step 1: Delete previous photo (if any)
      if (params.photo||params.imageDeleted) {
        const img = params.photo;
        const deleteResp = await fetch(`${baseUrl}/upload/delete_images`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
          },
          body: JSON.stringify({
            images: [img],
          }),
        });
  
        const deleteData = await deleteResp.json();
        // console.log(deleteData);
        if (!deleteResp.ok || !deleteData.success) {
          throw new Error(deleteData.message || "Failed to delete existing image.");
        }
        if(params.imageDeleted){
          return {success:true, data:[{uri:""}]};
        }
      }
      
      // Step 2: Upload new image (file)
      if (!params.image) {
        throw new Error("No image file provided for upload.");
      }
  
      const formData = new FormData();
      formData.append(field, params.image); 
      formData.append("folder", "Pets");
      formData.append("fieldName", field)
  
      const uploadResp = await fetch(`${baseUrl}/upload/m_images`, {
        method: "POST",
        headers: {
          "Authorization": `${token}`,
          // NOTE: don't set Content-Type here — browser handles it for FormData
        },
        body: formData,
      });
  
      const uploadData = await uploadResp.json();
      if (!uploadResp.ok || !uploadData.success) {
        throw new Error(uploadData.message || "Failed to upload new image.");
      }
  
      // Step 3: Return uploaded image URL(s)
      return uploadData;
    } catch (error) {
      // console.error("UploadPetImage error:", error);
      throw new Error(error.message || "Failed to upload pet image.");
    }
  }