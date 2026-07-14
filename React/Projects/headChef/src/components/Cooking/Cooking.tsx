const Cooking = () => {
  return (
    <div className="pt-24 min-h-screen bg-bg-100 font-sour px-6 pb-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>
          <p className="text-text-100 text-sm uppercase tracking-widest">
            Cooking Session
          </p>

          <h1 className="text-4xl font-bold">
            Chicken Tikka Masala
          </h1>
        </div>

        <button className="px-5 py-3 rounded-xl border hover:bg-primary-100 transition">
          Exit Cooking
        </button>

      </div>

      {/* Main Grid */}

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-180px)]">

        {/* LEFT PANEL */}

        <div className="col-span-3 flex flex-col gap-5">

          <div className="bg-white rounded-3xl p-6 shadow">

            <h2 className="text-xl font-bold mb-4">
              Progress
            </h2>

            <p className="text-text-100 mb-2">
              Step 3 of 8
            </p>

            <div className="h-3 rounded-full bg-primary-100 overflow-hidden">

              <div className="h-full w-[38%] bg-orange-500 rounded-full" />

            </div>

            <p className="mt-3 text-sm text-text-100">
              38% Completed
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow flex-1">

            <h2 className="text-xl font-bold mb-4">
              Ingredients
            </h2>

            <div className="flex flex-col gap-3">

              <label className="flex gap-3 items-center">
                <input type="checkbox" />
                Chicken
              </label>

              <label className="flex gap-3 items-center">
                <input type="checkbox" />
                Onion
              </label>

              <label className="flex gap-3 items-center">
                <input type="checkbox" />
                Garlic
              </label>

              <label className="flex gap-3 items-center">
                <input type="checkbox" />
                Butter
              </label>

            </div>

          </div>

        </div>

        {/* CENTER */}

        <div className="col-span-6 flex">

          <div className="bg-white rounded-3xl shadow p-12 w-full flex flex-col justify-center">

            <p className="text-orange-500 uppercase tracking-wider font-semibold">
              Current Step
            </p>

            <h2 className="text-6xl font-bold mt-2">
              Step 3
            </h2>

            <p className="text-3xl leading-relaxed mt-10">
              Add chopped onions into the pan and cook
              until they become golden brown. Stir every
              20–30 seconds to prevent burning.
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="col-span-3 flex flex-col gap-5">

          <div className="bg-white rounded-3xl p-6 shadow">

            <p className="text-center text-text-100">
              Timer
            </p>

            <h2 className="text-center text-6xl font-bold mt-3">
              03:42
            </h2>

          </div>

          <div className="bg-orange-50 rounded-3xl p-6">

            <h3 className="font-bold text-xl mb-3">
              💡 Chef Tip
            </h3>

            <p className="leading-7">
              Medium flame gives the onions a sweet
              caramelized flavour without burning.
            </p>

          </div>

          <div className="mt-auto flex flex-col gap-4">

            <button className="py-4 rounded-2xl border">
              ← Previous Step
            </button>

            <button className="py-4 rounded-2xl bg-orange-500 text-white">
              Next Step →
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cooking;