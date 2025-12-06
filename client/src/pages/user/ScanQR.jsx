import React, { useState } from "react";
import { useZxing } from "react-zxing";
import axios from "axios";

const ScanQR = () => {
  const [scanText, setScanText] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Only success sound
  const playSuccess = () => {
    const audio = new Audio("/sounds/success.mp3");
    audio.play().catch(() => {});
  };

  const { ref } = useZxing({
    onDecodeResult(result) {
      const text = result.getText();
      handleScan(text);
    },
    constraints: {
      video: { facingMode: "environment" },
    },
  });

  const handleScan = async (text) => {
    if (!text) return;
    if (text === scanText) return;

    setScanText(text);
    setLoading(true);
    setStatus("");

    try {
      const res = await axios.post(
        "https://eventx-zo1r.onrender.com/api/tickets/verify",
        { text },
        { withCredentials: true }
      );

      const msg = res.data.msg;
      setStatus(msg);

      // Only play sound when ticket is valid
      if (msg === "Valid ticket") {
        playSuccess();
      }
    } catch (err) {
      console.log(err);
      setStatus("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col items-center mt-6 px-4">
      <h2 className="text-xl font-bold mb-4">Scan Ticket QR</h2>

      <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-xl bg-black">
        <video ref={ref} className="w-full" />
      </div>

      <div className="mt-4 text-center">
        <p className="font-semibold">
          {scanText ? `Scanned: ${scanText}` : "No scan yet"}
        </p>

        {loading && <p className="text-blue-500 mt-1">Verifying...</p>}

        {status && (
          <p
            className={`mt-2 font-bold ${
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
