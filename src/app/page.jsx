"use client";
import React, { useState, useEffect } from "react";
import "../styles/bootstrap.min.css";
import "../styles/icomoon/style.css";
import "../styles/style.css";
import MyImage from "../images/img.gif";
import Image from "next/image";
import Html5QrcodePlugin from "../components/Barcode";
import ResultContainerPlugin from "../components/ResultContainerPlugin.jsx";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import logOut from "../images/logout.svg";

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
        <title>HomePage</title>
        <div className="form-container sign-in-container">
          <div className="half">
            <div
              className="bg order-1 order-md-2"
              style={{
                height: "auto",
                position: "relative",
                display: "inline-block",
              }}
            >
              <Image
                src={MyImage}
                style={{ width: "100%", height: "45%" }}
                alt="Picture of the author"
              />
              <button
                style={{
                  position: "absolute",
                  top: "14%",
                  right: "-4%",
                  transform: "translate(-50%, -50%)",
                  padding: "2px 7px",
                  fontSize: "6px",
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                }}
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <Image
                  src={logOut}
                  style={{ height: "11px", width: "100%" }}
                  id="camPlaceHolder"
                />
              </button>
            </div>

            <br />
            <div style={{ textAlign: "center" }}>
              <h6>
                {" "}
                <b>ABHIKALPAN ASSET MANAGEMENT SYSTEM</b>
                <br />
                <br />
              </h6>
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
                  torchFeature={true}
                  qrbox={100}
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
