import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";
import style from "../pages/styles.css";
import camPlaceHolder from "./logo.svg";
import Image from "next/image";

const qrcodeRegionId = "html5qr-code-full-region";
var html5QrcodeScanner;
var config;
var verbose;
// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props) => {
  let config = {};
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

const Html5QrcodePlugin = (props) => {
  const [showResults, setShowResults] = useState(false);
  useEffect(() => {
    // when component mounts
    config = createConfig(props);
    verbose = props.verbose === true;
    // Suceess callback is required.
    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    html5QrcodeScanner = new Html5Qrcode(qrcodeRegionId, config, verbose);

    // html5QrcodeScanner.render(
    //   props.qrCodeSuccessCallback,
    //   props.qrCodeErrorCallback
    // );

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  function startCam(params) {
    setShowResults(true);
    html5QrcodeScanner.start(
      { facingMode: "environment" },
      config,
      props.qrCodeSuccessCallback
    );
  }

  function stopCam(params) {
    setShowResults(false);

    html5QrcodeScanner
      .stop()
      .then((ignore) => {
        // QR Code scanning is stopped.
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Image
        src={camPlaceHolder}
        style={{ height: "80px", width: "100%" }}
        id="camPlaceHolder"
        hidden={showResults}
      />
      <div id={qrcodeRegionId} />
      <br />
      <button onClick={startCam} hidden={showResults}>
        Start Scanning
      </button>
      <button onClick={stopCam} hidden={!showResults}>
        Stop Scanning
      </button>
    </div>
  );
};

export default Html5QrcodePlugin;
