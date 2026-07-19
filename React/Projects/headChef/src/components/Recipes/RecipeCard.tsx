// components/RecipeCard.tsx

import { AiOutlineHeart } from "react-icons/ai";
import type { Recipe } from "../../Types/types";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({id,title,thumbnail,rating,cooking_time,difficulty,calories}: Recipe) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/recipes/${id}`)}
      className="bg-white
      rounded-3xl
      overflow-hidden
      shadow-sm hover:shadow-xl
      transition cursor-pointer ">
      <div className="relative h-52">

        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />

        <button
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
          <AiOutlineHeart size={18} />
        </button>

      </div>

      <div className="p-4">

        <h3 className="font-bold text-xl">
          {title}
        </h3>

        <div className="flex gap-3 text-sm mt-2">
          <span>
            ⭐ {rating} 
          </span>

          <span>
            ⏱ {cooking_time}
          </span>

          <span>
            🌶 {difficulty}
          </span>
        </div>

        <p className="mt-3 text-orange-500">
          🔥 {calories} kcal
        </p>

      </div>
    </div>
  );
};

export default RecipeCard;