import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("https://eventx-zo1r.onrender.com/api/auth/me", {
          withCredentials: true,
        });
        setOk(true);
      } catch (err) {
        setOk(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

  return ok ? children : <Navigate to="/login" replace />;
}
