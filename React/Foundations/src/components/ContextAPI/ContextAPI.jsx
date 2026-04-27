import styles from './ContextAPI.module.css'
import Child1 from "./Child1"
import { Context } from './Context'


const ContextAPI = () => {
    const user = {name:'THis is name',age:45}
    return(
        <Context.Provider value={user}>
            <div className={styles.main}>
                <h1>Using ContextAPI passing data from parent component to 3rd inner child</h1>
                <div className={styles.container}>
                    <p>Parent component</p>
                    <Child1 />
                </div>
            </div>
        </Context.Provider>
    ) 
}

export default ContextAPI