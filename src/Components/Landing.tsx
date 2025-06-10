import { motion } from "framer-motion";

function Landing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-66px)] bg-text-black flex flex-col-reverse lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-16 py-12 gap-8 lg:gap-0"
    >
      {/* Text Content */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="z-10 lg:min-w-3xl text-center lg:text-left lg:ml-50 flex-1"
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Discover Tasty <span className="text-primary">Recipes</span>
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            From Around <span className="text-primary">the World</span>
          </motion.span>
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-cream text-lg sm:text-xl mt-6"
        >
          Explore delicious meals, cooking inspiration, and recipe details.
          Start your next culinary adventure today!
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#explore"
            className="bg-primary text-white px-6 py-3 rounded-full text-lg hover:bg-accent-vibrant transition-colors duration-300"
          >
            Explore Recipes
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#categories"
            className="bg-white text-text-black px-6 py-3 rounded-full text-lg hover:bg-cream transition-colors duration-300"
          >
            Browse Categories
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ x: 50, opacity: 0, rotate: 0 }}
        animate={{ x: 0, opacity: 1, rotate: 6 }}
        transition={{
          delay: 0.3,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="z-10 w-full max-w-xl lg:max-w-2xl transform lg:mr-50 flex justify-center items-center"
      >
        <motion.img
          whileHover={{ scale: 1.05, rotate: 8 }}
          whileTap={{ scale: 0.9, rotate: 8 }}
          transition={{ type: "spring", stiffness: 300 }}
          src="Images/pan.png"
          alt="Cooking Pan with Food"
          className="w-80 lg:w-full h-auto object-contain"
        />
      </motion.div>
    </motion.div>
  );
}

export default Landing;
