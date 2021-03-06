import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from './INVOICE'



export default function PDFGenerate() {

  return (
    <div className="container">
      <h2>Best movies of the year</h2>
      <label htmlFor="movies">Select Year</label>

      
        <PDFDownloadLink
          document={<Invoice />}
          fileName="Invoice.pdf"
          style={{
            textDecoration: "none",
            padding: "10px",
            color: "#4a4a4a",
            backgroundColor: "#f2f2f2",
            border: "1px solid #4a4a4a"
          }}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download Pdf"
          }
        </PDFDownloadLink>
    </div>
  );
}
