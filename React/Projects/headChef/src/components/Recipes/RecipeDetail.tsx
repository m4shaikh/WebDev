import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../api/axios";

interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
}

interface Step {
    step_number: number;
    instruction: string;
    duration: number;
    special_note?: string;
}

interface RecipeDetailData {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    thumbnail: string;
    calories: number;
    views: number;
    cooked: number;
    cooking_time: number;
    ingredients: Ingredient[];
    steps: Step[];
}

const RecipeDetail = () => {
    const { recipeId } = useParams();

    const [recipe, setRecipe] =
        useState<RecipeDetailData | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await api.get(
                    `/recipes/${recipeId}/`
                );

                setRecipe(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        const countView = async () =>{
            try {
                await api.post(
                    `/recipes/${recipeId}/view/`
                )
            } catch(error){
                console.log(error)
            }
        }
        fetchRecipe();
        countView();
    }, [recipeId]);

    if (loading) {
        return (
            <div className="pt-26 text-center">
                Loading...
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="pt-26 text-center">
                Recipe not found
            </div>
        );
    }
    console.log(recipe)
    return (
        <div className="pt-26 min-h-screen bg-bg-100 p-6">

            {/* Hero */}

            <div className="relative h-[500px] rounded-3xl overflow-hidden">

                <img
                    src={recipe.thumbnail}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 p-8 text-white">

                    <h1 className="text-6xl font-bold">
                        {recipe.title}
                    </h1>

                    <div className="flex gap-6 mt-4">

                        <span>
                            ⏱ {recipe.cooking_time} min
                        </span>

                        <span>
                            🔥 {recipe.calories} kcal
                        </span>

                        <span>
                            🌶 {recipe.difficulty}
                        </span>

                    </div>

                </div>

            </div>

            {/* Description */}

            <div className="bg-white rounded-3xl p-8 mt-8 shadow">

                <h2 className="text-3xl font-bold mb-4">
                    Description
                </h2>

                <p>
                    {recipe.description}
                </p>

            </div>

            {/* Ingredients */}

            <div className="bg-white rounded-3xl p-8 mt-8 shadow">

                <h2 className="text-3xl font-bold mb-6">
                    Ingredients
                </h2>

                <div className="grid md:grid-cols-2 gap-4">

                    {recipe.ingredients.map((ingredient) => (
                        <div
                            key={ingredient.name}
                            className="
                flex
                justify-between
                p-4
                bg-bg-100
                rounded-xl
              "
                        >
                            <span>
                                {ingredient.name}
                            </span>

                            <span>
                                {ingredient.quantity}
                                {ingredient.unit}
                            </span>
                        </div>
                    ))}

                </div>

            </div>

            {/* Steps */}

            <div className="mt-8">

                <h2 className="text-4xl font-bold mb-6">
                    Cooking Steps
                </h2>

                <div className="flex flex-col gap-6">

                    {recipe.steps.map((step) => (
                        <div
                            key={step.step_number}
                            className="
                bg-white
                rounded-3xl
                p-8
                shadow
              "
                        >

                            <div className="flex items-center gap-4">

                                <div
                                    className="
                    w-12
                    h-12
                    rounded-full
                    bg-orange-500
                    text-white
                    flex
                    items-center
                    justify-center
                    font-bold
                  "
                                >
                                    {step.step_number}
                                </div>

                                <div>

                                    <h3 className="font-bold text-xl">
                                        Step {step.step_number}
                                    </h3>

                                    <p className="text-gray-500">
                                        ⏱ {step.duration} min
                                    </p>

                                </div>

                            </div>

                            <p className="mt-6">
                                {step.instruction}
                            </p>

                            {step.special_note && (
                                <div
                                    className="
                    mt-4
                    bg-orange-50
                    p-4
                    rounded-xl
                  "
                                >
                                    💡 {step.special_note}
                                </div>
                            )}

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
};

export default RecipeDetail;