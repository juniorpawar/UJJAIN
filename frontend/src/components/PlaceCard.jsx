// src/components/PlaceCard.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PlaceCard({ place, selected, onToggle }) {
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={`relative rounded-3xl overflow-hidden cursor-pointer border transition-all duration-300 bg-white/5 backdrop-blur-md
        ${selected
          ? "border-indigo-500 ring-4 ring-indigo-400/40"
          : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 shadow-lg"
        }
      `}
    >
      {/* Image Section */}
      <div className="absolute h-full w-full overflow-hidden">
        <img
          src={place.image || "/placeholder.jpg"}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

        {/* Bookmark Icon */}
        <div className="absolute top-3 right-3 bg-white/25 backdrop-blur-sm p-2 rounded-full cursor-pointer hover:bg-white/40 transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322a1 1 0 01.907 1.005v15.347a.5.5 0 01-.777.416L12 16.5l-5.723 3.59a.5.5 0 01-.777-.416V4.327a1 1 0 01.907-1.005A48.507 48.507 0 0112 3c1.892 0 3.787.107 5.593.322z"
            />
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-40 p-5 relative z-10">
        <h2 className="text-lg font-semibold text-white">
          {place.name}
          <span
            className={`ml-2 text-[0.7rem] px-2 py-1 rounded-full ${
              place.category === "temple"
                ? "bg-orange-400 text-white"
                : place.category === "ghat"
                ? "bg-blue-400 text-white"
                : place.category === "heritage"
                ? "bg-yellow-400 text-black"
                : place.category === "eateries"
                ? "bg-green-400 text-white"
                : "bg-gray-400 text-white"
            }`}
          >
            {place.category}
          </span>
        </h2>

        <p className="text-sm text-gray-300 mt-2 leading-relaxed">
          {place.description.slice(0, 100)}...
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-3 py-1 bg-white/10 text-gray-200 text-xs rounded-full">
            Bhasma Aarti
          </span>
          <span className="px-3 py-1 bg-white/10 text-gray-200 text-xs rounded-full">
            Historic Temple
          </span>
          <span className="px-3 py-1 bg-white/10 text-gray-200 text-xs rounded-full">
            +2 More
          </span>
        </div>

        {/* View More Button */}
        <Link
          to={`/place-details/${place.id}`}
          className="block w-full text-center mt-5 py-2 bg-orange-400 text-white font-semibold rounded-2xl shadow-md hover:bg-gray-200 transition-all"
        >
          View More
        </Link>
      </div>

      {/* Selection Badge */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full shadow-md"
        >
          Selected
        </motion.div>
      )}
    </motion.div>
  );
}
