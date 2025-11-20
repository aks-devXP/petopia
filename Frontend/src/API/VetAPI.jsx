import { handleError } from "../Util/Alerts";

const baseUrl = import.meta.env.VITE_BACKEND_BASEURL;

const getVets = async (params) => {
  try{
    const {name,city,categories=[], ...rest} =  params;
    const mode = "any";
    const query = new URLSearchParams();
    
    query.set("mode",mode);
    if(name){
      query.set("name",name);
    }
    if(city){
      query.set("city",city);
    }
    if(categories.length>0){
      query.set("facilities",categories.join(','));
    }
    console.log(categories);
    const response = await fetch(`${baseUrl}/vet/all-data?${query.toString()}`,{
      method:"GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    // console.log(response)
    
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    return data.data;
  }
  catch (error){
    throw new Error(error.message || "Failed to fetch vets");
  }
}

const getAllCategories= async ()=>{
  try {
    const resp = await fetch(`${baseUrl}/vet/categories`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
      },
    });
    if(!resp.ok){
      throw new Error(`${resp.status}:${resp.statusText}`)
    }
    const payload = await resp.json();
    if(!payload.success){
      throw new Error(payload.message);
    }
    return payload.data;
  } 
  catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

const getVetById = async (id) =>  {
  try {
    console.log(id)
    // ${baseUrl}
    const response = await fetch(`${baseUrl}/vet/data/${id}`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });
    // console.log(response)
    const data = await response.json();
    // console.log(await data.data)

    return data.data;
  } catch (error) {
    handleError(error);
  }
};
const getVetByEmail = async (email) =>  {
  try {
    const response = await fetch(`${baseUrl}/vet/data-email/${email}`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `${localStorage.getItem("token")}`,
      }
    });
    const data = await response.json();
    return data.vet;
  } catch (error) {
    handleError(error);
  }
}

export { getAllCategories, getVetByEmail, getVetById, getVets };

