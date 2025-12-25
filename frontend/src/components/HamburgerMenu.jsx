import { useState } from "react";
import MenuIcons from "./ui/MenuIcons";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 group"
      >
        <span
          className={`block h-0.5 w-6 bg-black rounded transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""
            }`}
        ></span>
        <span
          className={`block h-0.5 w-6 bg-black rounded transition-opacity duration-300 ${isOpen ? "opacity-0" : ""
            }`}
        ></span>
        <span
          className={`block h-0.5 w-6 bg-black rounded transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
        ></span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl p-4
  bg-linear-to-br from-white/10 to-white/5
  backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">

          <ul className="space-y-2 text-white font-medium">
            <li className="hover:text-orange-300 transition-colors cursor-pointer flex gap-2 items-center"><MenuIcons item="temple" /> Temples</li>
            <li className="hover:text-orange-300 transition-colors cursor-pointer flex gap-2 items-center"><MenuIcons item="ghaat" /> Ghaats</li>
            <li className="hover:text-orange-300 transition-colors cursor-pointer flex gap-2 items-center"><MenuIcons item="heritage" /> Heritage Sites</li>
            <li className="hover:text-orange-300 transition-colors cursor-pointer flex gap-2 items-center"><MenuIcons item="eatery" /> Eateries</li>
          </ul>
        </div>

      )}
    </div>
  );
}
