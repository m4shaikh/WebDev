import Styles from './ContextAPI.module.css'
import Child3 from './Child3'

const Child2 = () => {
    return(
        <div className={Styles.main}>
            <div className={Styles.container}>
                <p>Child  component 2</p>
                <Child3/>
            </div>
        </div>
    )
}

export default Child2