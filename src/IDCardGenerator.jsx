import React, { useRef, useState } from 'react';
import govlogo from "./assets/Emblem_of_India.svg";
import aadhaarlogo from "./assets/Daco_232542.png";
import photo from "./assets/slider-3.jpg";
import telephone from "./assets/old-typical-phone.png";
import mail from "./assets/mail.png";
import internet from "./assets/globe.png";
import front from "./assets/front.png";
import back from "./assets/back.png";
import qrcode from "./assets/qrcode.png";
import './IDCardGenerator.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';


function IDCardGenerator() {
    const cardRef = useRef();

    const location = useLocation();
    const data = location.state;

    console.log(data);


    // 📸 Download as Image
    const handleDownloadImage = async () => {
        const element = cardRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const data = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = data;
        link.download = "Aadhaar_Card.png";
        link.click();
    };

    // 📄 Download as PDF
    const handleDownloadPDF = async () => {
        const element = cardRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("landscape", "mm", "a4");
        const imgWidth = 280; // Fit to A4 width
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save("Aadhaar_Card.pdf");
    };

    return (
        <div className="idcard-container">
            {/* Buttons */}
            <div className="button-group">
                <button onClick={handleDownloadImage} className="btn btn-blue">
                    Download as Image
                </button>
                <button onClick={handleDownloadPDF} className="btn btn-green">
                    Download as PDF
                </button>
            </div>

            <div ref={cardRef}>
                {/* Card Wrapper */}
                <div className="card-wrapper">
                    {/* Front Side */}
                    <div className="card-front">
                        <div className="header">
                            <img src={govlogo} alt="Gov Logo" className="logo" />
                            <img src={front} alt="Government of India" className="title-img" />
                            <img src={aadhaarlogo} alt="Aadhaar Logo" className="logo" />
                        </div>

                        <div className="photo-section">
                            <div className="photo-wrapper">
                                <div className="vertical-text">Aadhaar no. issued: 20/06/2013</div>
                                <div className="photo-box">
                                    {data?.photo ? (
                                        <img src={URL.createObjectURL(data.photo)} alt="User" className="photo" />
                                    ) : null}
                                </div>
                            </div>

                            <div className="details">
                                <p>{data?.nameTranslated}</p>
                                <p>{data?.name}</p>
                                <p>Date of Birth: {data?.dob ? new Date(data.dob).toLocaleDateString("en-GB") : ""}</p>
                                <p>Male/ {data?.gender}</p>
                                <div className="note">
                                    <p><strong>आधार पहचान का प्रमाण है, नागरिकता या जन्मतिथि का नहीं।</strong> इसका उपयोग सत्यापन (ऑनलाइन प्रमाणीकरण, या क्यूआर कोड / ऑफ़लाइन एक्सएमएल की स्कैनिंग) के साथ किया जाना चाहिए।</p>
                                    <p><strong>Aadhaar is proof of identity, not of citizenship or date of birth.</strong> It should be used with verification (online authentication, or scanning of QR code / offline XML).</p>
                                </div>
                            </div>
                        </div>


                        <div className="number">
                            {String(data?.aadhaar).replace(/(\d{4})(?=\d)/g, '$1 ')}
                        </div>
                        <div className="red-line"></div>
                        <div className='slogan-line'>
                            <div className="black-text">मेरा <span className="slogan">आधार</span>, मेरी पहचान</div>
                        </div>
                    </div>

                    {/* Middle Divider */}
                    <div className="divider"></div>

                    {/* Back Side */}
                    <div className="card-back">
                        <div className="header">
                            <img src={govlogo} alt="Gov Logo" className="logo" />
                            <img src={back} alt="Government of India" className="title-img" />
                            <img src={aadhaarlogo} alt="Aadhaar Logo" className="logo" />
                        </div>

                        <div className="address-section">
                            <div className="address">
                                <p>Address:</p>
                                <p>{data?.address}</p>
                            </div>
                            <div className="qrcode-box">
                                <QRCodeSVG
                                    value={JSON.stringify(data)} // QR Code contains all Aadhaar data
                                    size={80}
                                    level="H"
                                    className="qrcode"
                                />
                            </div>
                        </div>

                        <div className="number">
                            {String(data?.aadhaar).replace(/(\d{4})(?=\d)/g, '$1 ')}
                        </div>
                        <div className="dot-line"></div>
                        <div className="vid">VID: {String(data?.vid).replace(/(\d{4})(?=\d)/g, '$1 ')}</div>
                        <div className="red-line"></div>

                        <div className="contact">
                            <div className="contact-item">
                                <img src={telephone} alt="Phone" className="icon" />
                                <span className="bold">1947</span>
                            </div>
                            <div className="separator"></div>
                            <div className="contact-item">
                                <img src={mail} alt="Mail" className="icon" />
                                <span>help@uidai.gov.in</span>
                            </div>
                            <div className="separator"></div>
                            <div className="contact-item">
                                <img src={internet} alt="Website" className="icon" />
                                <span>www.uidai.gov.in</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IDCardGenerator;
