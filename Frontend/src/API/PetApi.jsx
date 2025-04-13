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

export async function CreatePet(pet) {
  try {
    const response = await fetch(`${baseUrl}/pet/create-pet`, {
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
    // console.log("Pet Created", data);
    return data;
  } catch (error) {
    handleError(error.message);
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

