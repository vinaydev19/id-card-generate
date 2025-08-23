import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AadhaarCardForm() {
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        nameTranslated: "",
        gender: "",
        photo: null,
        aadhaar: "",
        vid: "",
        address: "",
        addressTranslated: "",
        language: "",
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
        navigate("/aadhaar-card/generator", { state: formData }); // 📤 send data
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg border"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Aadhaar Card Details
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

                {/* Language Selection */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                        Select Language for Translation
                    </label>
                    <select
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        required
                    >
                        <option value="">Select language</option>
                        <option value="hindi">Hindi</option>
                        <option value="marathi">Marathi</option>
                        <option value="telugu">Telugu</option>
                    </select>
                </div>

                {/* Translated Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                        Full Name (Translated)
                    </label>
                    <input
                        type="text"
                        name="nameTranslated"
                        placeholder="Enter full name"
                        value={formData.nameTranslated}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
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

                {/* Gender */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        required
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
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

                {/* Aadhaar */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Aadhaar Number</label>
                    <input
                        type="text"
                        name="aadhaar"
                        placeholder="12-digit Aadhaar"
                        value={formData.aadhaar}
                        onChange={handleChange}
                        maxLength="12"
                        pattern="\d{12}"
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        required
                    />
                </div>

                {/* VID */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">VID Number</label>
                    <input
                        type="text"
                        name="vid"
                        placeholder="16-digit VID"
                        value={formData.vid}
                        onChange={handleChange}
                        maxLength="16"
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        required
                    />
                </div>

                {/* Address */}
                <div className="mb-1">
                    <label className="block text-gray-700 font-medium mb-1">Address</label>
                    <textarea
                        name="address"
                        placeholder="Enter your address (max 110 characters)"
                        value={formData.address}
                        onChange={handleChange}
                        maxLength="110"
                        rows="4"
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        required
                    ></textarea>
                </div>


                {/* address translated */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-1">Address (Translated)</label>
                    <textarea
                        name="addressTranslated"
                        placeholder="Enter your address (max 110 characters)"
                        value={formData.addressTranslated}
                        onChange={handleChange}
                        maxLength="110"
                        rows="4"
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        required
                    ></textarea>
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

export default AadhaarCardForm;
