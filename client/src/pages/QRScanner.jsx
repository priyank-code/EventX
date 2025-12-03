import React, { useState } from "react";
import { useZxing } from "react-zxing";

export default function QRScanner() {
  const [open, setOpen] = useState(false);
  const [scanResult, setScanResult] = useState("");

  const { ref } = useZxing({
    paused: !open, // camera open/close control
    onDecodeResult(result) {
      setScanResult(result.getText());
    },
  });

  return (
    <div className="w-full flex flex-col items-center gap-6 py-10 mt-16">

      {/* --- Buttons --- */}
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          Open Camera
        </button>
      ) : (
        <button
          onClick={() => setOpen(false)}
          className="px-6 py-2 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700 transition"
        >
          Close Camera
        </button>
      )}

      {/* --- Camera Preview --- */}
      {open && (
        <video
          ref={ref}
          className="w-80 h-60 rounded-xl shadow-lg border border-gray-300"
        />
      )}

      {/* --- Scan Result --- */}
      {scanResult && (
        <p className="mt-4 text-lg font-semibold text-green-600">
          Scanned: {scanResult}
        </p>
      )}
    </div>
  );
}
