import { handleError } from "../Util/Alerts";

const baseURL = import.meta.env.VITE_BACKEND_BASEURL
export async function getPetCount(){
  try{
    const response = await fetch(`${baseURL}/guide/total-count`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",

      }
    })
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to fetch pet count");
    }
    return data.count;
  }
  catch(err){
    // console.error("Error fetching pet count:", err);
    handleError(err);
  }
}

export async function getPets(start = 0) {
  try{
    const response = await fetch(`${baseURL}/guide/pets/${start}`, {
      method:"Get",
      headers:{
        "Content-Type": "application/json",
      }

    });
    const data = await response.json();
    if (!data.success){
      throw new Error(data.message||"Failed to fetch pets");
    }
    return data.pets;
  }
  catch(err) {
    // console.error("Error fetching pets:", err);
    handleError(err);
  }
}

export async function getUniquePetCategories() {
  try {
    const response = await fetch(`${baseURL}/guide/all-categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to fetch pet categories");
    }
    return data.categories;
  } catch (err) {
    // console.error("Error fetching unique pet categories:", err);
    handleError(err);
  }
}

export async function getPetByID(id) {
  try{
    const response = await fetch(`${baseURL}/guide/get-pet/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to fetch pet by ID");
    }
    return data.pet;
  }
  catch(err){
    // console.error("Error fetching pet by ID:", err);
    handleError(err);
  }
}

export async function getPetByCategory(category) {
  try{
    const response = await fetch(`${baseURL}/guide/get-pet-by-category`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({categories: category})
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to fetch pets by category");
    }
    return data.pets;
  }
  catch(err){
    // console.error("Error fetching pets by category:", err);
    handleError(err);
  }

}