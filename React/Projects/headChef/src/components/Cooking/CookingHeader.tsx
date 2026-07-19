interface CookingHeaderProps {
  recipeTitle: string;
  status: "active" | "paused" | "completed" | "cancelled";
  onExit: () => void;
}

const CookingHeader = ({
  recipeTitle,
  status,
  onExit,
}: CookingHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">

      <div>

        <p className="text-sm uppercase tracking-widest text-text-100">
          Cooking Session
        </p>

        <h1 className="text-4xl font-bold mt-1">
          {recipeTitle}
        </h1>

      </div>

      <div className="flex items-center gap-4">

        <span
          className={`
            px-4 py-2 rounded-full text-sm font-semibold capitalize
            ${
              status === "active"
                ? "bg-green-100 text-green-700"
                : status === "paused"
                ? "bg-yellow-100 text-yellow-700"
                : status === "completed"
                ? "bg-blue-100 text-blue-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {status}
        </span>

        <button
          onClick={onExit}
          className="px-5 py-3 rounded-xl border hover:bg-primary-100 transition"
        >
          Exit
        </button>

      </div>

    </div>
  );
};

export default CookingHeader;