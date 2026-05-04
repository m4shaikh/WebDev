import { FiShoppingCart } from 'react-icons/fi'
import "./Sidebar.css"

const Sidebar = ({ setfilters ,filters}) => {
    function handleChange(e) {
        const { name, value } = e.target;
        
        setfilters(
            prev => ({
                ...prev,
                [name]: value === "all" ? '' :value 
            })
        )
        console.log(filters)
    }

    return (
        <div className="sidebar">
            <h2><FiShoppingCart></FiShoppingCart></h2>
            <div className="all-categories">
                <div className="category-title">
                    Category
                </div>
                <div className="categories">
                    <label className='radio'>
                        <input type="radio" onChange={handleChange} value='all' name='category' />
                        <span className='custom-radio'></span>All
                    </label>
                    <label className='radio'>
                        <input type="radio" onChange={handleChange} value='sandals' name='category' />
                        <span className='custom-radio'></span>Sandals
                    </label>
                    <label className='radio'>
                        <input type="radio" onChange={handleChange} value='heels' name='category' />
                        <span className='custom-radio'></span>Heels
                    </label>
                    <label className='radio'>
                        <input type="radio" onChange={handleChange} value='flats' name='category' />
                        <span className='custom-radio'></span>Flats
                    </label>
                    <label className='radio'>
                        <input type="radio" onChange={handleChange} value='sneakers' name='category' />
                        <span className='custom-radio'></span>Sneakers
                    </label>
                </div>
            </div>
            <div className="all-prices">
                <div className="price-title">
                    Price 
                </div>
                <div className="prices">
                    <label className='radio'>
                        <input type="radio" onChange={handleChange} value='' name='price' />
                        <span className='custom-radio'></span>All
                    </label>
                    <label className='radio'>
                        <input type="radio" onChange={handleChange} value='50' name='price' />
                        <span className='custom-radio'></span>0-50
                    </label>
                    <label className='radio'>
                        <input type="radio" onChange={handleChange} value='100' name='price' />
                        <span className='custom-radio'></span>50-100
                    </label>
                    <label className='radio'>
                        <input type="radio" onChange={handleChange} value='150' name='price' />
                        <span className='custom-radio'></span>100-150
                    </label>
                    <label className='radio'>
                        <input type="radio" onChange={handleChange} value='200' name='price' />
                        <span className='custom-radio'></span>150-200
                    </label>

                </div>
            </div>
            <div className="all-color">
                <div className="color-title">
                    Colors
                </div>
                <div className="colors">
                    <label className='radio'>
                        <input type="radio" onChange={handleChange} value='all' name='color' />
                        <span className='custom-color-radio' style={{background:'liner-gradient(to right blue,crimson)'}}></span>All
                    </label>
                    <label className='radio'>
                        <input type="radio" onChange={handleChange} value='black' name='color' />
                        <span className='custom-color-radio' style={{background:'black'}}></span>Black
                    </label>
                    <label className='radio'>
                        <input type="radio" onChange={handleChange} value='green' name='color' />
                        <span className='custom-color-radio' style={{background:'green'}}></span>Green
                    </label>
                    <label className='radio'>
                        <input type="radio" onChange={handleChange} value='red' name='color' />
                        <span className='custom-color-radio' style={{background:'red'}}></span>Red
                    </label>
                    <label className='radio'>
                        <input type="radio" onChange={handleChange} value='blue' name='color' />
                        <span className='custom-color-radio' style={{background:'blue'}}></span>Blue
                    </label>
                    <label className='radio'>
                        <input type="radio" onChange={handleChange} value='white' name='color' />
                        <span className='custom-color-radio' style={{background:'white'}}></span>White
                    </label>
                </div>
            </div>

        </div>
    );
};



export default Sidebar;