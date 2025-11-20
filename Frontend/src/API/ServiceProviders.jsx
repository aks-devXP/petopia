import * as GroomerApi from './GroomerAPI';
import * as TrainerApi from "./TrainerAPI";
import * as VetApi from "./VetAPI";

export async function getProviders(params) {
  try {

    if(!params.type){
      throw new Error("Service Provider's Type is required");
    }
    const type = String(params.type).toLowerCase();
    if(type==="vet"){
      return await VetApi.getVets(params);
    }
    else if(type==="groomer"){
      return await GroomerApi.getGroomers(params);
    }
    else if(type==="trainer"){
      return await TrainerApi.getTrainers(params);
    }
    else{
      throw new Error("Invalid Service Provider");
    }
  } 
  catch (error) {
    throw new Error(error);
  }
}
export async function getProviderById(params) {
  try {
    const {type, id,...rest}= params;
    if(!type){
      throw new Error("Service Provider's Type is required");
    }
    if(!id){
      throw new Error("Service Provider's ID is required");
    }
    const providerType = String(type).toLowerCase();
    if(providerType==="vet"){
      return await VetApi.getVetById(id);
    }
    else if(providerType==="trainer"){
      return await TrainerApi.getTrainerByID(id);
    }
    else if(type === "groomer"){
      return await GroomerApi.getGroomerByID(id);
    }
    else{
      throw new Error("Invalid Service Provider");
    }
  } 
  catch (error) {
    throw new Error(error.message||"Unable to fetch the Service Provider by ID");
  }
}

export async function getProvidersCategories(params={}) {
  try{
    const {type,...rest}=params;
    // console.log(params);
    if(!type){
      throw new Error("Service Providers Type is required");

    }
    if(type==="vet"){
      return await VetApi.getAllCategories();
    }
    else if(type==="trainer"){
      return await TrainerApi.getCategories();
    }
    else if(type==="groomer"){
      return await GroomerApi.getCategories();
    }
    else{
      throw new Error("Invalid Service Provider");
    }
  }
  catch(error){
    throw new Error(error.message||`Unable to fetch the Categories of ${params.type}`)
  }
}