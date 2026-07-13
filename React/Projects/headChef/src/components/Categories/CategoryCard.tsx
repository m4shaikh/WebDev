import { useNavigate } from "react-router-dom";
import type { Category } from "./Caegory";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/categories/${category.id}`)
      }
      className="
        relative
        h-[320px]
        rounded-3xl
        overflow-hidden
        cursor-pointer
        group
        shadow-lg
      "
    >
      <img
        src={category.image}
        alt={category.name}
        className="
          w-full
          h-full
          object-cover
          transition
          duration-500
          group-hover:scale-105
        "
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      <div className="absolute bottom-0 p-6 text-white">

        <span className="text-3xl">
          {category.icon}
        </span>

        <h2 className="text-3xl font-bold mt-2">
          {category.name}
        </h2>

        <p className="text-white/80">
          {category.recipes} Recipes
        </p>

      </div>
    </div>
  );
};

export default CategoryCard;