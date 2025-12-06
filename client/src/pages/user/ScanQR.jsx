import React, { useState, useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import axios from "axios";

const ScanQR = () => {
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);

  const [status, setStatus] = useState("");
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);

  // Unlock audio on first mount (mobile autoplay fix)
  useEffect(() => {
    const audio = new Audio("/sounds/success.mp3");
    audio.volume = 0;
    audio.play().catch(() => {});
  }, []);

  const playSound = () => {
    const audio = new Audio("/sounds/success.mp3");
    audio.play().catch(() => {});
  };

  const startScanner = async () => {
    setStatus("");
    setLoading(false);
    setScanning(true);

    codeReaderRef.current = new BrowserMultiFormatReader();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      videoRef.current.srcObject = stream;
      videoRef.current.setAttribute("playsinline", true);
      await videoRef.current.play();

      codeReaderRef.current.decodeFromVideoDevice(
        null,
        videoRef.current,
        async (result) => {
          if (result) {
            handleScan(result.getText());
          }
        }
      );
    } catch (err) {
      console.error(err);
      setStatus("Camera not allowed");
    }
  };

  const stopScanner = () => {
    setScanning(false);
    setStatus("");
    setLoading(false);

    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }

    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const refreshScanner = () => {
    stopScanner();
    setTimeout(() => startScanner(), 300);
  };

  const handleScan = async (qrText) => {
    stopScanner(); // freeze UI on scan
    setLoading(true);
    setStatus("");

    try {
      const res = await axios.post(
        "https://eventx-zo1r.onrender.com/api/tickets/verify",
        { text: qrText },
        { withCredentials: true }
      );

      const msg = res.data.msg;
      setStatus(msg);
      playSound();
    } catch (err) {
      console.log(err);
      setStatus(err.response?.data?.msg || "Error");
      playSound();
    }

    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col items-center mt-6 px-4">
      <h2 className="text-xl font-bold mb-4">Scan Ticket QR</h2>

      {/* CAMERA FRAME */}
      <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-xl bg-black">
        <div className="w-full h-80">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
          ></video>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex gap-3 mt-4">
        {!scanning ? (
          <button
            onClick={startScanner}
            className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold"
          >
            Start Scan
          </button>
        ) : (
          <button
            onClick={stopScanner}
            className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold"
          >
            Stop Scan
          </button>
        )}

        <button
          onClick={refreshScanner}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold"
        >
          Refresh
        </button>
      </div>

      {/* STATUS */}
      <div className="mt-4 text-center min-h-6">
        {loading && <p className="text-blue-500 font-bold">Verifying...</p>}

        {!loading && status && (
          <p
            className={`text-lg font-bold ${
              status === "Valid ticket"
                ? "text-green-600"
                : status === "Already scanned"
                ? "text-orange-500"
                : "text-red-600"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default ScanQR;
