import { handleError } from "../Util/Alerts";

const baseUrl = "http://localhost:3456/api/vet";
const getVets = async () => {
  try{
    const response = await fetch(`${baseUrl}/all-data`);
    const data = await response.json();
    return data;
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
  tenure
  timings
}) => {
  try {
    const response = await fetch(`${baseUrl}/create-vet`, {
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
        tenure
        timings
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
  }
};

export { createVet, getVets };
