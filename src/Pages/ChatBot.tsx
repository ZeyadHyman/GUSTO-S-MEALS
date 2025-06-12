import { FaRobot, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ChatBot() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-background px-4"
    >
      <motion.div
        variants={itemVariants}
        className="text-center max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] flex flex-col items-center"
      >
        <div className="relative">
          <div className="w-32 h-32 mx-auto mb-8 border-4 border-secondary rounded-full animate-spin border-t-transparent border-b-transparent flex justify-center items-center"></div>
          <FaRobot className="text-5xl text-primary absolute top-10 right-10" />
        </div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6"
        >
          AI Chef Assistant
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8"
        >
          Our AI Chef is currently in the kitchen, preparing something special
          for you. Coming soon to revolutionize your cooking experience!
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-lg hover:bg-primary/90 transition-colors"
            >
              <FaHome />
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ChatBot;
