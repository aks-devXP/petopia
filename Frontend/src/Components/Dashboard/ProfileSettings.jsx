import { LucidePen, PencilIcon, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { UpdateProfileInfo } from "../../API/UserAPI";
import { handleError } from "../../Util/Alerts";
import NameHolder from "./NameHolder";

const ProfileSettings = ({ info, petInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [petDetails, setPetDetails] = useState(petInfo || []);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    city: "",
    address: "",
    state: "",
    profilePic: null,
    nameColor: "",
    profileColor: "",
  });
  let petMap = new Map();
  petInfo?.forEach((pet) => {
    petMap.set(pet._id, pet);
  });

  useEffect(() => {
    setFormValues({
      name: info?.name || "",
      email: info?.email || "",
      city: info?.city || "",
      address: info?.address || "",
      state: info?.state || "",
      profilePic: info?.profilePic || null,
      nameColor: info?.nameColor || "",
      profileColor: info?.profileColor || "",
    });
    setPetDetails(petInfo || []);
  }, [info, petInfo]);
  // console.log("Color", formValues.profileColor);
  // Calling Backend to update profile data
  // const [result1,result2] = useQueries({
  //   queries:[{
  //     queryKey: ["userProfile",],
  //     queryFn: UpdateProfileInfo,
  //     enabled:
  //   },{

  //   }]
  // })
  console.log("Profile Info", info);
  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePetChange = (index, field, value) => {
    const updatedPets = [...petDetails];
    updatedPets[index] = { ...updatedPets[index], [field]: value };
    setPetDetails(updatedPets);
  };

  const handleAddPet = () => {
    setPetDetails([
      ...petDetails,
      { petName: "", petCategory: "", petBreed: "", petAge: "" },
    ]);
  };

  const handleRemovePet = (index) => {
    const updatedPets = [...petDetails];
    updatedPets.splice(index, 1);
    setPetDetails(updatedPets);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsEditing(false);

    // Updating Profile Data
    const updatedProfile = {
      ...formValues,
    };
    console.log("Updated Profile", updatedProfile);

    // Call the API to update the profile
    const response =  await UpdateProfileInfo(updatedProfile);
    if (!response.success) {
      handleError(response.message);
    }
    console.log("Profile Updated", response);

    // Pet Details
    // New Pet Details
    const newPets = petDetails.filter((pet) => {
      if (!pet._id) {
        return true;
      }
      return false;
    });
    console.log("New Pets", newPets);
    // Call the API to create new pets

    // Updated Pet Details
    const updatedPets = petDetails.filter((pet) => {
      if (pet._id) {
        return true;
      }
      return false;
    });
    console.log("Updated Pets", updatedPets);
    for (let i = 0; i < updatedPets.length; i++) {
      const pet = updatedPets[i];
      const oldPet = petMap.get(pet._id);
      // check if the data is updated or not
      if (
        pet.petName !== oldPet.petName ||
        pet.petCategory !== oldPet.petCategory ||
        pet.petBreed !== oldPet.petBreed ||
        pet.petAge !== oldPet.petAge
      ) {
        console.log("Updated Pet", pet);
      }
    }
  };

  return (
    <>

    
      {isEditing ? (
        <UpdateDetails
          formValues={formValues}
          onchangeHandler={onchangeHandler}
          handleFileChange={handleFileChange}
          setProfilePic={setProfilePic}
          setFormValues={setFormValues}
          profilePic={profilePic}
          handleSave={handleSave}
          petDetails={petDetails}
          handleAddPet={handleAddPet}
          handleRemovePet={handleRemovePet}
          handlePetChange={handlePetChange}
        />
      ) : (
        <ViewDetails
          data={formValues}
          petDetails={petDetails}
          onEdit={() => setIsEditing(true)}
        />
      )
    }
      
    </>
  );
};

export default ProfileSettings;

