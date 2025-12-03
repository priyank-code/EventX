import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

// Icons
import { MdDashboard } from "react-icons/md";
import { FaTicketAlt } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiLogOut, FiChevronDown, FiUser, FiSettings, FiCamera } from "react-icons/fi";

// Pages
import DashboardPage from "./Dashboard";
import BookTicketPage from "./BookTicket";
import MyTicketsPage from "./MyTickets";
import Account from "./Account";
import ScanQR from "./ScanQR";  

export default function UPanel() {
  const [active, setActive] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [user, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });
        setUserData(res.data);
        dispatch(setUser({ user: res.data, token: null }));
      } catch {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(setUser({ user: null, token: null }));
      navigate("/login");
      toast.success("Logged out");
    } catch {
      toast.error("Logout failed");
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-xl text-gray-600">Loading...</div>
    );

  // 🔥 Render pages
  const renderPage = () => {
    switch (active) {
      case "dashboard":
        return <DashboardPage user={user} />;
      case "book":
        return <BookTicketPage />;
      case "tickets":
        return <MyTicketsPage />;
      case "account":
        return <Account user={user} />;
      case "scanqr":                 // ✅ NEW
        return <ScanQR />;
      default:
        return <DashboardPage user={user} />;
    }
  };

  // 🔥 Sidebar Items
  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: <MdDashboard size={22} /> },
    { id: "book", label: "Book Ticket", icon: <FaTicketAlt size={22} /> },
    { id: "tickets", label: "My Tickets", icon: <AiOutlineShoppingCart size={22} /> },
    { id: "scanqr", label: "Scan QR", icon: <FiCamera size={22} /> }, // ✅ NEW
    { id: "account", label: "Update Account", icon: <FiSettings size={22} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ===== MOBILE SIDEBAR ===== */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 transform transition-all duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <FiUser size={20} />
            <span className="font-semibold">Hi, {user?.name}</span>
          </div>
          <button className="text-2xl" onClick={() => setSidebarOpen(false)}>
            ✕
          </button>
        </div>

        <nav className="p-4 space-y-3">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActive(item.id);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition ${
                active === item.id ? "bg-gray-800" : "hover:bg-gray-700"
              }`}
            >
              {item.icon} <span>{item.label}</span>
            </button>
          ))}

          <button
            onClick={logout}
            className="mt-8 flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 w-full py-2 px-4 rounded-lg"
          >
            <FiLogOut size={20} /> Logout
          </button>
        </nav>
      </div>

      {/* BACKDROP */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        ></div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 bg-gray-900 text-white shadow-xl">
        <div className="flex flex-col items-center p-6 border-b border-white/10">
          <FiUser size={28} />
          <span className="mt-2 font-semibold text-lg">Hi, {user?.name}</span>
        </div>

        <nav className="flex-1 p-4 space-y-3">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition ${
                active === item.id ? "bg-gray-800" : "hover:bg-gray-700"
              }`}
            >
              {item.icon} <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={logout}
          className="m-4 mt-auto flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg shadow-md"
        >
          <FiLogOut size={20} /> Logout
        </button>
      </aside>

      {/* TOP NAVBAR */}
      <header className="fixed top-0 left-0 right-0 lg:left-64 h-16 bg-white shadow flex items-center justify-between px-6 z-40">
        <button
          className="text-3xl lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <div className="ml-auto relative flex items-center gap-2">
          <FiUser size={20} />
          <span className="font-semibold">{user?.name}</span>
          <button
            className="p-1 rounded hover:bg-gray-100"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FiChevronDown size={18} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-[120%] w-44 bg-white border rounded-lg shadow-lg py-2 z-50">
              <button
                onClick={() => {
                  setActive("account");
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <FiSettings size={18} /> Update Account
              </button>

              <button
                onClick={() => {
                  logout();
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-2"
              >
                <FiLogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 mt-20">{renderPage()}</main>
    </div>
  );
}
