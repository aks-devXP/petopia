const baseURL = import.meta.env.VITE_BACKEND_BASEURL;


const getTrainers = async (params)=>{
  try {
    const {name,city,categories=[],...rest} = params;
     const mode="any";
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

     const response = await fetch (`${baseURL}/trainer/all-data?${query.toString()}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
      }
     });
     const payload = await response.json();
     if(!payload.success){
      throw new Error(payload.message);
     }
     return payload.data;
  } 
  catch (error) {
    throw new Error(error.message || "Failed To Fetch Trainer Data");
  }

};

const getCategories = async ()=>{
  try {
   const resp = await fetch(`${baseURL}/trainer/getCategories`,{
    method:"GET",
    
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
      }
    }
   );
   const payload = await resp.json();
   if(!payload.success){
    throw new Error(payload.message);

   }
  //  console.log(payload);
   return payload.data;
  }
  catch (error) {
    throw new Error(error.message||"Failed To get Trainer")
  }

}

const  getTrainerByID = async (id)=>{
  try {
    const resp = await fetch(`${baseURL}/trainer/data/${id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
      }
    })
    const payload = await resp.json();
    if(!payload.success){
      throw new Error(payload.message);
    }
    return payload.data;
  } 
  catch (error) {
    throw new Error(error.message||"Failed to fetch Trainer by ID");
  }
}

export { getCategories, getTrainerByID, getTrainers };
