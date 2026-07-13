import { AiOutlineSearch } from "react-icons/ai";
import { CiPlay1 } from "react-icons/ci";

const Home = () => {
  return (
    <div className="pt-24 min-h-screen bg-bg-100 font-sour">

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>

            <span className="text-primary-300 font-semibold">
              🍳 AI Powered Cooking
            </span>

            <h1 className="mt-4 text-6xl font-sour text-text-300 leading-tight">
              Cook Smarter,
              <br />
              Not Harder.
            </h1>

            <p className="mt-6 text-xl text-text-100 max-w-xl">
              Discover amazing recipes, get step-by-step guidance
              and let AI help you create delicious meals from
              ingredients you already have.
            </p>

            {/* Search */}
            <div className="mt-8 flex items-center gap-3 bg-white shadow-lg rounded-2xl px-5 py-4 max-w-xl">

              <AiOutlineSearch size={24} />

              <input
                type="text"
                placeholder="Search recipes..."
                className="flex-1 outline-none text-lg"
              />
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">

              <button
                className="
                bg-primary-300
                text-white
                px-6
                py-3
                rounded-xl
                font-medium
                shadow-lg
              "
              >
                Explore Recipes
              </button>

              <button
                className="
                bg-white
                px-6
                py-3
                rounded-xl
                shadow-md
                flex
                items-center
                gap-2
              "
              >
                <CiPlay1 />
                Watch Demo
              </button>

            </div>

            {/* Stats */}
            <div className="mt-10 flex gap-8">

              <div>
                <h3 className="text-3xl font-bold text-primary-300">
                  10K+
                </h3>

                <p>Recipes</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-primary-300">
                  500+
                </h3>

                <p>Chefs</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-primary-300">
                  1M+
                </h3>

                <p>Meals Cooked</p>
              </div>

            </div>

          </div>

          {/* Right */}
          <div>

            <div
              className="
              relative
              overflow-hidden
              rounded-3xl
              h-[550px]
              shadow-2xl
            "
            >

              <img
                src="/pasta.jpg"
                alt=""
                className="w-full h-full object-cover"
              />

              <div
                className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black
                via-black/40
                to-transparent
              "
              />

              <div className="absolute bottom-0 p-8 text-white">

                <span className="text-orange-400">
                  🔥 Recipe Of The Day
                </span>

                <h2 className="text-4xl font-bold mt-2">
                  Creamy Garlic Pasta
                </h2>

                <div className="flex gap-4 mt-3">
                  <span>⭐ 4.8</span>
                  <span>⏱ 25 min</span>
                  <span>🌶 Easy</span>
                </div>

                <button
                  className="
                  mt-6
                  bg-primary-300
                  px-5
                  py-3
                  rounded-xl
                "
                >
                  Start Cooking
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Categories */}

      <section className="max-w-7xl mx-auto px-6 mt-24">

        <div className="flex justify-between items-center mb-8">

          <div>
            <span className="text-primary-300">
              🍽 Browse Recipes
            </span>

            <h2 className="text-4xl font-bold mt-2">
              Popular Categories
            </h2>
          </div>

        </div>

        <div className="grid grid-cols-6 gap-4">

          {[
            "⚡ Quick Meals",
            "🍛 Indian",
            "🍝 Italian",
            "🥗 Healthy",
            "🍰 Desserts",
            "🌮 Street Food",
          ].map((item) => (
            <div
              key={item}
              className="
                bg-white
                rounded-3xl
                p-6
                shadow-md
                hover:shadow-xl
                transition
                cursor-pointer
              "
            >
              <h3 className="font-semibold text-lg">
                {item}
              </h3>
            </div>
          ))}

        </div>

      </section>

      {/* How It Works */}

      <section className="max-w-7xl mx-auto px-6 mt-24">

        <div className="text-center">

          <span className="text-primary-300">
            👨‍🍳 Easy Cooking
          </span>

          <h2 className="text-5xl font-bold mt-3">
            How HeadChef Works
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {[
            {
              title: "Find A Recipe",
              icon: "🔍",
            },
            {
              title: "Follow Steps",
              icon: "📖",
            },
            {
              title: "Cook Perfectly",
              icon: "🍳",
            },
          ].map((step) => (
            <div
              key={step.title}
              className="
                bg-white
                rounded-3xl
                p-8
                text-center
                shadow-md
              "
            >
              <div className="text-6xl">
                {step.icon}
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                {step.title}
              </h3>
            </div>
          ))}

        </div>

      </section>

      {/* AI Banner */}

      <section className="max-w-7xl mx-auto px-6 mt-24 pb-24">

        <div
          className="
          bg-gradient-to-r
          from-orange-50
          to-orange-100
          rounded-3xl
          p-12
        "
        >

          <div className="flex justify-between items-center">

            <div>

              <span className="text-primary-300">
                🤖 Smart Cooking
              </span>

              <h2 className="text-5xl font-bold mt-3">
                What's In Your Fridge?
              </h2>

              <p className="mt-4 text-lg text-text-100">
                Let AI suggest recipes using ingredients
                you already have.
              </p>

            </div>

            <button
              className="
              bg-primary-300
              text-white
              px-8
              py-4
              rounded-xl
              shadow-lg
            "
            >
              Find Recipes
            </button>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;