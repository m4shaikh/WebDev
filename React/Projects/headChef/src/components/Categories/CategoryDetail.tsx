import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../api/axios";

import RecipeCard from "../Recipes/RecipeCard";

import type { Category } from "../../Types/types";
import type { Recipe } from "../../Types/types";

const CategoryDetail = () => {
    const { categoryId } = useParams();

    const [category, setCategory] =
        useState<Category | null>(null);

    const [recipes, setRecipes] =
        useState<Recipe[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const fetchCategoryRecipes = async () => {
            try {
                const response = await api.get(
                    `/categories/${categoryId}`
                );

                setCategory(response.data.category);

                setRecipes(response.data.recipes);
                

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
                
            }
        };

        fetchCategoryRecipes();
    }, [categoryId]);

    if (loading) {
        return (
            <div className="pt-26 text-center">
                Loading...
            </div>
        );
    }
    console.log(category)
    console.log(recipes)
    return (
        <div className="pt-26 min-h-screen bg-bg-100 p-6">

            {/* Hero */}
            
            <div className="relative h-[350px] rounded-3xl overflow-hidden shadow-xl">

                <img
                    src={category?.image}
                    alt={category?.name}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute bottom-0 p-8 text-white">

                    <span className="text-5xl">
                        {category?.icon}
                    </span>

                    <h1 className="text-6xl font-bold mt-2">
                        {category?.name}
                    </h1>

                    <p className="text-xl text-white/80 mt-2">
                        {recipes.length} Recipes Available
                    </p>

                </div>

            </div>

            {/* Recipes */}

            <div className="mt-12">

                <h2 className="text-4xl font-bold mb-8">
                    Recipes
                </h2>

                <div className="grid lg:grid-cols-4 gap-6">

                    {recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            {...recipe}
                        />
                    ))}

                </div>

            </div>

        </div>
    );
};

export default CategoryDetail;