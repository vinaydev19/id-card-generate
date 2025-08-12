import React, { useRef } from 'react';
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

function IDCardGenerator() {
    const cardRef = useRef();

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
                            {/* <div className="vertical-text">Aadhaar no. issued: 20/06/2013</div> */}
                            <div className="photo-box">
                                <img src={photo} alt="User" className="photo" />
                            </div>
                            <div className="details">
                                <p>John Doe</p>
                                <p>Date of Birth: 01/01/2000</p>
                                <p>Male / MALE</p>
                                <div className="note">
                                    <p><strong>आधार पहचान का प्रमाण है, नागरिकता या जन्मतिथि का नहीं।</strong> इसका उपयोग सत्यापन (ऑनलाइन प्रमाणीकरण, या क्यूआर कोड / ऑफ़लाइन एक्सएमएल की स्कैनिंग) के साथ किया जाना चाहिए।</p>
                                    <p><strong>Aadhaar is proof of identity, not of citizenship or date of birth.</strong> It should be used with verification (online authentication, or scanning of QR code / offline XML).</p>
                                </div>
                            </div>
                        </div>

                        <div className="number">1234 5678 9012</div>
                        <div className="red-line"></div>
                        <div className="slogan">मेरा <span className="black-text">आधार</span>, मेरी पहचान</div>
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
                                <p>C/O: Venkatesh Porandla, 63/4 R NO 2 2ND
                                    FLOOR, YASHWANT CHAWL,
                                    PADMANAGAR, Bhiwandi, PO:
                                    Dandekarwadi, DIST: Thane,
                                    Maharashtra - 421302</p>
                            </div>
                            <div className="qrcode-box">
                                <img src={qrcode} alt="QR Code" className="qrcode" />
                            </div>
                        </div>

                        <div className="number">1234 5678 9012</div>
                        <div className="dot-line"></div>
                        <div className="vid">VID: 1234 5678 9012 3456</div>
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
