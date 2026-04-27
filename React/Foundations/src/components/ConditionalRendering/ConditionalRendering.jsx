import { useState } from "react"
import styles from './ConditionalRendering.module.css'

const ConditionalRendering = () => {
  const [show, setShow] = useState(false)

  return (
    <div className={styles.main}>
        <h1 className={styles.title}>Conditional Rendering</h1>
        
        <div className={styles.show}>
            {show ? <p>Hello 👋</p> : <p>Nothing to show</p>}
            <button className={styles.showbutton} onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
            </button>
        </div>

    </div>
  )
}
export default ConditionalRendering