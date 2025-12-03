import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Register() {
const navigate = useNavigate();

const [form, setForm] = useState({
name: "",
email: "",
password: "",
});

const [loading, setLoading] = useState(false);

const handleChange = (e) =>
setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);

try {
  const res = await axios.post(
    "https://eventx-zo1r.onrender.com/api/auth/register",
    {
      name: form.name,
      email: form.email,
      password: form.password,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  toast.success(res.data.msg || "Registered!");
  navigate("/login");
} catch (err) {
  toast.error(err.response?.data?.msg || "Register failed");
}

setLoading(false);
};

return ( <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
<motion.div
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20"
> <h2 className="text-center text-3xl font-bold text-white mb-2">
Create Account ✨ </h2>

```
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="w-full bg-white/20 text-white p-3 rounded-xl"
        placeholder="Full Name"
        required
      />

      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        className="w-full bg-white/20 text-white p-3 rounded-xl"
        placeholder="Email"
        required
      />

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        className="w-full bg-white/20 text-white p-3 rounded-xl"
        placeholder="Password"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-white text-black py-3 rounded-xl font-semibold"
      >
        {loading ? "Processing..." : "Register"}
      </button>
    </form>

    <p className="text-gray-300 text-sm text-center mt-4">
      Already have an account?{" "}
      <Link to="/login" className="text-white underline">
        Login
      </Link>
    </p>
  </motion.div>
</div>
);
}
