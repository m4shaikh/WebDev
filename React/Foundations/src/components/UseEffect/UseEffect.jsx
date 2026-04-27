import { useEffect, useState } from 'react'
import styles from './UseEffect.module.css'

const UseEffect = () =>{
    const [count , setCount ] = useState(0)
    useEffect(() => {
        alert('Increment Button Is Clicked')        
    },[count])

    function handleOnClick(){
       setCount(count + 1) 
    }
    return(
        <div className={styles.main}>
            <h1>Using useEffect hook</h1>
            <h2>useEffect calls provided function when states provided change</h2>
            <div className={styles.container}>
                <div className={    styles.count}>{count}</div>
                <button onClick={handleOnClick}>Increment</button>
            </div>
        </div>
    )
}

export default UseEffect