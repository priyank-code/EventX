import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dashboard stats
        const statsRes = await axios.get("http://localhost:5000/api/auth/dashboard", {
          withCredentials: true,
        });
        setStats(statsRes.data.data);

        // Fetch user info
        const userRes = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });
        setUser(userRes.data);
      } catch (err) {
        toast.error("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div className="p-6 flex flex-col gap-8">
      {/* Welcome Message */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
        Welcome, {user?.name}
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Tickets */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform">
          <p className="text-sm md:text-base font-semibold uppercase tracking-wide opacity-90">Total Tickets</p>
          <p className="text-3xl md:text-4xl font-bold mt-2">{stats?.totalTickets}</p>
        </div>

        {/* Total Spend */}
        <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform">
          <p className="text-sm md:text-base font-semibold uppercase tracking-wide opacity-90">Total Spend</p>
          <p className="text-3xl md:text-4xl font-bold mt-2">₹{stats?.totalSpent}</p>
        </div>

        {/* Active Tickets */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform">
          <p className="text-sm md:text-base font-semibold uppercase tracking-wide opacity-90">Active Tickets</p>
          <p className="text-3xl md:text-4xl font-bold mt-2">{stats?.activeTickets}</p>
        </div>

        {/* Used Tickets */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform">
          <p className="text-sm md:text-base font-semibold uppercase tracking-wide opacity-90">Used Tickets</p>
          <p className="text-3xl md:text-4xl font-bold mt-2">{stats?.usedTickets}</p>
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-6 rounded-xl shadow-lg flex flex-col gap-2 hover:scale-105 transition-transform">
        <p className="text-lg md:text-xl font-semibold">Name: {user?.name}</p>
        <p className="text-lg md:text-xl font-semibold">Email: {user?.email}</p>
        <p className="text-lg md:text-xl font-semibold">Role: {user?.role}</p>
        <p className="text-sm md:text-base text-gray-300">Member since: {new Date(user?.createdAt).toLocaleDateString("en-GB")}</p>
      </div>
    </div>
  );
}
