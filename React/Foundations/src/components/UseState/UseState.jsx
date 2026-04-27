import { useState } from "react"
import styles from './UseState.module.css'
const UseState = () => {
    function handleIncrement(){
        setCount(count+1)
    }
    function handleDecrement(){
        setCount(count-1)
    }
    const [count,setCount] = useState(0)
    return(
        <div className={styles.main}>
            <h1>useState Hook</h1>
            <div className={styles.container}>
                <span className={styles.count}>{count}</span>
                <button onClick={handleIncrement}>Increment</button>
                <button onClick={handleDecrement}>Decrement</button>

            </div>
        </div>
    )       
    
}
export default UseState