import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import "./PanCardGenerator.css";
import panBg from "./../assets/pan-card-bg.png";
import { QRCodeSVG } from "qrcode.react";


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
    <div className="idcard-container">
      <div className="button-group">
        <button onClick={handleDownloadImage} className="btn btn-blue">
          Download as Image
        </button>
        <button onClick={handleDownloadPDF} className="btn btn-green">
          Download as PDF
        </button>
      </div>

      <div ref={cardRef} className="pan-card-wrapper">
        {/* Background */}
        <img src={panBg} alt="PAN Card Background" className="pan-bg" />

        {/* Absolute Positioned Elements */}
        <div className="photo-box">
          {data?.photo ? (
            <img
              src={URL.createObjectURL(data.photo)}
              alt="User"
              className="photo"
            />
          ) : (
            <div className="photo-placeholder">Photo</div>
          )}
        </div>

        <div className="details name">{data?.name}</div>
        <div className="details father">{data?.fathersName}</div>
        <div className="details dob">
          {data?.dob ? new Date(data.dob).toLocaleDateString("en-GB") : ""}
        </div>
        <div className="details pan">{data?.panNo}</div>

        <div className="signature-box">
          {data?.signature ? (
            <img
              src={URL.createObjectURL(data.signature)}
              alt="Signature"
              className="signature"
            />
          ) : (
            <div className="signature-placeholder">Signature</div>
          )}
        </div>

        {/* ✅ QR Code */}
        <div className="qr-box">
          <QRCodeSVG value={qrData} size={60} level="H" className="qrcode"/>
        </div>
      </div>
    </div>
  );
}

export default PanCardGenerator;
