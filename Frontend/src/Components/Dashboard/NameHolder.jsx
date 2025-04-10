import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
const NameHolder = ({ 
  firstName = "", 
  lastName = "", 
  isEditable = false,
  initialColor = "#6366f1",
  size = "xl" ,
  setprofileColor = () => {}
}) => {
  const [color, setColor] = useState(initialColor);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [ButtonText, setButtonText] = useState("Change Color")
  
  // Get initials from first and last name
  const getInitials = () => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };
  
  
  // Size classes
  const sizeClasses = {
    sm: "w-16 h-16 text-lg",
    md: "w-24 h-24 text-xl",
    lg: "w-32 h-32 text-2xl",
    xl: "w-40 h-40 text-3xl"
  };
  
  // Handle color change from color picker
  const handleColorChange = (colorResult) => {
    setColor(colorResult.hex);
    setprofileColor(colorResult.hex);
  };
  const handleButtonClick = () => {
    setShowColorPicker(!showColorPicker);
    setButtonText(showColorPicker ? "Change Color" : "Close Color Picker");
  }

  
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Avatar Circle */}
      <div 
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-semibold text-white`}
        style={{ backgroundColor: color }}
      >
        {getInitials()}
      </div>
      
      {/* Edit Controls */}
      {isEditable && (
        <div className="flex flex-col items-center gap-2">
          {/* Change Background Button */}
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            onClick={() => handleButtonClick()}
          >
            {ButtonText}
          </button>
          
          {/* React Color Picker */}
          {showColorPicker && (
            <div className="relative z-10">
              <div className="absolute mt-2">
                <SketchPicker
                  color={color}
                  onChangeComplete={handleColorChange}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NameHolder;