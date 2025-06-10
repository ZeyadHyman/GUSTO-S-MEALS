import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";

function Navbar() {
  const [opened, setOpened] = useState(false);

  const menuItems = ["Meals", "Categories", "Random Meals"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="px-6 py-3 flex items-center font-bold bg-background justify-between relative z-50"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="text-2xl lg:text-4xl text-text-dark whitespace-nowrap flex items-center gap-2"
      >
        <FaUtensils className="text-primary" />
        <Link to={"/"}>GUSTO'S MEALS</Link>
      </motion.div>

      {/* Navigation Links (Desktop) */}
      <nav className="hidden lg:flex justify-center space-x-16 text-xl cursor-pointer text-black pl-20">
        {menuItems.map((item) => (
          <motion.div
            key={item}
            whileHover={{ scale: 1.1, color: "#F4A261" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="hover:text-[#F4A261] transition-colors duration-100"
          >
            {item}
          </motion.div>
        ))}
      </nav>

      {/* Search Bar (Desktop) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-xs lg:max-w-sm hidden lg:block"
      >
        <form>
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <motion.input
              whileFocus={{ scale: 1.02 }}
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
      </motion.div>

      {/* Mobile Menu Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className={`flex flex-col space-y-1 p-2 m-2 rounded-md lg:hidden bg-gradient-to-r from-cream to-background hover:from-accent hover:to-primary shadow-md transition-all duration-300 ${
          opened ? "border-none" : "border border-text-dark"
        }`}
        onClick={() => setOpened(!opened)}
        aria-expanded={opened}
        aria-label="Toggle menu"
      >
        <motion.div
          animate={{
            rotate: opened ? 45 : 0,
            y: opened ? 8 : 0,
          }}
          className="w-8 h-1 bg-text-black rounded-full"
        />
        <motion.div
          animate={{
            opacity: opened ? 0 : 1,
          }}
          className="w-8 h-1 bg-text-black rounded-full"
        />
        <motion.div
          animate={{
            rotate: opened ? -45 : 0,
            y: opened ? -8 : 0,
          }}
          className="w-8 h-1 bg-text-black rounded-full"
        />
      </motion.button>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-full left-0 w-full bg-background text-text-dark px-6 pb-4 pt-2 space-y-4 lg:hidden shadow-md z-40"
          >
            {menuItems.map((item) => (
              <motion.div
                key={item}
                whileHover={{ x: 10, color: "#F4A261" }}
                className="text-lg hover:text-[#F4A261] transition-colors duration-200"
                onClick={() => setOpened(false)}
              >
                {item}
              </motion.div>
            ))}

            <form className="pt-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-md border font-normal border-gray-300 bg-white py-2 pl-10 pr-4 text-text-dark placeholder-text-dark focus:border-accent-vibrant focus:ring-2 focus:ring-accent-vibrant focus:outline-none"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-dark" />
              </motion.div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Navbar;
