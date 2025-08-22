import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import panBg from "./../assets/pan-card-bg.png";
import { QRCodeSVG } from "qrcode.react";

// ✅ Import CSS Module instead of global CSS
import styles from "./PanCardGenerator.module.css";

function PanCardGenerator() {
  const cardRef = useRef();
  const location = useLocation();
  const data = location.state;

  const handleDownloadImage = async () => {
    const element = cardRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imgData;
    link.download = `${data?.name || "PAN"}_Card.png`;
    link.click();
  };

  const handleDownloadPDF = async () => {
    const element = cardRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("portrait", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${data?.name || "PAN"}_Card.pdf`);
  };

  const qrData = JSON.stringify({
    name: data?.name,
    father: data?.fathersName,
    dob: data?.dob,
    pan: data?.panNo,
  });

  return (
    <div className={styles.idcardContainer}>
      <div className={styles.buttonGroup}>
        <button onClick={handleDownloadImage} className={`${styles.btn} ${styles.btnBlue}`}>
          Download as Image
        </button>
        <button onClick={handleDownloadPDF} className={`${styles.btn} ${styles.btnGreen}`}>
          Download as PDF
        </button>
      </div>

      <div ref={cardRef} className={styles.panCardWrapper}>
        {/* Background */}
        <img src={panBg} alt="PAN Card Background" className={styles.panBg} />

        {/* Photo */}
        <div className={styles.photoBox}>
          {data?.photo ? (
            <img
              src={URL.createObjectURL(data.photo)}
              alt="User"
              className={styles.photo}
            />
          ) : (
            <div className={styles.photoPlaceholder}>Photo</div>
          )}
        </div>

        {/* Details */}
        <div className={`${styles.details} ${styles.name}`}>{data?.name}</div>
        <div className={`${styles.details} ${styles.father}`}>{data?.fathersName}</div>
        <div className={`${styles.details} ${styles.dob}`}>
          {data?.dob ? new Date(data.dob).toLocaleDateString("en-GB") : ""}
        </div>
        <div className={`${styles.details} ${styles.pan}`}>{data?.panNo}</div>

        {/* Signature */}
        <div className={styles.signatureBox}>
          {data?.signature ? (
            <img
              src={URL.createObjectURL(data.signature)}
              alt="Signature"
              className={styles.signature}
            />
          ) : (
            <div className={styles.signaturePlaceholder}>Signature</div>
          )}
        </div>

        {/* QR Code */}
        <div className={styles.qrBox}>
          <QRCodeSVG value={qrData} size={60} level="H" className={styles.qrcode} />
        </div>
      </div>
    </div>
  );
}

export default PanCardGenerator;
