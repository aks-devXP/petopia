exports.isTokenExpired= (token)=>{
  try {
    if(!token) return true;
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    const currentTime = Math.floor(Date.now()/1000) // time upto nearest seconds
    return decodedPayload&&decodedPayload.exp<currentTime;
  } 
  catch (error) {
//  treat malformed token as expired
    return true;
  }
}