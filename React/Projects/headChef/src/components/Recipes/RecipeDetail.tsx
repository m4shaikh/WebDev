import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    AiOutlineHeart,
    AiOutlineEye,
} from "react-icons/ai";

import {
    BsFire,
    BsClock,
    BsPlayFill
} from "react-icons/bs";

import type { RecipeDetailData } from "../../Types/types";

import { GiChefToque } from "react-icons/gi";

import api from "../../api/axios";


const RecipeDetail = () => {
    const { recipeId } = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] =
        useState<RecipeDetailData | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const fetchRecipe = async () => {
            try {

                const response = await api.get(`/recipes/${recipeId}/`);

                setRecipe(response.data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

        const countView = async () => {
            try {
                await api.post(
                    `/recipes/${recipeId}/view/`
                );
            } catch (error) {
                console.log(error);
            }
        };

        fetchRecipe();
        countView();

    }, [recipeId]);

    const startCooking = async () => {

        try {

            const response =
                await api.post(
                    `/recipes/${recipeId}/start/`
                );
            console.log(response.data)
            navigate(
                `/cooking/${response.data.id}`
            );

        } catch (error) {

            console.log(error);

        }

    };

    if (loading)
        return (
            <div className="pt-28 text-center text-2xl">
                Loading...
            </div>
        );

    if (!recipe)
        return (
            <div className="pt-28 text-center text-2xl">
                Recipe not found
            </div>
        );

    return (

        <div className="pt-24 min-h-screen bg-bg-100 font-sour">

            <section className="relative h-[650px] overflow-hidden">

                <img
                    src={recipe.thumbnail}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

                <div className="absolute bottom-0 left-0 w-full p-12 text-white">

                    <div className="max-w-6xl mx-auto">

                        <span className="bg-orange-500 px-4 py-2 rounded-full text-sm">
                            Featured Recipe
                        </span>

                        <h1 className="text-7xl font-bold mt-6">
                            {recipe.title}
                        </h1>

                        <div className="flex flex-wrap gap-8 mt-8 text-xl">

                            <div className="flex items-center gap-2">
                                <BsClock />
                                {recipe.cooking_time} mins
                            </div>

                            <div className="flex items-center gap-2">
                                <BsFire />
                                {recipe.calories} kcal
                            </div>

                            <div className="flex items-center gap-2">
                                <AiOutlineEye />
                                {recipe.views}
                            </div>

                            <div className="flex items-center gap-2">
                                <GiChefToque />
                                {recipe.cooked} Cooked
                            </div>

                            <div>
                                🌶 {recipe.difficulty}
                            </div>

                        </div>

                        <div className="flex gap-5 mt-10">

                            <button
                                className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition"
                            >

                                <AiOutlineHeart size={24} />

                                Favorite

                            </button>

                            <button
                                onClick={startCooking}
                                className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 px-10 py-4 rounded-2xl text-lg font-semibold transition hover:scale-105 shadow-xl"
                            >

                                <BsPlayFill size={26} />

                                Start Cooking

                            </button>

                        </div>

                    </div>

                </div>

            </section>

            <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">

                <section className="bg-white rounded-3xl p-8 shadow">

                    <h2 className="text-4xl font-bold mb-6">
                        About this Recipe
                    </h2>

                    <p className="text-lg leading-9 text-text-100">
                        {recipe.description}
                    </p>

                </section>

                <section className="grid lg:grid-cols-4 gap-6">

                    <div className="bg-white rounded-3xl p-8 shadow text-center">

                        <BsClock className="mx-auto text-4xl text-orange-500" />

                        <p className="text-text-100 mt-3">
                            Cooking Time
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {recipe.cooking_time} min
                        </h3>

                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow text-center">

                        <BsFire className="mx-auto text-4xl text-orange-500" />

                        <p className="text-text-100 mt-3">
                            Calories
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {recipe.calories}
                        </h3>

                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow text-center">

                        <AiOutlineEye className="mx-auto text-4xl text-orange-500" />

                        <p className="text-text-100 mt-3">
                            Views
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {recipe.views}
                        </h3>

                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow text-center">

                        <GiChefToque className="mx-auto text-4xl text-orange-500" />

                        <p className="text-text-100 mt-3">
                            Cooked
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {recipe.cooked}
                        </h3>

                    </div>

                </section>
                <section className="bg-white rounded-3xl p-8 shadow">

                    <h2 className="text-4xl font-bold mb-8">
                        Ingredients
                    </h2>

                    <div className="grid md:grid-cols-2 gap-5">

                        {recipe.ingredients.map((ingredient) => (

                            <div
                                key={ingredient.ingredient_name}
                                className="flex justify-between items-center bg-bg-100 rounded-2xl p-5"
                            >

                                <div className="flex items-center gap-4">

                                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl">

                                        🥘

                                    </div>

                                    <span className="text-xl">
                                        {ingredient.ingredient_name}
                                    </span>

                                </div>

                                <span className="font-bold text-orange-500">

                                    {ingredient.quantity} {ingredient.unit}

                                </span>

                            </div>

                        ))}

                    </div>

                </section>

                <section className="bg-white rounded-3xl p-8 shadow">

                    <div className="flex justify-between items-center mb-10">

                        <div>

                            <h2 className="text-4xl font-bold">
                                Step Overview
                            </h2>

                            <p className="text-text-100 mt-2">
                                Follow the guided cooking mode for detailed instructions.
                            </p>

                        </div>

                        <button
                            onClick={startCooking}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition"
                        >

                            <BsPlayFill size={22} />

                            Start Guided Cooking

                        </button>

                    </div>

                    <div className="space-y-6">

                        {recipe.steps.map((step) => (

                            <div
                                key={step.step_number}
                                className="flex gap-6 items-start"
                            >

                                <div className="flex flex-col items-center">

                                    <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xl">

                                        {step.step_number}

                                    </div>

                                    {step.step_number !== recipe.steps.length && (

                                        <div className="w-1 h-20 bg-orange-200" />

                                    )}

                                </div>

                                <div className="flex-1 bg-bg-100 rounded-2xl p-6">

                                    <div className="flex justify-between items-center">

                                        <h3 className="text-2xl font-semibold">

                                            Step {step.step_number}

                                        </h3>

                                        <span className="text-orange-500 font-semibold">

                                            ⏱ {step.duration} min

                                        </span>

                                    </div>

                                    <p className="mt-4 text-lg text-text-100 line-clamp-2">

                                        {step.instruction}

                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </section>

                <section className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-3xl p-12 text-center text-white">

                    <h2 className="text-5xl font-bold">

                        Ready to Cook?

                    </h2>

                    <p className="text-xl mt-5 opacity-90">

                        Let HeadChef guide you step by step with smart timers and live cooking instructions.

                    </p>

                    <button
                        onClick={startCooking}
                        className="mt-10 bg-white text-orange-500 px-10 py-5 rounded-2xl text-xl font-bold flex items-center gap-3 mx-auto hover:scale-105 transition"
                    >

                        <BsPlayFill size={26} />

                        Start Cooking Now

                    </button>

                </section>

            </div>

        </div>

    );

};

export default RecipeDetail;