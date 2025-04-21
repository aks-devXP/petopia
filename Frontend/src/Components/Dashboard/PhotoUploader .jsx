import { Plus, X } from 'lucide-react';
import React, { useRef, useState } from 'react';

const PhotoUploader = ({ 
  maxImages = 4, 
  onImagesChange ,
  initialImages = ["https://res.cloudinary.com/dvjcvwp61/image/upload/v1745052225/cld-sample.jpg","https://res.cloudinary.com/dvjcvwp61/image/upload/v1745052217/samples/animals/three-dogs.jpg"]
}) => {
  const [selectedImages, setSelectedImages] = useState(initialImages);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    
    // Filter out invalid files and limit to remaining slots
    const validNewImages = files
      .filter(file => 
        ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
      )
      .slice(0, maxImages - selectedImages.length);

    // Convert new images to base64
    const newImagePromises = validNewImages.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    // Process new images
    Promise.all(newImagePromises)
      .then(newBase64Images => {
        const updatedImages = [
          ...selectedImages, 
          ...newBase64Images
        ];
        
        setSelectedImages(updatedImages);
        
        
          onImagesChange(updatedImages);
          // console.log('Updated Images:', updatedImages);
      })
      .catch(error => {
        console.error('Image upload error:', error);
      });
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = selectedImages.filter((_, index) => index !== indexToRemove);
    
    setSelectedImages(updatedImages);
    
    // Optional: Callback to parent component
    if (onImagesChange) {
      onImagesChange(updatedImages);
    }
  };

  const triggerFileInput = () => {
    if (selectedImages.length < maxImages) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Image Gallery */}
      <div className="flex items-center space-x-4">
        {/* Existing Selected Images */}
        {selectedImages.map((image, index) => (
          <div 
            key={index} 
            className="relative w-24 h-24 rounded-lg"
          >
            <img 
              src={image} 
              alt={`Uploaded ${index + 1}`} 
              className="w-full h-full rounded-lg object-cover"
            />
            <button 
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Plus Icon for Adding More Images */}
        {selectedImages.length < maxImages && (
          <div 
            onClick={triggerFileInput}
            className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-all duration-300"
          >
            <Plus className="w-12 h-12 text-gray-500" />
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        multiple
        className="hidden"
      />

      {/* Optional: Remaining Slots Indicator */}
      {selectedImages.length < maxImages && (
        <div className="text-sm text-gray-600">
          {`${maxImages - selectedImages.length} slot${
            maxImages - selectedImages.length !== 1 ? 's' : ''
          } remaining`}
        </div>
      )}
    </div>
  );
};

// // Example Usage
// const ParentComponent = () => {
//   const handleImagesChange = (images) => {
//     // Do something with the images
//     console.log('Updated Images:', images);
//   };

//   return (
//     <div>
//       <h2>Upload Photos</h2>
//       <PhotoUploader 
//         maxImages={4}  // Maximum number of images
//         onImagesChange={handleImagesChange}
//       />
//     </div>
//   );
// };

export default PhotoUploader;