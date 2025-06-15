import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaYoutube,
  FaExternalLinkAlt,
  FaUtensils,
} from "react-icons/fa";

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
  [key: string]: any;
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

async function fetchSingleRandomRecipe(): Promise<SingleMealResponse> {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/random.php`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch random recipe: ${response.statusText}`);
  }
  return response.json();
}

function SingleRecipe() {
  const { idMeal } = useParams<{ idMeal: string }>();

  const { data, error, isLoading } = useQuery({
    queryKey: ["singleMeal", idMeal],
    queryFn: () =>
      idMeal ? fetchSingleRecipe(idMeal) : fetchSingleRandomRecipe(),
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
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Loading State with Skeleton */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center min-h-[50vh] space-y-4"
        >
          <div className="w-full max-w-3xl space-y-4">
            <div className="h-80 bg-gray-200 animate-pulse rounded-2xl"></div>
            <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-200 animate-pulse rounded"
                ></div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-red-50 rounded-2xl shadow-lg max-w-md mx-auto mt-12 border border-red-200"
        >
          <p className="text-red-700 font-semibold mb-6 text-lg">
            Error: {(error as Error).message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            aria-label="Retry loading recipe"
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
          className="container mx-auto px-4 py-12 max-w-7xl"
        >
          {/* Hero Section */}
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden mb-10 group">
            <motion.img
              src={mealWithIngredients.strMealThumb}
              alt={mealWithIngredients.strMeal}
              className="w-full h-80 sm:h-96 object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 bg-teal-600 text-white text-sm rounded-full shadow">
                {mealWithIngredients.strCategory}
              </span>
              <span className="px-3 py-1 bg-amber-600 text-white text-sm rounded-full shadow">
                {mealWithIngredients.strArea}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-md">
                {mealWithIngredients.strMeal}
              </h1>
            </div>
          </div>

          {/* Two-Column Layout for Ingredients and Instructions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ingredients (Sticky on Desktop) */}
            <div className="lg:sticky lg:top-24 bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-amber-700 mb-6">
                Ingredients
              </h2>
              <div className="space-y-3">
                {mealWithIngredients.ingredients.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <FaUtensils className="h-4 w-4 text-teal-600" />
                    <span className="font-medium">{item.ingredient}</span>
                    <span className="text-gray-500">({item.measure})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-amber-700 mb-6">
                Instructions
              </h2>
              {mealWithIngredients.strInstructions
                .split("\r\n")
                .filter((p) => p.trim() !== "")
                .map((paragraph, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 mb-4 p-3 rounded-lg ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-amber-600 text-white rounded-full font-semibold">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{paragraph}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            {mealWithIngredients.strYoutube && (
              <motion.a
                href={mealWithIngredients.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-8 py-4 bg-amber-600 text-white font-semibold rounded-lg shadow-md hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
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
                className="flex items-center justify-center px-8 py-4 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                aria-label="View original recipe source"
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
