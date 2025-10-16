import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeSVG } from "qrcode.react";
import voterBg from "../assets/voteridbg.png";
import styles from "./VoterIDGenerator.module.css";

function VoterIDGenerator() {
  const { state: data } = useLocation();
  const navigate = useNavigate();
  const cardRef = useRef();

  useEffect(() => {
    if (!data) navigate("/voter-id/form");
  }, [data, navigate]);

  useEffect(() => {
    return () => {
      if (data?.photo) URL.revokeObjectURL(data.photo);
    };
  }, [data]);

  // 📸 Download as Image
  const handleDownloadImage = async () => {
    const element = cardRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const img = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = img;
    link.download = `${data?.fullName || "Voter"}_Card.png`;
    link.click();
  };

  // 📄 Download as PDF
  const handleDownloadPDF = async () => {
    const element = cardRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "mm", "a4");
    const imgWidth = 280;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(`${data?.fullName || "Voter"}_Card.pdf`);
  };

  const qrData = JSON.stringify({
    name: data?.fullName,
    voterId: data?.voterId,
    dob: data?.dob,
    gender: data?.gender,
    address: data?.address,
  });

  if (!data) return null;

  return (
    <div className={styles.voterContainer}>
      {/* Buttons */}
      <div className={styles.buttonGroup}>
        <button onClick={handleDownloadImage} className={`${styles.btn} ${styles.btnBlue}`}>
          Download as Image
        </button>
        <button onClick={handleDownloadPDF} className={`${styles.btn} ${styles.btnGreen}`}>
          Download as PDF
        </button>
      </div>

      {/* Full Card with background */}
      <div
        ref={cardRef}
        className={styles.cardWrapper}
        style={{ backgroundImage: `url(${voterBg})` }}
      >
        {/* Front Side */}
        <div className={styles.cardFront}>
          <div className={styles.photoSection}>
            <p className={styles.voterId}>{data.voterId?.toUpperCase()}</p>
            <div className={styles.photoBox}>
              {
                <img src={URL.createObjectURL(data.photo)} alt="Voter" className={styles.photo} />
              }
            </div>

            <div className={styles.details}>
              <p className={styles.translated}>नाव: {data.fullNameTranslated}</p>
              <p className={styles.bold}>Name: {data.fullName}</p>
              <p className={styles.translated}>विडलांचे नाव: {data.fatherNameTranslated}</p>
              <p className={styles.bold}>Father’s Name: {data.fatherName}</p>
              <p>
                िंलग / Gender: {data.gender} /{" "}
                {data.gender === "Male" ? "पुरुष" : data.gender === "Female" ? "महिला" : "इतर"}
              </p>
              <p>जन्मतारीख / वय:</p>
              <p>Date of Birth / Age: {data.dob}</p>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className={styles.cardBack}>
          <div className={styles.backContent}>
            <div className={styles.qrBox}>
              <QRCodeSVG className={styles.qr} value={qrData} size={150} level="H" />
            </div>


            <div className={styles.addressSection}>
              {data.addressTranslated && (
                <>
                  <div className={styles.addressTrans}>
                    <p className={styles.bold}>पत्ता: {data.addressTranslated}</p>
                  </div>
                </>
              )}
              <div className={styles.addressEng}>
                <p className={styles.bold}>Address: {data.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoterIDGenerator;
