import Styles from './ContextAPI.module.css'
import Child2 from './Child2'

const Child1 = () => {
    return(
        <div className={Styles.main}>
            <div className={Styles.container}>
                <p>Child component 1</p>
                <Child2 />
            </div>
        </div>
    )
}

export default Child1