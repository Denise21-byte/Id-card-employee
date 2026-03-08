import React from "react";
import html2canvas from "html2canvas";

function EmployeeCard({ employee }) {
  const { id, name, email, phone, website, company } = employee;

  const handleDownload = () => {
    const card = document.getElementById(`card-${id}`);
    html2canvas(card).then((canvas) => {
      const link = document.createElement("a");
      link.download = `${name}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="card" id={`card-${id}`}>
      <div className="card-header">
        <div className="avatar">{name.charAt(0)}</div>
        <div>
          <h2 className="card-name">{name}</h2>
          <span className="card-id">Employee #{id}</span>
        </div>
      </div>

      <div className="card-body">
        <p><span className="label">📧 Email:</span> {email}</p>
        <p><span className="label">📞 Phone:</span> {phone}</p>
        <p><span className="label">🌐 Website:</span> {website}</p>
        <p><span className="label">🏢 Company:</span> {company.name}</p>
      </div>

      <div className="card-actions">
        <button className="btn btn-print" onClick={handlePrint}>
          🖨️ Print
        </button>
        <button className="btn btn-download" onClick={handleDownload}>
          ⬇️ Download
        </button>
      </div>
    </div>
  );
}

export default EmployeeCard;