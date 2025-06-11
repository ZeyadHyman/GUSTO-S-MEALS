import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";

function Navbar() {
  const [opened, setOpened] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Meals", path: "/meals" },
    { name: "Categories", path: "/categories" },
    { name: "Random Meals", path: "/random" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    setScrolled(location.pathname !== "/" || window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`fixed top-0 left-0 right-0 px-6 py-4 flex items-center justify-between z-50 transition-all duration-200 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="text-2xl lg:text-3xl font-bold whitespace-nowrap flex items-center gap-2"
      >
        <FaUtensils className="text-primary" />
        <Link
          to="/"
          className="hover:text-primary transition-colors duration-200"
        >
          <span className={`${scrolled ? "text-text-dark" : "text-white"}`}>
            GUSTO'S MEALS
          </span>
        </Link>
      </motion.div>

      {/* Navigation Links (Desktop) */}
      <nav className="hidden lg:flex items-center space-x-12 text-lg">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`relative group ${
              location.pathname === item.path
                ? "text-primary"
                : scrolled
                ? "text-text-dark"
                : "text-white"
            }`}
          >
            <span className="relative">
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

      {/* Search Bar (Desktop) */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="hidden lg:block w-full max-w-xs"
      >
        <form>
          <div className="relative">
            <input
              type="search"
              placeholder="Search recipes..."
              className="w-full rounded-full border-2 border-gray-200 bg-white/80 py-2 pl-10 pr-4 text-text-dark placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200"
            />
            <FiSearch
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </form>
      </motion.div>

      {/* Mobile Menu Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className={`lg:hidden p-2 rounded-lg ${
          opened
            ? "bg-primary text-white"
            : scrolled
            ? "bg-white text-text-dark"
            : "bg-white/10 text-white"
        } shadow-md transition-all duration-200`}
        onClick={() => setOpened(!opened)}
        aria-expanded={opened}
        aria-label="Toggle menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
          <motion.span
            animate={{
              rotate: opened ? 45 : 0,
              y: opened ? 10 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="w-5 h-0.5 bg-current rounded-full"
          />
          <motion.span
            animate={{
              opacity: opened ? 0 : 1,
            }}
            transition={{ duration: 0.1 }}
            className="w-5 h-0.5 bg-current rounded-full"
          />
          <motion.span
            animate={{
              rotate: opened ? -45 : 0,
              y: opened ? -5 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="w-5 h-0.5 bg-current rounded-full"
          />
        </div>
      </motion.button>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg px-6 py-4 space-y-4 lg:hidden"
          >
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block text-lg ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-text-dark hover:text-primary"
                } transition-colors duration-200`}
                onClick={() => setOpened(false)}
              >
                {item.name}
              </Link>
            ))}

            <form className="pt-2">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search recipes..."
                  className="w-full rounded-full border-2 border-gray-200 bg-white py-2 pl-10 pr-4 text-text-dark placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Navbar;
