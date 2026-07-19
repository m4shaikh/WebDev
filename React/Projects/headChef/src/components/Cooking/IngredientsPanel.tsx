import type { FC } from "react";
import type { Ingredient } from "../../Types/types";

interface IngredientsPanelProps {
  ingredients: Ingredient[];
}

const IngredientsPanel: FC<IngredientsPanelProps> = ({
  ingredients,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow flex-1">

      <h2 className="text-xl font-bold mb-5">
        Ingredients
      </h2>

      <div className="flex flex-col gap-4">

        {ingredients.map((ingredient) => (

          <div
            key={ingredient.ingredient_name}
            className="flex justify-between border-b pb-2"
          >

            <span>
              {ingredient.ingredient_name}
            </span>

            <span className="text-text-100">
              {ingredient.quantity} {ingredient.unit}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
};

export default IngredientsPanel;