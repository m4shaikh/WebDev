import Styles from './ContextAPI.module.css'
import Child2 from './Child2'
import { Context } from './Context'
import { useContext } from 'react'


const Child3 = () => {
    const userData = useContext(Context)

    return(
        
        <div className={Styles.main}>
            <div className={Styles.container}>
                <p>Child component 3</p>
                Name: {userData.name},
                Age: {userData.age}
            </div>
        </div>
    )
}

export default Child3