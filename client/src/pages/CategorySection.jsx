import { Link } from "react-router-dom";
import {
  FaMusic,
  FaLaptopCode,
  FaUtensils,
  FaGlassCheers,
  FaLaughBeam,
  FaBriefcase
} from "react-icons/fa";

export default function CategorySection({ events = [] }) {
  if (!events.length) return null;

  // Unique categories
  const categories = [...new Set(events.map(e => e.category))];

  // Icons map
  const icons = {
    Music: <FaMusic size={28} className="text-blue-600" />,
    Technology: <FaLaptopCode size={28} className="text-purple-600" />,
    Food: <FaUtensils size={28} className="text-green-600" />,
    Party: <FaGlassCheers size={28} className="text-pink-600" />,
    Comedy: <FaLaughBeam size={28} className="text-yellow-500" />,
    Business: <FaBriefcase size={28} className="text-indigo-600" />
  };

  return (
    <section className="relative w-full py-16 overflow-hidden">

      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1679547202671-f9dbbf466db4?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">
          Browse by Category
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <div key={cat}>
              <Link
                to={`/events?category=${cat}`}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl
                           bg-white/90 backdrop-blur-md shadow-md hover:shadow-xl border border-gray-200
                           hover:-translate-y-1 transition-all duration-300"
              >
                {icons[cat] || (
                  <FaBriefcase size={28} className="text-gray-600" />
                )}
                <p className="text-sm font-semibold text-gray-800">{cat}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
