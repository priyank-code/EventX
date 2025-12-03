import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { setUser } from "../features/auth/authSlice";

export default function Login() {
const dispatch = useDispatch();
const navigate = useNavigate();

const [form, setForm] = useState({ email: "", password: "" });
const [loading, setLoading] = useState(false);

const handleChange = (e) =>
setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);

try {
  const res = await axios.post("http://localhost:5000/api/auth/login", form, {
    withCredentials: true,
  });

  dispatch(
    setUser({
      user: res.data.user,
      token: res.data.token,
    })
  );

  toast.success(res.data.msg || "Login successful");
  navigate("/panel");
} catch (err) {
  toast.error(err.response?.data?.msg || "Login failed");
}

setLoading(false);
};

return ( <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
<motion.div
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20"
> <h2 className="text-center text-3xl font-bold text-white mb-2">
Login 🔑 </h2> <p className="text-center text-gray-300 text-sm mb-8">
Enter your credentials to continue </p>

```
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        className="w-full bg-white/20 text-white p-3 rounded-xl outline-none border border-white/20 focus:border-white transition"
        placeholder="Email"
        required
      />

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        className="w-full bg-white/20 text-white p-3 rounded-xl outline-none border border-white/20 focus:border-white transition"
        placeholder="Password"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-white text-black py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-200 transition"
      >
        {loading ? "Processing..." : "Login"}
      </button>
    </form>

    <p className="text-gray-300 text-sm text-center mt-4">
      Don't have an account?{" "}
      <Link to="/register" className="text-white underline font-semibold">
        Register
      </Link>
    </p>
  </motion.div>
</div>
);
}
