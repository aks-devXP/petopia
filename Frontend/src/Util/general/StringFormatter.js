export async function Service_formatter(serviceList) {
  const formattedServices = serviceList.map((service)=>{
    return service.split('_').map(word=>word.charAt(0).toUpperCase()+word.slice(1).toLowerCase()).join(' ');
  })
  // console.log(formattedServices);
  return formattedServices;
}


