import {
  Heart,
  ChefHat,
  Bookmark,
  Clock,
  Settings,
  MapPin,
} from "lucide-react";

const Profile = () => {
  return (
    <div className="pt-26 min-h-screen bg-bg-100 p-6 font-sour">

      {/* Header */}
      <div className="bg-white rounded-3xl p-8 shadow-lg">

        <div className="flex items-center gap-6">

          <div
            className="
              w-28
              h-28
              rounded-full
              bg-orange-100
              flex
              items-center
              justify-center
              text-5xl
            "
          >
            👨‍🍳
          </div>

          <div>

            <h1 className="text-4xl font-bold">
              Moin Shaikh
            </h1>

            <p className="text-gray-500">
              Home Cook
            </p>

            <div className="flex items-center gap-2 mt-2 text-gray-500">
              <MapPin size={16} />
              Ahmedabad, India
            </div>

          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mt-8">

        <div className="bg-white rounded-3xl p-6 shadow">
          <Heart className="text-orange-500" />
          <h2 className="text-3xl font-bold mt-3">24</h2>
          <p>Favorites</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <ChefHat className="text-orange-500" />
          <h2 className="text-3xl font-bold mt-3">12</h2>
          <p>Cooked</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <Bookmark className="text-orange-500" />
          <h2 className="text-3xl font-bold mt-3">8</h2>
          <p>Collections</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <Clock className="text-orange-500" />
          <h2 className="text-3xl font-bold mt-3">34h</h2>
          <p>Cooking Time</p>
        </div>

      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6 mt-8">

        {/* Favorite Categories */}
        <div className="col-span-2 bg-white rounded-3xl p-6 shadow">

          <h2 className="text-2xl font-bold mb-4">
            Favorite Categories
          </h2>

          <div className="flex flex-wrap gap-3">

            {[
              "🍝 Italian",
              "🍛 Indian",
              "🍰 Desserts",
              "🥗 Healthy",
            ].map((category) => (
              <div
                key={category}
                className="
                  px-4
                  py-2
                  bg-orange-50
                  rounded-full
                "
              >
                {category}
              </div>
            ))}

          </div>

        </div>

        {/* Settings */}
        <div className="bg-white rounded-3xl p-6 shadow">

          <h2 className="text-2xl font-bold mb-4">
            Quick Settings
          </h2>

          <div className="flex flex-col gap-3">

            <button
              className="
                flex
                items-center
                gap-2
                p-3
                rounded-xl
                hover:bg-orange-50
              "
            >
              <Settings size={18} />
              Account Settings
            </button>

            <button
              className="
                flex
                items-center
                gap-2
                p-3
                rounded-xl
                hover:bg-orange-50
              "
            >
              ❤️ Favorites
            </button>

            <button
              className="
                flex
                items-center
                gap-2
                p-3
                rounded-xl
                hover:bg-orange-50
              "
            >
              📚 Collections
            </button>

          </div>

        </div>

      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl p-6 shadow mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Recent Activity
        </h2>

        <div className="flex flex-col gap-4">

          {[
            "Cooked Creamy Garlic Pasta",
            "Saved Butter Chicken",
            "Liked Chicken Salad Bowl",
            "Added Pepperoni Pizza to Favorites",
          ].map((activity, index) => (
            <div
              key={index}
              className="
                flex
                justify-between
                border-b
                border-gray-100
                pb-3
              "
            >
              <span>{activity}</span>

              <span className="text-gray-400">
                2h ago
              </span>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Profile;