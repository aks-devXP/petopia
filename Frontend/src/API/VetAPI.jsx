import { handleError } from "../Util/Alerts";

const baseUrl = "http://localhost:3456/api/vet";
const getVets = async () => {
  try{
    const response = await fetch(`api/vet/all-data`,{
      method:"GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    return data.vets;
  }
  catch (error){
    handleError(error);
  }
}

const createVet = async ({
  name,
  email,
  rating,
  phone,
  address,
  city,
  state,
  zip,
  profilePic,
  about,
  tenure,
  timings
}) => {
  try {
    const response = await fetch(`api/vet/create-vet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        rating,
        phone,
        address,
        city,
        state,
        zip,
        profilePic,
        about,
        tenure,
        timings
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
  }
};

const getVetById = async (id) =>  {
  try {
    console.log(id)
    // ${baseUrl}
    const response = await fetch(`${baseUrl}/data/${id}`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });
    // console.log(response)
    const data = await response.json();
    // console.log(await data.vet)

    return data.vet;
  } catch (error) {
    handleError(error);
  }
};

export { createVet, getVetById, getVets };

