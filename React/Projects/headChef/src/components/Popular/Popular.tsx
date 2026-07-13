import { useEffect, useState } from "react";
import type { Recipe } from "../Recipes/Recipe";
import api from "../../api/axios";

import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Popular = () => {

  const [popular, setPopular] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {

    const fetchPopular = async () => {
      try {
        const response = await api.get(`/popular`)
        setPopular(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
    fetchPopular()
  }, []
  )

  console.log(popular)

  return (
    <div className="pt-26 min-h-screen bg-bg-100 font-sour p-4">
      <div className="flex flex-col gap-6">

        {/* Heading */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-orange-500 font-medium">
              🔥 Most Loved Recipes
            </span>

            <h1 className="text-5xl font-bold mt-2">
              Popular Recipes
            </h1>
          </div>

          <button className="px-5 py-2 rounded-full border border-orange-200 hover:bg-orange-50 transition">
            View All →
          </button>
        </div>

        {/* Grid */}

        {loading ? (
          <div className="text-center text-xl">
            Loading Categories...
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 h-[40vh]">

            {/* #1 Recipe */}
            <div onClick={() => navigate(`/recipes/${popular[0].id}`)} className="col-span-2 relative overflow-hidden rounded-3xl shadow-lg group cursor-pointer">

              <img
                src={popular[0].thumbnail}
                alt={popular[0].title}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Rank */}
              <div className="absolute top-5 left-5 bg-orange-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                #1
              </div>

              {/* Favorite */}
              <button
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                <AiOutlineHeart size={18} />
              </button>


              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 text-white">

                <h3 className="text-4xl font-bold max-w-lg">
                  {popular[0].title}
                </h3>

                <div className="flex gap-4 mt-3 text-lg">
                  <span>⭐ {popular[0].rating}</span>
                  <span>⏱ {popular[0].cooking_time}</span>
                  <span>🌶 Easy</span>
                </div>

                <p className="mt-3 text-white/80 max-w-md">
                  Tender grilled chicken skewers marinated with herbs and spices.
                </p>

              </div>

            </div>

            {/* Right Side */}
            <div className="grid grid-rows-2 gap-4">

              {/* Top */}

              {/* #2 */}
              <div onClick={() => navigate(`/recipes/${popular[1].id}`)} className="relative overflow-hidden rounded-3xl shadow-lg group cursor-pointer">

                <img
                  src={popular[1].thumbnail}
                  alt={popular[1].title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full font-bold">
                  #2
                </div>

                <button
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                  <AiOutlineHeart size={18} />
                </button>

                <div className="absolute bottom-4 left-4 text-white">

                  <h3 className="font-bold text-lg">
                    {popular[1].title}
                  </h3>

                  <div className="flex gap-2 text-xs mt-1">
                    <span>⭐ {popular[1].rating}</span>
                    <span>⏱ {popular[1].cooking_time}</span>
                  </div>

                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                
                {/* #3 */}
                <div className="relative overflow-hidden rounded-3xl shadow-lg group cursor-pointer">

                  <img
                    src="/spaghetti_bolognese.jpg"
                    alt=""
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full font-bold">
                    #3
                  </div>

                  <button
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                    <AiOutlineHeart size={18} />
                  </button>

                  <div className="absolute bottom-4 left-4 text-white">

                    <h3 className="font-bold text-lg">
                      {popular[2].title}
                    </h3>

                    <div className="flex gap-2 text-xs mt-1">
                      <span>⭐ {popular[2].rating}</span>
                      <span>⏱ {popular[2].cooking_time}</span>
                    </div>

                  </div>
                </div>
                {/* Explore More */}
                <div className="rounded-3xl border-2 border-dashed border-orange-300 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center gap-5 hover:bg-orange-50 transition cursor-pointer">

                  <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-5xl shadow-lg">
                    +
                  </div>

                  <h3 className="text-2xl font-bold">
                    Explore More
                  </h3>

                  <p className="text-center text-gray-500">
                    Discover hundreds of delicious
                    <br />
                    recipes from our community
                  </p>

                </div>

              </div>

            </div>

          </div>)}
        < section className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-orange-500">🍽 Browse by Taste</p>
              <h2 className="text-4xl font-bold">
                Categories
              </h2>
            </div>

            <button className="border px-4 py-2 rounded-full">
              View All
            </button>
          </div>

          <div className="grid grid-cols-6 gap-4">
            lol
          </div>
        </section>
        <section className="mt-20">
          <div className="mb-8">
            <p className="text-orange-500">
              🔥 Hot Right Now
            </p>

            <h2 className="text-4xl font-bold">
              Trending Recipes
            </h2>
          </div>

        </section>

        <section className="mt-20">

          <div className="flex justify-between items-center mb-8">

            <div>
              <p className="text-orange-500">
                ⭐ Community Favorites
              </p>

              <h2 className="text-4xl font-bold">
                Top Rated Recipes
              </h2>
            </div>

            <select>
              <option>Popularity</option>
              <option>Rating</option>
              <option>Newest</option>
            </select>

          </div>

          <div className="grid lg:grid-cols-4 gap-6">

          </div>

        </section>
        <section className="mt-24">

          <div className="rounded-3xl bg-gradient-to-r from-orange-50 to-orange-100 p-12">

            <div className="flex justify-between items-center">

              <div>
                <p className="text-orange-500">
                  🤖 Smart Cooking
                </p>

                <h2 className="text-5xl font-bold mt-2">
                  Don't Know What To Cook?
                </h2>

                <p className="mt-4 text-gray-600">
                  Let AI suggest recipes based on ingredients you already have.
                </p>
              </div>

              <button className="bg-orange-500 text-white px-10 py-4 rounded-full">
                Surprise Me
              </button>

            </div>

          </div>

        </section>

      </div>
    </div >
  );
};

export default Popular;