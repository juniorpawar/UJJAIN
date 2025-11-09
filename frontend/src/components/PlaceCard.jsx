// src/components/PlaceCard.jsx

import { motion } from "framer-motion";

export default function PlaceCard({ place, selected, onToggle }) {
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onToggle}
      className={`relative rounded-2xl overflow-hidden cursor-pointer shadow-md border transition-all duration-300
        ${
          selected
            ? "border-indigo-500 ring-4 ring-indigo-400/40"
            : "border-gray-200 dark:border-gray-700 hover:border-indigo-300"
        }
      `}
    >
      <div className="h-40 w-full overflow-hidden">
        <span
          className={`
    absolute right-3 top-2 shadow-md text-[0.7rem] capitalize px-2 py-1 rounded-lg
    ${
      place.category === "temple"
        ? "bg-orange-400 text-white dark:bg-orange-700"
        : place.category === "ghat"
        ? "bg-blue-400 text-white dark:bg-blue-700"
        : place.category === "heritage"
        ? "bg-yellow-400 text-black dark:bg-yellow-700 dark:text-gray-900"
        : place.category === "eateries"
        ? "bg-green-400 text-white dark:bg-green-700"
        : "bg-gray-400 text-white dark:bg-gray-700"
    }
  `}
        >
          {place.category}
        </span>

        <img
          src={place.image || "/placeholder.jpg"}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      <div className="p-4 flex flex-col items-start">
        <h2 className="text-lg font-semibold">{place.name}</h2>
        <p className="text-xs text-gray-400 mt-1">
          {place.description.slice(0, 100)} ...
        </p>
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full shadow-md"
        >
          Selected
        </motion.div>
      )}
    </motion.div>
  );
}
