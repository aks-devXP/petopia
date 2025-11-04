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
