import Parent from "./Parent"
import Parent2 from "./Parent2"
import styles from './UsingProps.module.css'
const UsingProps = () => {
    return(
        <div className={styles.main}>
            <h1>Using Props</h1>
            <p className={styles.info}>In this container parent has passed data to child using props </p>
            <Parent/>   
            <p className={styles.info}>In this container, the parent passes data to the child using the special prop "children" (children are the elements defined inside the component when it is used).</p>
            <Parent2/>                 
        </div>
    )
}

export default UsingProps