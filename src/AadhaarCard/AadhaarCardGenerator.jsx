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

    const genderLabels = {
        english: {
            male: "Male",
            female: "Female",
        },
        hindi: {
            male: "पुरुष",
            female: "महिला",
        },
        marathi: {
            male: "पुरुष",
            female: "महिला",
        },
        telugu: {
            male: "పురుషుడు",
            female: "మహిళ",
        },
    };

    const slogans = {
        hindi: { before: "मेरा", aadhaar: "आधार", after: ", मेरी पहचान" },
        marathi: { before: "माझे", aadhaar: "आधार", after: ", माझी ओळख" },
        telugu: { before: "నా", aadhaar: "ఆధార్", after: ", నా గుర్తింపు" },
    };


    const getSloganParts = () => {
        return slogans[data?.language] || slogans.hindi;
    };


    const getAddressLabel = () => {
        return addressLabels[data?.language] || "Address:";
    };

    const getGenderLabel = () => {
        if (!data?.gender) return "";
        const lang = data?.language || "english";
        const genderKey = data.gender.toLowerCase();
        return genderLabels[lang]?.[genderKey] || data.gender;
    };

    const getIssuedDate = () => {
        const today = new Date();

        // pick random years between 6 and 7 years ago
        const randomYears = Math.floor(Math.random() * 2) + 6;
        const startYear = today.getFullYear() - randomYears;

        // pick random month (0–11)
        const randomMonth = Math.floor(Math.random() * 12);

        // pick random day depending on month/year
        const daysInMonth = new Date(startYear, randomMonth + 1, 0).getDate();
        const randomDay = Math.floor(Math.random() * daysInMonth) + 1;

        const issued = new Date(startYear, randomMonth, randomDay);

        return issued.toLocaleDateString("en-GB"); // DD/MM/YYYY
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
                                <div className={styles.verticalText}>
                                    Aadhaar no. issued: {getIssuedDate()}
                                </div>
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
                                    {getGenderLabel()} / {genderLabels["english"][data?.gender?.toLowerCase()]}
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
                            <div className={styles.blackText}>
                                {getSloganParts().before}{" "}
                                <span className={styles.slogan}>{getSloganParts().aadhaar}</span>
                                {getSloganParts().after}
                            </div>
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
