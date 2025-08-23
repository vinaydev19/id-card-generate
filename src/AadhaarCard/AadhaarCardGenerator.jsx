import React, { useRef } from 'react';
import govlogo from "./../assets/Emblem_of_India.svg";
import aadhaarlogo from "./../assets/aadhaar-card-icon.png";
import telephone from "./../assets/old-typical-phone.png";
import mail from "./../assets/mail.png";
import internet from "./../assets/globe.png";
import front from "./../assets/front.png";
import back from "./../assets/back.png";
import styles from './AadhaarCardGenerator.module.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

function AadhaarCardGenerator() {
    const cardRef = useRef();
    const location = useLocation();
    const data = location.state;

    const addressLabels = {
        english: "Address:",
        hindi: "पता:",
        marathi: "पत्ता:",
        telugu: "చిరునామా:",
    };

    const getAddressLabel = () => {
        return addressLabels[data?.language] || "Address:";
    };

    // 📸 Download as Image
    const handleDownloadImage = async () => {
        const element = cardRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const img = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = img;
        link.download = "Aadhaar_Card.png";
        link.click();
    };

    // 📄 Download as PDF
    const handleDownloadPDF = async () => {
        const element = cardRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("portrait", "mm", "a4");
        const imgWidth = 280;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save("Aadhaar_Card.pdf");
    };

    return (
        <div className={styles.idcardContainer}>
            {/* Buttons */}
            <div className={styles.buttonGroup}>
                <button onClick={handleDownloadImage} className={`${styles.btn} ${styles.btnBlue}`}>
                    Download as Image
                </button>
                <button onClick={handleDownloadPDF} className={`${styles.btn} ${styles.btnGreen}`}>
                    Download as PDF
                </button>
            </div>

            <div ref={cardRef}>
                {/* Card Wrapper */}
                <div className={styles.cardWrapper}>
                    {/* Front Side */}
                    <div className={styles.cardFront}>
                        <div className={styles.header}>
                            <img src={govlogo} alt="Gov Logo" className={styles.logo} />
                            <img src={front} alt="Government of India" className={styles.titleImg} />
                            <img src={aadhaarlogo} alt="Aadhaar Logo" className={styles.logo} />
                        </div>

                        <div className={styles.photoSection}>
                            <div className={styles.photoWrapper}>
                                <div className={styles.verticalText}>Aadhaar no. issued: 20/06/2013</div>
                                <div className={styles.photoBox}>
                                    {data?.photo ? (
                                        <img src={URL.createObjectURL(data.photo)} alt="User" className={styles.photo} />
                                    ) : null}
                                </div>
                            </div>

                            <div className={styles.details}>
                                <p>{data?.nameTranslated}</p>
                                <p>{data?.name}</p>
                                <p>Date of Birth: {data?.dob ? new Date(data.dob).toLocaleDateString("en-GB") : ""}</p>
                                <p>
                                    {data?.gender?.charAt(0).toUpperCase() + data?.gender?.slice(1)}/
                                    {data?.gender?.charAt(0).toUpperCase() + data?.gender?.slice(1)}
                                </p>
                                <div className={styles.note}>
                                    <p><strong>आधार पहचान का प्रमाण है, नागरिकता या जन्मतिथि का नहीं।</strong> इसका उपयोग सत्यापन (ऑनलाइन प्रमाणीकरण, या क्यूआर कोड / ऑफ़लाइन एक्सएमएल की स्कैनिंग) के साथ किया जाना चाहिए।</p>
                                    <p><strong>Aadhaar is proof of identity, not of citizenship or date of birth.</strong> It should be used with verification (online authentication, or scanning of QR code / offline XML).</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.number}>
                            {String(data?.aadhaar).replace(/(\d{4})(?=\d)/g, '$1 ')}
                        </div>
                        <div className={styles.redLine}></div>
                        <div className={styles.sloganLine}>
                            <div className={styles.blackText}>मेरा <span className={styles.slogan}>आधार</span>, मेरी पहचान</div>
                        </div>
                    </div>

                    {/* Middle Divider */}
                    <div className={styles.divider}></div>

                    {/* Back Side */}
                    <div className={styles.cardBack}>
                        <div className={styles.header}>
                            <img src={govlogo} alt="Gov Logo" className={styles.logo} />
                            <img src={back} alt="Government of India" className={styles.titleImg} />
                            <img src={aadhaarlogo} alt="Aadhaar Logo" className={styles.logo} />
                        </div>

                        <div className={styles.addressSection}>
                            <div className={styles.address}>
                                {/* Show translated version if available */}
                                {data?.addressTranslated && (
                                    <>
                                        <p>
                                            {data?.language === "hindi" && "पता:"}
                                            {data?.language === "marathi" && "पत्ता:"}
                                            {data?.language === "telugu" && "చిరునామా:"}
                                        </p>
                                        <p>{data?.addressTranslated}</p>
                                    </>
                                )}
                                {/* Always show English first */}
                                <p>Address:</p>
                                <p>{data?.address}</p>
                            </div>

                            <div className={styles.qrcodeBox}>
                                <QRCodeSVG
                                    value={JSON.stringify(data)}
                                    size={80}
                                    level="H"
                                    className={styles.qrcode}
                                />
                            </div>
                        </div>


                        <div className={styles.number}>
                            {String(data?.aadhaar).replace(/(\d{4})(?=\d)/g, '$1 ')}
                        </div>
                        <div className={styles.dotLine}></div>
                        <div className={styles.vid}>VID: {String(data?.vid).replace(/(\d{4})(?=\d)/g, '$1 ')}</div>
                        <div className={styles.redLine}></div>

                        <div className={styles.contact}>
                            <div className={styles.contactItem}>
                                <img src={telephone} alt="Phone" className={styles.icon} />
                                <span className={styles.bold}>1947</span>
                            </div>
                            <div className={styles.separator}></div>
                            <div className={styles.contactItem}>
                                <img src={mail} alt="Mail" className={styles.icon} />
                                <span>help@uidai.gov.in</span>
                            </div>
                            <div className={styles.separator}></div>
                            <div className={styles.contactItem}>
                                <img src={internet} alt="Website" className={styles.icon} />
                                <span>www.uidai.gov.in</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AadhaarCardGenerator;
