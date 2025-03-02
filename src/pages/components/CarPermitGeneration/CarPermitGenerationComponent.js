import React, { useEffect, useState } from "react";

function CarPermitGenerationComponent({ permitId }) {
  const [permit, setPermit] = useState(null);

  useEffect(() => {
    if (permitId) {
      fetch(`/api/Permit/permit/${permitId}`)
        .then((res) => res.json())
        .then((data) => setPermit(data))
        .catch((err) => console.log("Error fetching permit:", err));
    }
  }, [permitId]);

  return (
    <div className="print-container">
      <div className="permit-card" id="permit-card">
        {/* Background Image */}
        {permit?.editedImage && (
          <img
            src={permit.editedImage}
            alt="Permit Background"
            className="permit-bg"
          />
        )}

        {/* Positioned Text */}
        <div className="permit-content">
          <p className="event-name">{permit?.event?.name || "Event Name"}</p>
          <p className="card-name">{permit?.card?.name || "Card Name"}</p>
          <p className="permit-code">{permit?.code || "Code"}</p>
          <p className="car-number">{permit?.carNumber || "Car No"}</p>
        </div>
      </div>

      {/* Print Button */}
      <button onClick={() => window.print()}>Print</button>

      {/* CSS Styling */}
      <style jsx>{`
        .print-container {
          text-align: center;
          margin: 20px;
        }
        .permit-card {
          position: relative;
          width: 600px;
          height: 400px;
          margin: auto;
          border: 2px solid #000;
        }
        .permit-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
        }
        .permit-content {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: black;
        }
        .event-name {
          position: absolute;
          top: 50px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 22px;
          font-weight: bold;
        }
        .card-name {
          position: absolute;
          top: 100px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 20px;
          font-weight: bold;
        }
        .permit-code {
          position: absolute;
          top: 150px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 18px;
          font-weight: bold;
        }
        .car-number {
          position: absolute;
          top: 200px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 18px;
          font-weight: bold;
        }

        @media print {
          button {
            display: none;
          }
          .permit-card {
            border: none;
            width: 100%;
            height: 100%;
          }
          .print-container {
            margin: 0;
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default CarPermitGenerationComponent;
