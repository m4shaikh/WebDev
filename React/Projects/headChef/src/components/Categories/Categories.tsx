import { useEffect, useState } from "react";
import api from "../../api/axios";

import CategoryCard from "./CategoryCard";
import type { Category } from "./Caegory";


const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");

        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();

    
  }, []);

  return (
    <div className="pt-26 min-h-screen bg-bg-100 p-6 font-sour">
      
      {/* Heading */}
      <div className="mb-10">
        <span className="text-orange-500">
          🍽 Browse Recipes
        </span>

        <h1 className="text-5xl font-bold mt-2">
          Categories
        </h1>

        <p className="text-text-100 mt-3">
          Explore recipes by cuisine and cooking style.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-xl">
          Loading Categories...
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">

          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            /> ))
          }

        </div>
      )}
    </div>
  );
};

export default Categories;