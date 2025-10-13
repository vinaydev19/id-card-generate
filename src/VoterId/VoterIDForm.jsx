import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function VoterIDForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    fullNameTranslated: "",
    fatherName: "",
    fatherNameTranslated: "",
    dob: "",
    gender: "",
    voterId: "",
    address: "",
    addressTranslated: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/voter-id-card/generator", { state: formData });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Voter ID Generator</h2>

        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Full Name (Translated)</label>
          <input
            type="text"
            name="fullNameTranslated"
            value={formData.fullNameTranslated}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Father’s Name</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Father’s Name (Translated)</label>
          <input
            type="text"
            name="fatherNameTranslated"
            value={formData.fatherNameTranslated}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="">Select</option>
            <option value="Male">Male / पुरुष</option>
            <option value="Female">Female / महिला</option>
            <option value="Other">Other / अन्य</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Voter ID Number</label>
          <input
            type="text"
            name="voterId"
            value={formData.voterId}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            maxLength={10}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            rows="2"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Address (Translated)</label>
          <textarea
            name="addressTranslated"
            value={formData.addressTranslated}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            rows="2"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Generate Voter ID
        </button>
      </form>
    </div>
  );
}

export default VoterIDForm;
