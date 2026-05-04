import './NavBar.css'
import { FiSearch } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";
import { FiUser } from 'react-icons/fi';
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="search-bar"><FiSearch></FiSearch> <input className='search-input' type="text" name="search" id="search-input" /></div>
      <div className='other-section'>
        <FiHeart />
        <FiShoppingBag />
        <FiUser />
      </div>
    </div>
  );
};

export default Navbar;