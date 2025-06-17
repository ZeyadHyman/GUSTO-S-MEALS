import { useLocation, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
  strCategory?: string;
}

interface MealsResponse {
  meals: Meal[] | null;
}

function useQueryParam(name: string) {
  const { search } = useLocation();
  return new URLSearchParams(search).get(name) || "";
}

async function fetchSearchResults(query: string): Promise<MealsResponse> {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch search results: ${response.statusText}`);
  }
  return response.json();
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, type: "spring", stiffness: 60 },
  }),
};

function Search() {
  const q = useQueryParam("q");
  const { data, error, isLoading } = useQuery({
    queryKey: ["search", q],
    queryFn: () => fetchSearchResults(q),
    enabled: !!q,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-primary/10 px-4 py-8">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Search Results for "{q}"
      </motion.h1>
      <div className="container mx-auto">
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center min-h-[300px]"
            >
              <svg
                className="animate-spin h-16 w-16 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Loading search results"
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
              className="flex flex-col items-center min-h-[300px]"
            >
              <div className="text-center bg-red-50 p-8 rounded-xl shadow-md">
                <p className="text-red-600 font-medium mb-4">
                  Error: {(error as Error).message}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          ) : !data?.meals ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 font-medium min-h-[200px]"
            >
              No recipes found for "{q}".
            </motion.div>
          ) : (
            <motion.div
              key="results"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16"
              initial="hidden"
              animate="visible"
              variants={{}}
            >
              {data.meals.map((meal, index) => (
                <motion.div
                  key={meal.idMeal}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  whileHover={{ scale: 1.04 }}
                  className="group bg-white/70 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full border border-primary/10"
                  style={{ boxShadow: "0 8px 32px 0 rgba(244,162,97,0.10)" }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      src={meal.strMealThumb}
                      alt={`Recipe: ${meal.strMeal}`}
                      loading="lazy"
                    />
                    {meal.strCategory && (
                      <span className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow group-hover:bg-primary/80 transition-colors z-10 backdrop-blur-md">
                        {meal.strCategory}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="text-center mt-5 text-xl font-semibold px-4 text-text-dark group-hover:text-primary transition-colors duration-300">
                    {meal.strMeal}
                  </div>
                  <div className="p-6 flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={`/recipe/${meal.idMeal}`}
                        className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-300 shadow-md"
                        aria-label={`View recipe for ${meal.strMeal}`}
                      >
                        View Recipe
                        <FaArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Search; 