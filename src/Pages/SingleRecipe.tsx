import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaYoutube, FaExternalLinkAlt, FaSpinner } from "react-icons/fa";

interface Ingredient {
  ingredient: string;
  measure: string;
}

interface SingleMeal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  strSource: string;
  [key: string]: any; // For dynamic access to strIngredient and strMeasure
}

interface SingleMealResponse {
  meals: SingleMeal[] | null;
}

async function fetchSingleRecipe(idMeal: string): Promise<SingleMealResponse> {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(
      idMeal
    )}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch recipe: ${response.statusText}`);
  }
  return response.json();
}

function SingleRecipe() {
  const { idMeal } = useParams<{ idMeal: string }>();

  const { data, error, isLoading } = useQuery({
    queryKey: ["singleMeal", idMeal],
    queryFn: () => fetchSingleRecipe(idMeal!),
    enabled: !!idMeal,
  });

  const meal = data?.meals ? data.meals[0] : null;

  const mealWithIngredients = meal
    ? {
        ...meal,
        ingredients: Array.from({ length: 20 }, (_, i) => {
          const ingredient = meal[`strIngredient${i + 1}`]?.trim();
          const measure = meal[`strMeasure${i + 1}`]?.trim();
          return ingredient ? { ingredient, measure: measure || "" } : null;
        }).filter((item): item is Ingredient => !!item),
      }
    : null;

  return (
    <div className="text-gray-100">
      {/* Loading State */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center min-h-[50vh] space-y-4"
        >
          <FaSpinner
            className="animate-spin h-10 w-10 text-amber-600"
            aria-label="Loading recipe details"
          />
          <p className="text-lg font-medium text-gray-700">
            Loading recipe...
          </p>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-6 bg-red-100 rounded-2xl shadow-sm max-w-md mx-auto mt-8"
        >
          <p className="text-red-700 font-medium mb-4">
            Error: {(error as Error).message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {/* Main Recipe Content */}
      {mealWithIngredients && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 py-10 max-w-7xl"
        >
          {/* Hero Image */}
          <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <img
              src={mealWithIngredients.strMealThumb || "/placeholder-image.jpg"}
              alt={mealWithIngredients.strMeal}
              className="w-full h-80 sm:h-96 object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {mealWithIngredients.strMeal}
              </h1>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold text-amber-600 mb-1 tracking-wide flex items-center gap-2">
                  <span>🌍</span>
                  <span>Country</span>
                </h2>
                <p className="text-gray-800 text-base leading-relaxed">
                  {mealWithIngredients.strArea || "N/A"}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-amber-600 mb-1 tracking-wide flex items-center gap-2">
                  <span>🍴</span>
                  <span>Category</span>
                </h2>
                <p className="text-gray-800 text-base leading-relaxed">
                  {mealWithIngredients.strCategory || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-amber-700 mb-4">
              Ingredients
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mealWithIngredients.ingredients.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <span className="text-amber-600">•</span>
                  <span className="font-medium">{item.ingredient}</span>
                  <span className="text-gray-500">
                    ({item.measure})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-amber-700 mb-4">
              Instructions
            </h2>
            {mealWithIngredients.strInstructions
              .split("\r\n")
              .filter((p) => p.trim() !== "")
              .map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-3 text-gray-700 leading-relaxed"
                >
                  <span className="text-amber-600 font-medium mr-2">
                    {index + 1}.
                  </span>
                  {paragraph}
                </p>
              ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            {mealWithIngredients.strYoutube && (
              <motion.a
                href={mealWithIngredients.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-6 py-3 bg-amber-600 text-white font-medium rounded-lg shadow-sm hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                aria-label="Watch recipe video on YouTube"
              >
                <FaYoutube className="h-5 w-5 mr-2" />
                Watch on YouTube
              </motion.a>
            )}
            {mealWithIngredients.strSource && (
              <motion.a
                href={mealWithIngredients.strSource}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg shadow-sm hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                aria-label="View recipe source"
              >
                <FaExternalLinkAlt className="h-5 w-5 mr-2" />
                View Source
              </motion.a>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default SingleRecipe;
