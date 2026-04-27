import styles from './StateAsProp.module.css'

const ChildTwo = ({onclick }) => {
    return(
        <div className={styles.container}>
            <h2>Child 2</h2>
            <button className={styles.button} onClick={onclick}>Decrement</button>
        </div>
    )
}

export default ChildTwo