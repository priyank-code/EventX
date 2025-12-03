import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function UserProfileUpdate() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [form, setForm] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch current user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://eventx-zo1r.onrender.com/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data);
        setForm((prev) => ({ ...prev, name: res.data.name }));
      } catch (err) {
        toast.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setUpdating(true);
      await axios.put(
        "https://eventx-zo1r.onrender.com/api/auth/update",
        {
          name: form.name,
          password: form.password || undefined,
        },
        { withCredentials: true }
      );

      toast.success("Profile updated successfully");
      setUser((prev) => ({ ...prev, name: form.name }));
      setForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
    } catch (err) {
      toast.error(err.response?.data?.msg || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return <div className="text-center py-20 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">
        Update Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email (readonly) */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            New Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Leave blank to keep current password"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Confirm new password"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={updating}
          className={`w-full py-2 rounded-md font-semibold text-white transition ${
            updating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
