import { Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home"
import Popular from "./components/Popular/Popular"
import Categories from "./components/Categories/Categories"
import Favorites from "./components/Favorites/Favorites"
import Profile from "./components/Profile/Profile"
import Navbar from "./components/Navbar"
import LoginModal from "./components/Modals/Modal"
import CategoryDetail from "./components/Categories/CategoryDetail"
import RecipeDetail        from "./components/Recipes/RecipeDetail"
import { useState } from "react"
import Cooking from "./components/Cooking/Cooking"

const App = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  return (
    <main >
      <LoginModal showModal={showModal} setShowModal={setShowModal} />
      <Navbar showModal={showModal} setShowModal={setShowModal} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/categories/:categoryId"
          element={<CategoryDetail />}
        />
        <Route
          path="/recipes/:recipeId"
          element={<RecipeDetail />}
        />
        <Route
          path="/cooking/:sessionId"
          element={<Cooking/>}
        />
      </Routes>
    </main>
  )
}

export default App
