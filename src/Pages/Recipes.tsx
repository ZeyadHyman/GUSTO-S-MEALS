import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

interface MealsResponse {
  meals: Meal[] | null;
}

async function fetchMeals(category: string): Promise<MealsResponse> {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
      category
    )}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch meals: ${response.statusText}`);
  }
  return response.json();
}

function Recipes() {
  const { category } = useParams<{ category: string }>();
  const { data, error, isLoading } = useQuery({
    queryKey: ["meals", category],
    queryFn: () => fetchMeals(category!),
    enabled: !!category,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-24"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-white"
        >
          <h1 className="text-5xl font-bold mb-4 capitalize">
            {category} Recipes
          </h1>
          <p className="text-lg max-w-lg mx-auto font-sans">
            Discover mouthwatering {category} dishes to satisfy your cravings
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center min-h-[400px]"
            >
              <svg
                className="animate-spin h-16 w-16 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Loading recipes"
              >
                <path
                  d="M12 2V6M12 18V22M6 12H2M22 12H18M5.64 5.64L3.22 3.22M18.36 18.36L20.78 20.78M5.64 18.36L3.22 20.78M18.36 5.64L20.78 3.22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center min-h-[400px]"
            >
              <div className="text-center bg-red-50 p-8 rounded-xl shadow-md">
                <p className="text-red-600 font-medium mb-4">
                  Error: {(error as Error).message}
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
                  >
                    Try Again
                  </button>
                  <Link
                    to="/categories"
                    className="px-6 py-2 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
                  >
                    Back to Categories
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            <div>
              <motion.div
                key="recipes"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16"
              >
                {data?.meals?.map((meal, index) => (
                  <motion.div
                    key={meal.idMeal}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    whileHover={{ scale: 1.03 }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
                      <div className="relative  overflow-hidden">
                        <img
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          src={meal.strMealThumb}
                          alt={`Recipe: ${meal.strMeal}`}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="text-center mt-5 text-xl px-4"> {meal.strMeal}</div>

                      <div className="p-6 flex flex-col items-center">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            to={`/recipe/${meal.idMeal}`}
                            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-300"
                            aria-label={`View recipe for ${meal.strMeal}`}
                          >
                            View Recipe
                            <FaArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Link
                  to="/categories"
                  className="inline-block px-10 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 hover:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300"
                  aria-label="Return to all recipe categories"
                >
                  Back to Categories
                </Link>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Recipes;
