export interface Ingredient {
  ingredient_name: string;
  quantity: number;
  unit: string;
}

export interface StepType {
  step_number: number;
  instruction: string;
  duration: number;
  requires_timer: boolean;
  special_note: string;
}

export interface SessionType {
  completed_at: string | null;
  current_step: number;
  current_step_data: StepType;
  id: string;
  recipe: string;
  recipe_title: string;
  started_at: string;
  status: "active" | "paused" | "completed" | "cancelled";
  step_started_at: string;
  total_steps: number;
  ingredients: Ingredient[];
}

export interface Recipe {
  id:string;
  title: string;
  thumbnail: string;
  rating: number;
  reviews: string;
  cooking_time: string;
  difficulty: string;
  calories: number;
}

export interface Step {
    step_number: number;
    instruction: string;
    duration: number;
    special_note?: string;
}

export interface RecipeDetailData {
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

export interface Category {
  id: number;
  name: string;
  image: string;
  recipes: number;
  icon: string;
}