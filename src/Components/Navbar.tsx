import { useState } from "react";
import { FiSearch } from "react-icons/fi";

function Navbar() {
  const [opened, setOpened] = useState(false);

  const menuItems = ["Meals", "Categories", "Random Meals"];

  return (
    <div className="px-6 py-3 flex items-center font-bold bg-background justify-between relative z-50">
      {/* Logo */}
      <div className="text-2xl lg:text-4xl text-text-dark whitespace-nowrap">
        GUSTO'S MEALS
      </div>

      {/* Navigation Links (Desktop) */}
      <nav className="hidden lg:flex justify-center space-x-16 text-xl cursor-pointer text-black pl-20">
        {menuItems.map((item) => (
          <div
            key={item}
            className="hover:text-[#F4A261] transition-colors duration-200"
          >
            {item}
          </div>
        ))}
      </nav>

      {/* Search Bar (Desktop) */}
      <div className="w-full max-w-xs lg:max-w-sm hidden lg:block">
        <form>
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <input
              id="search"
              type="search"
              placeholder="Search..."
              className="block w-full rounded-md border font-normal border-gray-300 bg-white py-2 pl-10 pr-4 text-text-dark placeholder-text-dark focus:border-accent-vibrant focus:ring-2 focus:ring-accent-vibrant focus:outline-none"
            />
            <FiSearch
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-dark"
              aria-hidden="true"
              size={20}
            />
          </div>
        </form>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        className={`flex flex-col space-y-1 p-2 m-2 rounded-md lg:hidden bg-gradient-to-r from-cream to-background hover:from-accent hover:to-primary shadow-md transition-all duration-300 ${
          opened ? "border-none" : "border border-text-dark"
        }`}
        onClick={() => setOpened(!opened)}
        aria-expanded={opened}
        aria-label="Toggle menu"
      >
        <div
          className={`w-8 h-1 bg-text-black rounded-full transition-transform duration-300 ease-in-out ${
            opened ? "-rotate-45 translate-y-2" : "rotate-0"
          }`}
        ></div>
        <div
          className={`w-8 h-1 bg-text-black rounded-full transition-opacity duration-300 ease-in-out ${
            opened ? "opacity-0" : "opacity-100"
          }`}
        ></div>
        <div
          className={`w-8 h-1 bg-text-black rounded-full transition-transform duration-300 ease-in-out ${
            opened ? "rotate-45 -translate-y-2" : "rotate-0"
          }`}
        ></div>
      </button>

      {/* Mobile Menu Panel */}
      {opened && (
        <div className="absolute top-full left-0 w-full bg-background text-text-dark px-6 pb-4 pt-2 space-y-4 lg:hidden shadow-md z-40">
          {menuItems.map((item) => (
            <div
              key={item}
              className="text-lg hover:text-[#F4A261] transition-colors duration-200"
              onClick={() => setOpened(false)}
            >
              {item}
            </div>
          ))}

          <form className="pt-2">
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                className="w-full rounded-md border font-normal border-gray-300 bg-white py-2 pl-10 pr-4 text-text-dark placeholder-text-dark focus:border-accent-vibrant focus:ring-2 focus:ring-accent-vibrant focus:outline-none"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-dark" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Navbar;
