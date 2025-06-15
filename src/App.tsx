import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Recipes from "./Pages/Recipes";
import ScrollToTop from "./Components/ScrollToTop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./Pages/Home";
import AllCategories from "./Pages/AllCategories";
import NoPage from "./Pages/NoPage";
import ChatBot from "./Pages/ChatBot";
import SingleRecipe from "./Pages/SingleRecipe";
import Footer from "./Components/Footer";

function App() {
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<AllCategories />} />
            <Route path="/recipes/:category" element={<Recipes />} />
            <Route path="/ai-chef" element={<ChatBot />} />
            <Route path="/recipe/:idMeal" element={<SingleRecipe />} />
            <Route path="/random-meal" element={<SingleRecipe />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
          <ScrollToTop />
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
