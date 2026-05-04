import ProductsContainer from "./components/ProductsContainer/ProductsContainer"
import Navbar from "./components/NavBar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import data from './db'
import { useState } from "react"


let allProducts = data

console.log(allProducts)

function App() {

  const [filters, setFilters] = useState({
    category: "",
    color: "",
    price:''
  });
  const filterData = data.filter(item => {
    
    return(
      (filters.category === '' || filters.category === item.category)&&
      (filters.color === '' || filters.color === item.color)&&
      (filters.price === '' || ((Number(item.newPrice) <= (Number(filters.price))) && (Number(item.newPrice) >= (Number(filters.price-50))))) 
    )
  })
  console.log(filters)
  return (
    <div className='main'>
      <Sidebar setfilters = {setFilters}
        filters = { filters}
      />
      <Navbar />
      <ProductsContainer filterdata = {filterData}/>
    </div>
  )
}

export default App
