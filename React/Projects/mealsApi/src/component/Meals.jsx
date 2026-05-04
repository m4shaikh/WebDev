import {useState, useEffect } from "react";
import axios from 'axios'


const Meals = () => {
    const [Items, setItems] = useState([]);
    useEffect(()=>{
        axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian")
        .then((res)=>{
            console.log(res)
            setItems(res.data.meals)
        })
    },[])

    return (
        <div className="main">
            <h1>Meals</h1>
            <div className="card-container">
                {Items.map(meal => {
                    return(
                        <div className="card" key={meal.idMeal}>
                            <div className="image">
                                <img src={meal.strMealThumb} alt={meal.strMeal} />
                            </div>
                            <div className="detail">
                                <span className="name">{meal.strMeal}</span>
                                <span className="id">#{meal.idMeal}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Meals;