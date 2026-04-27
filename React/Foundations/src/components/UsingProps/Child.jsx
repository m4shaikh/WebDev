import styles from './UsingProps.module.css'

const Child = (props) => {
    return(
        <div className={styles.child}>
            <h1>Child Component</h1>
            <h3>This component utilizes data sent by parent using props:</h3>
            <br />
            <img className={styles.avatar} src={props.avatar} alt={props.name} />
            <div className= {styles.details}>
                <span>
                    Name : {props.name}
                </span>
                <span>
                    Email : {props.email}
                </span>
                <span>
                    Age : {props.age}
                </span>
                <span>
                    City : {props.city} 
                </span>

            </div>
        </div>
    )
    
}

export default Child