// UpdateDetails Component
const UpdateDetails = ({
  formValues,
  onchangeHandler,
  handleFileChange,
  setProfilePic,
  profilePic,
  handleSave,
  setFormValues,
  petDetails,
  handleAddPet,
  handleRemovePet,
  handlePetChange,
}) => {
  const [profileColor, setProfileColor] = useState(formValues.profileColor);
  const [nameColor, setNameColor] = useState(formValues.nameColor);
  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      profileColor: profileColor,
      nameColor: nameColor,
    }));
    console.log("Profile Color", profileColor);
  }, [profileColor, nameColor]);

  return (
    <div className="bg-[#111111] bg-opacity-50 text-[#E5E5CB] p-8 pt-0 min-h-screen">
      <div className="mb-12">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium mb-1">Profile</h2>
          <PencilIcon size={16} />
        </div>
        <p className="text-sm text-[#E5E5CB]/50 mb-6">
          Set your account details
        </p>

        <div className="w-full lg:justify-start flex justify-center items-center mt-6 lg:mt-0 py-4">
          <div className="flex items-center flex-col">
            {profilePic ? (
              <div>
                <div className="w-32 h-32 rounded-full bg-[#e5d6c5] flex items-center justify-center overflow-hidden">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2 flex justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileInput"
                  />
                  <label
                    htmlFor="fileInput"
                    className="bg-[#3C2A21] text-sm border rounded-full px-3 py-1 text-gray-300 mr-2 cursor-pointer"
                  >
                    Edit
                  </label>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setProfilePic(null);
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <NameHolder
                firstName={formValues.name.split(" ")[0]}
                lastName={formValues.name.split(" ")[1]}
                isEditable={true}
                initialColor={profileColor}
                setprofileColor={setProfileColor}
              />
            )}
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full lg:w-3/4 pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-[#E5E5CB]/50 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formValues.name || ""}
                  onChange={onchangeHandler}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-[#E5E5CB]"
                />
              </div>
              {/* <div>
                <label className="block text-sm text-[#E5E5CB]/50 mb-1">
                  Surname
                </label>
                <input
                  type="text"
                  name="surname"
                  value={formValues.surname || ""}
                  onChange={onchangeHandler}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-[#E5E5CB]"
                />
              </div> */}
            </div>
            <div>
              <label className="block text-sm text-[#E5E5CB]/50 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formValues.email || ""}
                onChange={onchangeHandler}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-[#E5E5CB]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-lg font-medium mb-1">Pet Details</h2>
        <p className="text-sm text-[#E5E5CB]/50 mb-6">
          Let us know more about your friend
        </p>
        {petDetails?.map((pet, index) => (
          <div key={index} className="flex flex-col gap-6 mb-4">
            <div className="flex gap-4">
              {["name", "category", "breed", "age"].map((field) => (
                <div key={field} className="w-[24%]">
                  <label className="block text-sm text-[#E5E5CB]/50 mb-1">
                    {field.replace("pet", "")}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={pet[field] || ""}
                    onChange={(e) =>
                      handlePetChange(index, field, e.target.value)
                    }
                    required
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-[#E5E5CB]"
                  />
                </div>
              ))}
              <div className="w-[4%] pt-7 pl-2">
                <button onClick={() => handleRemovePet(index)}>
                  <Trash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-start mt-4">
          <button
            onClick={handleAddPet}
            className="bg-[#3C2A21] hover:bg-[#513529] text-sm border rounded-full px-4 py-2 text-gray-300"
          >
            Add Pet
          </button>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center mb-1">
          <h2 className="text-lg font-medium">Location</h2>
        </div>
        <p className="text-sm text-[#E5E5CB]/50 mb-6">
          Calibrate your results based on your locality
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["address", "city", "state"].map((field) => (
            <div key={field}>
              <label className="block text-sm text-gray-400 mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                value={formValues[field] || ""}
                onChange={onchangeHandler}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-white"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 transition px-6 py-2 rounded text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
};

// Component TO Show Pet Details
const ViewDetails = ({ data, onEdit, petDetails }) => {
  // const { name ,profileColor, email, profilePic, address, city, state } = data;
  // const [profileColor, setProfileColor] = useState("");
  const [profileColor, setProfileColor] = useState(data.profileColor);
  console.log("Profile Color", profileColor);
  useEffect(() => {
    setProfileColor(data.profileColor);
  }, [data.profileColor]);
  return (
    <div className="bg-[#111111] bg-opacity-50 text-[#E5E5CB] p-8 pt-0 min-h-screen">
      {/* Profile Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-lg font-medium mb-1">Profile</p>
            <p className="text-sm text-[#E5E5CB]/50 mb-6">
              Your account details
            </p>
          </div>

          <div className="flex items-center justify-end mb-1">
            <button onClick={onEdit}>
              {" "}
              <LucidePen />
            </button>
          </div>
        </div>
        <div className="w-full lg:justify-start flex justify-center items-center mt-6 lg:mt-0 py-4">
          <div className="flex items-center flex-col">
            {data.profilePic ? (
              <div className="w-32 h-32 rounded-full bg-[#e5d6c5] flex items-center justify-center overflow-hidden">
                <img
                  src={data.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              profileColor && (
                <NameHolder
                  firstName={data.name.split(" ")[0]}
                  lastName={data.name.split(" ")[1]}
                  isEditable={false}
                  initialColor={profileColor}
                />
              )
            )}
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full lg:w-3/4 pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-[#E5E5CB]/50 mb-1">
                  Name
                </label>
                <div className="p-2 text-[#E5E5CB]">{data.name}</div>
              </div>
              {/* <div>
                <label className="block text-sm text-[#E5E5CB]/50 mb-1">
                  Surname
                </label>
                <div className="p-2 text-[#E5E5CB]">{surname}</div>
              </div> */}
            </div>

            <div>
              <label className="block text-sm text-[#E5E5CB]/50 mb-1">
                Email
              </label>
              <div className="p-2 text-[#E5E5CB]">{data.email}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pet Details */}

      <div className="mb-12">
        <h2 className="text-lg font-medium mb-1">Pet Details</h2>
        <p className="text-sm text-[#E5E5CB]/50 mb-6">
          Details about your friend
        </p>
        {petDetails ? (
          petDetails.map((pet, index) => (
            <div className="flex gap-4 mb-4" key={index}>
              <div className="w-[24%]">
                <label className="block text-sm text-[#E5E5CB]/50 mb-1">
                  Name
                </label>
                <div className="p-2 text-[#E5E5CB]">{pet.name}</div>
              </div>

              <div className="w-[24%]">
                <label className="block text-sm text-[#E5E5CB]/50 mb-1">
                  Category
                </label>
                <div className="p-2 text-[#E5E5CB]">{pet.category}</div>
              </div>

              <div className="w-[24%]">
                <label className="block text-sm text-[#E5E5CB]/50 mb-1">
                  Breed
                </label>
                <div className="p-2 text-[#E5E5CB]">{pet.breed}</div>
              </div>

              <div className="w-[24%]">
                <label className="block text-sm text-[#E5E5CB]/50 mb-1">
                  Age
                </label>
                <div className="p-2 text-[#E5E5CB]">{pet.age}</div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-[#E5E5CB]/50 mb-6">
            Tell us more about your friend
          </p>
        )}
      </div>

      {/* Location */}
      {data.address || data.city || data.state ? (
        <div className="mb-12">
          <h2 className="text-lg font-medium mb-1">Location</h2>
          <p className="text-sm text-[#E5E5CB]/50 mb-6">Locality details</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.address ? (
              <div>
                <label className="block text-sm text-[#E5E5CB]/50 mb-1">
                  Address
                </label>
                <div className="p-2 text-[#E5E5CB]">{data.address}</div>
              </div>
            ) : (
              <p>Let us know your address to get more customized services</p>
            )}
            {data.city && (
              <div>
                <label className="block text-sm text-[#E5E5CB]/50 mb-1">
                  City
                </label>
                <div className="p-2 text-[#E5E5CB]">{data.city}</div>
              </div>
            )}
            {data.state && (
              <div>
                <label className="block text-sm text-[#E5E5CB]/50 mb-1">
                  State
                </label>
                <div className="p-2 text-[#E5E5CB]">{data.state}</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-sm text-[#E5E5CB]/50 mb-6">
          Tell us your address to get more customized services
        </p>
      )}
    </div>
  );
};
