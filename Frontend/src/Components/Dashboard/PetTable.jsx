import React, { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { ImCross } from "react-icons/im";



const PetTable = () => {
  const [pets, setPets] = useState([
    { id: 1, name: "Buddy",animal: "Dog", breed: "Golden Retriever" },
    { id: 2, animal: "Dog", name: "Luna", breed: "Siberian Husky" }
  ]);

  const [newPet, setNewPet] = useState({ name: "", breed: "", animal: "" });

  const handleAddPet = () => {
    if (newPet.name && newPet.breed) {
      setPets([...pets, { id: Date.now(), ...newPet }]);
      setNewPet({ name: "", breed: "" }); // Clear input fields
    }
  };

  const handleUpdatePet = (id) => {
    const updatedName = prompt("Enter new pet name:");
    const updatedBreed = prompt("Enter new breed type:");
    if (updatedName && updatedBreed) {
      setPets(pets.map((pet) => (pet.id === id ? { ...pet, name: updatedName, breed: updatedBreed } : pet)));
    }
  };

  const handleRemovePet = (id) => {
    setPets(pets.filter((pet) => pet.id !== id));
  };

  return (
    <div className="p-4 text-sm font-light">
      <h2 className="text-lg font-bold mb-4">My Pets</h2>
      <table className="w-full border-collapse border-gray-300">
        <thead>
          <tr className="">
            <th className="border border-gray-300 px-4 py-2 font-normal text-n-2
            
            ">Pet Name</th>
            <th className="border border-gray-300 px-4 py-2 font-normal">Animal</th>
            <th className="border border-gray-300 px-4 py-2 font-normal">Breed Type</th>
            <th className="border border-gray-300 px-4 py-2 font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{pet.name}</td>
              <td className="border border-gray-300 px-4 py-2">{pet.animal}</td>
              <td className="border border-gray-300 px-4 py-2">{pet.breed}</td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button className="bg-blue-500 hover:bg-blue-800 text-white px-2 py-1 rounded" onClick={() => handleUpdatePet(pet.id)}><TiEdit/></button>
                <button className="bg-red-500 text-white px-2 py-1 hover:bg-red-800 rounded" onClick={() => handleRemovePet(pet.id)}><ImCross/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add New Pet Section */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Pet Name"
          value={newPet.name}
          onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
          className="border p-2 rounded"
        />

        <select
            placeholder="Animal"
            value={newPet.animal}
            onChange={(e) => setNewPet({ ...newPet, animal: e.target.value })}
            className="border p-2 rounded"
        >
            <option selected value="">Animal Type</option>
            <option  value="Dog">Dog</option>
            <option value="Cat">Cat</option>
        </select>

        <input
          type="text"
          placeholder="Breed Type"
          value={newPet.breed}
          onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
          className="border p-2 rounded"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAddPet}>
          Add Pet
        </button>
      </div>
    </div>
  );
};

export default PetTable;
