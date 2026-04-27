import styles from './StateAsProp.module.css'

const ChildOne = ({onclick }) => {
    return(
        <div className={styles.container}>
            <h2>Child 1</h2>
            <button className={styles.button} onClick={onclick}>Increment</button>
        </div>
    )
}

export default ChildOne