import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUtensils, FaHome, FaQuestionCircle } from "react-icons/fa";
import {
  GiCookingPot,
  GiCookingGlove,
  GiKnifeFork,
  GiMeal,
} from "react-icons/gi";
import {
  MdRestaurant,
  MdLocalDining,
  MdFastfood,
  MdFreeBreakfast,
  MdLunchDining,
  MdDinnerDining,
} from "react-icons/md";

function NoPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const cookingIcons = [
    GiCookingPot,
    GiCookingGlove,
    GiKnifeFork,
    GiMeal,
    MdRestaurant,
    MdLocalDining,
    MdFastfood,
    MdFreeBreakfast,
    MdLunchDining,
    MdDinnerDining,
  ];

  const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * cookingIcons.length);
    return cookingIcons[randomIndex];
  };

  const iconPositions = [
    { x: "left-[10%]", y: "top-[20%]" },
    { x: "right-[15%]", y: "top-[30%]" },
    { x: "left-[20%]", y: "bottom-[25%]" },
    { x: "right-[25%]", y: "bottom-[35%]" },
    { x: "left-[5%]", y: "top-[60%]" },
    { x: "right-[5%]", y: "top-[40%]" },
  ];

  const FloatingIcon = ({
    size,
    delay,
    duration,
    x,
    y,
    opacity = 1,
  }: {
    size: string;
    delay: number;
    duration: number;
    x: string;
    y: string;
    opacity?: number;
  }) => {
    const Icon = getRandomIcon();
    const randomRotation = Math.random() > 0.5;
    const randomFloat = Math.random() > 0.5;
    const randomScale = Math.random() > 0.5 ? [1, 1.2, 1] : [1, 1.3, 1];
    const randomDuration = duration + Math.random() * 10 - 5;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity }}
        transition={{ delay }}
        className={`absolute ${x} ${y}`}
      >
        <motion.div
          animate={{
            rotate: randomRotation ? 360 : 0,
            scale: randomScale,
            y: randomFloat ? [0, -20, 0] : 0,
            x: randomFloat ? [0, 10, 0] : 0,
          }}
          transition={{
            duration: randomDuration,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`text-${size} text-primary`}
        >
          <Icon />
        </motion.div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-background relative overflow-hidden px-4"
    >
      {/* Floating Icons Background */}
      {[...Array(6)].map((_, index) => {
        const { x, y } = iconPositions[index];
        return (
          <FloatingIcon
            key={index}
            size={["xl", "2xl", "3xl", "4xl"][index % 4]}
            delay={1 + index * 0.2}
            duration={15 + index * 2}
            x={x}
            y={y}
            opacity={0.15 + index * 0.02}
          />
        );
      })}

      <motion.div
        variants={itemVariants}
        className="text-center relative z-10 max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] flex flex-col items-center"
      >
        <motion.div variants={iconVariants} className="mb-6 sm:mb-8">
          <FaQuestionCircle className="text-6xl sm:text-7xl md:text-8xl text-primary mx-auto" />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-4 sm:mb-6"
        >
          Oops! Page Not Found
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-10"
        >
          Looks like this recipe is still cooking...
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full"
        >
          <Link to="/" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-base sm:text-lg hover:bg-primary/90 transition-colors w-full sm:w-auto"
            >
              <FaHome />
              Back to Home
            </motion.button>
          </Link>
          <Link to="/recipes" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 bg-secondary text-white px-6 py-3 rounded-full text-base sm:text-lg hover:bg-secondary/90 transition-colors w-full sm:w-auto"
            >
              <FaUtensils />
              Browse Recipes
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default NoPage;
