import { useQuery } from "@tanstack/react-query";

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
  return response.json();
}

function Categories() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const mainCategories = data?.categories.slice(0, 5) || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-500">Error: {(error as Error).message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-text-dark mb-2">
          Featured Categories
        </h2>
        <p className="text-gray-600">
          Explore our most popular recipe categories
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {mainCategories.map((category) => (
          <div
            key={category.idCategory}
            className="group bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="h-40 overflow-hidden rounded-t-lg">
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-text-dark mb-2 transition-colors duration-300 group-hover:text-primary">
                {category.strCategory}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {category.strCategoryDescription}
              </p>
              <button className="cursor-pointer w-full px-4 py-2 bg-primary text-white rounded transition-all duration-300 hover:bg-primary/90 hover:shadow-md active:scale-95">
                View Recipes
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="px-6 py-2 cursor-pointer bg-white border border-primary text-primary rounded transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-md active:scale-95">
          View All Categories
        </button>
      </div>
    </div>
  );
}

export default Categories;
