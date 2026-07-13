const Favorites = () => {
  const favorites = [
    {
      id: 1,
      title: "Creamy Garlic Pasta",
      image: "/thumbnails/pasta.jpg",
      rating: 4.8,
      time: "25 min",
    },
    {
      id: 2,
      title: "Butter Chicken",
      image: "/thumbnails/butterChicken.jpg",
      rating: 4.9,
      time: "40 min",
    },
    {
      id: 3,
      title: "Pepperoni Pizza",
      image: "/thumbnails/pizza.jpg",
      rating: 4.7,
      time: "35 min",
    },
    {
      id: 4,
      title: "Chicken Salad Bowl",
      image: "/thumbnails/salad.jpg",
      rating: 4.8,
      time: "20 min",
    },
  ];

  return (
    <div className="pt-26 min-h-screen bg-bg-100 p-6 font-sour">

      {/* Heading */}
      <div className="mb-10">

        <span className="text-orange-500">
          ❤️ Your Collection
        </span>

        <h1 className="text-5xl font-bold mt-2">
          Favorite Recipes
        </h1>

        <p className="text-text-100 mt-3">
          All the recipes you've saved for later.
        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">

        <div className="bg-white rounded-3xl p-6 shadow">
          <h3 className="text-4xl font-bold text-orange-500">
            24
          </h3>

          <p>Saved Recipes</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <h3 className="text-4xl font-bold text-orange-500">
            12
          </h3>

          <p>Cooked Recipes</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <h3 className="text-4xl font-bold text-orange-500">
            8
          </h3>

          <p>Collections</p>
        </div>

      </div>

      {/* Recipe Grid */}
      <div className="grid lg:grid-cols-4 gap-6">

        {favorites.map((recipe) => (
          <div
            key={recipe.id}
            className="
              bg-white
              rounded-3xl
              overflow-hidden
              shadow-lg
              hover:shadow-xl
              transition
            "
          >

            <div className="relative h-56">

              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />

              <button
                className="
                  absolute
                  top-3
                  right-3
                  bg-white
                  w-10
                  h-10
                  rounded-full
                "
              >
                ❤️
              </button>

            </div>

            <div className="p-4">

              <h3 className="font-bold text-xl">
                {recipe.title}
              </h3>

              <div className="flex gap-4 mt-2 text-sm">

                <span>
                  ⭐ {recipe.rating}
                </span>

                <span>
                  ⏱ {recipe.time}
                </span>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* Empty State Example */}

      {!favorites && (
        <div className="flex flex-col items-center py-24">

          <div className="text-8xl">
            ❤️
          </div>

          <h2 className="text-4xl font-bold mt-4">
            No Favorites Yet
          </h2>

          <p className="mt-2 text-gray-500">
            Start saving recipes you love.
          </p>

        </div>
      )}

    </div>
  );
};

export default Favorites;