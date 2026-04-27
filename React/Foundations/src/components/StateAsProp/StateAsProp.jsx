import { useState } from "react"
import styles from './StateAsProp.module.css'
import ChildOne from "./ChildOne"
import ChildTwo from "./ChildTwo"

const StateAsProp = ()  => { 
    const [count,setCount] = useState(0)
    return(
        <div className={styles.main}>
            <h1>Passing state as prop</h1>
            <div className={styles.container}>
                <h2>Parent</h2>
                <div className={styles.parent}>
                    <div className={styles.count}>Count : {count}</div>
                </div>
                <ChildOne
                    onclick = {() => setCount(count + 1)}
                />
                <ChildTwo
                    onclick = {() => setCount(count - 1)}
                />
                
            </div>
        </div>
    )
}

export default StateAsProp