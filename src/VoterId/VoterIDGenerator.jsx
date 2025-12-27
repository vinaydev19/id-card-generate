import React, { useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeSVG } from "qrcode.react";
import voterBg from "../assets/voteridbg.png";
import qrTopImage from "../assets/eci_qr_top.png";
import styles from "./VoterIDGenerator.module.css";
// import { PhoneCall } from 'lucide-react';
import PhoneCall from '../assets/phone-call.png';


function VoterIDGenerator() {
  const { state: data } = useLocation();
  const navigate = useNavigate();
  const cardRef = useRef();

  const photoUrl = useMemo(() => {
    if (!data?.photo) return null;
    return URL.createObjectURL(data.photo);
  }, [data?.photo]);

  useEffect(() => {
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
    };
  }, [photoUrl]);

  useEffect(() => {
    if (!data) navigate("/voter-id/form");
  }, [data, navigate]);

  const handleDownloadImage = async () => {
    const canvas = await html2canvas(cardRef.current, { scale: 2 });
    const img = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = img;
    link.download = `${data.fullName}_VoterCard.png`;
    link.click();
  };

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(cardRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "px", [canvas.width, canvas.height]);
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${data.fullName}_VoterCard.pdf`);
  };

  const qrData = JSON.stringify({
    name: data.fullName,
    voterId: data.voterId,
    dob: data.dob,
  });

  if (!data) return null;

  return (
    <div className={styles.voterContainer}>
      <div className={styles.buttonGroup}>
        <button onClick={handleDownloadImage} className={styles.btnBlue}>
          Download Image
        </button>
        <button onClick={handleDownloadPDF} className={styles.btnGreen}>
          Download PDF
        </button>
      </div>

      <div
        ref={cardRef}
        className={styles.cardWrapper}
        style={{ backgroundImage: `url(${voterBg})` }}
      >
        {/* FRONT */}
        <div className={styles.cardFront}>
          <div className={styles.topHeader}>
            <p className={styles.headerHindi}>भारतीय निवडणूक आयोग</p>
            <div className={styles.headerLine}></div>
            <p className={styles.headerEnglish}>
              ELECTION COMMISSION OF INDIA
            </p>
          </div>

          <div className={styles.photoSection}>
            <p className={styles.voterId}>{data.voterId}</p>

            <div className={styles.photoBox}>
              {photoUrl && (
                <img src={photoUrl} alt="Voter" className={styles.photo} />
              )}
            </div>

            <div className={styles.details}>
              {/* Name */}
              <p className={styles.boldText}>
                नाव: {data.fullNameTranslated}
              </p>
              <p className={styles.boldText}>
                Name: {data.fullName}
              </p>

              {/* Father's Name */}
              <p className={styles.boldText}>
                वडिलांचे नाव: {data.fatherNameTranslated}
              </p>
              <p className={styles.boldText}>
                Father’s Name: {data.fatherName}
              </p>

              {/* Gender */}
              <p>
                लिंग / Gender:{" "}
                {data.gender === "Male"
                  ? "पुरुष / Male"
                  : data.gender === "Female"
                    ? "महिला / Female"
                    : "इतर / Other"}
              </p>

              {/* DOB / Age */}
              <p>जन्मतारीख / वय:</p>
              <p>Date of Birth / Age: {data.dob}</p>
            </div>
          </div>

          <div className={styles.bottomText}>
            e-Electors Photo Identity Card – ई-मतदार फोटो ओळखपत्र
          </div>
        </div>

        {/* BACK */}
        <div className={styles.cardBack}>
          <div className={styles.backContent}>
            <div className={styles.qrBox}>
              <div className={styles.qrTop}>
                <img src={qrTopImage} alt="ECI" />
              </div>

              <div className={styles.qrCenter}>
                <QRCodeSVG value={qrData} size={110} className={styles.qrcodesvg} level="H" />
              </div>

              <div className={styles.qrBottom}>
                <p className={styles.qrText}>Scan By VHA/BLO App</p>
                <p className={styles.qrId}>{data.voterId}</p>
              </div>
            </div>

            <div className={styles.addressSection}>
              <p>पत्ता: {data.addressTranslated}</p>
              <p>Address: {data.address}</p>
            </div>

            <div className={styles.officerText}>
              <p>मतदार नोंदणी अधिकारी, 137 - भिवंडी पूर्व</p>
              <p>Electoral Registration Officer, 137 - Bhiwandi East</p>
              <p className={styles.downloadDate}>Download Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.footerLeft}>
              <div className={styles.footerItem}>
                <img src={PhoneCall} alt="Helpline" className={styles.phoneIcon} />
                <span className={styles.footerText}>1950</span>
              </div>
            </div>

            <div className={styles.footerCenter}>
              https://ceoelection.maharashtra.gov.in/ceo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoterIDGenerator;
