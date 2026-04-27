import styles from './UsingProps.module.css'

const Child2 = ({children}) => {
    return(
        <div className={styles.child}>
            <h1>Child Component</h1>
            <h3>This component utilizes data sent by parent using children prop:</h3>
            <br />
            <div className= {styles.details}>
                <span>
                    {children}
                </span>
            </div>
        </div>
    )
    
}

export default Child2