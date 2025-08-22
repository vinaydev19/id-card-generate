import React from "react";
import { Link } from "react-router-dom";

// ✅ Import your icons (place them in src/assets/)
import aadhaarIcon from "./assets/aadhaar-card-icon.png";
import panIcon from "./assets/pan-card-icon.png";
import voterIcon from "./assets/voter-card-icon.png";

const Home = () => {
  // ✅ Card details array
  const cards = [
    {
      id: "aadhaar",
      title: "Aadhaar Card",
      description: "Generate Aadhaar card details easily.",
      path: "/aadhaar-card",
      color: "text-blue-500",
      icon: aadhaarIcon,
    },
    {
      id: "pan",
      title: "PAN Card",
      description: "Generate Pan card details easily.",
      path: "/pan-card",
      color: "text-green-500",
      icon: panIcon,
    },
    {
      id: "voter",
      title: "Voter Id Card",
      description: "Generate Voter id card details easily.",
      path: "/voter-id-card",
      color: "text-green-500",
      icon: voterIcon,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">ID Card Services</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {cards.map((card) => (
          <Link to={card.path} key={card.id}>
            <div className="group bg-white shadow-lg rounded-2xl p-6 w-64 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="mb-4 flex justify-center">
                <img
                  src={card.icon}
                  alt={`${card.title} Icon`}
                  className="w-12 h-12 mx-auto group-hover:scale-110 transition-transform"
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                {card.title}
              </h2>
              <p className="text-gray-500 text-sm mt-2">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
