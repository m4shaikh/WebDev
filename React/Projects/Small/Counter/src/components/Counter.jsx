import { useState } from "react";

const Counter = () => {
    const [count , setCount] = useState(0)
    
    function HandleIncrement(){
        setCount(count + 1)
    }
    
    function HandleDecrement(){
        setCount(count - 1)
    }
    return (
        <div className="container">
            <h1 className="title">{count}</h1>
            <button className = "IncrementBtn" onClick={HandleIncrement}>+</button>
            <button className ="DecrementBtn" onClick={HandleDecrement}>-</button>
        </div>
    );
};

export default Counter;