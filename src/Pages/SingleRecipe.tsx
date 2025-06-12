import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useMemo } from "react";

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
  [key: `strIngredient${number}`]: string;
  [key: `strMeasure${number}`]: string;
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

  const getIngredients = useMemo(
    () =>
      (mealData: SingleMeal): Ingredient[] => {
        const ingredients: Ingredient[] = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = mealData[`strIngredient${i}`];
          const measure = mealData[`strMeasure${i}`];
          if (
            ingredient &&
            typeof ingredient === "string" &&
            ingredient.trim() !== ""
          ) {
            ingredients.push({
              ingredient,
              measure: typeof measure === "string" ? measure : "",
            });
          }
        }
        return ingredients;
      },
    []
  );

  const mealWithIngredients = meal
    ? { ...meal, ingredients: getIngredients(meal) }
    : null;

  return (
    <div className="min-h-screen bg-cream text-text-dark font-sans py-12">
      {/* Loading State */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center min-h-[50vh] space-y-4"
        >
          <svg
            className="animate-spin h-10 w-10 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Loading recipe details"
          >
            <path
              d="M12 2V6M12 18V22M6 12H2M22 12H18M5.64 5.64L3.22 3.22M18.36 18.36L20.78 20.78M5.64 18.36L3.22 20.78M18.36 5.64L20.78 3.22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-lg font-medium text-text-dark">
            Loading recipe...
          </p>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-6 bg-cream rounded-2xl shadow-sm max-w-md mx-auto mt-8"
        >
          <p className="text-accent-vibrant font-medium mb-4">
            Error: {(error as Error).message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {/* Recipe Content */}
      {mealWithIngredients && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 py-10 max-w-5xl"
        >
          {/* Hero Section */}
          <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <img
              src={mealWithIngredients.strMealThumb || "/placeholder-image.jpg"}
              alt={mealWithIngredients.strMeal}
              className="w-full h-80 sm:h-96 object-cover object-center"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-none">
                {mealWithIngredients.strMeal}
              </h1>
            </div>
          </div>

          {/* Metadata and Ingredients */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Category & Area
              </h2>
              <p className="text-lg text-text-dark mb-2">
                <span className="font-semibold">Category:</span>{" "}
                {mealWithIngredients.strCategory}
              </p>
              <p className="text-lg text-text-dark">
                <span className="font-semibold">Area:</span>{" "}
                {mealWithIngredients.strArea}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Ingredients
              </h2>
              <ul className="list-disc list-inside space-y-2 text-text-dark">
                {mealWithIngredients.ingredients.map((item, index) => (
                  <li key={index} className="text-base">
                    <span className="font-medium">{item.ingredient}</span>:{" "}
                    {item.measure}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Instructions
            </h2>
            {mealWithIngredients.strInstructions
              .split("\r\n\r\n")
              .map((paragraph, index) => (
                <p key={index} className="mb-3 text-text-dark leading-relaxed">
                  <span className="font-semibold text-primary mr-2">
                    {index + 1}.
                  </span>
                  {paragraph}
                </p>
              ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {mealWithIngredients.strYoutube && (
              <motion.a
                href={mealWithIngredients.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-6 py-3 bg-accent-vibrant text-white font-medium rounded-lg shadow-sm hover:bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-vibrant focus:ring-offset-2"
                aria-label="Watch recipe video on YouTube"
              >
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
                className="flex items-center justify-center px-6 py-3 bg-secondary text-white font-medium rounded-lg shadow-sm hover:bg-text-dark transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                aria-label="View recipe source"
              >
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
