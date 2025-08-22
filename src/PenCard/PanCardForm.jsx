import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PanCardForm() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    fathersName: "",
    photo: null,
    signature: null,
    panNo: "",
  });

  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/pan-card/generator", { state: formData }); // 📤 send data
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg border"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Pan Card Details
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            required
          />
        </div>


        {/* Fathers Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Fathers Name
          </label>
          <input
            type="text"
            name="fathersName"
            value={formData.fathersName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            placeholder="Enter father's name"
          />
        </div>

        {/* DOB */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            required
          />
        </div>

        {/* Photo */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Upload Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg cursor-pointer bg-gray-50"
            required
          />
        </div>

        {/* signature */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Upload signature</label>
          <input
            type="file"
            name="signature"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg cursor-pointer bg-gray-50"
            required
          />
        </div>

        {/* pan No */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Aadhaar Number</label>
          <input
            type="text"
            name="panNo"
            placeholder="Enter Pan No"
            value={formData.panNo}
            onChange={handleChange}
            maxLength="10"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default PanCardForm