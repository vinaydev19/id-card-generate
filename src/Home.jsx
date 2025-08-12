import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-10">ID Card Services</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

                {/* Aadhaar Card */}
                <Link to="/aadhaar-card">
                    <div className="group bg-white shadow-lg rounded-2xl p-6 w-64 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="text-blue-500 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 .341-.034.676-.098 1H9.5a1.5 1.5 0 01-1.5-1.5V8.098C8.324 8.034 8.659 8 9 8h3c.341 0 .676.034 1 .098V9a1.5 1.5 0 01-1.5 1.5h-.402z" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">Aadhaar Card</h2>
                        <p className="text-gray-500 text-sm mt-2">Generate or manage Aadhaar details easily.</p>
                    </div>
                </Link>

                {/* PAN Card */}
                <Link to="/pan-card">
                    <div className="group bg-white shadow-lg rounded-2xl p-6 w-64 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="text-green-500 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">PAN Card</h2>
                        <p className="text-gray-500 text-sm mt-2">Apply or check your PAN card details quickly.</p>
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default Home;
