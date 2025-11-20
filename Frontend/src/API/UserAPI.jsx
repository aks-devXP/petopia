import { handleError } from "../Util/Alerts";

const baseUrl = import.meta.env.VITE_BACKEND_BASEURL

export async function GetProfileInfo(){
  
  try {
    const response = await fetch(`${baseUrl}/user/profile-info`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`,
      },
    })
    
    const data = await response.json()
    if (!data.success) {
      throw new Error(response.message);
    }
    // console.log("User Profile", await data);
    return data.user;
  } 
  catch (error) {
      throw new Error(error||"Failed To Fetch User Data")
  }

}

export async function UpdateProfileInfo(user){
  try {
    const response =  await fetch(`${baseUrl}/user/profile-info`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({user})
    })
    const data = await response.json()
    // if (!data.success) {
    //   throw new Error(data.message)
    // }
    // console.log("User Profile Updated", await data);
    return data;
  } catch (error) {
    console.error("Error updating profile:", error)
    handleError(error.message)
    
  }
}

export async function UpdatePassword(user){
  return fetch(`${baseUrl}/user/profile-pass`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(user)
  })
}


export async function UploadUserImage({
  type = "profile",   // "profile" | "banner"
  photo = "",         // existing URL to delete (optional)
  image = null,       // File/Blob to upload (required)
} = {}) {
  try {
    const field = import.meta.env.VITE_Pofilefield;
    const kind = String(type).toLowerCase();
    if (kind !== "profile" && kind !== "banner") {
      throw new Error("Wrong Image Type");
    }

    if (!image) {
      throw new Error("No image file provided.");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Missing auth token.");
    }

    // 1) Delete previous image (if provided)
    if (photo) {
      const deleteResp = await fetch(`${baseUrl}/upload/delete_images`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`,
        },
        body: JSON.stringify({ images: [photo] }),
      });
      const deletedData = await deleteResp.json();
      if (!deleteResp.ok || !deletedData.success) {
        throw new Error(deletedData.message || "Failed to delete existing image.");
      }
    }

    // 2) Upload new image
    const formData = new FormData();
    // If your backend expects "images" as the field name, use that instead of "logo"
    formData.append(field, image);
    formData.append("folder", `Users/${kind}`);
    formData.append("fieldName", field)

    // Only include this if your backend actually uses it:
    // formData.append("fieldName", "logo");

    const uploadResp = await fetch(`${baseUrl}/upload/m_images`, {
      method: "POST",
      headers: {
        "Authorization": `${token}`,
        // do NOT set Content-Type when sending FormData
      },
      body: formData,
    });

    const uploadData = await uploadResp.json();
    if (!uploadResp.ok || !uploadData.success) {
      throw new Error(uploadData.message || "Failed to upload new image.");
    }

    // 3) Return server response (usually contains uploaded URLs)
    return uploadData;
  } catch (error) {
    // Normalize error message
    const msg = (error && error.message) ? error.message : `Failed to upload ${type} image`;
    throw new Error(msg);
  }
}

// 67f595f06cef232b330c26b5
export async function getAppointments(){

  const response = await fetch(`${baseUrl}/user/appointment_get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem("token")}`,
    }
  });

  const data = await response.json();

  if (!data.success) {
    // Throwing an error lets React Query catch it in useQuery's error state
    throw new Error(data.message || "Failed to fetch appointments");
  }

  return data.appointments;


}

