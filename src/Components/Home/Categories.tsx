import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";

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
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const mainCategories = data?.categories.slice(0, 5) || [];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  const CategoryCard = ({
    category,
    index,
  }: {
    category: Category;
    index: number;
  }) => (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={{ scale: 1.03 }}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full"
    >
      <Link
        to={`/recipes/${category.strCategory.toLowerCase()}`}
        aria-label={`View recipes for ${category.strCategory}`}
      >
        <div className="relative h-56 overflow-hidden">
          <img
            src={category.strCategoryThumb}
            alt={`Category: ${category.strCategory}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="absolute top-4 left-4 bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full group-hover:bg-primary/80 transition-colors">
            {category.strCategory}
          </span>
        </div>
        <div className="p-6">
          <p className="text-gray-600 text-sm mb-4 font-sans line-clamp-3">
            {category.strCategoryDescription}
          </p>
          <h1 className="block w-full px-4 py-2 text-center bg-primary text-white rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95 transition-all duration-300">
            View Recipes
          </h1>
        </div>
      </Link>
    </motion.div>
  );

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
          <h1 className="text-2xl lg:text-5xl font-bold mb-4">
            Explore Our Recipe Categories
          </h1>
          <p className="text-xl max-w-lg mx-auto font-sans px-3">
            Dive into a world of flavors with our curated selection of dishes
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto lg:px-4 py-5 lg:py-16">
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
                aria-label="Loading categories"
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
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Mobile Swiper */}
              <div className="md:hidden mb-10 px-4 ">
                <Swiper
                  modules={[Autoplay, EffectCards]}
                  spaceBetween={10}
                  slidesPerView={1.4}
                  centeredSlides={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  className="h-[400px]"
                >
                  {mainCategories.map((category, index) => (
                    <SwiperSlide key={category.idCategory} className="scale-95">
                      <CategoryCard category={category} index={index} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Desktop Grid */}
              <motion.div
                key="categories"
                className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-10"
              >
                {mainCategories.map((category, index) => (
                  <CategoryCard
                    key={category.idCategory}
                    category={category}
                    index={index}
                  />
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
                  aria-label="View all recipe categories"
                >
                  Explore All Categories
                </Link>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Categories;
