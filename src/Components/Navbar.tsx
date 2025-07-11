import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUtensils, FaSearch } from "react-icons/fa";

function Navbar() {
  const [opened, setOpened] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        setScrolled(window.scrollY > 20);
      }
    };

    if (isHomePage) {
      setScrolled(window.scrollY > 20);
    } else {
      setScrolled(true);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Meals", path: "/meals" },
    { name: "Categories", path: "/categories" },
    { name: "Random Meal", path: "/random-meal" },
    { name: "AI Chef", path: "/ai-chef" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`top-0 left-0 right-0 px-4 lg:px-6 py-3 flex items-center justify-between z-50 transition-all duration-200 ${
        isHomePage
          ? scrolled
            ? "bg-white backdrop-blur-md shadow-lg fixed"
            : "bg-transparent fixed"
          : "bg-white backdrop-blur-md shadow-lg sticky"
      }`}
    >
      <Link to="/" className="flex items-center gap-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="w-10 h-10 flex items-center justify-center"
        >
          <FaUtensils
            className={`w-6 h-6 ${isHomePage && !scrolled ? "text-white" : "text-primary"
              }`}
          />
        </motion.div>
        <motion.span
          className={`text-xl lg:text-2xl font-bold ${isHomePage && !scrolled ? "text-white" : "text-text-dark"
            }`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          GUSTO'S MEALS
        </motion.span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`group relative font-medium flex items-center gap-2 ${isHomePage && !scrolled
              ? "text-white hover:text-primary"
              : "text-text-dark hover:text-primary"
              }`}
          >
            <span className="relative">
              {item.name}
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-200"
                initial={false}
                animate={{
                  width: location.pathname === item.path ? "100%" : "0%",
                }}
              />
            </span>
          </Link>
        ))}
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="hidden md:block w-full max-w-xs"
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            if (search.trim()) {
              navigate(`/search?q=${encodeURIComponent(search.trim())}`);
              setSearch("");
            }
          }}
        >
          <div className="relative">
            <input
              type="search"
              placeholder="Search recipes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={`w-full rounded-full border-2 ${isHomePage && !scrolled
                ? "border-white/20 bg-white/10 text-white placeholder-white/60"
                : "border-gray-200 bg-white/80 text-text-dark placeholder-gray-400"
                } py-2 pl-10 pr-4 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200`}
            />
            <FaSearch
              className={`absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 ${isHomePage && !scrolled ? "text-white/60" : "text-gray-400"
                }`}
              aria-hidden="true"
            />
          </div>
        </form>
      </motion.div>

      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className={`md:hidden p-2 rounded-lg ${opened
          ? "bg-primary text-white"
          : isHomePage && !scrolled
            ? "bg-white/10 text-white"
            : "bg-white text-text-dark"
          } shadow-md transition-all duration-200`}
        onClick={() => setOpened(!opened)}
        aria-expanded={opened}
        aria-label="Toggle menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
          <motion.span
            animate={{
              rotate: opened ? 45 : 0,
              y: opened ? 8 : 0,
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
              y: opened ? -8 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="w-5 h-0.5 bg-current rounded-full"
          />
        </div>
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[68px] left-0 right-0 bg-white backdrop-blur-md shadow-lg md:hidden z-[10000000000] "
          >
            <div className="flex flex-col p-4 h-full overflow-y-auto">
              {/* Mobile Search */}

              <div className="mb-4">
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    if (search.trim()) {
                      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
                      setSearch("");
                      setOpened(false);
                    }
                  }}
                >
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Search recipes..."

                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="w-full rounded-full border-2 border-gray-200 bg-white py-2 pl-10 pr-4 text-text-dark placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200"
                    />
                    <FaSearch
                      className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white"
                      aria-hidden="true"
                    />
                  </div>
                </form>
              </div>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpened(false)}
                    className="py-3 px-4 text-text-dark hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 flex items-center gap-3 text-lg"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
