import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Categories from "./Components/Categories";
import Recipes from "./Pages/Recipes";
import ScrollToTop from "./Components/ScrollToTop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./Pages/Home";
import AllCategories from "./Pages/AllCategories";
import NoPage from "./Pages/NoPage";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<AllCategories />} />
            <Route path="/recipes/:category" element={<Recipes />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
          <ScrollToTop />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
