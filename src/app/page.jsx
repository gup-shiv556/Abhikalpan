"use client";
import React, { useState, useEffect } from "react";
import "../styles/bootstrap.min.css";
import "../styles/icomoon/style.css";
import "../styles/style.css";
import MyImage from "../images/bg_logo.jpg";
import Image from "next/image";
import Html5QrcodePlugin from "../components/Barcode";
import ResultContainerPlugin from "../components/ResultContainerPlugin.jsx";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function App() {
  const [decodedResults, setDecodedResults] = useState([]);

  const onNewScanResult = (decodedText, decodedResult) => {
    setDecodedResults((prev) => [...prev, decodedResult]);
  };
  const { status, data } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status]);
  if (status === "authenticated")
    return (
      <>
        <div className="form-container sign-in-container">
          <div className="half">
            <div className="bg order-1 order-md-2">
              <Image
                src={MyImage}
                style={{ width: "100%", height: "100%" }}
                alt="Picture of the author"
              />
            </div>
            <br />
            <div style={{ textAlign: "center" }}>
              <h3>
                {" "}
                <b>ABHIKALPAN ASSET MANAGEMENT SYSTEM</b>
              </h3>
            </div>
            <div className="results-list-container">
              <div
                style={{
                  width: "500px",
                  border: "5px solid",
                  margin: "auto",
                  width: "50%",
                  padding: "10px",
                }}
              >
                <Html5QrcodePlugin
                  fps={10}
                  qrbox={250}
                  disableFlip={false}
                  qrCodeSuccessCallback={onNewScanResult}
                />
              </div>
              <ResultContainerPlugin results={decodedResults} />
            </div>
          </div>
        </div>
      </>
    );
}
