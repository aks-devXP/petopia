const cloudinary = require('../Configs/cloudinary');

const uploadToCloudinary = async(Filebuffer,folder="extras")=>{

    return new Promise((resolve,reject)=>{
      const upload_stream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'image',
          transformation: [
            {width:1000, height:1000, crop:"limit"},
            {quality:'auto'},
            {fetch_format:"auto"}//Auto format webp if supported
            
          ]
        },
        (error,result)=>{
          if(error){
            reject(error);

          }
          else{
            resolve(result);
          }
        }
      );
      upload_stream.end(Filebuffer);
    });
  
}
module.exports = uploadToCloudinary;
