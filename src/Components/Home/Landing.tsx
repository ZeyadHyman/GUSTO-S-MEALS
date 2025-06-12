import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div
      className="min-h-screen relative pt-10 lg:pt-0"
      style={{
        background: `linear-gradient(to bottom, var(--color-text-black), var(--color-text-dark), var(--color-text-black))`,
      }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="relative min-h-screen flex flex-col-reverse lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-16 py-12 gap-8 lg:gap-0 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at center, var(--color-primary) 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent)`,
            }}
          />
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="z-10 lg:min-w-3xl text-center lg:text-left lg:ml-50 flex-1 mt-8 lg:mt-0"
        >
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              Discover Tasty{" "}
              <span className="text-primary relative">
                Recipes
                <motion.span
                  className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-primary/50"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="block mt-2"
            >
              From Around{" "}
              <span className="text-primary relative">
                the World
                <motion.span
                  className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-primary/50"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                />
              </span>
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="text-cream text-base sm:text-lg lg:text-xl mt-6 sm:mt-8 max-w-2xl mx-auto lg:mx-0"
          >
            Explore delicious meals, cooking inspiration, and recipe details.
            Start your next culinary adventure today!
          </motion.p>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.3 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4"
          >
            <Link
              to="/meals"
              className="group relative bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
            >
              <span className="relative z-10">Explore Recipes</span>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  background: `linear-gradient(to right, var(--color-primary), var(--color-accent-vibrant))`,
                }}
                initial={false}
                whileHover={{ scale: 1.05 }}
              />
            </Link>
            <Link
              to="/categories"
              className="group relative bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold overflow-hidden transition-all duration-200 hover:bg-white/20"
            >
              <span className="relative z-10">Browse Categories</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="z-10 w-full max-w-[280px] sm:max-w-xl lg:max-w-2xl transform lg:mr-50 flex justify-center items-center"
        >
          <motion.div
            whileHover={{ scale: 1.02, rotate: 1 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 rounded-full blur-3xl"
              style={{
                background: `var(--color-primary)`,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <img
              src="Images/pan.png"
              alt="Cooking Pan with Food"
              className="relative w-full h-auto object-contain"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Landing;
