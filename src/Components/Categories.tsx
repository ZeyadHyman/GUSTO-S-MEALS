import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom"; // Assuming React Router for navigation
import { motion, AnimatePresence } from "framer-motion"; // For animations

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface CategoriesResponse {
  categories: Category[];
}

async function fetchCategories(): Promise<CategoriesResponse> {
  // Removed artificial delay for production; uncomment for testing
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }
  return response.json();
}

function Categories() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2, // Retry failed requests twice
  });

  const mainCategories = data?.categories.slice(0, 5) || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-text-dark mb-3">
          Featured Categories
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Discover our handpicked selection of popular recipe categories
        </p>
      </motion.div>

      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center min-h-[400px]"
          >
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              <span className="sr-only">Loading categories...</span>
            </div>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center min-h-[400px]"
          >
            <div className="text-center bg-red-50 p-6 rounded-lg">
              <p className="text-red-600 font-medium">
                Error: {(error as Error).message}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            <motion.div
              key="categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12"
            >
              {mainCategories.map((category) => (
                <motion.div
                  key={category.idCategory}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.strCategoryThumb}
                      alt={`Category: ${category.strCategory}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-text-dark mb-2 group-hover:text-primary transition-colors duration-300">
                      {category.strCategory}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {category.strCategoryDescription}
                    </p>
                    <Link
                      to={`/recipes/${category.strCategory.toLowerCase()}`}
                      className="block w-full px-4 py-2 text-center bg-primary text-white rounded-lg hover:bg-primary/90 hover:shadow-md active:scale-95 transition-all duration-300"
                      aria-label={`View recipes for ${category.strCategory}`}
                    >
                      View Recipes
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <Link
                to="/categories"
                className="inline-block px-8 py-3 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white hover:shadow-lg transition-all duration-300"
                aria-label="View all recipe categories"
              >
                Explore All Categories
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Categories;
